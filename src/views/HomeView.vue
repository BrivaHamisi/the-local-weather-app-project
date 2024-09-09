
<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input type="text" v-model="searchQuery" @input="getSearchResults" name="" id="" placeholder="Search for a City or State" class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]">
    <ul class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
    v-if="mapboxSearchResults">
      <li v-for="searchReult in mapboxSearchResults" :key="searchReult.id"
      class="py-2 cursor-pointer">
      {{ searchReult.place_name }}
      </li>
    </ul>
    </div>
  </main>
</template>

  <script setup>
  import axios from "axios";
  import { ref } from "vue";

  const mapboxAPIKey = "pk.eyJ1IjoiaGFtaXNpZXNxIiwiYSI6ImNtMHV4amdsNDBmcmgyanFzNWt6MzY5YzgifQ.SAZQ9yFKDUcslxw2no801A"
  
  const searchQuery = ref("")
  const queryTimeout = ref(null)
  const mapboxSearchResults = ref(null) ;

  const getSearchResults = () =>{
    clearTimeout(queryTimeout.value) ;
    queryTimeout.value = setTimeout(async() => {
      if(searchQuery.value !== ''){
        const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`) ;
        mapboxSearchResults.value = result.data.features;
        console.log(mapboxSearchResults.value);
        return;
      }
      mapboxSearchResults.value = null;
    }, 300)
  }
  </script>