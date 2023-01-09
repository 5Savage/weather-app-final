

function formatDate(timestamp){
   let date=new Date(timestamp);
   let hours=date.getHours();
   if (hours<10){
    hours=`0${hours}`;}

   let minutes= date.getMinutes();
   if (minutes<10){
    minutes=`0${minutes}`;}

    let days= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    console.log(date);
    let day= days[date.getDay()];    
    return `${day} ${hours}:${minutes}`;
}



function displayTemperature(response){

    let temperatureElement=document.querySelector("#temperature");
    let cityElement=document.querySelector("#city");
    let descriptionElement=document.querySelector("#description");
    let humidityElement=document.querySelector("#humidity");
    let windElement=document.querySelector("#wind");
    let dateElement=document.querySelector("#date");
    let iconElement=document.querySelector("#icon");

    celsiusTemperature= response.data.temperature.current;

    temperatureElement.innerHTML= Math.round(celsiusTemperature);
    cityElement.innerHTML=response.data.city;
    descriptionElement.innerHTML=response.data.condition.description;
    humidityElement.innerHTML=response.data.temperature.humidity;
    windElement.innerHTML=Math.round(response.data.wind.speed);
    dateElement.innerHTML= formatDate(response.data.time*1000);
    iconElement.setAttribute(`src`,
response.data.condition.icon_url
);
    iconElement.setAttribute(`alt`, response.data.condition.description);
}

function search(city){
let apiKey="1e1dc2b07543227bfo243f03dtab9c5f";
let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement=document.querySelector("#city-input");
    search(cityInputElement.value);
}

function displayFahrenheitTemp(event){
    event.preventDefault();
    let temperatureElement=document.querySelector("#temperature");
    let fahrenheitTemp= (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML=Math.round(fahrenheitTemp);
}

function displayCelsiusTemp(event){
    event.preventDefault();
    let temperatureElement=document.querySelector("#temperature");
    temperatureElement.innerHTML= Math.round(celsiusTemperature);
}

let celsiusTemperature= null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheit= document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", displayFahrenheitTemp);

let celsiusLink= document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);


search("New York");