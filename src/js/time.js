import { showGreeting } from './greeting.js';
import { greetingTranslation } from '../data/greetingTranslation.js';
import { settingsState } from '../data/settingsState.js';
import { capitalizeString } from '../data/utiles.js';
const time = document.querySelector('.time');
const date = document.querySelector('.date');

export function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    let timeOfDay;

    timeOfDay = getEnTimeName(hours, timeOfDay);

    return timeOfDay;
};

function getEnTimeName(hours, timeOfDay) {
    const time = greetingTranslation.en.timeOfDay;
    if (hours < 6) {
        return timeOfDay = time[0];
    } else if (hours < 12) {
        return timeOfDay = time[1];
    } else if (hours < 18) {
        return timeOfDay = time[2];
    } else {
        return timeOfDay = time[3];
    };
};

function showDate() {
    const newDate = new Date();

    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const currentDate = newDate.toLocaleDateString(`${settingsState.language}-${capitalizeString(settingsState.language)}`, options);

    date.textContent = capitalizeString(currentDate);
    date.setAttribute('datetime', newDate);
};

export function showTime() {
    const newDate = new Date();

    const hour = newDate.getHours().toString().padStart(2, '0');
    const minute = newDate.getMinutes().toString().padStart(2, '0');
    const second = newDate.getSeconds().toString().padStart(2, '0');

    const currentTime = `${hour}:${minute}:${second}`;
    time.textContent = currentTime;
    time.setAttribute('datetime', time.textContent);

    showDate();
    showGreeting();

    setTimeout(showTime, 1000);
};
