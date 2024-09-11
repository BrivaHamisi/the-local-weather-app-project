<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div v-if="route.query.preview" class="text-white p-4 bg-weather-secondary w-full text-center">
      <p>You are currently Previewing this city, click the "+" icon to start tracking this city</p>
    </div>
    <!-- Weather overview -->
    <div class="flex flex-col items-center text-white py-12">
      <!-- Display the city name -->
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
      <!-- Display the current date and time -->
      <p class="text-sm mb-12">
        {{
          new Date(weatherData.dt).toLocaleDateString(
            "en-us",
            {
              weekday: "short",
              day: "2-digit",
              month: "long",
            }
          )
        }}
        {{
          new Date(weatherData.dt).toLocaleTimeString(
            "en-us",
            {
              timeStyle: "short",
            }
          )
        }}
      </p>
      <p class="text-8xl mb-12">{{
    (() => {
      const tempKelvin = weatherData.main.temp;
      const tempCelsius = (tempKelvin - 273.15).toFixed(1); // Convert Kelvin to Celsius
      // Alternatively, to convert to Fahrenheit: const tempFahrenheit = ((tempKelvin - 273.15) * 9/5 + 32).toFixed(1);
      return `${tempCelsius} °C`; // Use °F for Fahrenheit
    })()
  }}</p>
  <div class="text-center">
    <p>Feels Like {{ (weatherData.main.feels_like - 273.15).toFixed(1) }} °C</p>
    <p class="capitalize">{{ weatherData.weather[0].description }}</p>
  </div>
  <img
        class="w-[150px] h-auto"
        :src="
          `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
        "
        alt=""
      />

    </div>
    <hr class="border-white border-opacity-10 border w-full" />
    
  </div>
</template>

<!-- <script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

// Reactive reference for weather data
const weatherData = ref(null);

// Access the route parameters and query
const route = useRoute();

const getWeatherData = async () => {
  try {
    // Get city and state from query parameters or use defaults
    const city = route.query.city || 'London';
    const state = route.query.state || 'uk';

    // Fetch weather data from OpenWeatherMap API
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${state}&APPID=49ac36a5f45a2d371b2bae5347b188f6`);

    // Assign fetched data to the reactive reference
    weatherData.value = response.data;

    // Log the entire weather data to verify structure
    console.log('Weather Data:', weatherData.value);
    

  } catch (err) {
    // Handle errors and log to the console
    console.error('Error fetching weather data:', err);
  }
};

// Computed properties to format date and time
const formattedDate = computed(() => {
  if (!weatherData.value) return '';
  
  const timestamp = weatherData.value.dt;
  const timezoneOffset = weatherData.value.timezone;

  const utcDate = new Date(timestamp * 1000);
  const cityDate = new Date(utcDate.getTime() + timezoneOffset * 1000);

  return cityDate.toLocaleDateString('en-us', {
    weekday: 'short',
    day: '2-digit',
    month: 'long'
  });
});

const formattedTime = computed(() => {
  if (!weatherData.value) return '';
  
  const timestamp = weatherData.value.dt;
  const timezoneOffset = weatherData.value.timezone;

  const utcDate = new Date(timestamp * 1000);
  const cityDate = new Date(utcDate.getTime() + timezoneOffset * 1000);

  return cityDate.toLocaleTimeString('en-us', {
    timeStyle: 'short'
  });
});

// Fetch weather data when component is mounted
onMounted(() => {
  getWeatherData();
});
</script> -->


<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import { computed, ref } from 'vue';

const route = useRoute();
const getWeatherData = async () => {
  try {
    // Get city and state from query parameters or use defaults
    const city = route.query.city || 'London';
    const state = route.query.state || 'uk';

    const weatherData = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${state}&APPID=49ac36a5f45a2d371b2bae5347b188f6`
    );

    return weatherData.data;

  } catch (err) {
    console.log(err);
  }
};

// Computed properties to format date and time
const formattedDate = computed(() => {
  if (!weatherData.value) return '';
  
  const timestamp = weatherData.dt;
  const timezoneOffset = weatherData.timezone;

  const utcDate = new Date(timestamp * 1000);
  const cityDate = new Date(utcDate.getTime() + timezoneOffset * 1000);

  return cityDate.toLocaleDateString('en-us', {
    weekday: 'short',
    day: '2-digit',
    month: 'long'
  });
});

const formattedTime = computed(() => {
  if (!weatherData.value) return '';
  
  const timestamp = weatherData.dt;
  const timezoneOffset = weatherData.timezone;

  const utcDate = new Date(timestamp * 1000);
  const cityDate = new Date(utcDate.getTime() + timezoneOffset * 1000);

  return cityDate.toLocaleTimeString('en-us', {
    timeStyle: 'short'
  });
});

const weatherData = await getWeatherData();
</script>

