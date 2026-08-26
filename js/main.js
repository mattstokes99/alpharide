// AlphaRide — shared site behavior ("The Route" layout)

document.addEventListener("DOMContentLoaded", function () {
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Locations filter (works whether cards sit in a grid or filmstrip) */
  var filterBar = document.querySelector(".filter-bar");
  if (filterBar) {
    var filterButtons = filterBar.querySelectorAll(".filter-btn");
    var locationCards = document.querySelectorAll(".location-card");

    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterButtons.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");

        var filter = btn.getAttribute("data-filter");

        locationCards.forEach(function (card) {
          if (filter === "all" || card.getAttribute("data-status") === filter) {
            card.classList.remove("hidden");
          } else {
            card.classList.add("hidden");
          }
        });
      });
    });
  }

  /* Filmstrip prev/next controls */
  var filmstrip = document.querySelector(".location-filmstrip");
  var prevBtn = document.querySelector(".filmstrip-prev");
  var nextBtn = document.querySelector(".filmstrip-next");

  if (filmstrip && prevBtn && nextBtn) {
    var scrollStep = function () {
      var card = filmstrip.querySelector(".location-card");
      return card ? card.getBoundingClientRect().width + 20 : 320;
    };

    prevBtn.addEventListener("click", function () {
      filmstrip.scrollBy({ left: -scrollStep(), behavior: "smooth" });
    });

    nextBtn.addEventListener("click", function () {
      filmstrip.scrollBy({ left: scrollStep(), behavior: "smooth" });
    });
  }

  /* Scroll reveal — fade/slide-in for section content as it enters view.
     Route-timeline stops use the same "is-visible" class to trigger their
     connecting line segment drawing in (handled purely in CSS). */
  var revealTargets = document.querySelectorAll(
    ".card, .location-card, .section-header, .value-item, .route-stop, .editorial-point, .about-photo, .stat-panel, .about-split > *, .stats-grid .stat"
  );

  if ("IntersectionObserver" in window && revealTargets.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach(function (el, i) {
      el.classList.add("reveal-init");
      el.style.transitionDelay = (i % 4) * 70 + "ms";
      observer.observe(el);
    });
  }

  /* Scroll progress — fills the vertical indicator built into the nav rail */
  var progressFill = document.querySelector(".rail-progress-fill");
  var heroEl = document.querySelector(".hero-split");
  var heroCopy = document.querySelector(".hero-copy-col");
  var ticking = false;

  function onScroll() {
    var scrollY = window.scrollY;

    if (progressFill) {
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      progressFill.style.height = pct + "%";
    }

    if (!prefersReducedMotion) {
      document.body.style.setProperty("--parallax", scrollY);

      if (heroEl && heroCopy) {
        var heroHeight = heroEl.offsetHeight || 1;
        var progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);
        heroCopy.style.transform = "translateY(" + progress * 24 + "px)";
        heroCopy.style.opacity = String(1 - progress * 0.6);
      }
    }

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    },
    { passive: true }
  );

  onScroll();

  /* Waitlist form — client-side handling.
     Replace the form's "action" attribute with your Formspree (or other
     form backend) endpoint to receive submissions by email. Until then,
     this shows a confirmation message without actually sending the data. */
  var contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    var status = contactForm.querySelector(".form-status");

    contactForm.addEventListener("submit", function (e) {
      var actionUrl = contactForm.getAttribute("action") || "";
      var isConfigured = actionUrl.indexOf("YOUR_FORM_ID") === -1 && actionUrl !== "";

      if (!isConfigured) {
        e.preventDefault();
        if (status) {
          status.textContent =
            "Thanks — this form isn't connected to an email service yet. " +
            "Add a Formspree (or similar) endpoint in js/main.js / contact.html to start receiving submissions. " +
            "In the meantime, feel free to email us directly.";
          status.classList.add("show", "success");
        }
      }
      // If a real endpoint is configured, let the form submit normally.
    });
  }
});
