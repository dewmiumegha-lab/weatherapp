function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const username = 'yourUsername'; 
    const password = 'yourPassword'; 

    
    if (!city) {
        alert("Please enter a city.");
        return;
    }

    
    document.getElementById("weatherDescription").innerHTML = 'Please Wait...';
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
            
            const weatherDesc = response.weather[0].description;
            const temperature = response.main.temp;

            document.getElementById("weatherDescription").innerHTML = 'Weather: ' + weatherDesc;
            document.getElementById("temp").innerHTML = 'Temperature: ' + temperature + "°C";

            
            const iconCode = response.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            const weatherIcon = document.getElementById("weatherIcon");
            weatherIcon.src = iconUrl;
            weatherIcon.alt = weatherDesc;
            weatherIcon.style.display = 'block';
        }
    })
    .catch(error => {
        
        document.getElementById("weatherDescription").innerHTML = 'Error: Unable to fetch data.';
        document.getElementById("temp").innerHTML = '';
        document.getElementById("weatherIcon").style.display = 'none';
        console.error('Error fetching weather data:', error);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("weatherDescription").innerHTML = 'Please Wait...';
    document.getElementById("temp").innerHTML = '';
    document.getElementById("weatherIcon").style.display = 'none';
});
