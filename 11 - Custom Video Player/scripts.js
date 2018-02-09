// step.1取出html元素
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const full = player.querySelector(".full");
console.log(full);

// step.2建立function
function togglePlay() {
    if (video.paused) {
        video.play();
    }else{
        video.pause();
    }
}
//pause為method，使影片暫停
//play為method，使影片播放
//paused為目前影片播放狀態，為boolean
function changeButton() {
    const icon = video.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skipTime() {
    video.currentTime += parseFloat(this.dataset.skip);
    // this.dataset.skip為string要轉換
}

function rangeChange() {
    video[this.name] = this.value;
}

function progressChange() {
    let percent = (video.currentTime / video.duration)*100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    if (isClick) {
    let toTime = (e.offsetX / progress.offsetWidth)* video.duration;
    video.currentTime = toTime;
    }
}

// step.3加上event listener
video.addEventListener("click",togglePlay);
video.addEventListener("play",changeButton);
video.addEventListener("pause",changeButton);
video.addEventListener("timeupdate", progressChange);
toggle.addEventListener("click",togglePlay);

skipButtons.forEach(skipButton => skipButton.addEventListener("click",skipTime));

ranges.forEach(range => range.addEventListener('change', rangeChange));
ranges.forEach(range => range.addEventListener('mousemove', rangeChange));

progress.addEventListener("click",scrub);
progress.addEventListener("mousemove",scrub);
let isClick = false;
progress.addEventListener("mousedown",() => isClick = true);
progress.addEventListener("mouseup",() => isClick = false);
progress.addEventListener("mouseout",() => isClick = false);

full.addEventListener("click",full.requestFullscreen)
