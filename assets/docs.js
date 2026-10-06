// Docs sidebar: moves the marker to the section being read or clicked. No dependencies.
// Without JavaScript the marker stays on the page's own link (see style.css).
(function () {
  "use strict";

  var nav = document.querySelector(".docs-nav");
  if (!nav) return;

  function samePage(a) {
    function norm(p) {
      return p.replace(/index\.html$/, "").replace(/\/$/, "");
    }
    return norm(a.pathname) === norm(location.pathname);
  }

  // The links that point into this page: one without a hash (the page itself) and one per section.
  var pageLink = null;
  var sections = [];
  Array.prototype.forEach.call(nav.querySelectorAll("a"), function (a) {
    if (!samePage(a)) return;
    if (!a.hash) {
      pageLink = a;
      return;
    }
    var target = document.getElementById(decodeURIComponent(a.hash.slice(1)));
    if (target) sections.push({ link: a, target: target });
  });
  if (!sections.length) return;

  nav.classList.add("spy");

  var current = null;
  function setActive(link) {
    if (link === current) return;
    if (current) current.classList.remove("active");
    current = link;
    if (current) current.classList.add("active");
  }

  var OFFSET = 120; // a section counts as reached when its heading is this far from the top
  var lockUntil = 0; // after a click, keep the clicked link until the smooth scroll settles

  function update() {
    if (Date.now() < lockUntil) return;
    var found = pageLink;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].target.getBoundingClientRect().top <= OFFSET) found = sections[i].link;
    }
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (atBottom) found = sections[sections.length - 1].link;
    setActive(found);
  }

  var ticking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        update();
      });
    },
    { passive: true }
  );

  nav.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("a") : null;
    if (!a || !samePage(a)) return;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].link === a) {
        setActive(a);
        lockUntil = Date.now() + 900;
        setTimeout(update, 950);
        return;
      }
    }
  });

  window.addEventListener("hashchange", function () {
    lockUntil = 0;
    update();
  });
  window.addEventListener("resize", update);
  update();
})();
