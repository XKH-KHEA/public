function playVideo() {
    var videoUrl = document.getElementById('videoUrl').value;
    if (videoUrl.trim() === '') {
        alert('Please enter a video URL');
        return;
    }

    var videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.innerHTML = ''; // Clear previous video if any

    var video = document.createElement('video');
    video.controls = true;
    video.style.width = '100%';
    var source = document.createElement('source');
    source.src = videoUrl;
    source.type = 'video/mp4';
    video.appendChild(source);
    
    videoPlayer.appendChild(video);
}
