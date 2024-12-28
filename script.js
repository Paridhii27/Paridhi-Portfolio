const modal = document.getElementById("modal");
const resumeContent = document.getElementById("resume-content");
const galleryContent = document.getElementById("gallery-content");

function openModal(type) {
  modal.style.display = "block";
  if (type === "resume") {
    resumeContent.style.display = "block";
    galleryContent.style.display = "none";
  } else {
    resumeContent.style.display = "none";
    galleryContent.style.display = "grid";
  }
}

function closeModal() {
  modal.style.display = "none";
  resumeContent.style.display = "none";
  galleryContent.style.display = "none";
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

// function myFunction() {
//   var x = document.getElementById("myTopnav");
//   if (x.className === "topnav") {
//     x.className += " responsive";
//   } else {
//     x.className = "topnav";
//   }
// }

// function myFunction() {
//   var x = document.getElementById("myTopnav");
//   if (x.className === "topnav") {
//     x.className += " responsive";
//   } else {
//     x.className = "topnav";
//   }
// }

// let slideIndex = 1;
// showSlides(slideIndex);

// // Next/previous controls
// function plusSlides(n) {
//   showSlides((slideIndex += n));
// }

// // Thumbnail image controls
// function currentSlide(n) {
//   showSlides((slideIndex = n));
// }

// function showSlides(n) {
//   let i;
//   let slides = document.getElementsByClassName("mySlides");
//   let dots = document.getElementsByClassName("dot");
//   if (n > slides.length) {
//     slideIndex = 1;
//   }
//   if (n < 1) {
//     slideIndex = slides.length;
//   }
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex - 1].style.display = "block";
//   dots[slideIndex - 1].className += " active";
// }

// //Go to the top functionality

// let mybutton = document.getElementById("myBtn");

// // When the user scrolls down 20px from the top of the document, show the button
// window.onscroll = function () {
//   scrollFunction();
// };

// function scrollFunction() {
//   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//     mybutton.style.display = "block";
//   } else {
//     mybutton.style.display = "none";
//   }
// }

// // When the user clicks on the button, scroll to the top of the document
// function topFunction() {
//   document.body.scrollTop = 0; // For Safari
//   document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
// }

// $ = function (id) {
//   return document.getElementById(id);
// };

// var show = function (id) {
//   $(id).style.display = "block";
// };
// var hide = function (id) {
//   $(id).style.display = "none";
// };

// document.addEventListener("DOMContentLoaded", function () {
//   const lazyImages = document.querySelectorAll(".lazy-image");

//   if ("IntersectionObserver" in window) {
//     const imageObserver = new IntersectionObserver((entries, observer) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           const lazyImage = entry.target;
//           lazyImage.src = lazyImage.dataset.src;
//           lazyImage.onload = () => {
//             lazyImage.classList.add("loaded");
//           };
//           observer.unobserve(lazyImage);
//         }
//       });
//     });

//     lazyImages.forEach((image) => {
//       imageObserver.observe(image);
//     });
//   } else {
//     // Fallback for browsers that do not support IntersectionObserver
//     lazyImages.forEach((image) => {
//       image.src = image.dataset.src;
//       image.onload = () => {
//         image.classList.add("loaded");
//       };
//     });
//   }
// });
