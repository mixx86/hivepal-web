// Keeps the active section tab in the header right after instant navigation.
//
// The tabs live in the header (overrides/partials/header.html), which Material does not re-render
// when it swaps pages, so their "active" class would stay on the first page visited. After each page
// load, mark the tab whose section is active in the page's own navigation (the sidebar), or, on pages
// without one, the tab that links to the current page.
(function () {
  "use strict";

  function sameUrl(a, b) {
    var strip = function (u) { return u.replace(/[?#].*$/, "").replace(/index\.html$/, "").replace(/\/$/, ""); };
    return strip(a) === strip(b);
  }

  function update() {
    var tabs = document.querySelectorAll(".hp-tabs .md-tabs__item");
    if (!tabs.length) return;

    var sections = document.querySelectorAll(".md-nav--primary > .md-nav__list > .md-nav__item");
    var active = -1;
    sections.forEach(function (li, i) {
      if (active < 0 && li.classList.contains("md-nav__item--active")) active = i;
    });
    if (active < 0 || sections.length !== tabs.length) {
      active = -1;
      tabs.forEach(function (tab, i) {
        var link = tab.querySelector("a");
        if (active < 0 && link && sameUrl(link.href, location.href)) active = i;
      });
    }
    if (active < 0) return; // unknown page: leave the tabs as they are

    tabs.forEach(function (tab, i) {
      tab.classList.toggle("md-tabs__item--active", i === active);
    });
  }

  if (window.document$ && window.document$.subscribe) window.document$.subscribe(update);
  else document.addEventListener("DOMContentLoaded", update);
})();
