const search_input = document.querySelector('.search-input');
const btn_search = document.querySelector('.btn-search');
const weatherIcon = document.querySelector('.weather-icon');

btn_search.addEventListener('click', displayWeatherData);

// information to reach api
let api = 'https://api.openweathermap.org/data/2.5/weather';

let apiKey = 'df673c1b5ff5d8e0bb1d438784c39829';



function displayWeatherData(e){
    e.preventDefault();

    // value of the input
    let city = search_input.value;
    console.log(city);

    let urlToFetch = `${api}?q=${city}&units=metric&appid=${apiKey}`;

    console.log(urlToFetch);

    // get requests
    fetch(urlToFetch,{cache: 'no-cache'}).then(response=>{
        // converts response object to json
        if(response.ok){
            let data = response.json();
            return data;
        }
        throw new Error('Request Failed');
    },networkError => {
        console.log(networkError.message)
      }).then(data=>{
        console.log(data);

        // //access data from the fetched object 
        let temp=data.main.feels_like;
        let weather=data.weather[0].description;
        let windSpeed=data.wind.speed;
        let maxTemp=data.main.temp_max;
        let minTemp=data.main.temp_min;
        let humidity=data.main.humidity;
        let pressure=data.main.pressure;


        // display weather data on interface

        document.querySelector('.temp').innerHTML = temp + '&deg;'+ 'C';
        document.querySelector('.wind').innerHTML = windSpeed;
        document.querySelector('.max-temp').innerHTML = maxTemp + '&deg;'+ 'C';
        document.querySelector('.min-temp').innerHTML = minTemp + '&deg;'+ 'C';
        document.querySelector('.humidity').innerHTML = humidity + '%';
        document.querySelector('.pressure').innerHTML = pressure + 'hPa';
        document.querySelector('.weather').innerHTML = weather;
        document.querySelector('.place').textContent=city.toUpperCase();


        // change icon for different weather
        if(weather === 'moderate rain'){
            weatherIcon.setAttribute('src','assets/moderate.png');
        }else if(weather==='haze'){
            weatherIcon.setAttribute('src','assets/haze.png');
        }else if(weather==='scattered clouds'){
             weatherIcon.setAttribute('src','assets/scattered.png');
        }else if(weather==='light rain'){
             weatherIcon.setAttribute('src','assets/light.png');
        }else
            weatherIcon.setAttribute('src','assets/overcast.png');

      })
      .catch(error=>{
        console.log(error);
        alert('please enter a valid place.');
        })
}

// todays date data
let date = document.querySelector('.date');
let today = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
date.textContent = today.toLocaleDateString('en-US', options);