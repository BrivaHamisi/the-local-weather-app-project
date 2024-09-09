<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary">
    <SiteNavigation/>
    <RouterView/>
  </div>
</template>

<script>

import { RouterLink } from 'vue-router';
import SiteNavigation from './components/SiteNavigation.vue'
export default {
  components: {
    SiteNavigation,
    RouterLink
  }
}
</script>

<style lang="scss">

</style>