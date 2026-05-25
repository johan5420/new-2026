// OpenWeatherMap API
const API_KEY = 'c8d5db6b6e59d72621ffc0b1b60c52c7'; // Free API key untuk demo
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherSection = document.getElementById('weatherSection');
const defaultMessage = document.getElementById('defaultMessage');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const suggestionsBox = document.getElementById('suggestions');
const forecastContainer = document.getElementById('forecastContainer');
const cityButtons = document.querySelectorAll('.city-btn');

// Event Listeners
searchBtn.addEventListener('click', searchWeather);
cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') searchWeather();
});

cityInput.addEventListener('input', handleCitySuggestions);

cityButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    cityInput.value = btn.dataset.city;
    searchWeather();
  });
});

// Search Weather
async function searchWeather() {
  const city = cityInput.value.trim();
  
  if (!city) {
    showError('Silakan masukkan nama kota');
    return;
  }

  await getWeatherData(city);
}

// Get Weather Data
async function getWeatherData(city) {
  try {
    showLoading(true);
    hideError();
    suggestionsBox.innerHTML = '';

    // Get current weather
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=id`
    );

    if (!response.ok) {
      throw new Error('Kota tidak ditemukan');
    }

    const weatherData = await response.json();

    // Get forecast data
    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=id`
    );
    const forecastData = await forecastResponse.json();

    showLoading(false);
    displayWeather(weatherData);
    displayForecast(forecastData);
    showWeatherSection();
  } catch (error) {
    showLoading(false);
    showError(error.message || 'Terjadi kesalahan saat mengambil data');
  }
}

// Display Current Weather
function displayWeather(data) {
  const { name, sys, coord, main, weather, wind, clouds, visibility, dt } = data;

  // Update city info
  document.getElementById('cityName').textContent = name;
  document.getElementById('countryName').textContent = `${sys.country}`;
  document.getElementById('lastUpdated').textContent = `Update terakhir: ${new Date(dt * 1000).toLocaleString('id-ID')}`;

  // Update temperature and weather
  document.getElementById('temperature').textContent = `${Math.round(main.temp)}°C`;
  document.getElementById('description').textContent = weather[0].description;
  document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  // Update details
  document.getElementById('humidity').textContent = `${main.humidity}%`;
  document.getElementById('windSpeed').textContent = `${(wind.speed * 3.6).toFixed(1)} km/h`;
  document.getElementById('windDeg').textContent = getWindDirection(wind.deg);
  document.getElementById('feelsLike').textContent = `${Math.round(main.feels_like)}°C`;
  document.getElementById('pressure').textContent = `${main.pressure} hPa`;
  document.getElementById('visibility').textContent = `${(visibility / 1000).toFixed(1)} km`;

  // Update sunrise/sunset
  document.getElementById('sunrise').textContent = new Date(sys.sunrise * 1000).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  });
  document.getElementById('sunset').textContent = new Date(sys.sunset * 1000).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Update coordinates
  document.getElementById('latitude').textContent = coord.lat.toFixed(4);
  document.getElementById('longitude').textContent = coord.lon.toFixed(4);

  // Update timezone (using offset)
  const offset = sys.timezone;
  const hours = Math.floor(Math.abs(offset) / 3600);
  const minutes = Math.floor((Math.abs(offset) % 3600) / 60);
  const sign = offset >= 0 ? '+' : '-';
  document.getElementById('timezone').textContent = `UTC ${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

// Display 5-Day Forecast
function displayForecast(data) {
  const forecasts = data.list.filter((item, index) => index % 8 === 0).slice(0, 5);
  
  forecastContainer.innerHTML = '';
  
  forecasts.forEach(forecast => {
    const { main, weather, dt } = forecast;
    const date = new Date(dt * 1000);
    const day = date.toLocaleDateString('id-ID', { weekday: 'short', month: 'short', day: 'numeric' });
    
    const forecastCard = document.createElement('div');
    forecastCard.className = 'forecast-card';
    forecastCard.innerHTML = `
      <div class="forecast-date">${day}</div>
      <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}" class="forecast-icon">
      <div class="forecast-temp">${Math.round(main.temp)}°C</div>
      <div class="forecast-desc">${weather[0].description}</div>
    `;
    
    forecastContainer.appendChild(forecastCard);
  });
}

// Get Wind Direction
function getWindDirection(degree) {
  const directions = ['↑ Utara', '↗ Timur Laut', '→ Timur', '↘ Tenggara', '↓ Selatan', '↙ Barat Daya', '← Barat', '↖ Barat Laut'];
  const index = Math.round(degree / 45) % 8;
  return directions[index];
}

// Handle City Suggestions
async function handleCitySuggestions(e) {
  const query = e.target.value.trim();
  
  if (query.length < 2) {
    suggestionsBox.innerHTML = '';
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
    );
    const cities = await response.json();
    
    suggestionsBox.innerHTML = '';
    
    if (cities.length === 0) {
      suggestionsBox.innerHTML = '<div class="suggestion-item">Kota tidak ditemukan</div>';
      return;
    }

    cities.forEach(city => {
      const suggestion = document.createElement('div');
      suggestion.className = 'suggestion-item';
      suggestion.textContent = `${city.name}, ${city.country}`;
      suggestion.addEventListener('click', () => {
        cityInput.value = city.name;
        suggestionsBox.innerHTML = '';
        searchWeather();
      });
      suggestionsBox.appendChild(suggestion);
    });
  } catch (error) {
    console.error('Error fetching suggestions:', error);
  }
}

// UI Functions
function showLoading(show) {
  if (show) {
    loadingSpinner.classList.remove('hidden');
  } else {
    loadingSpinner.classList.add('hidden');
  }
}

function showError(message) {
  errorMessage.textContent = '❌ ' + message;
  errorMessage.classList.remove('hidden');
}

function hideError() {
  errorMessage.classList.add('hidden');
}

function showWeatherSection() {
  weatherSection.classList.remove('hidden');
  defaultMessage.classList.add('hidden');
}

// Close suggestions when clicking outside
document.addEventListener('click', (e) => {
  if (e.target !== cityInput && e.target !== suggestionsBox) {
    suggestionsBox.innerHTML = '';
  }
});

// Load default weather on page load
window.addEventListener('load', () => {
  // Optional: Load weather for a default city
  // getWeatherData('Jakarta');
});