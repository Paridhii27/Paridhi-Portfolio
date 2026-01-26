/**
 * Projects Data Structure
 * Centralized data for all projects
 */

const ProjectsData = {
  projects: [
    {
      id: "machine-stranger",
      title: "This Machine is a Stranger",
      class: "research",
      year: "2025",
      description:
        '"This Machine is a Stranger" is a project that emerged from a curiosity to explore how one can navigate life at the intersection of human intuition and the quiet, calculated logic of autonomous machines, questioning how much a person implicitly trusts or mistrusts a machine.',
      thumbnail: "./assets/images/thumbnails/machine-stranger.jpg",
      url: "./project-pages/this-machine-is-a-stranger.html",
      categories: ["interactive", "aiweb"],
      tools: [
        "Human-Machine Interactions",
        "AI Ethics",
        "Interactive Installation",
      ],
    },
    {
      id: "fleeting-states",
      title: "Fleeting States + Measured Values",
      year: "2024",
      description:
        "This project depicts the two sides of quantum computing. The separation of the worlds is analytical. On the one hand, we have the values we can measure, probabilistic results in units. It is how we are trained/used to interact with phenomena. Superpositioning and entanglement on the other hand are neither accessible to our senses nor to measurement. They are states in motion that are truly random.",
      thumbnail: "./assets/images/thumbnails/fleeting-states.jpg",
      url: "./project-pages/fleeting-states.html",
      categories: ["interactive"],
      tools: [
        "Quantum physics",
        "Multimedia",
        "Interactive Installation",
        "LED Mapping",
        "Science communication",
      ],
    },
    {
      id: "move-a-bit",
      title: "Move a Bit",
      year: "2022",
      description:
        "Move a Bit is a live motion capture project bringing quantum computing to life through an interactive display that visually showcases entanglement.",
      thumbnail: "./assets/images/thumbnails/move-a-bit.jpg",
      url: "./project-pages/move-a-bit.html",
      categories: ["interactive"],
      tools: [
        "Quantum computing",
        "Motion capture",
        "Interactive Installation",
      ],
    },
    {
      id: "computerized-memories",
      title: "Computerized Memories",
      class: "research",
      year: "2023",
      description:
        '"Computerized memories" is a project that explores the biological structure and psychological character of memory.',
      thumbnail: "./assets/images/thumbnails/computerized-memories.jpg",
      url: "./project-pages/computerized-memories.html",
      categories: ["narrative"],
      tools: ["3D modelling and rendering", "Procedural Shaders", "Memories"],
    },
    {
      id: "postcards-between-worlds",
      title: "Postcards Between Worlds",
      year: "2023",
      description:
        "It delves into the story of two people living in the future who send each other postcards because they can't see each other. The inherent systems of the society at the time have created physical barriers between them.",
      thumbnail: "./assets/images/thumbnails/two-loves.png",
      url: "./project-pages/postcards-between-worlds.html",
      categories: ["narrative"],
      tools: ["3D Environments", "Speculative futures", "Writing"],
    },
    {
      id: "sights-and-insights",
      title: "Sights and Insights",
      year: "2025",
      description:
        "Sights and Insights is a web-based application that transforms ordinary walks into ones filled with curious interventions. It is a voice-based AI application encouraging users to engage with the spaces they find themselves in.",
      thumbnail: "./assets/images/thumbnails/sights-and-insights.png",
      url: "./project-pages/sights-and-insights.html",
      categories: ["aiweb"],
      tools: ["AI Web Application", "Camera Detection", "Image to Speech"],
    },
    {
      id: "firefly-symphony",
      title: "A Firefly Symphony",
      year: "2025",
      description: "What would a festival for fireflies be?",
      thumbnail: "./assets/images/thumbnails/firefly-symphony.png",
      url: "./project-pages/firefly-symphony.html",
      categories: ["others"],
      tools: [
        "3D Modelling",
        "Materials and Textures",
        "Interactive Environments",
      ],
    },
    {
      id: "warped-memories",
      title: "Warped Memories of Digital Ghosts",
      year: "2023",
      description:
        "This project welcomes you to a world in which people go to a data store to access their digital memories in the form of differently flavored cookies.",
      thumbnail: "./assets/images/thumbnails/warped-memories.png",
      url: "./project-pages/warped-memories.html",
      categories: ["narrative"],
      tools: [
        "3D Modelling",
        "Materials and Textures",
        "Interactive Environments",
      ],
    },
    {
      id: "granny-bytes",
      title: "Granny Bytes",
      class: "research",
      year: "2024",
      description:
        "Granny Bytes is a project that explores intergenerational connections and how they can manifest within our interactions with technology.",
      thumbnail: "./assets/images/project-pages/granny-bytes/kitchen.png",
      url: "./project-pages/granny-bytes.html",
      categories: ["aiweb"],
      tools: ["AI application", "Text Generation", "Image Analysis"],
    },
    {
      id: "hivemind",
      title: "Hivemind",
      year: "2023",
      description:
        "A game about understanding emergent behavior with a playful spirit.",
      thumbnail: "./assets/images/thumbnails/hivemind3.png",
      url: "./project-pages/hivemind.html",
      categories: ["others"],
      tools: [
        "Multiplayer game",
        "Collaborative game mechanics",
        "Emergent systems",
      ],
    },
    {
      id: "vj-set",
      title: "Audiovisual",
      year: "2023",
      description:
        'This is a VJ set based on the instrumental version of "Stressed Out" by Twenty One Pilots. Audio analysis is done to create the audio-reactive visuals.',
      thumbnail: "./assets/images/thumbnails/vj.jpg",
      url: "./project-pages/vj-set.html",
      categories: ["others"],
      tools: ["Sound reactive", "Generative visuals", "Particle systems"],
    },
    {
      id: "echoes",
      title: "Echoes",
      year: "2023",
      description:
        "Echoes from another place and time is a visual narrative created in TouchDesigner exploring the idea of alternative parallel realities.",
      thumbnail: "./assets/images/thumbnails/echoes.jpg",
      url: "./project-pages/echoes.html",
      categories: ["others"],
      tools: ["Visual Effects", "Typography"],
    },
    {
      id: "light-and-darkness",
      title: "Light and Darkness",
      year: "2023",
      description:
        "A project that explores concepts of Light and Darkness and the intermittent phases between them through the technique of image generation.",
      thumbnail: "./assets/images/thumbnails/light-and-darkness.png",
      url: "./project-pages/light-and-darkness.html",
      categories: ["aiweb"],
      tools: ["Machine Learning", "Text Generation", "StyleGANs", "Graphics"],
    },
    {
      id: "temperature-of-emotions",
      title: "Temperature of Emotions",
      year: "2022",
      description:
        "According to research, there is a direct correlation between temperature and emotions. This device measures the external temperature and gives a corresponding response in the form of different colour mappings representing varied emotions.",
      thumbnail: "./assets/images/thumbnails/temperaure-of-emotions.png",
      url: "./project-pages/temperature-of-emotions.html",
      categories: ["others"],
      tools: ["Physical computing", "LED Mapping", "Sensors based data"],
    },
    // {
    //   id: "Moving Light",
    //   title: "Moving Light",
    //   year: "2024",
    //   description:
    //     "Following movement of light and how it interacts within a built environment.",
    //   thumbnail: "./assets/images/thumbnails/moving-light.png",
    //   url: "./project-pages/moving-light.html",
    //   categories: ["others"],
    //   tools: ["Projection Mapping", "Glitch", "Sensor based Projection"],
    // },
  ],

  /**
   * Get all unique categories from projects
   */
  getCategories() {
    const categories = new Set();
    this.projects.forEach((project) => {
      project.categories.forEach((cat) => categories.add(cat));
    });
    return Array.from(categories);
  },

  /**
   * Get filter button configuration
   */
  getFilterButtons() {
    return [
      { filter: "all", label: "All Projects" },
      { filter: "aiweb", label: "AI Applications" },
      { filter: "interactive", label: "Installations" },
      { filter: "narrative", label: "3D Environments" },
      { filter: "others", label: "Others" },
    ];
  },

  /**
   * Render a single project card
   */
  renderProject(project) {
    const categoriesClass = project.categories.join(" ");
    const projectClass = project.class ? project.class : "";
    const toolsHTML = project.tools
      .map((tool) => `<span>${tool}</span>`)
      .join(" ");

    return `
      <div class="container ${categoriesClass} ${projectClass}">
        <a
          href="${project.url}"
          class="arrow-link"
          aria-label="View ${project.title} project"
        >↗</a>
        <a
          href="${project.url}"
          class="project-title"
        >${project.title} <span class="project-year">${project.year}</span></a>
        <div class="thumbnail">
          <a href="${project.url}">
            <img
              src="${project.thumbnail}"
              alt="Thumbnail image of ${project.title} project"
              loading="lazy"
              decoding="async"
              fetchpriority="${project.id === 'machine-stranger' || project.id === 'fleeting-states' ? 'high' : 'auto'}"
            />
          </a>
        </div>
        <p>${project.description}</p>
        <p class="tool-name">${toolsHTML}</p>
      </div>
    `;
  },

  /**
   * Render all projects
   */
  renderProjects() {
    const projectsSection = document.getElementById("projects-section");
    if (!projectsSection) return;

    const projectsHTML = this.projects
      .map((project) => this.renderProject(project))
      .join("");
    projectsSection.innerHTML = projectsHTML;
  },

  /* Render filter buttons*/
  renderFilterButtons() {
    const filterBtnsContainer = document.getElementById("filterBtns");
    if (!filterBtnsContainer) return;

    const buttons = this.getFilterButtons();
    const buttonsHTML = buttons
      .map((btn, index) => {
        const isActive = index === 0 ? "active" : "";
        const ariaPressed = index === 0 ? "true" : "false";
        return `
        <button
          class="btn ${isActive}"
          data-filter="${btn.filter}"
          aria-pressed="${ariaPressed}"
          aria-label="${btn.filter === "all" ? "Show all projects" : `Filter by ${btn.label} projects`}"
        >
          ${btn.label}
        </button>
      `;
      })
      .join("");

    filterBtnsContainer.innerHTML = buttonsHTML;
  },
};
