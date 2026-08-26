// AlphaRide — shared site behavior

document.addEventListener("DOMContentLoaded", function () {
  /* Mobile nav toggle */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Locations filter */
  var filterBar = document.querySelector(".filter-bar");
  if (filterBar) {
    var filterButtons = filterBar.querySelectorAll(".filter-btn");
    var locationCards = document.querySelectorAll(".location-card");

    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterButtons.forEach(function (b) {
          b.classList.remove("active");
        });
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

  /* Scroll reveal — subtle fade/slide-in for section content as it enters view */
  var revealTargets = document.querySelectorAll(
    ".card, .location-card, .section-header, .value-item, .roadmap-step, .vehicle-scene, .stat-panel, .about-split > *, .stats-grid .stat"
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
