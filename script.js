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

// Back to top button functionality (only if button exists)
const backToTopButton = document.getElementById("back-to-top");
if (backToTopButton) {
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
}

// ============================================================================
// INTERACTIVE FEATURES (Initialized on DOM Content Loaded)
// ============================================================================

document.addEventListener("DOMContentLoaded", function () {
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
});
