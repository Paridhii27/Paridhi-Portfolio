// Fullscreen functionality for inline images/videos and gallery images/videos
document.addEventListener("DOMContentLoaded", function () {
  // Create fullscreen overlay if it doesn't exist
  let overlay = document.querySelector(".inline-fullscreen");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "inline-fullscreen";
    overlay.innerHTML = `
      <div class="inline-fullscreen-content">
        <button class="inline-fullscreen-close" aria-label="Close fullscreen">&times;</button>
        <button class="inline-fullscreen-prev" aria-label="Previous image">‹</button>
        <button class="inline-fullscreen-next" aria-label="Next image">›</button>
        <img class="inline-fullscreen-img" src="" alt="" />
        <video class="inline-fullscreen-video" controls></video>
        <div class="inline-fullscreen-caption"></div>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  const content = overlay.querySelector(".inline-fullscreen-content");
  const imgElement = overlay.querySelector(".inline-fullscreen-img");
  const videoElement = overlay.querySelector(".inline-fullscreen-video");
  const captionElement = overlay.querySelector(".inline-fullscreen-caption");
  const closeButton = overlay.querySelector(".inline-fullscreen-close");
  const prevButton = overlay.querySelector(".inline-fullscreen-prev");
  const nextButton = overlay.querySelector(".inline-fullscreen-next");

  // Track current gallery state
  let currentGalleryItems = [];
  let currentGalleryIndex = -1;
  let isGalleryMode = false;

  function showFullscreen(mediaElement, caption, galleryItems = null, index = -1) {
    // Hide both initially
    imgElement.style.display = "none";
    videoElement.style.display = "none";
    captionElement.textContent = "";

    // Set gallery mode if gallery items provided
    isGalleryMode = galleryItems !== null && galleryItems.length > 0;
    currentGalleryItems = galleryItems || [];
    currentGalleryIndex = index;

    // Show/hide navigation buttons for gallery
    if (isGalleryMode && currentGalleryItems.length > 1) {
      prevButton.style.display = "flex";
      nextButton.style.display = "flex";
      prevButton.disabled = currentGalleryIndex === 0;
      nextButton.disabled = currentGalleryIndex === currentGalleryItems.length - 1;
    } else {
      prevButton.style.display = "none";
      nextButton.style.display = "none";
    }

    if (mediaElement.tagName === "IMG") {
      imgElement.src = mediaElement.src;
      imgElement.alt = mediaElement.alt || "";
      imgElement.style.display = "block";
      videoElement.style.display = "none";
    } else if (mediaElement.tagName === "VIDEO") {
      // Clone video element to preserve all attributes
      const source = mediaElement.querySelector("source");
      videoElement.innerHTML = "";
      if (source) {
        const newSource = source.cloneNode(true);
        videoElement.appendChild(newSource);
      } else {
        videoElement.src = mediaElement.src;
      }
      videoElement.setAttribute("controls", "");
      videoElement.style.display = "block";
      imgElement.style.display = "none";
      // Try to play the video
      videoElement.load();
      videoElement.play().catch(() => {
        // Ignore autoplay errors
      });
    }

    // Set caption if available
    if (caption) {
      captionElement.textContent = caption;
      captionElement.style.display = "block";
    } else {
      captionElement.style.display = "none";
    }

    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeFullscreen() {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
    // Pause video if playing
    if (videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0;
    }
    // Reset gallery state
    isGalleryMode = false;
    currentGalleryItems = [];
    currentGalleryIndex = -1;
  }

  function showNextGalleryItem() {
    if (!isGalleryMode || currentGalleryIndex < 0 || currentGalleryIndex >= currentGalleryItems.length - 1) return;
    
    const nextIndex = currentGalleryIndex + 1;
    const nextFigure = currentGalleryItems[nextIndex];
    if (!nextFigure) return;

    const media = nextFigure.querySelector("img, video");
    if (!media) return;

    const captionEl = nextFigure.querySelector("figcaption");
    const caption = captionEl ? captionEl.textContent.trim() : "";

    showFullscreen(media, caption, currentGalleryItems, nextIndex);
  }

  function showPrevGalleryItem() {
    if (!isGalleryMode || currentGalleryIndex <= 0) return;
    
    const prevIndex = currentGalleryIndex - 1;
    const prevFigure = currentGalleryItems[prevIndex];
    if (!prevFigure) return;

    const media = prevFigure.querySelector("img, video");
    if (!media) return;

    const captionEl = prevFigure.querySelector("figcaption");
    const caption = captionEl ? captionEl.textContent.trim() : "";

    showFullscreen(media, caption, currentGalleryItems, prevIndex);
  }

  // Add click handlers to all inline images and videos
  const inlineImages = document.querySelectorAll(".documentation .inline-img, .documentation .inline-video");
  
  inlineImages.forEach((media) => {
    media.style.cursor = "pointer";
    
    media.addEventListener("click", (e) => {
      // Don't open if clicking on video controls
      if (media.tagName === "VIDEO" && media.controls) {
        const rect = media.getBoundingClientRect();
        const clickY = e.clientY - rect.top;
        // If clicking in bottom 20% (where controls usually are), don't open fullscreen
        if (clickY > rect.height * 0.8) {
          return;
        }
      }
      
      // Get caption if available
      const container = media.closest(".inline-img-container, .inline-video-container");
      let caption = "";
      if (container) {
        const captionEl = container.querySelector(".inline-img-caption, .inline-video-caption");
        if (captionEl) {
          caption = captionEl.textContent.trim();
        }
      }
      
      showFullscreen(media, caption);
    });
  });

  // Add click handlers to gallery images and videos
  const gallery = document.getElementById("mz-gallery");
  if (gallery) {
    const galleryFigures = gallery.querySelectorAll("figure");
    const galleryItemsArray = Array.from(galleryFigures);

    galleryFigures.forEach((figure, index) => {
      const media = figure.querySelector("img, video");
      if (!media) return;

      media.style.cursor = "pointer";
      figure.style.cursor = "pointer";

      const handleGalleryClick = (e) => {
        // Don't open if clicking on video controls
        if (media.tagName === "VIDEO" && media.controls) {
          const rect = media.getBoundingClientRect();
          const clickY = (e.clientY || e.touches?.[0]?.clientY || 0) - rect.top;
          // If clicking in bottom 20% (where controls usually are), don't open fullscreen
          if (clickY > rect.height * 0.8) {
            return;
          }
        }

        const captionEl = figure.querySelector("figcaption");
        const caption = captionEl ? captionEl.textContent.trim() : "";

        showFullscreen(media, caption, galleryItemsArray, index);
      };

      // Handle both click and touch events
      figure.addEventListener("click", handleGalleryClick);
      media.addEventListener("click", (e) => {
        e.stopPropagation();
        handleGalleryClick(e);
      });

      // Enhanced touch handling to prevent accidental opens during scrolling
      let touchStartTime = 0;
      let touchStartPos = { x: 0, y: 0 };

      figure.addEventListener(
        "touchstart",
        (e) => {
          touchStartTime = Date.now();
          touchStartPos.x = e.touches[0].clientX;
          touchStartPos.y = e.touches[0].clientY;
        },
        { passive: true }
      );

      figure.addEventListener("touchend", (e) => {
        const touchEndTime = Date.now();
        const touchDuration = touchEndTime - touchStartTime;
        const touchEndPos = {
          x: e.changedTouches[0].clientX,
          y: e.changedTouches[0].clientY,
        };
        const deltaX = Math.abs(touchEndPos.x - touchStartPos.x);
        const deltaY = Math.abs(touchEndPos.y - touchStartPos.y);

        // Only open if it's a tap (short duration, small movement) and not a scroll
        if (touchDuration < 300 && deltaX < 10 && deltaY < 10) {
          e.preventDefault();
          handleGalleryClick(e);
        }
      });
    });
  }

  // Navigation button handlers
  if (prevButton) {
    prevButton.addEventListener("click", (e) => {
      e.stopPropagation();
      showPrevGalleryItem();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", (e) => {
      e.stopPropagation();
      showNextGalleryItem();
    });
  }

  // Close on button click
  if (closeButton) {
    closeButton.addEventListener("click", closeFullscreen);
  }

  // Close on overlay click (outside content)
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay || e.target === content) {
      closeFullscreen();
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (overlay.classList.contains("active")) {
      if (e.key === "Escape") {
        closeFullscreen();
      } else if (e.key === "ArrowLeft" && isGalleryMode) {
        e.preventDefault();
        showPrevGalleryItem();
      } else if (e.key === "ArrowRight" && isGalleryMode) {
        e.preventDefault();
        showNextGalleryItem();
      }
    }
  });
});
