document.addEventListener('DOMContentLoaded', function() {
    const loadVideoButton = document.getElementById('load-video');
    const videoPlayer = document.getElementById('video-player');
    const videoUrlInput = document.getElementById('video-url');

    loadVideoButton.addEventListener('click', function() {
        const videoUrl = videoUrlInput.value;
        if (videoUrl) {
            const embedUrl = getEmbedUrl(videoUrl);
            if (embedUrl) {
                videoPlayer.src = embedUrl;
            } else {
                alert('Invalid video URL. Please enter a valid YouTube or Facebook URL.');
            }
        } else {
            alert('Please enter a video URL.');
        }
    });

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
});
