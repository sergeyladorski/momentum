import { getTimeOfDay } from './time.js';
import { bgQueryInput } from './settings.js';
import { unsplashUrl, flickrUrl } from '../data/apiConstants.js';
import { settingsTranslation } from "../data/settingsTranslation";
import { settingsState } from '../data/settingsState.js';
const body = document.querySelector('.body');
export const slidePrev = document.querySelector('.slide-prev');
export const slideNext = document.querySelector('.slide-next');
export const bgQueryInputError = document.querySelector('.bg-query-input__error');

// random num
const min = 1;
const max = 20;
let randomNum;

export function handleBgQueryError(res) {
    if (!res) {
        bgQueryInputError.textContent = '';
    } else if (res == 404) {
        bgQueryInputError.textContent = `${settingsTranslation[settingsState.language].notFound}`;
    } else if (res == 403) {
        bgQueryInputError.textContent = `${settingsTranslation[settingsState.language].forbidden}`;
    } else if (res === 'rate') {
        bgQueryInputError.textContent = `${settingsTranslation[settingsState.language].rate}`;
    } else {
        bgQueryInputError.textContent = `${settingsTranslation[settingsState.language].error}: ${res}`;
    }

    settingsState.queryInputError = res;
};

function getRandomNumRange() {
    randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
};

export function handleBgQueryInput() {
    settingsState.bgQuery = bgQueryInput.value;
    setBg();
};

async function getImageLinkUnsplash(time) {
    const url = unsplashUrl(settingsState.bgQuery, time);
    const res = await fetch(url);

    try {
        const data = await res.json();
        return data.urls.regular;
    } catch {
        res.status ? handleBgQueryError(res.status) : handleBgQueryError('rate');
    }
};

async function getImageLinkFlickr(time) {
    const url = flickrUrl(settingsState.bgQuery, time);
    const res = await fetch(url);
    const data = await res.json();
    const photo = data.photos.photo;

    try {
        randomNum = Math.floor(Math.random() * (photo.length - 0 + 1)) + 0;
        return data.photos.photo[randomNum].url_l;
    } catch {
        !res.status && handleBgQueryError('rate');
        photo.length === 0 && handleBgQueryError(404);
    }
};

async function getNewBg(timeOfDay, bgNum) {
    const img = new Image();
    handleBgQueryError();

    if (settingsState.photoSource === 'unsplash') {
        img.src = await getImageLinkUnsplash(timeOfDay);
    } else if (settingsState.photoSource === 'flickr') {
        img.src = await getImageLinkFlickr(timeOfDay);
    } else {
        img.src = `https://github.com/sergeyladorski/stage1-tasks/blob/assets/images/${timeOfDay}/${bgNum}.jpg?raw=true`;
    }

    img.onload = () => {
        body.style.backgroundImage = `url(${img.src})`;
    };
};

export function setBg() {
    getRandomNumRange();

    const timeOfDay = getTimeOfDay();
    const bgNum = randomNum.toString().padStart(2, '0');

    getNewBg(timeOfDay, bgNum);
};

export function getSlidePrev() {
    if (randomNum === min) {
        randomNum = max;
    } else {
        randomNum--;
    }
    const timeOfDay = getTimeOfDay();
    const bgNum = randomNum.toString().padStart(2, '0');

    getNewBg(timeOfDay, bgNum);
};

export function getSlideNext() {
    if (randomNum === max) {
        randomNum = min;
    } else {
        randomNum++;
    }
    const timeOfDay = getTimeOfDay();
    const bgNum = randomNum.toString().padStart(2, '0');

    getNewBg(timeOfDay, bgNum);
};

bgQueryInput.addEventListener('change', handleBgQueryInput);
slidePrev.addEventListener('click', getSlidePrev);
slideNext.addEventListener('click', getSlideNext);
