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
