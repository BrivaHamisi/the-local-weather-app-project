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
        {{ formattedDateTime }}
      </p>
      <p class="text-8xl mb-12">{{ formattedTemperature }}</p>
      <div class="text-center">
        <p>Feels Like {{ formattedFeelsLike }}</p>
        <p class="capitalize">{{ weatherData?.weather[0].description }}</p>
      </div>
      <img
        v-if="weatherData"
        class="w-[150px] h-auto"
        :src="weatherIconUrl"
        :alt="weatherData.weather[0].description"
      />
    </div>
    <hr class="border-white border-opacity-10 border w-full" />
    <!-- More Details -->
     <div class="max-w-screen-md w-full py-12">
     <div class="mx-8 text-white">
      <h2 class="mb-4">More Details</h2>
      <div class="flex gap-10 overflox-x-scroll">
        <div class="flex flex-col gap-4 items-center ">
          Pressure: {{ (weatherData?.main.pressure / 1013.25).toFixed(2)  }} Atmospheres  | 
          Humidity: {{ weatherData?.main.humidity }}% | Sea Level: {{ weatherData?.main.sea_level }} metres | Ground Level: {{ weatherData?.main.grnd_level }} metres | Wind Speed: {{ weatherData?.wind.speed }} m/s
        </div>
      </div>
     </div>
    </div>
    <hr class="border-white border-opacity-10 border w-full" />
    <!-- Coordinates -->
     <div class="max-w-screen-md w-full py-12">
     <div class="mx-8 text-white">
      <h2 class="mb-4">Coordinates</h2>
      <div class="flex gap-4 items-center ">
        Latitude: {{ weatherData?.coord.lat }}° | Longitude: {{ weatherData?.coord.lon }}°
      </div>
     </div>
    </div>
    <div class="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500" @click="removeCity">
      <i class="fa-solid fa-trash"></i>
      <p>Remove City</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { computed, ref, onMounted } from 'vue';

const route = useRoute();
const weatherData = ref(null);
const locationTime = ref(new Date());

const getWeatherData = async () => {
  try {
    const city = route.params.city || 'London';
    const state = route.query.state || '';

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&APPID=49ac36a5f45a2d371b2bae5347b188f6`
    );

    weatherData.value = response.data;
    updateLocationTime();
  } catch (err) {
    console.error(err);
  }
};

const updateLocationTime = () => {
  if (weatherData.value) {
    const timezoneOffset = weatherData.value.timezone; // in seconds
    const utcTime = new Date();
    locationTime.value = new Date(utcTime.getTime() + timezoneOffset * 1000);
  }
};

onMounted(() => {
  getWeatherData();
  // Update time every second
  setInterval(() => {
    updateLocationTime();
  }, 1000);
});

// Computed property for formatted date and time
const formattedDateTime = computed(() => {
  if (!weatherData.value) return '';
  
  return locationTime.value.toLocaleString('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'UTC'
  });
});

// Computed property for formatted temperature
const formattedTemperature = computed(() => {
  if (!weatherData.value) return '';
  const tempCelsius = (weatherData.value.main.temp - 273.15).toFixed(1);
  return `${tempCelsius} °C`;
});

// Computed property for formatted "feels like" temperature
const formattedFeelsLike = computed(() => {
  if (!weatherData.value) return '';
  const feelsLikeCelsius = (weatherData.value.main.feels_like - 273.15).toFixed(1);
  return `${feelsLikeCelsius} °C`;
});

// Computed property for weather icon URL
const weatherIconUrl = computed(() => {
  if (!weatherData.value) return '';
  return `https://openweathermap.org/img/wn/${weatherData.value.weather[0].icon}@2x.png`;
});

// Function to remove city from local storage
const router = useRouter()
const removeCity = () => {
  console.log("Removing city from local storage:Button Clicked")
  const cities = JSON.parse(localStorage.getItem('savedCities') || '[]');

  // Find the index of the city object by comparing the city name
  const index = cities.findIndex((cityObject) => cityObject.city === route.params.city);

  if (index > -1) {
    cities.splice(index, 1);  // Remove the city from the array
    localStorage.setItem('savedCities', JSON.stringify(cities));  // Save the updated array back to localStorage
  }

  // Redirect to home page
  router.push('/');
};
</script>