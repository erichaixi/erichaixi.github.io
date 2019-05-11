window.addEventListener('load', (event) => {
	console.log('page is fully loaded');
	fake_get_JSON();
});


function get_JSON() {
	console.log("Requesting from API");
	
	const API_QUERY = "http://api.openweathermap.org/data/2.5/weather?q=Houston&APPID=3beb413c249849739c4facde117dc823";
	var request = new XMLHttpRequest();
	request.open("GET", API_QUERY);

	request.onload = function () {
		let data_JSON = request.response;
		parse_JSON(data_JSON);
	}

	request.send();
}

function fake_get_JSON() {
	let data_JSON = '{"weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d" }, { "id": 701, "main": "Mist", "description": "mist", "icon": "50d" }, { "id": 211, "main": "Thunderstorm", "description": "thunderstorm", "icon": "11d" }], "base": "stations", "main": { "temp": 294.67, "pressure": 1011, "humidity": 94, "temp_min": 293.15, "temp_max": 295.93 }, "visibility": 1609, "wind": { "speed": 2.6, "deg": 320 }, "rain": { "1h": 0.73 }, "clouds": { "all": 90 }}'
	parse_JSON(data_JSON);
}


function parse_JSON(data_JSON) {
	let data = JSON.parse(data_JSON);

	let temperature = kelvin_to_fahrenheit(data.main.temp);
	let temperature_min = kelvin_to_fahrenheit(data.main.temp_min);
	let temperature_max = kelvin_to_fahrenheit(data.main.temp_max);

	console.log("Weather:");
	for (let i = 0; i < data.weather.length; i++) {
		console.log(data.weather[i].main);
	}

	let wind_speed = data.wind.speed;
	console.log("Wind speed: " + wind_speed + "mph");
}

function kelvin_to_fahrenheit(temp) {
	return Math.round((temp - 273.15) * 9 / 5 + 32);
}