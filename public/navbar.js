/**
 * Navigation Component Generator
 * Generates the navigation bar dynamically for all pages
 */

const Navigation = {
  /**
   * Get the base path for assets based on current page location
   */
  getBasePath() {
    const currentPath = window.location.pathname;
    if (currentPath.includes('/project-pages/')) {
      return '../';
    } else if (currentPath.includes('/public/')) {
      return './';
    }
    return './public/';
  },

  /**
   * Get the home page path based on current location
   */
  getHomePath() {
    const currentPath = window.location.pathname;
    if (currentPath.includes('/public/')) {
      return '../index.html';
    } else if (currentPath.includes('/project-pages/')) {
      return '../../index.html';
    }
    return './index.html';
  },

  /**
   * Get the projects page path based on current location
   */
  getProjectsPath() {
    const currentPath = window.location.pathname;
    if (currentPath.includes('/project-pages/')) {
      return '../projects.html';
    } else if (currentPath.includes('/public/')) {
      return './projects.html';
    }
    return './public/projects.html';
  },

  /**
   * Get the about page path based on current location
   */
  getAboutPath() {
    const currentPath = window.location.pathname;
    if (currentPath.includes('/project-pages/')) {
      return '../about.html';
    } else if (currentPath.includes('/public/')) {
      return './about.html';
    }
    return './public/about.html';
  },

  /**
   * Render the navigation bar
   */
  render() {
    const basePath = this.getBasePath();
    const homePath = this.getHomePath();
    const projectsPath = this.getProjectsPath();
    const aboutPath = this.getAboutPath();

    const navHTML = `
      <div class="navigation-container">
        <nav>
          <div class="logo">
            <a href="${homePath}">
              <img
                src="${basePath}assets/images/logos/logo.png"
                alt="Logo"
                class="default-logo"
                width="150"
                height="50"
              />
              <img
                src="${basePath}assets/images/logos/logo hover.png"
                alt="Hover Logo"
                class="hover-logo"
                width="150"
                height="50"
              />
            </a>
          </div>
          <div id="menuToggle">
            <input type="checkbox" />
            <span></span>
            <span></span>
            <span></span>
            <ul id="menu">
              <li><a href="${projectsPath}">PROJECTS</a></li>
              <li><a href="${aboutPath}">ABOUT</a></li>
            </ul>
          </div>
        </nav>
      </div>
    `;

    // Insert navigation at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', navHTML);
  }
};

// Auto-render navigation when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Navigation.render());
} else {
  Navigation.render();
}
