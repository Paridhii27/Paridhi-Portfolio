/**
 * Filter functionality for projects
 * Works with dynamically generated content
 */

function filterSelection(c) {
  var x, i;
  var projectsSection = document.getElementById("projects-section");
  x = document.getElementsByClassName("container");
  if (c == "all") {
    c = "";
    // Add class to indicate "all" filter is active
    if (projectsSection) {
      projectsSection.classList.add("filter-all");
    }
  } else {
    // Remove class when specific filter is active
    if (projectsSection) {
      projectsSection.classList.remove("filter-all");
    }
  }
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Initialize filter functionality when DOM is ready
function initializeFilters() {
  var btnContainer = document.getElementById("filterBtns");
  if (!btnContainer) return;

  btnContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn")) {
      // Get the filter category from data-filter attribute
      var filterCategory = e.target.getAttribute("data-filter");

      // Calling filterSelection with the category
      filterSelection(filterCategory);

      // Update active class and aria-pressed states
      var current = document.getElementsByClassName("active");
      // Update aria-pressed for previous active button
      if (current[0]) {
        current[0].className = current[0].className.replace(" active", "");
        current[0].setAttribute("aria-pressed", "false");
      }
      // Update aria-pressed for new active button
      e.target.className += " active";
      e.target.setAttribute("aria-pressed", "true");
    }
  });

  // Initialize with "all" filter
  filterSelection("all");
}

// Wait for DOM to be ready and projects to be rendered
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for projects to be rendered
    setTimeout(initializeFilters, 100);
  });
} else {
  setTimeout(initializeFilters, 100);
}
