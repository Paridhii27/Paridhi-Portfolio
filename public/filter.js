filterSelection("all");
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("container");
  if (c == "all") c = "";
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

// Add event listeners to filter buttons
var btnContainer = document.getElementById("filterBtns");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    // Get the filter category from data-filter attribute
    var filterCategory = this.getAttribute("data-filter");

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
    this.className += " active";
    this.setAttribute("aria-pressed", "true");
  });
}
