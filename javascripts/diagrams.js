// Mermaid diagrams: keep them readable and let the reader open them full screen.
//
// Material scales every diagram down to the width of the text column, so a wide one ends up with
// tiny text. Here a diagram is never shown below MIN_SCALE of its natural size (the column scrolls
// sideways instead), and a click opens it full screen, as large as the window allows.
// Needs the shadow roots opened by overrides/main.html.
(function () {
  "use strict";

  var MIN_SCALE = 0.75; // smallest inline size, as a fraction of the diagram's natural size
  var MAX_ZOOM = 2;     // largest full-screen size

  function svgOf(host) {
    return host.shadowRoot && host.shadowRoot.querySelector("svg");
  }

  function naturalSize(svg) {
    var vb = svg.viewBox && svg.viewBox.baseVal;
    if (vb && vb.width) return { w: vb.width, h: vb.height };
    var r = svg.getBoundingClientRect();
    return { w: r.width, h: r.height };
  }

  function prepare(host) {
    var svg = svgOf(host);
    if (!svg) return false;
    if (host.dataset.hpDiagram) return true;
    host.dataset.hpDiagram = "1";

    var size = naturalSize(svg);
    svg.style.width = "100%";
    svg.style.maxWidth = Math.round(size.w) + "px";
    svg.style.minWidth = Math.round(size.w * MIN_SCALE) + "px";
    svg.style.height = "auto";
    svg.style.display = "block";
    svg.style.margin = "0 auto";

    var wrap = document.createElement("div");
    wrap.className = "hp-diagram";
    host.parentNode.insertBefore(wrap, host);
    wrap.appendChild(host);

    var button = document.createElement("button");
    button.type = "button";
    button.className = "hp-diagram__zoom";
    button.title = "Open full screen";
    button.setAttribute("aria-label", "Open the diagram full screen");
    button.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>';
    wrap.appendChild(button);

    function open() { openFullScreen(svg, size); }
    button.addEventListener("click", open);
    host.addEventListener("click", open);
    return true;
  }

  function openFullScreen(svg, size) {
    var overlay = document.createElement("div");
    overlay.className = "hp-zoom";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Diagram");

    var stage = document.createElement("div");
    stage.className = "hp-zoom__stage";
    var copy = svg.cloneNode(true);
    var fit = Math.min((window.innerWidth - 48) / size.w, (window.innerHeight - 48) / size.h);
    var scale = Math.max(MIN_SCALE, Math.min(MAX_ZOOM, fit));
    copy.style.width = Math.round(size.w * scale) + "px";
    copy.style.minWidth = copy.style.maxWidth = "none";
    copy.style.height = "auto";
    stage.appendChild(copy);

    var close = document.createElement("button");
    close.type = "button";
    close.className = "hp-zoom__close";
    close.setAttribute("aria-label", "Close");
    close.textContent = "×";

    overlay.appendChild(stage);
    overlay.appendChild(close);
    document.body.appendChild(overlay);
    document.documentElement.classList.add("hp-zoom-open");
    close.focus();

    function shut() {
      overlay.remove();
      document.documentElement.classList.remove("hp-zoom-open");
      document.removeEventListener("keydown", onKey);
    }
    function onKey(e) { if (e.key === "Escape") shut(); }
    document.addEventListener("keydown", onKey);
    overlay.addEventListener("click", function (e) {
      // Close on a click outside the diagram or on the button; dragging a scrollbar is not a click.
      if (e.target === overlay || e.target === stage || e.target === close) shut();
    });
  }

  // Material renders diagrams asynchronously, replacing each <pre> with a new <div class="mermaid">
  // (and again after every instant navigation): pick them up as they appear.
  var queued = false;
  function scan() {
    queued = false;
    document.querySelectorAll(".md-typeset div.mermaid:not([data-hp-diagram])").forEach(prepare);
  }
  new MutationObserver(function () {
    if (!queued) { queued = true; requestAnimationFrame(scan); }
  }).observe(document.body, { childList: true, subtree: true });
  scan();
})();
