<template>
  <div>
    <h2 class=" text-center text-4xl font-medium">Watch Your <span class="text-orange-500">Business</span>  Transform Online</h2>
    <h3 class="text-center ">Slide to compare how we boost <span class="text-orange-500">businesses</span>  like yours every day.</h3>
  </div>
  <div class="relative w-full max-w-4xl mx-auto h-72 md:h-96 rounded-xl overflow-hidden shadow-2xl mt-20">
    <div class="absolute inset-0 z-10 pointer-events-none">
      <div
        ref="afterOverlay"
        class="absolute top-0 left-0 h-full bg-cover bg-center transition-all duration-300"
        :style="{ width: sliderX + '%', backgroundImage: `url(${afterImg})` }"
      ></div>
    </div>

    <!-- Before Image -->
    <div
      class="absolute inset-0 bg-cover bg-center"
      :style="{ backgroundImage: `url(${beforeImg})` }"
    ></div>

    <!-- Slider Handle -->
    <div
      ref="handle"
      class="absolute top-0 bottom-0 z-20 w-1 bg-white rounded-full shadow-lg cursor-ew-resize transition-all"
      :style="{ left: sliderX + '%' }"
      @mousedown="startDrag"
      @touchstart="startDrag"
    >
      <div class="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 border-white shadow"></div>
    </div>

    <!-- Text Overlays -->
    <div class="absolute top-4 left-4 z-30 text-white bg-black/50 px-3 py-1 rounded text-sm font-semibold">
      Before
    </div>
    <div class="absolute top-4 right-4 z-30 text-white bg-black/50 px-3 py-1 rounded text-sm font-semibold">
      After
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const beforeImg = new URL('@/assets/img/preafter.png', import.meta.url).href; // Replace with your actual image
const afterImg = new URL('@/assets/img/before.png', import.meta.url).href;

const sliderX = ref(50); // Initial slider position
let isDragging = false;

const startDrag = (e) => {
  isDragging = true;
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('touchmove', onDrag);
  document.addEventListener('touchend', stopDrag);
};

const onDrag = (e) => {
  if (!isDragging) return;
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const bounds = e.target.closest('.relative').getBoundingClientRect();
  const x = ((clientX - bounds.left) / bounds.width) * 100;
  sliderX.value = Math.min(100, Math.max(0, x));
};

const stopDrag = () => {
  isDragging = false;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
  document.removeEventListener('touchmove', onDrag);
  document.removeEventListener('touchend', stopDrag);
};

onBeforeUnmount(() => stopDrag());
</script>
