<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue';
import Home from '@/components/Home.vue';
import Productive from './components/Productive.vue';
</script>

<template>
  <div class="bg-Dark-blue">
    <RouterView />
    <Home />
  </div>
</template>
