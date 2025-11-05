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
    title: "Fleeting States + Measured Values",
    description:
      "This project depicts the two sides of quantum computing. The separation of the worlds is analytical. On the one hand we have the values we can measure, probabilistic results in units. It is how we are trained/used to interact with phenomena. Superpositioning and entanglement on the other hand are neither accessible to our senses nor to measurement. They are states in motion that are truly random.",
    url: "./public/project-pages/fleeting-states.html",
  },
  "move-a-bit": {
    image: "./public/assets/images/thumbnails/move-a-bit.jpg",
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
let currentFeaturedProject = "machine-stranger";

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
  const mainImage = document.getElementById("main-featured-image");
  const mainLink = document.getElementById("main-featured-link");
  const mainTitleLink = document.getElementById("main-featured-title-link");
  const mainTitle = document.getElementById("main-featured-title");
  const mainDescription = document.getElementById("main-featured-description");

  // Update main featured project content
  if (mainImage) {
    mainImage.src = project.image;
    mainImage.alt = project.title;
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
  // Initialize thumbnails with default state (all projects except machine-stranger)
  // The HTML already has the default images loaded, so we just need to ensure
  // the data attributes and click handlers are set up correctly
  updateThumbnails("machine-stranger");

  // Add click event listeners to thumbnails
  const thumbnails = document.querySelectorAll(".project-thumbnail");
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default link behavior
      const projectId = this.dataset.projectId;
      if (projectId && projectId !== currentFeaturedProject) {
        updateFeaturedProject(projectId);
      }
    });
  });
});
