function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const username = '2435430';
    const password = '4s90tg';
    const CACHE_EXPIRATION = 10 * 60 * 1000; // 10 minutes in milliseconds

    if (!city) {
        alert('Please enter a city.');
        return;
    }

    const cachedData = localStorage.getItem(city);
    if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        const now = Date.now();
        if (now - parsedData.timestamp < CACHE_EXPIRATION) {
            updateUI(parsedData.data);
            console.log('Using cached data for', city);
            return;
        } else {
            localStorage.removeItem(city); // Remove expired cache
        }
    }

    document.getElementById("weatherDescription").innerHTML = 'Fetching weather data...';
    document.getElementById("temp").innerHTML = '';
    document.getElementById("weatherIcon").style.display = 'none';

    const data = new FormData();
    data.append('username', username);
    data.append('password', password);
    data.append('city', city);

    fetch('weather.php', {
        method: 'POST',
        body: data
    })
    .then(response => response.json())
    .then(response => {
        if (response.error) {
            document.getElementById("weatherDescription").innerHTML = response.error;
            document.getElementById("temp").innerHTML = '';
            document.getElementById("weatherIcon").style.display = 'none';
        } else {
            updateUI(response);
            localStorage.setItem(city, JSON.stringify({
                timestamp: Date.now(),
                data: response
            }));
        }
    })
    .catch(error => {
        document.getElementById("weatherDescription").innerHTML = 'Error: Unable to fetch data.';
        document.getElementById("temp").innerHTML = '';
        document.getElementById("weatherIcon").style.display = 'none';
        console.error('Error fetching weather data:', error);
    });
}

function updateUI(data) {
    document.getElementById("weatherDescription").innerHTML = 'Weather: ' + data.weather[0].description;
    document.getElementById("temp").innerHTML = 'Temperature: ' + data.main.temp + "°C";

    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const weatherIcon = document.getElementById("weatherIcon");
    weatherIcon.src = iconUrl;
    weatherIcon.alt = data.weather[0].description;
    weatherIcon.style.display = 'block';
}

function clearCache() {
    localStorage.clear();
    alert('Cache cleared!');
}
