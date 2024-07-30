document.addEventListener('DOMContentLoaded', function() {
    const saveVideoButton = document.getElementById('save-video');
    const videoPlayer = document.getElementById('video-player');
    const videoUrlInput = document.getElementById('video-url');
    const videoTitleInput = document.getElementById('video-title');
    const channelNameInput = document.getElementById('channel-name');
    const viewsInput = document.getElementById('views');
    const uploadedAtInput = document.getElementById('uploaded-at');
    const channelThumbnailInput = document.getElementById('channel-thumbnail');
    const videoLinksContainer = document.getElementById('video-links');

    saveVideoButton.addEventListener('click', function() {
        const videoData = {
            url: videoUrlInput.value,
            title: videoTitleInput.value,
            channelName: channelNameInput.value,
            views: viewsInput.value,
            uploadedAt: uploadedAtInput.value,
            channelThumbnail: channelThumbnailInput.value
        };

        if (videoData.url && videoData.title && videoData.channelName && videoData.views && videoData.uploadedAt && videoData.channelThumbnail) {
            saveVideoLink(videoData);
        } else {
            alert('Please fill in all fields.');
        }
    });

    function saveVideoLink(videoData) {
        fetch('https://khmer-shoping.onrender.com/videos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(videoData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadVideoLinks();
                videoUrlInput.value = '';
                videoTitleInput.value = '';
                channelNameInput.value = '';
                viewsInput.value = '';
                uploadedAtInput.value = '';
                channelThumbnailInput.value = '';
            } else {
                alert('Error saving video data.');
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
                li.innerHTML = `
                    <div class="video-details">
                        <img src="${video.channelThumbnail}" alt="${video.channelName}" class="thumbnail" />
                        <a href="#" class="video-title">${video.title}</a>
                        <a href="#" class="channel-name">${video.channelName}</a>
                        <a href="#" class="views">${video.views} views</a>
                        <i class="fas fa-circle"></i>
                        <a href="#" class="time">${video.uploadedAt}</a>
                    </div>
                `;
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
