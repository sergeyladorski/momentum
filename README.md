# Momentum  
Training project of the RS School course

## Link to gh-pages  
https://sergeyladorski.github.io/momentum

## Description  
Momentum is an analogue of the Chrome Web Store application of the same name. The application shows the time and username. The background image and greeting changes depending on the time of day.
The application has a clock, an image slider, weather widgets, an audio player, a quote block. Local storage is used to store the username and location.

## Key skills presented in the project:  
* element search methods;
* data output to the page;
* work with date and time;
* work with audio;
* saving data in local storage;
* using recursive setTimeout;
* division of js-code into modules;
* work with asynchronous requests.

## Application functionality
1. Clock and calendar
   - time is displayed in 24-hour format, for example: `21:01:00`
   - time is updated every second
   - displays the day of the week, date, month, for example: "Sunday, May 16" / "Sunday, May 16"
   The language and format of the date output is determined by the language of the application.
   - when you change the day of the week, date, month, this data changes in the application
2. Greeting
   - greeting text changes depending on the time of day (morning, afternoon, evening, night)
      - from 6:00 to 11:59 - Good morning / Good morning
      - from 12:00 to 17:59 - Good afternoon / Good afternoon
      - from 18:00 to 23:59 - Good evening / Good evening
      - from 00:00 to 5:59 - Good night / Good night
   - when the time of day changes, if the application is open at this time, the greeting text changes
   - the user can enter his name. When reloading the application page, the username is saved, data about it is stored in local storage
3. Change background image
   When downloading or reloading the application, the background image is selected from the one located on GitHub
   - a link to the background image is formed taking into account the time of day and a random number of the image (from `01` to `20`)
   - images can be flipped by clicking on the arrows located on the sides of the screen.
   - images are flipped sequentially in a circle with a smooth change of background images
4. Weather widget
   - default city - Minsk, until the user enters another city
   - when reloading the application page, the city specified by the user is saved, data about it is stored in local storage
   - for the user-specified settlement, weather data is displayed if it is returned by the API
   - weather data includes: weather icon, weather description, temperature in `°C`, wind speed in `m/s`, relative humidity in `%`. Numerical weather parameters are rounded to whole numbers
   - an error notification is displayed when entering incorrect values for which the API does not return weather
5. Quote of the day widget
   - when loading the application page, a random quote and its author are displayed
  APIs with quotes are not reliable and durable, using your own JSON file as a source of quotes guarantees the performance of the application. JSON requests are made asynchronously
   - when reloading the page, the quote is updated. There is a button that, when clicked, updates the quote
   6. Audio player
   - when you click on the `Play/Pause` button, the first track from the `play-list` block is played, the button icon changes to `Pause`
   - when you click on the `Play/Pause` button while playing a track, the track playback stops, the button icon changes to `Play`
   - tracks can be scrolled through with `Play-next` and `Play-prev` buttons
   - tracks are scrolled in a circle
   - the track that is currently playing is highlighted in the `Play-list` block with a style
   - after the end of playing the first track, the next one starts playing automatically. Tracks are played in a circle
   - added a progress bar that displays the playback progress
   - moving the slider of the progress bar changes the current playing time of the track
   - the title of the track is displayed above the progress bar
   - shows the current and total playing time of the track
   - there is a sound button when you click on which you can turn on / off the sound
   - added volume control, when moving the volume control slider, the volume of sound playback changes
   <!---
   - you can start and stop playing a track by clicking on the `Play/Pause` button next to it in the playlist
   --->
7. Translation of the application into two languages (en / ru)
   - translates the language and changes the date display format
   - translated greeting and placeholder
   - translated weather forecast including weather description
   - displays the quote of the day in the desired language
   - application settings are translated. When you switch the application language in the settings, the settings language also changes.
   - the data entered by the user is not translated: name, city, tag for getting a background image from the API
8. Get background image from API
   - Unsplash API, Flickr API can be used as image source
9. Application settings
   - in the application settings you can specify the application language (en / ru)
   - in the application settings, you can specify the source of getting a photo for the background image: GitHub image collection, Unsplash API, Flickr API
   - if the API is specified as the source of receiving the photo, in the application settings you can specify the tag/tags for which the API will send the photo
   - in the application settings you can hide / show any of the blocks that are on the page
   - hiding and showing blocks smoothly without affecting other elements that are on the page
   - application settings are saved when reloading the page
10. ToDo List - to-do list
