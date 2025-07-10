<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import Logo from '@/assets/img/logo.svg';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <header class="bg-white text-gray-800 fixed top-0 left-0 w-full z-10 font-sans shadow-md bro">
    <div class="container mx-auto p-4 flex justify-between items-center">
      <!-- Logo Section -->
      <div>
        <img :src="Logo" alt="GrowEasy Logo" class="w-16 h-auto" />
        <h3 class="text-orange-500 Logo">GROWLIX</h3>
      </div>

      <!-- Navigation Links -->
      <nav class="flex space-x-4 md:space-x-6">
        <!-- Desktop Navigation -->
        <div class="hidden md:flex space-x-4 md:space-x-6">
          <RouterLink
            to="/"
            class="hover:text-orange-500 focus:outline-none focus:ring focus:ring-orange-200 rounded transition-colors duration-300"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/team"
            class="hover:text-orange-500 focus:outline-none focus:ring focus:ring-orange-200 rounded transition-colors duration-300"
          >
            Team
          </RouterLink>
        </div>

        <!-- Auth Buttons (Desktop) -->
        <div class="hidden md:flex space-x-4">
          <RouterLink
            to="/signin"
            class="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-300 shadow-md"
          >
            Login
          </RouterLink>
          <RouterLink
            to="/signup"
            class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300 shadow-md"
          >
            Sign Up
          </RouterLink>
        </div>

        <!-- Mobile Menu Button -->
        <button @click="toggleMenu" class="md:hidden text-gray-800 focus:outline-none">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </nav>

      <!-- Mobile Menu -->
      <div v-if="isMenuOpen" class="md:hidden absolute top-16 right-4 bg-white text-gray-800 p-4 rounded-lg shadow-lg space-y-2 w-48">
        <RouterLink
          to="/"
          class="block hover:bg-orange-100 p-2 rounded transition-colors duration-300"
          @click="toggleMenu"
        >
          Home
        </RouterLink>
        <RouterLink
          to="/team"
          class="block hover:bg-orange-100 p-2 rounded transition-colors duration-300"
          @click="toggleMenu"
        >
          Team
        </RouterLink>
        <RouterLink
          to="/signin"
          class="block bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition-colors duration-300"
          @click="toggleMenu"
        >
          Login
        </RouterLink>
        <RouterLink
          to="/signup"
          class="block bg-gray-600 text-white p-2 rounded hover:bg-gray-700 transition-colors duration-300"
          @click="toggleMenu"
        >
          Sign Up
        </RouterLink>
      </div>
    </div>
  </header>
</template>