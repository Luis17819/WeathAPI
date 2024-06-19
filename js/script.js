const apiKey  = "2cc1d3f57f9e6bdfe2c5d51d8c341c38";

const cityInput =  document.querySelector("#city-input");
const searchBtn =  document.querySelector("#search");

const cityElement =  document.querySelector("#city");
const tempElement =  document.querySelector("#temperature span");
const descElement =  document.querySelector("#description");
const weatherIconElement =  document.querySelector("#weather-icon");

const weatherContainer = document.querySelector('#weather-data');
const errorMessage = document.querySelector('#error-message');

const getWeatherData = async (city) => { //pega as informaçoes da API
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    try {
        const res = await fetch(apiWeatherUrl);
        const data = await res.json();

        if (res.status !== 200) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        throw error;
    }
};

const showWeatherData = async (city) => { //Mostra as informaçoes da API
    try {
        const data = await getWeatherData(city);

        cityElement.innerText = data.name;
        tempElement.innerText = parseInt(data.main.temp);
        descElement.innerText = data.weather[0].description;
        weatherIconElement.setAttribute(
            "src",
            `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        );
        weatherContainer.classList.remove("hide");
        errorMessage.classList.add("hide");
    } catch (error) {
        weatherContainer.classList.add("hide");
        errorMessage.innerText = "Cidade não encontrada. Por favor, tente novamente.";
        errorMessage.classList.remove("hide");
    }
};

searchBtn.addEventListener("click", (e) => { //Envio
    e.preventDefault();

    const city = cityInput.value;
    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {//Envio
    if (e.code === "Enter") {
        const city = e.target.value;
        showWeatherData(city);
    }
});
