'use strict';

const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');

const city = document.querySelector('.search-box input').value;
const image = document.querySelector('.weather-box img');
const temperature = document.querySelector('.weather-box .temperature');
const description = document.querySelector('.weather-box .description');
const humidity = document.querySelector('.weather-details .info-humidity');
const wind = document.querySelector('.weather-details .wind span');

const APIKey = '792c9c8c19ff89e491072f5d8227f261';

async function fetchWeatherData() {
	try {
		const weatherData = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=belgrade&units=metric&appid=${APIKey}`,
			{ mode: 'cors' }
		);
		const data = await weatherData.json();
		temperature.innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;
		description.innerHTML = `${data.weather[0].description}`;
		humidity.innerHTML = `${data.main.humidity}<span>%</span>`;
		wind.innerHTML = `${Number(data.wind.speed.toFixed(0))}<span>Km/h</span>`;
		console.log(data);
		console.log(temperature.innerHTML);
		console.log(description.innerHTML);
		console.log(humidity.innerHTML);
		console.log(wind.innerHTML);
	} catch (error) {
		console.error('Error: ', error);
	}
}

fetchWeatherData();

// search.addEventListener('click', fetchWeatherData);
