// Home page: sections fade in as they scroll into view, and a light follows the pointer on the cards.
// Styles in stylesheets/hivepal.css; nothing happens on other pages or with reduced motion.
(function () {
  "use strict";

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setup() {
    var hero = document.querySelector(".hp-hero");
    if (!hero || reduced || !("IntersectionObserver" in window)) return;
    var article = hero.parentElement;

    var targets = [];
    Array.prototype.forEach.call(article.children, function (el) {
      if (el === hero || el.matches(".mermaid, .hp-diagram, .hp-grid")) return;
      targets.push(el);
    });
    article.querySelectorAll(".hp-grid > .hp-card").forEach(function (card, i) {
      card.style.setProperty("--hp-delay", (i % 3) * 0.08 + "s");
      targets.push(card);
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("hp-in"); observer.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    var fold = window.innerHeight;
    targets.forEach(function (el) {
      // Only hide what is below the fold, so nothing visible flickers on load.
      if (el.getBoundingClientRect().top < fold) return;
      el.classList.add("hp-reveal");
      observer.observe(el);
    });

    article.querySelectorAll(".hp-card").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--hp-x", e.clientX - r.left + "px");
        card.style.setProperty("--hp-y", e.clientY - r.top + "px");
      });
    });
  }

  if (window.document$ && window.document$.subscribe) window.document$.subscribe(setup);
  else document.addEventListener("DOMContentLoaded", setup);
})();
