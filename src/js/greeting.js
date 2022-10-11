import { getTimeOfDay } from './time.js';
import { greetingTranslation } from '../data/greetingTranslation.js';
import { settingsState } from '../data/settingsState.js';
import { capitalizeString } from '../data/utiles.js';
const greeting = document.querySelector('.greeting');
export const nameInput = document.querySelector('.name');

export function getGreeting(time) {
    if (settingsState.language === 'en') {
        return `${greetingTranslation.en.good} ${time}`;
    } else if (settingsState.language === 'ru') {
        return getGreetingRu(time);
    }
};

function getGreetingRu(time) {
    const greetingRu = greetingTranslation.ru.greeting;
    const goodRu = greetingTranslation.ru.good;
    const timeEn = greetingTranslation.en.timeOfDay;

    switch (time) {
        case timeEn[0]:
            return `${goodRu[0]} ${greetingRu[0]}`;
        case timeEn[1]:
            return `${goodRu[1]} ${greetingRu[1]}`;
        case timeEn[2]:
            return `${goodRu[2]} ${greetingRu[2]}`;
        case timeEn[3]:
            return `${goodRu[2]} ${greetingRu[3]}`;
    }
};

export function showGreeting() {
    nameInput.setAttribute('placeholder', greetingTranslation[settingsState.language].placeholder)
    const timeOfDay = getTimeOfDay();

    if (nameInput.value.length) {
        greeting.textContent = `${getGreeting(timeOfDay)},`;
    } else {
        greeting.textContent = `${getGreeting(timeOfDay)}`;
    }
};

export function adjustNameInputWidth() {
    nameInput.value = nameInput.value && capitalizeString(nameInput.value);
    const width = Math.max(window.screen.width, window.innerWidth);
    const inputLength = nameInput.value.length;
    const userName = settingsState.name;

    if (width >= 670) {
        calculateDesktopWidth(inputLength, userName);
    } else {
        nameInput.style.width = '100%';
    }
};

function calculateDesktopWidth(length, name) {
    if (length === 0 && name === '') {
        nameInput.style.width = '45%';
    } else if (length === 0) {
        nameInput.style.width = '45%';
    } else {
        nameInput.style.width = `calc(8% + ${length * 2.25}%)`;
    }
};
