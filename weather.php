<?php
$mysqli = new mysqli("mi-linux.wlv.ac.uk", "2435430", "4s90tg", "db2435430");

if ($mysqli->connect_errno) {
    echo json_encode(["error" => "Failed to connect to MySQL: " . $mysqli->connect_error]);
    exit();
}

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';
$city = trim($_POST['city'] ?? '');

if ($username !== '2435430' || $password !== '4s90tg') {
    echo json_encode(["error" => "Invalid username or password."]);
    exit();
}

$sql = "SELECT * FROM weather WHERE city = ?";
$stmt = $mysqli->prepare($sql);
$stmt->bind_param("s", $city);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $weatherData = $result->fetch_assoc();
    echo json_encode([
        "weather" => [
            ["description" => $weatherData["weather_description"], "icon" => $weatherData["icon"]]
        ],
        "main" => ["temp" => $weatherData["temperature"]]
    ]);
    $stmt->close();
    $mysqli->close();
    exit();
}

$apiKey = "c0aeb886c37d0f5d816884e4d96ec761";
$apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" . urlencode($city) . "&units=metric&appid=" . $apiKey;

$response = file_get_contents($apiUrl);

if ($response === FALSE) {
    echo json_encode(["error" => "Unable to fetch data from the weather service."]);
    $mysqli->close();
    exit();
}

$weatherData = json_decode($response, true);

if (isset($weatherData['cod']) && $weatherData['cod'] != 200) {
    echo json_encode(["error" => $weatherData['message']]);
    $mysqli->close();
    exit();
}

$description = $weatherData['weather'][0]['description'];
$temp = $weatherData['main']['temp'];
$icon = $weatherData['weather'][0]['icon'];

$insertSql = "INSERT INTO weather (city, weather_description, temperature, icon) VALUES (?, ?, ?, ?)
              ON DUPLICATE KEY UPDATE 
              weather_description = VALUES(weather_description),
              temperature = VALUES(temperature),
              icon = VALUES(icon),
              last_updated = CURRENT_TIMESTAMP";

$insertStmt = $mysqli->prepare($insertSql);
$insertStmt->bind_param("ssds", $city, $description, $temp, $icon);
$insertStmt->execute();

echo json_encode([
    "weather" => [
        ["description" => $description, "icon" => $icon]
    ],
    "main" => ["temp" => $temp]
]);

$insertStmt->close();
$mysqli->close();
?>
