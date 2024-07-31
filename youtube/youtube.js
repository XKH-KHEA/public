const apiURL = "https://khmer-shoping.onrender.com/videos";

async function fetchVideos() {
  try {
    const response = await fetch(apiURL);
    const videos = await response.json();
    displayThumbnails(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
  }
}

function displayThumbnails(videos) {
  const container = document.getElementById("thumbnails-container");
  container.innerHTML = ""; // Clear existing content

  videos.forEach((video) => {
    console.log("Video object:", video); // Log video object for debugging

    const videoUrl = video.url; // Get the video URL
    if (videoUrl) {
      const videoId = extractVideoID(videoUrl);
      if (videoId) {
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; // Adjust for other platforms
        const thumbnailHTML = `
                      <div class="thumbnail" data-video-url="${videoUrl}">
                          <img src="${thumbnailUrl}" alt="Thumbnail for ${video.title}">
                          <div class="video-description">
                              <div class="channel-dp-container-2">
                                  <img src="${video.channelThumbnail}" class="channel-dp-2">
                              </div>
                              <div class="video-details">
                                  <a href="#" class="video-title">${video.title}</a>
                                  <a href="#" class="channel-name">${video.channelName}</a>
                                  <a href="#" class="views">${video.views} views</a>
                                  <i class="fas fa-circle"></i>
                                  <a href="#" class="time">${video.uploadedAt}</a>
                              </div>
                          </div>
                      </div>
                  `;
        container.innerHTML += thumbnailHTML;
      } else {
        console.warn(`Invalid video URL: ${videoUrl}`);
      }
    } else {
      console.warn("Video URL is undefined or null:", video);
    }
  });

  // Add click event to thumbnails
  const thumbnails = document.querySelectorAll(".thumbnail");
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      const videoUrl = this.getAttribute("data-video-url");
      playVideo(videoUrl);
    });
  });
}

function extractVideoID(url) {
  if (typeof url !== "string") {
    console.warn("Invalid URL type:", url);
    return null;
  }
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function getEmbedUrl(url) {
  let embedUrl = "";
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  } else if (url.includes("facebook.com")) {
    embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}`;
  }
  return embedUrl;
}

function playVideo(url) {
  const embedUrl = getEmbedUrl(url);
  if (embedUrl) {
    showVideoPlayer(embedUrl);
  } else {
    alert("Invalid video URL.");
  }
}

function showVideoPlayer(src) {
  const modal = document.getElementById("video-player-modal");
  const iframe = document.getElementById("video-player");
  iframe.src = src;
  modal.style.display = "block";
}

function closeVideoPlayer() {
  const modal = document.getElementById("video-player-modal");
  const iframe = document.getElementById("video-player");
  iframe.src = ""; // Stop the video
  modal.style.display = "none";
}

// Close video player when clicking on the close button
document.querySelector(".modal .close").addEventListener("click", closeVideoPlayer);

function UploadVideo() {
  const modals = document.getElementById("video-player-upload");
  modals.style.display = "block";
}
function ClosUp()
{
 const close = document.getElementById("video-player-upload");
 close.style.display="none";
}

document.addEventListener("DOMContentLoaded", fetchVideos);

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
