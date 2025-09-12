const modal = document.getElementById("modal");
const resumeContent = document.getElementById("resume-content");
const galleryContent = document.getElementById("gallery-content");

function openModal(type) {
  modal.style.display = "block";

  // Trigger modal animation
  setTimeout(() => {
    modal.classList.add("show");
    modal.querySelector(".modal-content").classList.add("show");
  }, 10);

  if (type === "resume") {
    resumeContent.style.display = "block";
    galleryContent.style.display = "none";
  } else {
    resumeContent.style.display = "none";
    galleryContent.style.display = "grid";
  }
}

function closeModal() {
  // Remove animation classes
  modal.classList.remove("show");
  modal.querySelector(".modal-content").classList.remove("show");

  // Hide modal after animation completes
  setTimeout(() => {
    modal.style.display = "none";
    resumeContent.style.display = "none";
    galleryContent.style.display = "none";
  }, 300);
}

// Close modal when clicking outside
window.onclick = function (event) {
  if (event.target === modal) {
    closeModal();
  }
};

// Close modal with Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});

// Download resume as image

function downloadPDF() {
  const downloadLink = document.getElementById("downloadLink");
  downloadLink.click();
}

const backToTopButton = document.getElementById("back-to-top");

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

backToTopButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Featured Projects Interactive Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Make sure featured projects are visible immediately
  const featuredProjects = document.querySelectorAll(".featured-project");
  featuredProjects.forEach((project, index) => {
    // Add staggered delay for entrance animation
    project.style.transitionDelay = `${index * 0.2}s`;
    project.classList.add("animate");
  });

  // Intersection Observer for scroll animations (optional enhancement)
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

  // Observe featured projects for animation
  featuredProjects.forEach((project) => {
    observer.observe(project);
  });

  // Smooth scrolling for internal links
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

  // Add hover effects to project cards
  featuredProjects.forEach((project) => {
    project.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
    });

    project.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Parallax effect for hero section
  const heroImage = document.querySelector(".homepage-img");
  if (heroImage) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;
      heroImage.style.transform = `translateY(${parallax}px)`;
    });
  }

  // Add typing effect to section titles
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

  // Add floating animation to CTA button
  const ctaButton = document.querySelector(".cta-button");
  if (ctaButton) {
    setInterval(() => {
      ctaButton.style.transform = "translateY(-3px)";
      setTimeout(() => {
        ctaButton.style.transform = "translateY(0)";
      }, 2000);
    }, 4000);
  }

  // Add ripple effect to buttons
  const buttons = document.querySelectorAll(
    ".project-link, .cta-button, .about-link"
  );
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// Add CSS for ripple effect
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
