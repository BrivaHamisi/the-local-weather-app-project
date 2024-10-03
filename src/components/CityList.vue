<template>
    <div v-for="cityObject in savedCities" :key="cityObject.id">
        <CityCard :city="cityObject.city" :state="cityObject.state" :weather="cityObject.weather" @click="goToCityView(cityObject)"/>
    </div>
    <p v-if="savedCities.length === 0">
        No Locations added. To start tracking a location, search iin the field above
    </p>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router";
import CityCard from "../components/CityCard.vue"
  
const savedCities = ref([]);
console.log(savedCities)
const getCities = async () => {
    if (localStorage.getItem("savedCities")){
        console.log(localStorage.getItem("savedCities"))
        
        savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
        const requests = [];
        savedCities.value.forEach((cityObject) => {
            console.log(cityObject.city);
            
            requests.push(
                axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityObject.city}&appid=49ac36a5f45a2d371b2bae5347b188f6&units=metric`)//units=imperial
            );
        });

        const weatherData = await Promise.all(requests);

        console.log(weatherData)

        weatherData.forEach((value, index) => {
            savedCities.value[index].weather = value.data; 
            // savedCities.value[index].temperature = data.data.main.temp;
            // savedCities.value[index].humidity = data.data.main.humidity;
            // savedCities.value[index].windSpeed = data.data.wind.speed;
        });
    }
};
await getCities();

const router = useRouter();
const goToCityView = (cityObject) => {
    console.log(cityObject);
    router.push({
        name : "cityView",
        params: {
            city: cityObject.city,
            state: cityObject.state,
            // weather: cityObject.weather
            weather: JSON.stringify(cityObject.weather)
        }
    });
    console.log(city, state, weather);
    // Navigate to CityView with city, state, and weather data
    console.log("Navigating to city view with:", cityObject.city, cityObject.state);
};
</script>