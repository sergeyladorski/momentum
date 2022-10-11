import { openweathermapUrl } from "../data/apiConstants";
import { settingsState } from "../data/settingsState";
import { weatherTranslation } from "../data/weatherTranslation";
import { capitalizeString } from "../data/utiles";
export const cityInput = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherDescription = document.querySelector('.weather-description');
const weatherError = document.querySelector('.weather-error');

function clearWeatherInfo() {
    temperature.textContent = '';
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
};

function handleEmptyCityInput() {
    weatherError.textContent = `${weatherTranslation[settingsState.language].emptyCityInput}`;
    clearWeatherInfo();
}

function translateDefaultCity() {
    if(cityInput.value === 'Minsk' || cityInput.value === 'Минск') {
        cityInput.value = weatherTranslation[settingsState.language].defaultCity;
    } else {
        cityInput.value = cityInput.value;
    }
};

export async function getWeather() {
    cityInput.setAttribute('placeholder', weatherTranslation[settingsState.language].placeholder)
    translateDefaultCity();
    weatherIcon.className = 'weather-icon owf';

    if (cityInput.value.length === 0) {
        handleEmptyCityInput();
    } else {
        cityInput.value = capitalizeString(cityInput.value);
        const url = openweathermapUrl(cityInput.value, settingsState.language);
        const res = await fetch(url);
        const data = await res.json();

        if (data.cod === '404') {
            weatherError.textContent = `${weatherTranslation[settingsState.language].notFound}`;
            clearWeatherInfo();
        } else {
            weatherIcon.classList.add(`owf-${data.weather[0].id}`);
            temperature.textContent = `${Math.round(data.main.temp)}°C`;
            weatherDescription.textContent = data.weather[0].description;
            wind.textContent = `${weatherTranslation[settingsState.language].wind}: ${Math.round(data.wind.speed)}${weatherTranslation[settingsState.language].speed}`;
            humidity.textContent = `${weatherTranslation[settingsState.language].humidity}: ${Math.round(data.main.humidity)}%`;
            weatherError.textContent = '';
        }
    }
};
