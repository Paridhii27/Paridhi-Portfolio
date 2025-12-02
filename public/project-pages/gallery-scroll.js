// Gallery scroll indicator for mobile and video autoplay handler
document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.getElementById("mz-gallery");
  const container = document.getElementById("mz-gallery-container");

  if (!gallery || !container) return;

  function updateScrollIndicators() {
    const scrollLeft = gallery.scrollLeft;
    const scrollWidth = gallery.scrollWidth;
    const clientWidth = gallery.clientWidth;
    const isAtStart = scrollLeft <= 5;
    const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 5;

    // Update classes for gradient visibility
    if (isAtStart) {
      container.classList.remove("scrolled");
    } else {
      container.classList.add("scrolled");
    }

    if (isAtEnd) {
      container.classList.add("at-end");
    } else {
      container.classList.remove("at-end");
    }
  }

  // Function to ensure videos autoplay and loop
  function setupVideoAutoplay() {
    const videos = gallery.querySelectorAll("video");

    videos.forEach((video) => {
      // Ensure all required attributes are set
      video.setAttribute("muted", "");
      video.setAttribute("loop", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("preload", "auto");

      // Try to play the video
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Video is playing
            console.log("Video autoplay started:", video.src);
          })
          .catch((error) => {
            // Autoplay was prevented - try again on user interaction
            console.log(
              "Video autoplay prevented, will retry on interaction:",
              error
            );

            // Retry on first user interaction
            const tryPlay = () => {
              video.play().catch(() => {
                // Still can't play, that's okay
              });
            };

            document.addEventListener("click", tryPlay, { once: true });
            document.addEventListener("touchstart", tryPlay, { once: true });
            document.addEventListener("scroll", tryPlay, { once: true });
          });
      }

      // Ensure video loops
      video.addEventListener("ended", () => {
        video.currentTime = 0;
        video.play().catch(() => {
          // Ignore errors
        });
      });

      // Handle visibility change - resume playing when visible
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Video is visible, try to play
              video.play().catch(() => {
                // Ignore errors
              });
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(video);
    });
  }

  // Update on scroll
  gallery.addEventListener("scroll", updateScrollIndicators);

  // Update on resize
  window.addEventListener("resize", updateScrollIndicators);

  // Initial update
  updateScrollIndicators();

  // Setup video autoplay
  setupVideoAutoplay();

  // Update after images load
  const images = gallery.querySelectorAll("img, video");
  let loadedCount = 0;
  images.forEach((img) => {
    if (img.complete || (img.tagName === "VIDEO" && img.readyState >= 2)) {
      loadedCount++;
    } else {
      img.addEventListener("load", () => {
        loadedCount++;
        if (loadedCount === images.length) {
          setTimeout(updateScrollIndicators, 100);
          setupVideoAutoplay(); // Retry video autoplay after all media loads
        }
      });

      // For videos, also listen to loadeddata
      if (img.tagName === "VIDEO") {
        img.addEventListener("loadeddata", () => {
          const playPromise = img.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Ignore errors
            });
          }
        });
      }
    }
  });

  if (loadedCount === images.length) {
    setTimeout(() => {
      updateScrollIndicators();
      setupVideoAutoplay();
    }, 100);
  }
});
