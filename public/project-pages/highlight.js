window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelectorAll(".highlight").forEach((element, index) => {
      setTimeout(() => {
        element.classList.add("animate");
      }, index * 200);
    });
  }, 500);
});
