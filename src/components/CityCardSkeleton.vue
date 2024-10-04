<template>
    <div class="flex py-6 bg-weather-secondary rounded-md shadow-md cursor-pointer">
        <div class="flex flex-col flex-1 gap-2 ml-5">
            <AnimatedPlaceholder class="max-w-[50%]"/>
            <AnimatedPlaceholder class="max-w-[40%]"/>

            <AnimatedPlaceholder class="mt-10 max-w-[20%]"/>
            <AnimatedPlaceholder class="max-w-[20%]"/>
        </div>
        <div class="flex flex-col items-end flex-1 gap-2 mr-5">
            <AnimatedPlaceholder class="max-w-[90px] w-full"/>
            <AnimatedPlaceholder class="max-w-[70px] w-full"/>

            <AnimatedPlaceholder class="mt-10 max-w-[50px] w-full"/>
            <AnimatedPlaceholder class="max-w-[40px] w-full`"/>
        </div>
    </div>
</template>

<script setup>
import AnimatedPlaceholder from './AnimatedPlaceholder.vue';

</script>