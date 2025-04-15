window.addEventListener('DOMContentLoaded', function() {
    const API_KEY = '6cc2f33ff2b1e7e54b389824b5be888c',
        input = document.querySelector('.form__input'),
        btnOfSearch = document.querySelector('.form__btn');
    

    btnOfSearch.addEventListener('click', async e => {
        e.preventDefault();
        const city = input.value;
        if (!input.value) {
            error();
            return
        } else {
            const weatherInfo = await getGeo(city);
            if (weatherInfo.cod == 404) {
                error();
            } else {
                const weatherDataObj = {
                    city: weatherInfo.name,
                    temp: weatherInfo.main.temp,
                    humidity: weatherInfo.main.humidity,
                    speed: weatherInfo.wind.speed,
                    clouds: weatherInfo.weather[0].main
                };
                console.log(weatherDataObj.clouds);
                const mainObj = {
                    Clear: 'clear',
                    Rain: 'rain',
                    Snow: 'snow',
                    Clouds: 'clouds',
                    Fog: 'fog',
                    Haze: 'haze'
                };
                innerDataInHTML(weatherDataObj, mainObj);
                return
            };
        };
    });
    
    // get weather data by API
    async function getGeo(city) {
        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${API_KEY}`);
        const data2 = await data.json();
        return data2;
    }

    // insert data into html
    async function innerDataInHTML(data, obj) {
        const city = document.querySelector('.weather__city'),
            temp = document.querySelector('.weather__temp'),
            humidity = document.querySelector('#humidity'),
            wind = document.querySelector('#wind');
            img = document.querySelector('.weather__img');

        city.innerHTML = data.city;
        temp.innerHTML = Math.round(data.temp) + ' ℃';
        humidity.innerHTML = Math.round(data.humidity) + ' %';
        wind.innerHTML = Math.round(data.speed) + ' km/h';
        img.src = `./img/weather/${obj[data.clouds]}.png`;
    };

    // error handler
    function error() {
        const city = document.querySelector('.weather__city'),
            temp = document.querySelector('.weather__temp'),
            humidity = document.querySelector('#humidity'),
            wind = document.querySelector('#wind'),
            img = document.querySelector('.weather__img');
        
        city.innerHTML = '--';
        temp.innerHTML = '--';
        humidity.innerHTML = '--';
        wind.innerHTML = '--';
        img.src = './img/weather/error.png';
    };
})