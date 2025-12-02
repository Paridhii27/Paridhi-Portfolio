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
      if (!video.hasAttribute("crossorigin")) {
        video.setAttribute("crossorigin", "anonymous");
      }

      // Handle video loading errors
      video.addEventListener("error", (e) => {
        const source = video.querySelector("source");
        const videoSrc = source?.src || video.src;
        console.warn("Video loading error:", videoSrc, video.error);

        // If there's a network error, try reloading
        if (
          video.error &&
          video.error.code === video.error.MEDIA_ERR_SRC_NOT_SUPPORTED
        ) {
          console.warn(
            "Video format not supported, trying to reload:",
            videoSrc
          );
          // Try reloading the video
          if (source) {
            const originalSrc = source.src;
            source.src = "";
            setTimeout(() => {
              source.src = originalSrc;
              video.load();
            }, 100);
          } else {
            video.load();
          }
        } else if (
          video.error &&
          video.error.code === video.error.MEDIA_ERR_NETWORK
        ) {
          console.warn("Network error, retrying:", videoSrc);
          setTimeout(() => {
            video.load();
          }, 1000);
        } else {
          // Try reloading once
          video.load();
        }
      });

      // Handle when video can play
      const handleCanPlay = () => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Video is playing
              console.log(
                "Video autoplay started:",
                video.querySelector("source")?.src || video.src
              );
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
      };

      // Try to play when video can play
      const canPlayHandler = () => {
        handleCanPlay();
      };
      video.addEventListener("canplay", canPlayHandler, { once: true });
      video.addEventListener("canplaythrough", canPlayHandler, { once: true });
      video.addEventListener("loadeddata", handleCanPlay, { once: true });
      video.addEventListener(
        "loadedmetadata",
        () => {
          // Video metadata loaded, try to play
          setTimeout(handleCanPlay, 100);
        },
        { once: true }
      );

      // Also try immediately if video is already loaded
      if (video.readyState >= 2) {
        setTimeout(handleCanPlay, 100);
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

      // Force load the video and ensure source is set
      const source = video.querySelector("source");
      if (source && source.src) {
        // Log the source for debugging
        console.log("Loading video:", source.src);

        // Ensure the source src is absolute or correct relative path
        if (!source.src.startsWith("http") && !source.src.startsWith("/")) {
          // It's a relative path, which should be fine
          // Make sure it's properly formatted
          if (source.src.startsWith("../")) {
            // Relative path is correct
          }
        }

        // Load the video
        video.load();

        // If video doesn't load after 2 seconds, try reloading
        const loadTimeout = setTimeout(() => {
          if (
            video.readyState === 0 ||
            video.networkState === video.NETWORK_NO_SOURCE ||
            video.networkState === video.NETWORK_EMPTY
          ) {
            console.warn("Video not loading, attempting reload:", source.src);
            const currentSrc = source.src;
            source.src = "";
            setTimeout(() => {
              source.src = currentSrc;
              video.load();

              // Try one more time after another delay if still not loading
              setTimeout(() => {
                if (
                  video.readyState === 0 ||
                  video.networkState === video.NETWORK_NO_SOURCE
                ) {
                  console.warn(
                    "Video still not loading, trying direct src:",
                    currentSrc
                  );
                  // Try setting src directly on video element as fallback
                  video.src = currentSrc;
                  video.load();
                }
              }, 1000);
            }, 100);
          }
        }, 2000);

        // Clear timeout if video loads successfully
        video.addEventListener(
          "loadedmetadata",
          () => {
            clearTimeout(loadTimeout);
          },
          { once: true }
        );
      } else {
        console.warn("Video has no source element or src attribute");
      }
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

      // For videos, also listen to loadeddata and error events
      if (img.tagName === "VIDEO") {
        const video = img;

        // Ensure video has required attributes
        video.setAttribute("muted", "");
        video.setAttribute("playsinline", "");
        if (!video.hasAttribute("crossorigin")) {
          video.setAttribute("crossorigin", "anonymous");
        }

        video.addEventListener("loadeddata", () => {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Ignore errors
            });
          }
        });

        video.addEventListener("error", (e) => {
          const source = video.querySelector("source");
          const videoSrc = source?.src || video.src;
          console.warn("Video failed to load:", videoSrc, video.error);

          // Try to reload after a delay with source reset
          setTimeout(() => {
            if (source && source.src) {
              const currentSrc = source.src;
              source.src = "";
              setTimeout(() => {
                source.src = currentSrc;
                video.load();
              }, 200);
            } else {
              video.load();
            }
          }, 1000);
        });

        // Also listen for stalled/abort events
        video.addEventListener("stalled", () => {
          console.warn("Video stalled, attempting reload");
          video.load();
        });

        // Force load the video
        video.load();
      }
    }
  });

  if (loadedCount === images.length) {
    setTimeout(() => {
      updateScrollIndicators();
      setupVideoAutoplay();
    }, 100);
  }

  // Mobile fullscreen functionality
  function isMobile() {
    return window.innerWidth <= 768;
  }

  let fullscreenSetup = false;

  function setupFullscreen() {
    if (!isMobile() || fullscreenSetup) return;
    fullscreenSetup = true;

    // Check if overlay already exists
    let overlay = document.querySelector(".gallery-fullscreen");
    if (!overlay) {
      // Create fullscreen overlay
      overlay = document.createElement("div");
      overlay.className = "gallery-fullscreen";
      overlay.innerHTML = '<div class="gallery-fullscreen-content"></div>';
      document.body.appendChild(overlay);
    }

    const content = overlay.querySelector(".gallery-fullscreen-content");
    const figures = gallery.querySelectorAll("figure");
    let currentIndex = 0;

    function showFullscreen(index) {
      const figure = figures[index];
      if (!figure) return;

      const media = figure.querySelector("img, video");
      if (!media) return;

      currentIndex = index;

      // Clone the media element
      const clone = media.cloneNode(true);
      if (media.tagName === "VIDEO") {
        clone.setAttribute("autoplay", "");
        clone.setAttribute("loop", "");
        clone.setAttribute("controls", "");
      }

      content.innerHTML = "";
      content.appendChild(clone);
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeFullscreen() {
      overlay.classList.remove("active");
      document.body.style.overflow = "";
      content.innerHTML = "";
    }

    // Click on figure to open fullscreen
    figures.forEach((figure, index) => {
      figure.addEventListener("click", (e) => {
        // Don't open if clicking on video controls
        if (e.target.tagName === "VIDEO" && e.target.controls) {
          const rect = e.target.getBoundingClientRect();
          const clickY = e.clientY - rect.top;
          // If clicking in bottom 20% (where controls usually are), don't open fullscreen
          if (clickY > rect.height * 0.8) {
            return;
          }
        }
        showFullscreen(index);
      });
    });

    // Click outside to close
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeFullscreen();
      }
    });

    // Swipe/scroll through images in fullscreen
    let touchStartX = 0;
    let touchEndX = 0;

    overlay.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    overlay.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - next image
          if (currentIndex < figures.length - 1) {
            showFullscreen(currentIndex + 1);
          }
        } else {
          // Swipe right - previous image
          if (currentIndex > 0) {
            showFullscreen(currentIndex - 1);
          }
        }
      }
    }

    // Close on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("active")) {
        closeFullscreen();
      }
    });
  }

  // Setup fullscreen on mobile
  setupFullscreen();

  // Re-setup on resize if switching between mobile/desktop
  let isMobileState = isMobile();
  window.addEventListener("resize", () => {
    const nowMobile = isMobile();
    if (nowMobile !== isMobileState) {
      isMobileState = nowMobile;
      // Remove existing overlay if switching to desktop
      const existing = document.querySelector(".gallery-fullscreen");
      if (existing && !nowMobile) {
        existing.remove();
        fullscreenSetup = false;
      } else if (!existing && nowMobile) {
        fullscreenSetup = false;
        setupFullscreen();
      }
    }
  });
});
