// Project data - content managed via JavaScript
const projects = {
  "machine-stranger": {
    image: "./public/assets/images/thumbnails/machine-stranger.jpg",
    title: "This Machine is a Stranger",
    description:
      '"This Machine is a Stranger" is a project that emerged from a curiosity to explore how one can navigate life at the intersection of human intuition and the quiet, calculated logic of autonomous machines, questioning how much a person implicitly trusts or mistrusts a machine.',
    url: "./public/project-pages/this-machine-is-a-stranger.html",
  },
  "fleeting-states": {
    image: "./public/assets/images/thumbnails/fleeting-states-two.png",
    video: "./public/assets/video/fleetingstates.mp4",
    title: "Fleeting States + Measured Values",
    description:
      "This project depicts the two sides of quantum computing. The separation of the worlds is analytical. On the one hand we have the values we can measure, probabilistic results in units. It is how we are trained/used to interact with phenomena. Superpositioning and entanglement on the other hand are neither accessible to our senses nor to measurement. They are states in motion that are truly random.",
    url: "./public/project-pages/fleeting-states.html",
  },
  "move-a-bit": {
    image: "./public/assets/images/thumbnails/move-a-bit.jpg",
    video: "./public/assets/video/moveabit.mp4",
    title: "Move A Bit",
    description:
      "Move a Bit is a live motion capture project bringing quantum computing to life through an interactive display that visually showcases entanglement.",
    url: "./public/project-pages/move-a-bit.html",
  },
  "sights-and-insights": {
    image: "./public/assets/images/thumbnails/sights-and-insights.png",
    title: "Sights and Insights",
    description:
      "Sights and Insights is a web based application that transforms ordinary walks into ones filled with curious interventions. It is a voice based AI application encouraging users to engage with the spaces they finds themselves in.",
    url: "./public/project-pages/sights-and-insights.html",
  },
};

// Track currently featured project
let currentFeaturedProject = "move-a-bit";

// Get all project IDs
const allProjectIds = Object.keys(projects);

// Function to get thumbnail projects (all except the featured one)
function getThumbnailProjects(featuredId) {
  return allProjectIds.filter((id) => id !== featuredId);
}

// Function to update the main featured project display
function updateFeaturedProject(projectId) {
  const project = projects[projectId];
  if (!project) return;

  // Update current featured project
  currentFeaturedProject = projectId;

  // Get DOM elements
  const mainLink = document.getElementById("main-featured-link");
  const mainTitleLink = document.getElementById("main-featured-title-link");
  const mainTitle = document.getElementById("main-featured-title");
  const mainDescription = document.getElementById("main-featured-description");

  // Get or create media container
  const mainImage = document.getElementById("main-featured-image");
  const mainVideo = document.getElementById("main-featured-video");
  const mediaContainer = document.getElementById(
    "main-featured-media-container"
  );

  // Handle video vs image display
  if (project.video) {
    // If project has video, show video instead of image
    if (mainImage) {
      mainImage.style.display = "none";
    }

    // Hide the link so video can be clicked to play/pause
    if (mainLink) {
      mainLink.style.display = "none";
    }

    // Ensure media container is directly in main-featured-project (not inside link)
    if (mediaContainer && mainLink && mediaContainer.parentNode === mainLink) {
      const mainFeaturedProject = document.querySelector(
        ".main-featured-project"
      );
      if (mainFeaturedProject) {
        // Remove from link
        mainLink.removeChild(mediaContainer);
        // Insert before project-info
        const projectInfo = mainFeaturedProject.querySelector(".project-info");
        if (projectInfo) {
          mainFeaturedProject.insertBefore(mediaContainer, projectInfo);
        } else {
          mainFeaturedProject.appendChild(mediaContainer);
        }
      }
    }

    // Create video element if it doesn't exist
    let videoElement = mainVideo;
    if (!videoElement) {
      videoElement = document.createElement("video");
      videoElement.id = "main-featured-video";
      videoElement.setAttribute("autoplay", "");
      videoElement.setAttribute("loop", "");
      videoElement.setAttribute("muted", "");
      videoElement.setAttribute("playsinline", "");
      videoElement.setAttribute("poster", project.image);
      videoElement.setAttribute("preload", "auto");
      videoElement.className = ""; // Clear any classes

      // Insert video into media container
      if (mediaContainer) {
        mediaContainer.appendChild(videoElement);
      } else if (mainImage && mainImage.parentNode) {
        mainImage.parentNode.insertBefore(videoElement, mainImage);
      }
    }

    // Update video source and attributes
    videoElement.src = project.video;
    videoElement.poster = project.image;
    videoElement.style.display = "block";
    // Ensure video plays automatically
    videoElement.play().catch((error) => {
      // Autoplay was prevented, but video will play when user interacts
      console.log("Video autoplay prevented:", error);
    });
  } else {
    // If project doesn't have video, show image and make it clickable
    if (mainVideo) {
      mainVideo.style.display = "none";
    }

    // Show the link and ensure it wraps the media container for navigation
    if (mainLink && mediaContainer) {
      // Get the current parent of media container
      const containerParent = mediaContainer.parentNode;
      const mainFeaturedProject = document.querySelector(
        ".main-featured-project"
      );

      // If media container is not already inside the link, move it
      if (containerParent !== mainLink && mainFeaturedProject) {
        // Remove media container from current parent
        if (containerParent) {
          containerParent.removeChild(mediaContainer);
        }

        // Clear link and add media container to it
        mainLink.innerHTML = "";
        mainLink.appendChild(mediaContainer);

        // Insert link before project-info in main-featured-project
        const projectInfo = mainFeaturedProject.querySelector(".project-info");
        if (projectInfo) {
          mainFeaturedProject.insertBefore(mainLink, projectInfo);
        } else {
          mainFeaturedProject.appendChild(mainLink);
        }
      }

      // Show and style the link
      mainLink.style.display = "block";
      mainLink.style.position = "relative";
      mainLink.style.width = "90%";
      mainLink.style.alignSelf = "flex-start";
      mainLink.style.textDecoration = "none";
    }

    if (mainImage) {
      mainImage.src = project.image;
      mainImage.alt = project.title;
      mainImage.style.display = "block";
    }
  }

  if (mainLink && project.url) {
    mainLink.href = project.url;
  }
  if (mainTitleLink && project.url) {
    mainTitleLink.href = project.url;
  }
  if (mainTitle) {
    mainTitle.textContent = project.title;
  }
  if (mainDescription) {
    mainDescription.textContent = project.description;
  }

  // Update thumbnails to show all other projects
  updateThumbnails(projectId);
}

