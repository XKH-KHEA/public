async function fetchVideos() {
    try {
        const response = await fetch('https://khmer-shoping.onrender.com/videos');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching videos:', error);
        return [];
    }
}

function createCard(title, imageUrl, videoUrl) {
    const card = document.createElement('div');
    card.className = 'card';
    card.onclick = () => playVideo(videoUrl);

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = title;

    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';

    const h3 = document.createElement('h3');
    h3.textContent = title;

    cardContent.appendChild(h3);
    card.appendChild(img);
    card.appendChild(cardContent);

    return card;
}

function populateVideos(videos) {
    const videoList = document.getElementById('videoList');
    videoList.innerHTML = ''; // Clear existing videos
    videos.forEach(video => {
        const card = createCard(video.title, video.thumbnail, video.url);
        videoList.appendChild(card);
    });
}

function playVideo(videoUrl) {
    const videoPlayerContainer = document.getElementById('videoPlayerContainer');
    const videoPlayer = document.getElementById('videoPlayer');
    
    videoPlayer.src = videoUrl;
    videoPlayerContainer.style.display = 'block';
    videoPlayer.play();
}

function searchVideos() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        if (title.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function uploadVideo() {
    const fileInput = document.getElementById('videoUpload');
    const file = fileInput.files[0];
    if (file) {
        // Implement upload functionality here
        // This might involve sending the file to a backend server
        console.log('File uploaded:', file);
        alert('Video uploaded successfully!');
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const videos = await fetchVideos();
    populateVideos(videos);
});

document.addEventListener('DOMContentLoaded', function() {
    const saveVideoButton = document.getElementById('save-video');
    const videoPlayer = document.getElementById('video-player');
    const videoUrlInput = document.getElementById('video-url');
    const videoLinksContainer = document.getElementById('video-links');

    saveVideoButton.addEventListener('click', function() {
        const videoUrl = videoUrlInput.value;
        if (videoUrl) {
            saveVideoLink(videoUrl);
        } else {
            alert('Please enter a video URL.');
        }
    });

    function saveVideoLink(url) {
        fetch('https://khmer-shoping.onrender.com/videos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadVideoLinks();
                videoUrlInput.value = '';
            } else {
                alert('Error saving video URL.');
            }
        });
    }

    function loadVideoLinks() {
        fetch('https://khmer-shoping.onrender.com/videos')
        .then(response => response.json())
        .then(data => {
            videoLinksContainer.innerHTML = '';
            data.forEach(video => {
                const li = document.createElement('li');
                li.textContent = video.url;
                li.addEventListener('click', () => playVideo(video.url));
                videoLinksContainer.appendChild(li);
            });
        });
    }

    function playVideo(url) {
        const embedUrl = getEmbedUrl(url);
        if (embedUrl) {
            videoPlayer.src = embedUrl;
        } else {
            alert('Invalid video URL.');
        }
    }

    function getEmbedUrl(url) {
        let embedUrl = '';
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
            embedUrl = `https://www.youtube.com/embed/${videoId}`;
        } else if (url.includes('facebook.com')) {
            embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}`;
        }
        return embedUrl;
    }

    loadVideoLinks();
});
