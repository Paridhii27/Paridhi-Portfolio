// ============================================================================
// MODAL FUNCTIONALITY
// ============================================================================

const modal = document.getElementById("modal");
const resumeContent = document.getElementById("resume-content");
const galleryContent = document.getElementById("gallery-content");

/**
 * Opens a modal and displays either resume or gallery content
 * @param {string} type - "resume" to show resume, anything else shows gallery
 */
function openModal(type) {
  modal.style.display = "block";

  // Trigger modal animation after a brief delay
  setTimeout(() => {
    modal.classList.add("show");
    modal.querySelector(".modal-content").classList.add("show");
  }, 10);

  // Show appropriate content based on type
  if (type === "resume") {
    resumeContent.style.display = "block";
    galleryContent.style.display = "none";
  } else {
    resumeContent.style.display = "none";
    galleryContent.style.display = "grid";
  }
}

/**
 * Closes the modal with animation
 */
function closeModal() {
  // Remove animation classes
  modal.classList.remove("show");
  modal.querySelector(".modal-content").classList.remove("show");

  // Hide modal after animation completes (300ms)
  setTimeout(() => {
    modal.style.display = "none";
    resumeContent.style.display = "none";
    galleryContent.style.display = "none";
  }, 300);
}

// Close modal when clicking outside the modal content
window.onclick = function (event) {
  if (event.target === modal) {
    closeModal();
  }
};

// Close modal when Escape key is pressed
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});

// ============================================================================
// RESUME DOWNLOAD
// ============================================================================

/**
 * Triggers the PDF download by clicking the hidden download link
 */
function downloadPDF() {
  const downloadLink = document.getElementById("downloadLink");
  downloadLink.click();
}

// ============================================================================
// BACK TO TOP BUTTON
// ============================================================================

const backToTopButton = document.getElementById("back-to-top");

// Show/hide back to top button based on scroll position
window.onscroll = function () {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
};

// Smooth scroll to top when button is clicked
backToTopButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ============================================================================
// INTERACTIVE FEATURES (Initialized on DOM Content Loaded)
// ============================================================================

document.addEventListener("DOMContentLoaded", function () {
  // --------------------------------------------------------------------------
  // Featured Projects Animations
  // --------------------------------------------------------------------------

  const featuredProjects = document.querySelectorAll(".featured-project");

  // Add staggered entrance animation to featured projects
  featuredProjects.forEach((project, index) => {
    project.style.transitionDelay = `${index * 0.2}s`;
    project.classList.add("animate");
  });

  // Intersection Observer for scroll-triggered animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, observerOptions);

  // Observe all featured projects for animation triggers
  featuredProjects.forEach((project) => {
    observer.observe(project);
  });

  // --------------------------------------------------------------------------
  // Smooth Scrolling for Anchor Links
  // --------------------------------------------------------------------------

  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // --------------------------------------------------------------------------
  // Project Card Hover Effects
  // --------------------------------------------------------------------------

  featuredProjects.forEach((project) => {
    project.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
    });

    project.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // --------------------------------------------------------------------------
  // Hero Section Parallax Effect
  // --------------------------------------------------------------------------

  const heroImage = document.querySelector(".homepage-img");
  if (heroImage) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;
      heroImage.style.transform = `translateY(${parallax}px)`;
    });
  }

  // --------------------------------------------------------------------------
  // Typing Effect for Section Titles
  // --------------------------------------------------------------------------

  const sectionTitle = document.querySelector(".section-title");
  if (sectionTitle) {
    const text = sectionTitle.textContent;
    sectionTitle.textContent = "";
    sectionTitle.style.borderRight = "2px solid #5fc2c0";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        sectionTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        // Remove cursor when typing is complete
        sectionTitle.style.borderRight = "none";
      }
    };

    // Start typing effect when section comes into view
    const titleObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(typeWriter, 500);
          titleObserver.unobserve(entry.target);
        }
      });
    });

    titleObserver.observe(sectionTitle);
  }

  // --------------------------------------------------------------------------
  // CTA Button Floating Animation
  // --------------------------------------------------------------------------

  const ctaButton = document.querySelector(".cta-button");
  if (ctaButton) {
    setInterval(() => {
      ctaButton.style.transform = "translateY(-3px)";
      setTimeout(() => {
        ctaButton.style.transform = "translateY(0)";
      }, 2000);
    }, 4000);
  }

  // --------------------------------------------------------------------------
  // Button Ripple Effect
  // --------------------------------------------------------------------------

  const buttons = document.querySelectorAll(
    ".project-link, .cta-button, .about-link"
  );
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Create ripple element
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      // Position and size the ripple
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      // Add ripple to button and remove after animation
      this.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// ============================================================================
// RIPPLE EFFECT STYLES (Injected Dynamically)
// ============================================================================

const style = document.createElement("style");
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
