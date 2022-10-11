import playList from '../data/playListData.js';
const playListContainer = document.querySelector('.play-list');
export const playButton = document.querySelector('.play');
export const playPrevButton = document.querySelector('.play-prev');
export const playNextButton = document.querySelector('.play-next');
export const volumeButton = document.querySelector('.play-volume');
const currentlyPlayed = document.querySelector('.currently-played');
const volumeBar = document.querySelector('.volume-bar');
const progressBar = document.querySelector('.progress-bar');
const currentTimeSpan = document.querySelector('.player__time_current');
const durationTime = document.querySelector('.player__time_duration');

const audio = new Audio();
currentlyPlayed.textContent = playList[0].title;
durationTime.textContent = playList[0].duration;
let isPlay = false;
let playNum = 0;
let currentVolume = 100;

// create & display playlist items
playList.forEach(item => {
    const playListItem = document.createElement('li');
    playListItem.classList.add('play-list__item');
    playListItem.textContent = item.title;
    playListContainer.append(playListItem);
});

const playListItems = document.querySelectorAll('.play-list__item');

// highlight current track
function highlightAudio() {

    for (let i = 0; i < playListItems.length; i++) {
        if (i === playNum) {

            playListItems[i].classList.add('item-active');
            currentlyPlayed.textContent = playListItems[i].textContent;
        } else {
            playListItems[i].classList.remove('item-active');
        }
    }
};

function playAudio() {
    audio.src = playList[playNum].src;
    audio.currentTime = progressBar.value;
    audio.play();
    highlightAudio();
    changeProgressBar();

    currentTimeSpan.textContent = audio.currentTime;
    currentlyPlayed.classList.add('currently-played_animated')

    audio.addEventListener("ended", handleEndOfAudio);
};

function pauseAudio() {
    progressBar.value = audio.currentTime;
    audio.pause();
};

// play || pause
function togglePlayBtn() {
    if (playButton.classList.contains('pause')) {
        playButton.classList.remove('pause');
    } else {
        playButton.classList.add('pause');
    }
};
function handlePrevNextBtn() {
    if (playButton.classList.contains('pause')) {
        return;
    } else {
        playButton.classList.add('pause');
    }
    isPlay = !isPlay;
};

function handleEndOfAudio() {
    audio.currentTime = 0;
    playNext();
};

export function playPrev() {
    progressBar.value = 0;
    if (playNum === 0) {
        playNum = playList.length - 1;
    } else {
        playNum--;
    }
    playAudio();
    handlePrevNextBtn();
};
export function playNext() {
    progressBar.value = 0;
    if (playNum === playList.length - 1) {
        playNum = 0;
    } else {
        playNum++;
    }
    playAudio();
    handlePrevNextBtn();
};

export function handlePlayButton() {
    if (isPlay) {
        pauseAudio();
    } else {
        playAudio();
    }
    isPlay = !isPlay;
    togglePlayBtn();
};

function getMinutes(time) {
    return `${Math.floor(time / 60)}`.padStart(2, '0');
};

function getSeconds(time) {
    return `${Math.floor(time % 60)}`.padStart(2, '0');
};

function getCurrentTime() {
    const currentTime = audio.currentTime;
    progressBar.value = `${Math.round(currentTime)}`;

    currentTimeSpan.textContent = `${getMinutes(currentTime)}:${getSeconds(currentTime)}`;
};
function getDurationTime() {
    const duration = audio.duration;
    progressBar.max = duration;

    durationTime.textContent = `${getMinutes(duration)}:${getSeconds(duration)}`;
};

function changeProgressBar() {
    getCurrentTime();

    setTimeout(changeProgressBar, 1000);
};

function updateProgressBar() {
    audio.currentTime = progressBar.value;
};

// volume bar
function updateVolumeBar() {
    audio.muted = false;
    currentVolume = volumeBar.value;
    updateAudioVolume();
    volumeButton.classList.remove('play-volume_off');
};
function updateAudioVolume() {
    audio.volume = volumeBar.value / 100;
};

function disableAudio() {
    audio.muted = true;
    volumeBar.value = 0;
};

function enableAudio() {
    audio.muted = false;
    volumeBar.value = currentVolume;
    updateAudioVolume();
};

function toggleVolumeBtn() {
    if (audio.muted === false) {
        disableAudio();
    } else {
        enableAudio();
    }

    volumeButton.classList.toggle('play-volume_off');
};

volumeButton.addEventListener('click', toggleVolumeBtn);
volumeBar.addEventListener('change', updateVolumeBar);
progressBar.addEventListener('change', updateProgressBar);
audio.addEventListener('loadedmetadata', () => {

    getCurrentTime();
    getDurationTime();
});