// Function to update thumbnail displays
function updateThumbnails(featuredId) {
  const thumbnailProjects = getThumbnailProjects(featuredId);
  const thumbnailElements = document.querySelectorAll(".project-thumbnail");

  thumbnailElements.forEach((thumbnail, index) => {
    if (index < thumbnailProjects.length) {
      const projectId = thumbnailProjects[index];
      const project = projects[projectId];

      if (project) {
        // Update data attribute
        thumbnail.dataset.projectId = projectId;

        // Update image
        const img = thumbnail.querySelector("img");
        if (img) {
          img.src = project.image;
          img.alt = project.title;
        }

        // Update active state
        thumbnail.classList.remove("active");
      }
    }
  });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  // Initialize thumbnails with default state (all projects except move-a-bit)
  updateThumbnails("move-a-bit");

  // Initialize the main featured project to show video if it's move-a-bit
  updateFeaturedProject("move-a-bit");

  // Force video autoplay for Safari compatibility
  const mainVideo = document.getElementById("main-featured-video");
  if (mainVideo) {
    // Try to play the video
    const playPromise = mainVideo.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Video is playing
          console.log("Video autoplay started");
        })
        .catch((error) => {
          // Autoplay was prevented - show poster/thumbnail instead
          console.log("Video autoplay prevented, showing poster:", error);
          // The poster attribute will show the thumbnail
        });
    }

    // Also try playing on user interaction (click anywhere on page)
    const tryPlayVideo = () => {
      if (mainVideo.paused) {
        mainVideo.play().catch(() => {
          // Still can't play, that's okay
        });
      }
    };

    // Try to play on first user interaction
    document.addEventListener("click", tryPlayVideo, { once: true });
    document.addEventListener("touchstart", tryPlayVideo, { once: true });
  }

  // Add click event listeners to thumbnails
  const thumbnails = document.querySelectorAll(".project-thumbnail");
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function (e) {
      e.preventDefault();
      const projectId = this.dataset.projectId;
      if (projectId && projectId !== currentFeaturedProject) {
        // Add transition effect
        thumbnail.style.transform = "scale(0.95)";
        setTimeout(() => {
          thumbnail.style.transform = "";
          updateFeaturedProject(projectId);
        }, 150);
      }
    });
  });

  // Wrap updateFeaturedProject to add smooth transitions
  const originalUpdateFeaturedProject = updateFeaturedProject;

  // Override with enhanced version
  window.updateFeaturedProject = function (projectId) {
    const mediaContainer = document.getElementById(
      "main-featured-media-container"
    );
    const projectInfo = document.querySelector(".project-info");

    if (mediaContainer) {
      mediaContainer.style.opacity = "0";
      mediaContainer.style.transform = "scale(0.98)";
    }
    if (projectInfo) {
      projectInfo.style.opacity = "0";
      projectInfo.style.transform = "translateY(10px)";
    }

    setTimeout(() => {
      originalUpdateFeaturedProject(projectId);

      setTimeout(() => {
        if (mediaContainer) {
          mediaContainer.style.transition =
            "opacity 0.5s ease, transform 0.5s ease";
          mediaContainer.style.opacity = "1";
          mediaContainer.style.transform = "scale(1)";
        }
        if (projectInfo) {
          projectInfo.style.transition =
            "opacity 0.5s ease, transform 0.5s ease";
          projectInfo.style.opacity = "1";
          projectInfo.style.transform = "translateY(0)";
        }
      }, 50);
    }, 200);
  };
});
