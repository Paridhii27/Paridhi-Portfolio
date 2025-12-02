document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, observerOptions);

  const containers = document.querySelectorAll(".container");
  containers.forEach((container) => {
    observer.observe(container);
  });

  // Gallery Animation Function
  function setupGalleryAnimations() {
    const galleryObserverOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -30px 0px",
    };

    const galleryObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay =
            Array.from(entry.target.parentNode.children).indexOf(entry.target) *
            100;
          setTimeout(() => {
            entry.target.classList.add("gallery-animate");
          }, delay);
        }
      });
    }, galleryObserverOptions);

    const galleryItems = document.querySelectorAll(".grid-item");
    galleryItems.forEach((item) => {
      item.classList.remove("gallery-animate");
      galleryObserver.observe(item);
    });

    return galleryObserver;
  }

  // Store reference to the gallery observer for cleanup
  let currentGalleryObserver = null;

  // Override/enhance the existing openModal function for gallery
  const originalOpenModal = window.openModal;
  window.openModal = function (modalType) {
    // Call the original function first
    if (originalOpenModal) {
      originalOpenModal(modalType);
    }

    // If it's the gallery modal, set up animations
    if (modalType === "gallery") {
      setTimeout(() => {
        currentGalleryObserver = setupGalleryAnimations();
      }, 100); // Small delay to ensure modal is fully opened
    }
  };

  // Override/enhance the existing closeModal function for gallery cleanup
  const originalCloseModal = window.closeModal;
  window.closeModal = function (modalType) {
    // Clean up gallery animations if closing gallery
    if (modalType === "gallery" || !modalType) {
      if (currentGalleryObserver) {
        currentGalleryObserver.disconnect();
        currentGalleryObserver = null;
      }

      // Reset all gallery animations
      const galleryItems = document.querySelectorAll(".grid-item");
      galleryItems.forEach((item) => {
        item.classList.remove("gallery-animate");
      });
    }

    // Call the original function
    if (originalCloseModal) {
      originalCloseModal(modalType);
    }
  };

  // Enhanced image loading with fade-in effect
  document.querySelectorAll(".grid-item img").forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1";
    });

    img.style.opacity = "0";
    img.style.transition = "opacity 0.5s ease";
  });

  // Back to top button functionality
  const backToTopButton = document.getElementById("back-to-top");
  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add("visible");
      } else {
        backToTopButton.classList.remove("visible");
      }
    });

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Immediate animation for containers already in view on page load
  window.addEventListener("load", () => {
    containers.forEach((container) => {
      const rect = container.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        container.classList.add("animate");
      }
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});
