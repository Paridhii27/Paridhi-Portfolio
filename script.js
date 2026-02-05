// ============================================================================
// MODAL FUNCTIONALITY
// ============================================================================

const modal = document.getElementById("modal");
const buttonsContainer = document.querySelector(".buttons-container");
const modalOriginalParent = modal?.parentElement || null;
const resumeContent = document.getElementById("resume-content");
const galleryContent = document.getElementById("gallery-content");
let currentModalType = null;

function isMobileModal() {
  return window.matchMedia("(max-width: 768px)").matches;
}

function updateModalPlacement(isOpen, modalType) {
  if (!modal || !modalOriginalParent) {
    return;
  }

  if (isMobileModal()) {
    modal.classList.add("modal-inline");
    const targetButton = buttonsContainer?.querySelector(
      `[data-modal-type="${modalType}"]`,
    );
    if (targetButton && modal.previousElementSibling !== targetButton) {
      targetButton.insertAdjacentElement("afterend", modal);
    } else if (buttonsContainer && modal.parentElement !== buttonsContainer) {
      buttonsContainer.appendChild(modal);
    }
    if (isOpen) {
      modal.style.display = "block";
    }
  } else {
    modal.classList.remove("modal-inline");
    if (modal.parentElement !== modalOriginalParent) {
      modalOriginalParent.appendChild(modal);
    }
    if (isOpen) {
      modal.style.display = "flex";
    }
  }
}

/**
 * Opens a modal and displays either resume or gallery content
 * @param {string} type - "resume" to show resume, anything else shows gallery
 */
function openModal(type) {
  currentModalType = type;
  updateModalPlacement(true, currentModalType);

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
    galleryContent.style.display = "block";
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
    updateModalPlacement(false, currentModalType);
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

window.addEventListener("resize", () => {
  if (!modal) {
    return;
  }
  const isOpen = modal.style.display !== "none" && modal.style.display !== "";
  updateModalPlacement(isOpen, currentModalType);
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

  // --------------------------------------------------------------------------
  // Mobile Menu Body Scroll Lock
  // --------------------------------------------------------------------------

  const menuToggle = document.getElementById("menuToggle");
  const menuCheckbox = menuToggle?.querySelector("input[type='checkbox']");
  const menu = document.getElementById("menu");

  if (menuToggle && menuCheckbox && menu) {
    // Prevent body scroll when menu is open
    function handleMenuToggle() {
      if (menuCheckbox.checked) {
        // Menu is opening - lock body scroll
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
        document.body.style.top = `-${window.scrollY}px`;
      } else {
        // Menu is closing - unlock body scroll
        const scrollY = document.body.style.top;
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";
        document.body.style.top = "";
        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY || "0") * -1);
        }
      }
    }

    // Listen for checkbox changes
    menuCheckbox.addEventListener("change", handleMenuToggle);

    // Close menu when clicking on a menu link (mobile)
    const menuLinks = menu.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 900) {
          menuCheckbox.checked = false;
          handleMenuToggle();
        }
      });
    });

    // Close menu on window resize if switching to desktop
    let wasMobile = window.innerWidth <= 900;
    window.addEventListener("resize", () => {
      const isMobile = window.innerWidth <= 900;
      if (wasMobile && !isMobile && menuCheckbox.checked) {
        // Switched from mobile to desktop - close menu
        menuCheckbox.checked = false;
        handleMenuToggle();
      }
      wasMobile = isMobile;
    });
  }
});
