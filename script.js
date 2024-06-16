async function fetchWeather() {
    let searchInput = document.getElementById("search").value;
    const weatherDataSection = document.getElementById("weather-data");
    weatherDataSection.style.display = "block";
    const apiKey = "YOUR API KEY";
    if (searchInput == "") {
        weatherDataSection.innerHTML = `
        <div>
          <h2>Esto está vacío!</h2>
          <p>Haz el favor de poner <u>el nombre de una ciudad</u>.</p>
        </div>
        `;
        return;
    } 

    async function getLonAndLat() {
        const countryCode = 34;
        const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput.replace(" ", "%20")},${countryCode}&limit=1&appid=${apiKey}`;
        const response = await fetch(geocodeURL);
        if (!response.ok) {
            console.log("Bad response! ", response.status);
            return;
        }
        const data = await response.json();
        if (data.length == 0) {
            console.log("Something went wrong here.");
            weatherDataSection.innerHTML = `
            <div>
            <h2>Esto no existe: "${searchInput}"</h2>
            <p>Intentalo de nuevo sin inventarte un <u>nombre de ciudad</u>.</p>
            </div>
            `;
            return;
        } else {
            return data[0];
        }
    }
    async function getWeatherData(lon, lat) {
        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const response = await fetch(weatherURL);
        if (!response.ok) {
            console.log("Bad response! ", response.status);
            return;
        }

        const data = await response.json();
        weatherDataSection.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" width="100" />
        <div>
            <h2>${data.name}</h2>
            <p><strong>Temperatura:</strong> ${Math.round(data.main.temp - 273.15)}°C</p>
            <p><strong>Descripcion:</strong> ${data.weather[0].description}</p>
        </div>
        `
        weatherDataSection.style.display = "flex";
        weatherDataSection.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" width="100" />
        <div>
            <h2>${data.name}</h2>
            <p><strong>Temperatura:</strong> ${Math.round(data.main.temp - 273.15)}°C</p>
            <p><strong>Descripcion:</strong> ${data.weather[0].description}</p>
        </div>
        `
    }
    document.getElementById("search").value = "";
    const geocodeData = await getLonAndLat();
    getWeatherData(geocodeData.lon, geocodeData.lat);
}
