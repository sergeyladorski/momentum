import { changeQuoteButton, getQuotes, getRandomQuote } from './js/quotes.js';
import { playButton, playPrevButton, playNextButton, handlePlayButton, playPrev, playNext } from './js/playList.js';
import { nameInput, adjustNameInputWidth } from './js/greeting.js';
import { showTime } from './js/time.js';
import { setBg } from './js/background.js';
import { cityInput, getWeather, } from './js/weather.js';
import { bgQueryInput, handleBgQueryInputClass, langEn, langRu, openPopup, settingsButton, updateBgButtonState, updateLangButtonState, updateSettingsLanguage, updateItemsState, settingsPopup, todoPopup } from './js/settings.js';
import { settingsState } from './data/settingsState.js';
import { addTaskBtn, createNewTask, handleTaskStatus, todoListBtn, todoListInput, todoListItems, updateToDoLang } from './js/toDoList.js';
import { weatherTranslation } from './data/weatherTranslation';
import { getTimeOfDay } from './js/time.js';

// load content
export function loadContent() {
    if (localStorage.getItem('settingsState')) {
        const localState = JSON.parse(localStorage.getItem('settingsState'));

        settingsState.language = localState.language;
        settingsState.name = localState.name;

        if (localState.city !== '') {
            settingsState.city = localState.city
        } else {
            settingsState.city = weatherTranslation[settingsState.language].defaultCity;
        }

        if (localState.bgQuery !== '') {
            settingsState.bgQuery = localState.bgQuery;
        } else {
            settingsState.bgQuery = getTimeOfDay();
        }

        settingsState.photoSource = localState.photoSource;

    };

    cityInput.value = settingsState.city;
    nameInput.value = settingsState.name;
    updateLangButtonState(settingsState.language);
    updateBgButtonState(settingsState.photoSource);
    handleBgQueryInputClass(settingsState.photoSource)
    bgQueryInput.value = settingsState.bgQuery;

    showTime();
    setBg();
    getWeather();
    adjustNameInputWidth();
    updateSettingsLanguage();
};

// manage local storage
function setLocalStorage() {
    settingsState.name = nameInput.value;
    settingsState.city = cityInput.value;

    localStorage.setItem('settingsState', JSON.stringify(settingsState));
};

function getLocalStorage() {
    if (localStorage.getItem('settingsState')) {
        const localState = JSON.parse(localStorage.getItem('settingsState'));

        settingsState.language = localState.language;
        settingsState.name = localState.name;

        if (localState.city !== '') {
            settingsState.city = localState.city
        } else {
            settingsState.city = weatherTranslation[settingsState.language].defaultCity;
        }

        if (localState.bgQuery !== '') {
            settingsState.bgQuery = localState.bgQuery;
        } else {
            settingsState.bgQuery = getTimeOfDay();
        }
        
        settingsState.photoSource = localState.photoSource;
        settingsState.blocks = localState.blocks;
    }

    nameInput.value = settingsState.name;
    cityInput.value = settingsState.city;
    updateLangButtonState(settingsState.language);
    updateBgButtonState(settingsState.photoSource);
    updateItemsState(settingsState.blocks);
};

// playlist
playButton.addEventListener('click', handlePlayButton);
playPrevButton.addEventListener('click', playPrev);
playNextButton.addEventListener('click', playNext);

// quotes
changeQuoteButton.addEventListener('click', getRandomQuote);
getQuotes();
// content && local storage
document.addEventListener('DOMContentLoaded', loadContent);
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

cityInput.addEventListener('change', getWeather);
nameInput.addEventListener('input', adjustNameInputWidth);

function handleLangChange() {
    getWeather();
    getQuotes();
    updateToDoLang();
};

// settings
settingsButton.addEventListener('click', () => openPopup(settingsPopup));
langEn.addEventListener('change', handleLangChange);
langRu.addEventListener('change', handleLangChange);

// to-do list
todoListBtn.addEventListener('click', () => openPopup(todoPopup));
addTaskBtn.addEventListener('click', createNewTask);
todoListInput.addEventListener('change', createNewTask);
todoListItems.addEventListener('click', handleTaskStatus);
