/**
 * About Page Data Structure
 * Contains gallery images and contact information
 */

const AboutData = {
  /**
   * Gallery images organized by column
   */
  galleryImages: {
    column1: [
      {
        src: "./assets/images/about/1.jpeg",
        alt: "Gallery image 1",
        width: 400,
        height: 600,
      },
      { src: "./assets/images/about/2.JPG", alt: "Gallery image 2" },
      { src: "./assets/images/about/18.png", alt: "Gallery image 3" },
      { src: "./assets/images/about/5.jpg", alt: "Gallery image 4" },
      { src: "./assets/images/about/6.JPG", alt: "Gallery image 5" },
      { src: "./assets/images/about/4.png", alt: "Gallery image 6" },
      { src: "./assets/images/about/23.jpg", alt: "Gallery image 7" },
      { src: "./assets/images/about/37.png", alt: "Gallery image 8" },
      { src: "./assets/images/about/26.jpg", alt: "Gallery image 9" },
      { src: "./assets/images/about/28.jpg", alt: "Gallery image 10" },
      { src: "./assets/images/about/29.jpg", alt: "Gallery image 11" },
      { src: "./assets/images/about/31.jpg", alt: "Gallery image 12" },
    ],
    column2: [
      { src: "./assets/images/about/7.JPG", alt: "Gallery image 13" },
      { src: "./assets/images/about/8.JPG", alt: "Gallery image 14" },
      { src: "./assets/images/about/12.png", alt: "Gallery image 15" },
      { src: "./assets/images/about/21.png", alt: "Gallery image 16" },
      { src: "./assets/images/about/20.png", alt: "Gallery image 17" },
      { src: "./assets/images/about/11.JPG", alt: "Gallery image 18" },
      { src: "./assets/images/about/10.jpg", alt: "Gallery image 19" },
      { src: "./assets/images/about/9.JPG", alt: "Gallery image 20" },
      { src: "./assets/images/about/27.jpg", alt: "Gallery image 21" },
      { src: "./assets/images/about/32.jpeg", alt: "Gallery image 22" },
      { src: "./assets/images/about/33.jpg", alt: "Gallery image 23" },
    ],
    column3: [
      { src: "./assets/images/about/13.JPG", alt: "Gallery image 24" },
      { src: "./assets/images/about/14.jpeg", alt: "Gallery image 25" },
      { src: "./assets/images/about/15.png", alt: "Gallery image 26" },
      { src: "./assets/images/about/17.jpg", alt: "Gallery image 27" },
      { src: "./assets/images/about/19.png", alt: "Gallery image 28" },
      { src: "./assets/images/about/16.jpg", alt: "Gallery image 29" },
      { src: "./assets/images/about/36.jpg", alt: "Gallery image 30" },
      { src: "./assets/images/about/3.png", alt: "Gallery image 31" },
      { src: "./assets/images/about/main4.png", alt: "Gallery image 32" },
      { src: "./assets/images/about/30.jpeg", alt: "Gallery image 33" },
      { src: "./assets/images/about/35.jpg", alt: "Gallery image 35" },
      { src: "./assets/images/about/38.jpg", alt: "Gallery image 36" },
    ],
  },

  /**
   * Contact links data
   */
  contactLinks: [
    {
      id: "email",
      href: "mailto:paridhigarg27@gmail.com?subject=Hello&body=Hi%20there",
      defaultLogo: "./assets/images/logos/contact/email.png",
      hoverLogo: "./assets/images/logos/contact/emailHover.png",
      alt: "Email Logo",
      hoverAlt: "email Hover Logo",
    },
    {
      id: "instagram",
      href: "https://www.instagram.com/paridhiii_27/",
      target: "_blank",
      defaultLogo: "./assets/images/logos/contact/instagram.png",
      hoverLogo: "./assets/images/logos/contact/InstagramHover.png",
      alt: "Instagram Logo",
      hoverAlt: "instagram Hover Logo",
    },
    {
      id: "github",
      href: "https://github.com/Paridhii27",
      target: "_blank",
      defaultLogo: "./assets/images/logos/contact/github.png",
      hoverLogo: "./assets/images/logos/contact/githubHover.png",
      alt: "gitHub logo",
      hoverAlt: "gitHub Hover Logo",
    },
    {
      id: "linkedin",
      href: "https://www.linkedin.com/in/paridhi-garg-a15824234/",
      target: "_blank",
      defaultLogo: "./assets/images/logos/contact/linkedin.png",
      hoverLogo: "./assets/images/logos/contact/LinkedInHover.png",
      alt: "LinkedIn Logo",
      hoverAlt: "LinkedIn Hover Logo",
    },
  ],

  /**
   * Skills data for resume modal
   */
  skills: [
    {
      number: "01.",
      category: "Frameworks",
      description:
        "Figma · Adobe Creative Suite (AI, PSD, ID, PR, LR) · Touchdesigner · Blender 3D · Unity · Madmapper · Isadora · Framer · Webflow · Git/GitHub · Microsoft Suite",
    },
    {
      number: "02.",
      category: "Programming Languages",
      description:
        "Python · JavaScript (Node.js, Deno, Express.js) · C++ (Arduino) · C# (Unity) · SQL · HTML/CSS",
    },
    {
      number: "03.",
      category: "Digital Fabrication",
      description: "Laser Cutting · 3D Printing",
    },
    {
      number: "04.",
      category: "Advanced Computing",
      description:
        "OpenAI API · Anthropic API · Google's Gemini API · Training text generation models · prompt engineering for text generation · ElevenLabs · text-to-speech · speech-to-text · Runway ML · Stable Diffusion · StyleGANs for image generation · Image generation · ImageFX · MusicFX · Gesture Recognition · Object Detection",
    },
  ],

  /**
   * Render gallery images
   */
  renderGallery() {
    const galleryContent = document.getElementById("gallery-content");
    if (!galleryContent) return;

    const columns = ["column1", "column2", "column3"];
    const columnsHTML = columns
      .map((columnKey) => {
        const images = this.galleryImages[columnKey];
        const imagesHTML = images
          .map((img) => {
            const widthAttr = img.width ? `width="${img.width}"` : "";
            const heightAttr = img.height ? `height="${img.height}"` : "";
            return `
          <div class="grid-item">
            <img
              src="${img.src}"
              alt="${img.alt}"
              loading="lazy"
              ${widthAttr}
              ${heightAttr}
            />
          </div>
        `;
          })
          .join("");

        return `<div class="grid-column">${imagesHTML}</div>`;
      })
      .join("");

    galleryContent.innerHTML = `<div class="image-grid">${columnsHTML}</div>`;
  },

  /**
   * Render contact links
   */
  renderContactLinks() {
    const contactLinksContainer = document.querySelector(".contact-links");
    if (!contactLinksContainer) return;

    const linksHTML = this.contactLinks
      .map((contact) => {
        const targetAttr = contact.target ? `target="${contact.target}"` : "";
        return `
        <div class="contact">
          <a
            href="${contact.href}"
            ${targetAttr}
            class="footer-link"
            id="${contact.id}"
          >
            <img
              src="${contact.defaultLogo}"
              alt="${contact.alt}"
              class="default-logo"
              loading="lazy"
            />
            <img
              src="${contact.hoverLogo}"
              alt="${contact.hoverAlt}"
              class="hover-logo"
              loading="lazy"
            />
          </a>
        </div>
      `;
      })
      .join("");

    contactLinksContainer.innerHTML = linksHTML;
  },

  /**
   * Render skills in resume modal
   */
  renderSkills() {
    const resumeContent = document.getElementById("resume-content");
    if (!resumeContent) return;

    const skillsHTML = this.skills
      .map((skill, index) => {
        const separator =
          index < this.skills.length - 1
            ? '<div class="skill-separator"></div>'
            : "";
        return `
        <div class="skill-item">
          <span class="skill-number">${skill.number}</span>
          <div class="skill-content">
            <h2 class="skill-category">${skill.category}</h2>
            <p class="skill-description">${skill.description}</p>
          </div>
        </div>
        ${separator}
      `;
      })
      .join("");

    resumeContent.innerHTML = `
      <div class="skills-wrapper">
        <h1 class="skills-title">SKILLS</h1>
        <div class="skills-list">${skillsHTML}</div>
        <div class="download-btn-container">
          <button class="download-btn" onclick="downloadPDF()">
            DOWNLOAD FULL RESUME
          </button>
          <a
            id="downloadLink"
            href="./assets/images/Paridhi-Resume-2026.pdf"
            download="Paridhi-Garg-Resume.pdf"
            style="display: none"
          >
          </a>
        </div>
      </div>
    `;
  },
};
