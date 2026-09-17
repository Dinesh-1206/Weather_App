const API_KEY = "91b5176d7057424cae285439261709";

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const weatherDiv = document.getElementById("weather");

    if (city === "") {
        weatherDiv.innerHTML = '<p class="error">Please enter a city name.</p>';
        return;
    }

    try {
        weatherDiv.innerHTML = "<p>Loading...</p>";

        const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=yes`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        weatherDiv.innerHTML = `
            <h2>${data.location.name}, ${data.location.country}</h2>

            <img 
                class="weather-icon" 
                src="https:${data.current.condition.icon}" 
                alt="${data.current.condition.text}"
            >

            <div class="temperature">
                ${data.current.temp_c}°C
            </div>

            <div class="condition">
                ${data.current.condition.text}
            </div>

            <div class="info">
                💧 Humidity: ${data.current.humidity}%
            </div>

            <div class="info">
                💨 Wind: ${data.current.wind_kph} km/h
            </div>

            <div class="info">
                🌡️ Feels Like: ${data.current.feelslike_c}°C
            </div>
        `;

    } catch (error) {
        weatherDiv.innerHTML = `
            <p class="error">
                City not found. Please try another city.
            </p>
        `;
    }
}