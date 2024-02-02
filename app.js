'use strict';

const container = document.querySelector('.container');
const weatherBox = document.querySelector(`.weather-box`);
const weatherDetails = document.querySelector(`.weather-details`);
const searchButton = document.querySelector('.search-box button');
const searchBar = document.querySelector('.search-bar');
const placeName = document.querySelector(`.place-name`);

const image = document.querySelector('.weather-box img');
const temperature = document.querySelector('.weather-box .temperature');
const description = document.querySelector('.weather-box .description');
const humidity = document.querySelector('.weather-details .info-humidity');
const wind = document.querySelector('.weather-details .wind span');
const notFound = document.querySelector(`.not-found`);

const APIKey = '792c9c8c19ff89e491072f5d8227f261';

document.addEventListener('DOMContentLoaded', () => {
	searchBar.focus();

	if (navigator.geolocation) {
		// Ask for the user's location
		navigator.geolocation.getCurrentPosition(
			async function (position) {
				// Success callback - position contains the user's location
				const userLat = position.coords.latitude;
				const userLong = position.coords.longitude;
				console.log('User location:', userLat, userLong);

				try {
					const autoLocationData = await fetch(
						`https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLong}&appid=${APIKey}&lang={sr}&units=metric`,
						{ mode: 'cors' }
					);
					const autoData = await autoLocationData.json();
					console.log(autoData);

					container.style.height = '55.5rem';
					weatherBox.classList.add('active');
					weatherDetails.classList.add('active');
					notFound.classList.remove('active');

					placeName.innerHTML = `${autoData.name}`;
					temperature.innerHTML = `${Math.round(
						autoData.main.temp
					)}<span>°C</span>`;
					description.innerHTML = `${autoData.weather[0].description}`;
					humidity.innerHTML = `${autoData.main.humidity}<span>%</span>`;
					wind.innerHTML = `${Number(
						autoData.wind.speed.toFixed(0)
					)}<span>Km/h</span>`;

					switch (autoData.weather[0].main) {
						case 'Clear':
							image.src = 'images/clear.png';
							break;

						case 'Rain':
							image.src = 'images/rain.png';
							break;

						case 'Snow':
							image.src = 'images/snow.png';
							break;

						case 'Clouds':
							image.src = 'images/cloud.png';
							break;

						case 'Mist':
							image.src = 'images/mist.png';
							break;

						case 'Haze':
							image.src = 'images/clear.png';
							break;

						default:
							image.src = 'images/cloud.png';
							break;
					}
				} catch (error) {
					console.error('Error fetching weather data:', error.message);
				}
			},

			function (error) {
				// Error callback - handle errors if permission is denied or there's an issue
				console.error('Error getting location:', error.message);
			}
		);
	} else {
		// Geolocation API not supported
		console.error('Geolocation is not supported by this browser.');
	}
});

async function fetchWeatherData() {
	const city = document.querySelector('.search-box input').value;

	if (city == '') {
		container.style.height = '10rem';
		weatherBox.classList.remove('active');
		weatherDetails.classList.remove('active');
		notFound.classList.remove('active');
		return;
	}

	try {
		const weatherData = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`,
			{ mode: 'cors' }
		);

		console.log(city);

		const data = await weatherData.json();

		if (data.cod != '404') {
			container.style.height = '55.5rem';
			weatherBox.classList.add('active');
			weatherDetails.classList.add('active');
			notFound.classList.remove('active');
		} else {
			container.style.height = '40rem';
			weatherBox.classList.remove('active');
			weatherDetails.classList.remove('active');
			notFound.classList.add('active');
		}

		switch (data.weather[0].main) {
			case 'Clear':
				image.src = 'images/clear.png';
				break;

			case 'Rain':
				image.src = 'images/rain.png';
				break;

			case 'Snow':
				image.src = 'images/snow.png';
				break;

			case 'Clouds':
				image.src = 'images/cloud.png';
				break;

			case 'Mist':
				image.src = 'images/mist.png';
				break;

			case 'Haze':
				image.src = 'images/clear.png';
				break;

			default:
				image.src = 'images/cloud.png';
				break;
		}

		placeName.innerHTML = `${data.name}`;
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

searchButton.addEventListener('click', fetchWeatherData);

searchBar.addEventListener('keyup', (event) => {
	if (event.key === 'Enter') {
		fetchWeatherData();
	}
});
