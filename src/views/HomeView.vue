
<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input type="text" v-model="searchQuery" @input="getSearchResults" name="" id="" placeholder="Search for a City or State" class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]">
    <ul class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
    v-if="mapboxSearchResults">
    <p v-if="searchError">Sorry, Something went wrong, Please Try again </p>
    <p v-if="!searchError && mapboxSearchResults.length === 0"> No Results match your query, try a different term</p>
     
    <template v-else>
      <li v-for="searchResult in mapboxSearchResults" :key="searchResult.id"
      class="py-2 cursor-pointer" @click="previewCity(searchResult)">
      {{ searchResult.place_name }}
      </li>
    </template>
    </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList/>
        <template #fallback>
          <CityCardSkeleton/>
        </template>
      </Suspense>
    </div> 
  </main>
</template>

  <script setup>
  import axios from "axios";
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import CityList from "../components/CityList.vue";
  import CityCardSkeleton from "../components/CityCardSkeleton.vue";

  const router = useRouter();

  
  const previewCity =  (searchResult) => {
    console.log(searchResult);

    const [city, state] = searchResult.place_name.split(",")
    router.push({
      name: 'cityView',
      // params: { state:state.replaceAll(",", ""), city:city},
      params: { city: city, state: state },
      // query:{
      //   lat: searchResult.geometry.coordinates[1],
      //   lng: searchResult.geometry.coordinates[0],
      //   preview: true
      // }
      query: {
      city: city.trim(),
      state: state.trim(),
      preview: true,
    },
    })
  }

  const mapboxAPIKey = "pk.eyJ1IjoiaGFtaXNpZXNxIiwiYSI6ImNtMHV4amdsNDBmcmgyanFzNWt6MzY5YzgifQ.SAZQ9yFKDUcslxw2no801A"
  
  const searchQuery = ref("")
  const queryTimeout = ref(null)
  const mapboxSearchResults = ref(null);
  const searchError = ref(null);

  const getSearchResults = () =>{
    clearTimeout(queryTimeout.value) ;
    queryTimeout.value = setTimeout(async() => {
      if(searchQuery.value !== ''){
        try{
          const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`) ;
        mapboxSearchResults.value = result.data.features;
        console.log(mapboxSearchResults.value);
        }catch{
          searchError.value = true
        }
        
        return;
      }
      mapboxSearchResults.value = null;
    }, 300)
  }
  </script>