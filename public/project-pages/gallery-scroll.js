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

      // Handle when video can play with improved mobile support
      const handleCanPlay = () => {
        // On mobile, only autoplay if video is in viewport and user has interacted
        const isInViewport = () => {
          const rect = video.getBoundingClientRect();
          return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <=
              (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <=
              (window.innerWidth || document.documentElement.clientWidth)
          );
        };

        const playVideo = () => {
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
                  if (isInViewport()) {
                    video.play().catch(() => {
                      // Still can't play, that's okay
                    });
                  }
                };

                document.addEventListener("click", tryPlay, { once: true });
                document.addEventListener("touchstart", tryPlay, {
                  once: true,
                  passive: true,
                });
                document.addEventListener("scroll", tryPlay, {
                  once: true,
                  passive: true,
                });
              });
          }
        };

        // On mobile, wait for user interaction or viewport visibility
        if (isMobile()) {
          // Use Intersection Observer for better mobile performance
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                  // Video is visible, try to play
                  playVideo();
                }
              });
            },
            { threshold: 0.5 }
          );
          observer.observe(video);
        } else {
          playVideo();
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

      // Handle visibility change - resume playing when visible (improved for mobile)
      const visibilityObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              // Video is visible, try to play
              if (!video.paused || video.readyState >= 2) {
                video.play().catch(() => {
                  // Ignore errors - autoplay may be blocked
                });
              }
            } else if (!entry.isIntersecting && !video.paused) {
              // Video is not visible, pause to save resources on mobile
              if (isMobile()) {
                video.pause();
              }
            }
          });
        },
        { threshold: 0.5 }
      );

      visibilityObserver.observe(video);

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

  // Update on scroll with throttling for performance
  let scrollTimeout;
  gallery.addEventListener(
    "scroll",
    () => {
      if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
      }
      scrollTimeout = requestAnimationFrame(updateScrollIndicators);
    },
    { passive: true }
  );

  // Update on resize with debouncing
  let resizeTimeout;
  window.addEventListener(
    "resize",
    () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateScrollIndicators();
      }, 150);
    },
    { passive: true }
  );

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
    return (
      window.innerWidth <= 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );
  }

  // Improved swipe navigation that doesn't interfere with normal scrolling
  function setupGallerySwipeNavigation() {
    if (!isMobile()) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let isScrolling = false;
    let scrollStartX = 0;
    let hasMoved = false;

    gallery.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
        scrollStartX = gallery.scrollLeft;
        isScrolling = false;
        hasMoved = false;
      },
      { passive: true }
    );

    gallery.addEventListener(
      "touchmove",
      (e) => {
        const deltaX = Math.abs(e.touches[0].clientX - touchStartX);
        const deltaY = Math.abs(e.touches[0].clientY - touchStartY);

        // Only mark as scrolling if there's significant horizontal movement
        if (deltaX > 5 || deltaY > 5) {
          hasMoved = true;
        }

        // Determine if user is scrolling horizontally (not vertically)
        if (deltaX > deltaY && deltaX > 15) {
          isScrolling = true;
        } else if (deltaY > deltaX && deltaY > 15) {
          // Vertical scrolling detected - don't interfere
          isScrolling = false;
        }
      },
      { passive: true }
    );

    gallery.addEventListener(
      "touchend",
      (e) => {
        // Only handle swipe if user actually moved and it was a quick gesture
        if (!hasMoved) return;

        const touchEndTime = Date.now();
        const touchDuration = touchEndTime - touchStartTime;
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const deltaX = touchStartX - touchEndX;
        const deltaY = Math.abs(touchStartY - touchEndY);
        const swipeThreshold = 80; // Increased threshold to avoid accidental swipes
        const maxDuration = 300; // Maximum duration for a swipe gesture

        // Only process quick horizontal swipes (not slow scrolling)
        if (
          Math.abs(deltaX) > swipeThreshold &&
          Math.abs(deltaX) > deltaY * 1.5 &&
          touchDuration < maxDuration &&
          isScrolling
        ) {
          // Prevent default to avoid double scrolling
          e.preventDefault();

          const figures = gallery.querySelectorAll("figure");
          if (figures.length === 0) return;

          // Find the figure closest to center
          const containerRect = gallery.getBoundingClientRect();
          const containerCenter = containerRect.left + containerRect.width / 2;
          
          let closestIndex = 0;
          let closestDistance = Infinity;

          figures.forEach((figure, index) => {
            const figureRect = figure.getBoundingClientRect();
            const figureCenter = figureRect.left + figureRect.width / 2;
            const distance = Math.abs(figureCenter - containerCenter);
            
            if (distance < closestDistance) {
              closestDistance = distance;
              closestIndex = index;
            }
          });

          // Navigate to next or previous based on swipe direction
          if (deltaX > 0 && closestIndex < figures.length - 1) {
            // Swipe left - next
            const nextFigure = figures[closestIndex + 1];
            if (nextFigure) {
              nextFigure.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
              });
            }
          } else if (deltaX < 0 && closestIndex > 0) {
            // Swipe right - previous
            const prevFigure = figures[closestIndex - 1];
            if (prevFigure) {
              prevFigure.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
              });
            }
          }
        }
      },
      { passive: false } // Changed to false to allow preventDefault for intentional swipes
    );
  }

  // Setup gallery swipe navigation
  setupGallerySwipeNavigation();

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

    // Enhanced click/touch on figure to open fullscreen
    figures.forEach((figure, index) => {
      let touchStartTime = 0;
      let touchStartPos = { x: 0, y: 0 };

      // Handle both click and touch events
      const handleInteraction = (e) => {
        // Don't open if clicking on video controls
        if (e.target.tagName === "VIDEO" && e.target.controls) {
          const rect = e.target.getBoundingClientRect();
          const clickY = (e.clientY || e.touches?.[0]?.clientY || 0) - rect.top;
          // If clicking in bottom 20% (where controls usually are), don't open fullscreen
          if (clickY > rect.height * 0.8) {
            return;
          }
        }
        showFullscreen(index);
      };

      figure.addEventListener("click", handleInteraction);

      // Enhanced touch handling to prevent accidental opens during scrolling
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
          handleInteraction(e);
        }
      });
    });

    // Click outside to close
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeFullscreen();
      }
    });

    // Enhanced swipe/scroll through images in fullscreen
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    let isSwiping = false;

    overlay.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
        isSwiping = false;
      },
      { passive: true }
    );

    overlay.addEventListener(
      "touchmove",
      (e) => {
        if (!isSwiping) {
          const deltaX = Math.abs(e.changedTouches[0].screenX - touchStartX);
          const deltaY = Math.abs(e.changedTouches[0].screenY - touchStartY);
          // Only consider it a swipe if horizontal movement is greater than vertical
          if (deltaX > deltaY && deltaX > 10) {
            isSwiping = true;
          }
        }
      },
      { passive: true }
    );

    overlay.addEventListener(
      "touchend",
      (e) => {
        if (isSwiping) {
          touchEndX = e.changedTouches[0].screenX;
          touchEndY = e.changedTouches[0].screenY;
          handleSwipe();
        }
        isSwiping = false;
      },
      { passive: true }
    );

    function handleSwipe() {
      const swipeThreshold = 50;
      const diffX = touchStartX - touchEndX;
      const diffY = Math.abs(touchStartY - touchEndY);

      // Only process if horizontal swipe is dominant
      if (Math.abs(diffX) > swipeThreshold && Math.abs(diffX) > diffY) {
        if (diffX > 0) {
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
