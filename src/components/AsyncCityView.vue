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
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
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
</script>