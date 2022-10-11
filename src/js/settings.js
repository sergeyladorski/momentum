import { settingsTranslation } from "../data/settingsTranslation";
import { bgQueryInputError, handleBgQueryError, setBg } from "./background";
import { defaultBlocks, settingsState } from "../data/settingsState";

export const settingsButton = document.querySelector('.settings-button');
export const settingsPopup = document.querySelector('.settings-popup');
export const todoPopup = document.querySelector('.todo-popup');
const langButtons = document.querySelectorAll('.lang-button')
const checkboxList = Object.values(document.querySelectorAll('.block-checkbox'));
const bgButtons = document.querySelectorAll('.bg-button')
const langOptionSpan = document.querySelector('.options__span_type_lang')
const bgOptionSpan = document.querySelector('.options__span_type_bg')
const itemsOptionSpan = document.querySelector('.options__span_type_items')
export const langEn = document.querySelector('#en');
export const langRu = document.querySelector('#ru');
export const bgGithub = document.querySelector('#github');
export const bgUnsplash = document.querySelector('#unsplash');
export const bgFlickr = document.querySelector('#flickr');
export const bgQueryInput = document.querySelector('.bg-query-input');

// background
export function handleBgQueryInputClass(value) {
    if (value === 'github') {
        bgQueryInput.classList.remove('bg-query-input_active');
    } else {
        bgQueryInput.classList.add('bg-query-input_active');
    }
};

export function updateBgButtonState(currentValue) {
    Array.from(bgButtons).forEach(button => {
        if (button.getAttribute('value') !== currentValue) {
            button.removeAttribute('checked');
        } else {
            button.setAttribute('checked', true);
        }
    })
};
export function updateLangButtonState(currentValue) {
    Array.from(langButtons).forEach(button => {
        if (button.getAttribute('value') !== currentValue) {
            button.removeAttribute('checked');
        } else {
            button.setAttribute('checked', true);
        }
    })
};

export function selectBgSource(evt) {
    const buttonValue = evt.target.getAttribute('value');
    settingsState.photoSource = buttonValue;

    updateBgButtonState(buttonValue);
    handleBgQueryInputClass(buttonValue);
    setBg();
};

// language
export function selectLanguage(evt) {
    const buttonValue = evt.target.getAttribute('value');
    settingsState.language = buttonValue;

    updateLangButtonState(buttonValue);
    updateSettingsLanguage();
};

export function updateSettingsLanguage() {
    langOptionSpan.textContent = `${settingsTranslation[settingsState.language].lang}:`;
    bgOptionSpan.textContent = `${settingsTranslation[settingsState.language].bg}:`;

    bgQueryInput.setAttribute('placeholder', `${settingsTranslation[settingsState.language].placeholder}`);

    if (bgQueryInputError.textContent) {
        handleBgQueryError(settingsState.queryInputError);
    };

    updateItemsText();
};

export function updateItemsText() {
    itemsOptionSpan.textContent = `${settingsTranslation[settingsState.language].items.title}:`;

    defaultBlocks.forEach(block => {
        document.querySelector(`.options__button_type_${block}`).textContent = settingsTranslation[settingsState.language].items[block];
    })
};

export function updateItemsState() {
    checkboxList.forEach(checkbox => {
        const pageItem = document.querySelector(`#${checkbox.value}`);

        if (settingsState.blocks.indexOf(checkbox.value) !== -1) {
            checkbox.setAttribute('checked', 'checked');
            showPageItem(pageItem);
        } else {
            checkbox.removeAttribute('checked');
            hidePageItem(pageItem);
        }
    })
};

function hidePageItem(item) {
    item.classList.add('page__item_disabled');
};

function showPageItem(item) {
    item.classList.remove('page__item_disabled');
};

function handleItemCheckbox(evt) {
    const pageItem = document.querySelector(`#${evt.target.getAttribute('value')}`);

    if (evt.target.getAttribute('checked') === 'checked') {
        settingsState.blocks.splice(settingsState.blocks.indexOf(evt.target.getAttribute('value')), 1);

        hidePageItem(pageItem);

    } else {
        evt.target.setAttribute('checked', 'checked');
        settingsState.blocks.push(evt.target.getAttribute('value'));

        showPageItem(pageItem);
    }

    updateItemsState();
};

checkboxList.forEach(checkbox => {
    checkbox.addEventListener('click', handleItemCheckbox)
})

// popup
export function openPopup(popup) {
    popup.classList.add('popup_active');

    document.addEventListener('keydown', closePopupByEsc);
    document.addEventListener('mousedown', (evt) => {

        if (evt.target.classList.contains('popup_active')) {
            closePopup();
        }
    });
};

export function handleTodoListBtn() {
    todoPopup.classList.toggle('popup_active')
}

export function closePopup() {
    document.querySelector('.popup_active').classList.remove('popup_active');
    document.removeEventListener('keydown', closePopupByEsc);
};

function closePopupByEsc(evt) {
    if (evt.key === 'Escape') {
        closePopup();
    }
};

// language
langEn.addEventListener('change', selectLanguage);
langRu.addEventListener('change', selectLanguage);
// background
bgGithub.addEventListener('change', selectBgSource);
bgUnsplash.addEventListener('change', selectBgSource);
bgFlickr.addEventListener('change', selectBgSource);
