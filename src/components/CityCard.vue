<template>
    <div class="flex py-6 bg-weather-secondary rounded-md shadow-md cursor-pointer">
        <div class="flex flex-col flex-1">
            <h2 class="text-3xl ml-5">{{ city }}</h2>
            <h3 class="ml-5">{{ state }}</h3>
            <p class="text-sm ml-5 font-light ">{{ weather.weather[0].description }}</p>
            <!-- Display humidity and wind speed -->
            <p class="text-sm ml-5 mt-10 font-light">Humidity: {{ weather.main.humidity }}%</p>
             <p class="text-sm ml-5 font-light">Wind: {{ weather.wind.speed }} m/s</p>
        </div>
        <div class="flex flex-col gap-2">
            <!-- Display weather icon -->
             <span class="text-xs">
                <p class="text-3xl mr-10 self-end">{{ weather.main.temp }}°C</p>
                <img :src="getIconUrl(weather.weather[0].icon)" alt="Weather Icon" class="w-16 h-16 self-end mr-10" />
             </span>
             <div class="flex flex-col gap-2">
             <!-- Displam Max and Min Tempreratue -->
             <span class="text-xs">
              <p class="text-sm ml-5 font-light">Max: {{ weather.main.temp_max }}°C</p>
            </span>
            <span class="text-xs">
             <p class="text-sm ml-5 font-light">Min: {{ weather.main.temp_min }}°C</p>
            </span>

             </div>
            
            
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    weather: {
        type: Object,
        required: true
    }
});

// Function to get the icon URL based on the icon code
const getIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
};
</script>
