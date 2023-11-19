const apiKey = '1564621345bdc96046992f601e0baf27';
const form = document.querySelector('#form');
const input = document.querySelector('.form__input');


form.onsubmit = submitHundler;

async function submitHundler (evt) {
  evt.preventDefault();

  const cityName = input.value.trim();
  input.value = '';

  const cityInfo = await getGeo(cityName);

  if(!cityInfo.length) return;
  

  const weatherInfo = await getWeather(cityInfo[0]['lat'], cityInfo[0]['lon']);

  const weatherData = {
    name: weatherInfo.name,
    temp: weatherInfo.main.temp,
    humidity: weatherInfo.main.humidity,
    speed: weatherInfo.wind.speed,
    main: weatherInfo.weather[0]['main'],
  }

  renderWeatherData(weatherData);
}

async function getGeo (name) {
  const geoUrl = 
  `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${apiKey}`;
  const response = await fetch(geoUrl);
  const data = await response.json();
  return data;
}

async function getWeather (lat,lon) {
  const weatherUrl = 
  `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const response = await fetch(weatherUrl);
  const data = await response.json();
  return data;
}

function renderWeatherData(data) {
  //отображаем блоки с информацией
  document.querySelector('.weather__info').classList.remove('none');
  document.querySelector('.weather__data').classList.remove('none');
  //отображаем данные о погоде 
  const temp = document.querySelector('.weather__temp');
  const city = document.querySelector('.weather__city');
  const humidity = document.querySelector('#humidity');
  const speed = document.querySelector('#speed');
  const img = document.querySelector('.weather__img');

  city.innerText = data.name;
  temp.innerText = Math.round(data.temp) + '°c';
  humidity.innerText = data.humidity +'%';
  speed.innerText = data.speed +'km/h';
  
  const fileNames = {
    'Clouds': 'clouds',
    'Clear' : 'clear',
    'Rain': 'rain',
    'Drizzle': 'drizzle',
    'Snow': 'snow',
    'Mist': 'mist'
  }
  
  if(fileNames[data.main]) {
    img.src = `./image/weather/${fileNames[data.main]}.png`;
  }

  
}

