const displaySidebar = document.getElementById("side-bar-section");
const thumbnailsContainer = document.getElementById("thumbnails-container");

function displaySibar() {
  if (displaySidebar.style.display === "none") {
    displaySidebar.style.display = "block";
    thumbnailsContainer.style.marginLeft = "255px"; // Corrected property
  } else {
    displaySidebar.style.display = "none";
    thumbnailsContainer.style.marginLeft = "25px"; // Reset margin when sidebar is hidden
  }
}

document.getElementById("aboutMeButton").addEventListener("click", function() {
  window.location.href = "AboutMe.html";
});
