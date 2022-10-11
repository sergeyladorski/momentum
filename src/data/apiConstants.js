// background image source
export const clientIdUnsplash = 'vccpmfpxjX7plAMrKEXyVHlG-i6psZQy183H-Ge27p4';
export const clientIdFlickr = '12ec7ed5cce01fb906f9ef3032ecabcd';
export const unsplashUrl = (query, time) => {
    return `https://api.unsplash.com/photos/random?orientation=landscape&query=${query || time}&client_id=${clientIdUnsplash}`;
};

export const flickrUrl = (query, time) => {
    return `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${clientIdFlickr}&tags=${query || time}&extras=url_l&format=json&nojsoncallback=1`;
};

// weather
const units = 'metric';
const apiWeatherKey = '352d4e7503e97f2906835b70fe7d7200';
export const openweathermapUrl = (inputValue, lang) => {
    return `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&lang=${lang}&appid=${apiWeatherKey}&units=${units}`;
};
