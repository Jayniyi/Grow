<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';

// Import images dynamically
const mapImage = new URL('../assets/img/Map-image.jpg', import.meta.url).href;
const websiteImage = new URL('../assets/img/Growlik-web.png', import.meta.url).href;
const adsImage = new URL('../assets/img/boost.jpg', import.meta.url).href;
const brandingImage = new URL('../assets/img/brand.jpg', import.meta.url).href;

// Slideshow data
const slides = ref([
  {
    title: 'Get Your Business on Google Maps',
    description: 'Boost local visibility with seamless Google Maps integration.',
    image: mapImage,
    cta: 'Explore Maps',
    ctaLink: '/maps',
  },
  {
    title: 'Custom Websites That Convert',
    description: 'Launch a professional, responsive website tailored to your brand.',
    image: websiteImage,
    cta: 'Build Your Site',
    ctaLink: '/websites',
  },
  {
    title: 'Boost Your Brand with Digital Ads',
    description: 'Reach your audience with targeted ad campaigns on Meta, Google, and X.',
    image: adsImage,
    cta: 'Launch Ads Now',
    ctaLink: '/ads',
  },
  {
    title: 'Create Impactful Branding Materials',
    description: 'Design professional flyers, logos, and visuals to make your brand stand out.',
    image: brandingImage,
    cta: 'Design Your Brand',
    ctaLink: '/branding',
  },
]);

// Slideshow state
const currentSlide = ref(0);

// Auto-slide functionality with debug logging
let slideInterval = null;
const startSlideShow = () => {
  console.log('Starting slideshow...');
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.value.length;
    console.log(`Slide changed to index: ${currentSlide.value}`);
  }, 5000); // Change slide every 5 seconds
};

const stopSlideShow = () => {
  console.log('Stopping slideshow...');
  clearInterval(slideInterval);
};

// Manual slide navigation
const goToSlide = (index) => {
  console.log(`Navigating to slide: ${index}`);
  currentSlide.value = index;
  stopSlideShow();
  startSlideShow();
};

// Lifecycle hooks
onMounted(() => {
  console.log('Component mounted, starting slideshow');
  startSlideShow();
});
onUnmounted(() => {
  console.log('Component unmounted, stopping slideshow');
  stopSlideShow();
});
</script>

<template>
  <section class="bg-white min-h-screen flex items-center justify-center pt-24 font-sans">
    <div class="container mx-auto px-4 py-16 text-center">
      <!-- Hero Content -->
      <h1 class="text-4xl md:text-6xl font-bold text-gray-800 mb-4 animate-fade-in">
        Gowlix: Elevate Your Business Online
      </h1>
      <p class="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-slide-up">
        Transform your business with Gowlix—your all-in-one platform for Google Maps visibility, stunning websites, targeted ads, and professional branding.
      </p>
      <div class="flex justify-center space-x-4 mb-12">
        <RouterLink
          to="/signup"
          class="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          Get Started
        </RouterLink>
        <RouterLink
          to="/learn-more"
          class="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          Learn More
        </RouterLink>
      </div>

      <!-- Slideshow -->
      <div class="mt-12 max-w-6xl mx-auto">
        <div class="relative overflow-hidden rounded-xl shadow-2xl">
          <!-- Slide Content -->
          <div v-for="(slide, index) in slides" :key="index" class="w-full h-full">
            <div
              v-show="currentSlide === index"
              class="transition-opacity duration-1000 ease-in-out"
              :class="{ 'opacity-100': currentSlide === index, 'opacity-0 absolute top-0 left-0': currentSlide !== index }"
            >
              <img
                :src="slide.image"
                :alt="slide.title"
                class="w-full h-80 md:h-[28rem] object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div
                class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-800 to-transparent bg-opacity-95 p-6 transform transition-all duration-500 hover:bg-opacity-100"
              >
                <h2 class="text-xl md:text-3xl font-bold text-white drop-shadow-md">{{ slide.title }}</h2>
                <p class="text-sm md:text-lg mt-2 text-white drop-shadow-sm">{{ slide.description }}</p>
                <RouterLink
                  :to="slide.ctaLink"
                  class="mt-4 inline-block bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  {{ slide.cta }}
                </RouterLink>
              </div>
            </div>
          </div>

          <!-- Navigation Dots -->
          <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-3">
            <button
              v-for="(slide, index) in slides"
              :key="index"
              @click="goToSlide(index)"
              :class="[
                'w-4 h-4 rounded-full transition-all duration-300',
                currentSlide === index ? 'bg-orange-500 scale-125' : 'bg-gray-300 hover:bg-orange-200'
              ]"
            ></button>
          </div>

          <!-- Navigation Arrows -->
          <button
            @click="goToSlide((currentSlide - 1 + slides.length) % slides.length)"
            class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-orange-500 bg-opacity-80 text-white p-3 rounded-full hover:bg-orange-600 hover:bg-opacity-90 transition-all duration-300"
          >
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <button
            @click="goToSlide((currentSlide + 1) % slides.length)"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-orange-500 bg-opacity-80 text-white p-3 rounded-full hover:bg-orange-600 hover:bg-opacity-90 transition-all duration-300"
          >
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Smooth transitions for slideshow */
.transition-opacity {
  transition: opacity 1s ease-in-out;
}

/* Fade-in animation for title */
.animate-fade-in {
  animation: fadeIn 1s ease-in-out;
}

/* Slide-up animation for description */
.animate-slide-up {
  animation: slideUp 1s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Text shadow for better readability */
.drop-shadow-md {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
}

.drop-shadow-sm {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
}
</style>