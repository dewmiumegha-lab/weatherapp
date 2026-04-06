🌦️ Weather App

A simple and user-friendly web-based Weather Application that provides real-time weather information for cities around the world using the OpenWeatherMap API.

📌 Overview

This application allows users to search for any city and instantly view current weather conditions. It is designed with a clean interface and optimized performance using browser caching techniques.

🚀 Features
🔍 Search weather by city name
🌡️ Real-time weather data (temperature, conditions, etc.)
⚡ Fast performance using local storage caching
💾 Cached data valid for 10 minutes to reduce API calls
❌ Error handling for invalid city names and network issues
🎨 Clean and intuitive user interface
🛠️ Technologies Used
HTML, CSS, JavaScript
PHP
MySQL Database
OpenWeatherMap API
⚙️ How It Works
When a user searches for a city:
The app first checks localStorage for cached data
If valid data (within 10 minutes) exists → it displays instantly
If not → it fetches fresh data from the API
This reduces server requests and improves speed and user experience
✅ Strengths
User-friendly and simple design
Efficient API usage with caching
Faster response time for repeated searches
Proper error handling for common issues
⚠️ Limitations
No validation for empty input
API key is exposed in PHP code (security risk)
Database connection errors are not fully handled
Limited scalability for larger applications
🔐 Future Improvements
Add input validation for better UX
Secure API key using environment variables
Improve error handling for database failures
Enhance UI with more weather details and animations
Add mobile responsiveness
🌐 Live Demo

👉 https://mi-linux.wlv.ac.uk/~2435430/weatherapp3/index.html

📚 References
OpenWeatherMap
Giphy animations for UI enhancement
