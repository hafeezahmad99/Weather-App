// DOM Manipulation

const form = document.querySelector("form");
const weatherCard = document.querySelector(".card");
const cardImg = document.querySelector(".card-img");
const cityName = document.querySelector(".city-name");
const weatherCondition = document.querySelector(".weather-condition");
const temperature = document.querySelector(".temperature");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const isWeatherCardNotVisible = true;
  const citySearched = form.city.value.trim();
  form.reset();

  // Call getCityCode async function and check if promise returned by this function is resolved or rejected.
  // If resolved, take the value (that comes with resolved promise) and take out the data of city name and unique city key.
  // Show the city name in the weather card.
  // Call the getCurrentConditions async function with unique city key passed as a parameter to it. (and return its value to the previous "then" method so we can use "then" and "catch" methods further on its promise)

  getCityData(citySearched)
    .then((cityData) => {
      // show city name in weather card
      cityName.innerText = cityData.EnglishName;

      // now call the getCurrentConditions and pass city key to it
      return getCurrentConditions(cityData.Key);
    })
    .then((weatherData) => {
      // check if it is day time or night
      // if day, show day image in the card, else night image
      if (weatherData.IsDayTime) {
        cardImg.setAttribute("src", "img/day.png");
      } else {
        cardImg.setAttribute("src", "img/night.jpg");
      }

      // show weather condition text in card
      weatherCondition.innerText = weatherData.WeatherText;

      // show temperature in card
      temperature.innerText = weatherData.Temperature.Metric.Value;

      // Display the card
      if (isWeatherCardNotVisible) {
        weatherCard.classList.remove("d-none");
        isWeatherCardNotVisible = false;
      }
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
});
