<script setup>
import Navbar from '@/components/Navbar.vue'
import HeroSection from '@/components/Hero.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

// Pricing plans data
const plans = ref([
  {
    name: 'Basic',
    monthlyPrice: '$49',
    yearlyPrice: '$588',
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
    link: '/signup?plan=basic',
    features: [
      { text: 'Google Maps Optimization (Single location, standard setup)', available: true },
      { text: 'Custom Website', available: false },
      { text: 'Social Media Ad Campaigns (1 Campaign - Facebook)', available: true },
      { text: 'Branding Materials (Basic)', available: true },
      { text: 'Social Media Handling (1 Platform, 5 posts/month)', available: true },
      { text: 'Customer Review Management', available: false },
      { text: 'SEO Tools', available: false },
      { text: 'Analytics Dashboard', available: false },
      { text: 'Email Marketing', available: false },
    ],
  },
  {
    name: 'Pro',
    monthlyPrice: '$99',
    yearlyPrice: '$1188',
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    link: '/signup?plan=pro',
    recommended: true,
    features: [
      { text: 'Google Maps Optimization (Multiple locations, basic analytics)', available: true },
      { text: 'Custom Website (Up to 5 Pages)', available: true },
      { text: 'Social Media Ad Campaigns (3 Campaigns - X, Google, Instagram)', available: true },
      { text: 'Branding Materials (Standard)', available: true },
      { text: 'Social Media Handling (3 Platforms, 15 posts/month, analytics)', available: true },
      { text: 'Customer Review Management (Basic)', available: true },
      { text: 'SEO Tools (Basic)', available: true },
      { text: 'Analytics Dashboard (Basic)', available: true },
      { text: 'Email Marketing (500 emails/month)', available: true },
    ],
  },
  {
    name: 'Premium',
    monthlyPrice: '$199',
    yearlyPrice: '$2268', // 5% discount: $199 * 12 * 0.95 = $2268.6, rounded to $2268
    icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z',
    link: '/signup?plan=premium',
    features: [
      { text: 'Google Maps Optimization (Advanced)', available: true },
      { text: 'Custom Website (Unlimited Pages + Ecommerce)', available: true },
      { text: 'Social Media Ad Campaigns (Unlimited)', available: true },
      { text: 'Branding Materials (Premium)', available: true },
      { text: 'Social Media Handling (Unlimited Platforms, 50 posts/month)', available: true },
      { text: 'Customer Review Management (Advanced)', available: true },
      { text: 'SEO Tools (Advanced)', available: true },
      { text: 'Analytics Dashboard (Advanced)', available: true },
      { text: 'Email Marketing (2,000 emails/month)', available: true },
    ],
  },
])

// Toggle between monthly and yearly pricing
const isYearly = ref(false)

// Testimonial data (single placeholder)
const testimonials = ref([
  {
    name: 'A Happy Customer',
    business: 'Your Future Client',
    quote: 'Growlix is set to transform my business with its innovative tools!',
    image: 'https://via.placeholder.com/100',
  },
])

// Founder data (just you)
const founder = ref({
  name: 'Your Name',
  role: 'Founder & Creator',
  image: 'https://via.placeholder.com/150', // Replace with your actual image URL
})

// Tips data with hover notes
const tipsContent = ref([
  {
    title: '5 Tips to Boost Google Maps',
    description: 'Learn how to increase your local visibility.',
    note: 'Optimize your listing with keywords and photos.',
    image: 'https://via.placeholder.com/300x200',
  },
  {
    title: 'Effective Flyer Design',
    description: 'Create flyers that grab attention.',
    note: 'Use bold colors and clear CTAs.',
    image: 'https://via.placeholder.com/300x200',
  },
  {
    title: 'Ad Campaign Strategies',
    description: 'Maximize your ROI with smart ads.',
    note: 'Target local audiences with precise ads.',
    image: 'https://via.placeholder.com/300x200',
  },
])

// Form and FAQ state
const formData = ref({ name: '', email: '', business: '' })
const formError = ref('')
const formSuccess = ref('')
const faqOpen = ref(null)
const question = ref('')
const questionSubmitted = ref(false)
const randomTip = ref('')

const tips = [
  'Update your Google Maps listing weekly to stay relevant.',
  'Use bold colors in flyers to grab attention.',
  'Test different ad platforms to find your best ROI.',
]

const faqQuestions = ref([
  {
    question: 'How do I get started?',
    answer: 'Sign up on our platform, choose a plan, and our team will guide you through setup.',
  },
  {
    question: 'What’s included in each plan?',
    answer: 'Check our pricing table for detailed features per plan.',
  },
  {
    question: 'Can I upgrade my plan?',
    answer: 'Yes, you can upgrade anytime via your dashboard.',
  },
])

const submitNewsletter = () => {
  // Placeholder for newsletter submission logic
  formError.value = ''
  formSuccess.value = 'Subscribed successfully!'
  setTimeout(() => (formSuccess.value = ''), 3000)
}

const submitForm = () => {
  if (!formData.value.name || !formData.value.email || !formData.value.business) {
    formError.value = 'Please fill in all fields.'
    formSuccess.value = ''
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    formError.value = 'Please enter a valid email.'
    formSuccess.value = ''
    return
  }
  formError.value = ''
  formSuccess.value = 'Thank you! We’ll contact you soon.'
  formData.value = { name: '', email: '', business: '' }
}

const toggleFAQ = (id) => {
  faqOpen.value = faqOpen.value === id ? null : id
}

const submitQuestion = () => {
  question.value = ''
  questionSubmitted.value = true
  gsap.fromTo(
    '.question-feedback',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
  )
  setTimeout(() => (questionSubmitted.value = false), 3000)
}

const showRandomTip = () => {
  randomTip.value = tips[Math.floor(Math.random() * tips.length)]
  gsap.fromTo(
    '.random-tip',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
  )
}

// Quiz logic
const questions = ref([
  {
    text: 'What’s the best ad platform for local reach?',
    options: ['Facebook', 'Google', 'Instagram', 'X'],
    answer: 1,
  },
  {
    text: 'How often should you update your website?',
    options: ['Monthly', 'Quarterly', 'Yearly', 'Never'],
    answer: 0,
  },
  {
    text: 'Which improves SEO the most?',
    options: ['Images', 'Keywords', 'Colors', 'Fonts'],
    answer: 1,
  },
])
const currentQuestion = ref(null)
const selectedAnswer = ref(null)
const score = ref(null)

const startQuiz = () => {
  if (questions.value.length > 0) {
    currentQuestion.value = 0
    selectedAnswer.value = null
    score.value = null
    gsap.fromTo(
      '.quiz-container',
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
    )
  }
}

const selectAnswer = (index) => {
  selectedAnswer.value = index
  gsap.fromTo(
    `.answer-${index}`,
    { scale: 0.95 },
    { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.3)' },
  )
}

const nextQuestion = () => {
  if (selectedAnswer.value === questions.value[currentQuestion.value]?.answer) {
    score.value = (score.value || 0) + 1
  }
  if (currentQuestion.value >= questions.value.length - 1) {
    currentQuestion.value = null
  } else {
    currentQuestion.value++
    selectedAnswer.value = null
  }
}

// Scroll and hover animations
onMounted(() => {
  gsap.utils.toArray('.section').forEach((section) => {
    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    })
  })

  gsap.utils.toArray('.card').forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      x: index % 2 === 0 ? -100 : 100,
      duration: 0.8,
      delay: index * 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
      },
    })
  })

  const tipCards = gsap.utils.toArray('.tip-card')
  tipCards.forEach((card) => {
    const note = card.querySelector('.tip-note')
    const onEnter = () => gsap.to(note, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' })
    const onLeave = () => gsap.to(note, { opacity: 0, y: 10, duration: 0.3, ease: 'power2.in' })
    card.addEventListener('mouseenter', onEnter)
    card.addEventListener('mouseleave', onLeave)
    // Store for cleanup
    card._gsapEvents = { onEnter, onLeave }
  })
})
const TipsContent = ref([
  {
    title: '5 Tips to Boost Google Maps',
    description: 'Learn how to increase your local visibility with these expert strategies.',
    note: 'Update your listing weekly for best results!',
  },
  {
    title: 'Effective Flyer Design',
    description: 'Create flyers that grab attention and drive customer engagement.',
    note: 'Use bold colors to stand out!',
  },
  {
    title: 'Ad Campaign Strategies',
    description: 'Maximize your ROI with targeted ads on multiple platforms.',
    note: 'Test different platforms to find your sweet spot!',
  },
]);
onUnmounted(() => {
  gsap.utils.toArray('.tip-card').forEach((card) => {
    if (card._gsapEvents) {
      card.removeEventListener('mouseenter', card._gsapEvents.onEnter)
      card.removeEventListener('mouseleave', card._gsapEvents.onLeave)
      delete card._gsapEvents
    }
  })
})

</script>

<template>
  <div class="bg-white">
    <!-- Navbar and Hero -->
    <Navbar />
    <HeroSection />

    <!-- Platform Benefits Section -->
    <!-- Platform Benefits Section -->
    <section class="py-20 bg-gradient-to-b from-white to-gray-50 section">
      <div class="container mx-auto px-4 text-center">
        <h2
          class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-green-500"
        >
          Why <span class="text-orange-500">Growlix</span> is Your Growth Partner
        </h2>
        <p class="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
          We combine cutting-edge technology with proven marketing strategies to deliver real
          results for your business.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <!-- All-in-One Solution -->
          <div
            class="card bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:from-orange-500 hover:to-green-500"
          >
            <div class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="#F97316">
                <path
                  d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">All-in-One Solution</h3>
            <p class="text-gray-600">
              From Google Maps optimization to social media management, we've got every aspect of
              your digital presence covered.
            </p>
          </div>
          <!-- Lightning Fast Results -->
          <div
            class="card bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:bg-gradient-to-r hover:from-orange-500 hover:to-green-500"
          >
            <div class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#F97316">
                <path
                  d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288l111.5 0L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7l-111.5 0L349.4 44.6z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Lightning Fast Results</h3>
            <p class="text-gray-600">
              Our optimized strategies deliver noticeable improvements in your online visibility
              within weeks, not months.
            </p>
          </div>
          <!-- Data-Driven Security -->
          <div
            class="card bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:bg-gradient-to-r hover:from-orange-500 hover:to-green-500"
          >
            <div class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#F97316">
                <path
                  d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Data-Driven Security</h3>
            <p class="text-gray-600">
              Your business data is protected with enterprise-grade security while we use analytics
              to drive your growth.
            </p>
          </div>
        </div>
        <!-- Rest of the section remains unchanged -->
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="py-20 bg-gradient-to-b from-gray-50 to-white section overflow-hidden">
      <div class="container mx-auto px-4 text-center">
        <h2
          class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-green-500"
        >
          Simple, Transparent Pricing
        </h2>
        <p class="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
          Choose the perfect plan for your business needs. All plans include our 30-day money-back
          guarantee.
        </p>
        <!-- Pricing toggle -->
        <div class="flex justify-center mb-12">
          <div class="bg-gray-100 p-1 rounded-full shadow-inner flex">
            <button
              @click="isYearly = false"
              :class="[
                'px-6 py-2  sm:px-8 sm:py-3 rounded-full font-semibold transition-all duration-300',
                !isYearly
                  ? 'bg-gradient-to-r from-orange-500 bg-orange-500 to-green-500 text-white shadow-lg scale-105'
                  : 'text-gray-600  hover:text-gray-800 bg-gray-200',
              ]"
              aria-pressed="!isYearly"
            >
              Monthly Billing
            </button>
            <button
              @click="isYearly = true"
              :class="[
                'px-6 py-2 sm:px-8  sm:py-3 rounded-full font-semibold transition-all duration-300',
                isYearly
                  ? 'bg-gradient-to-r bg-orange-500 from-orange-500 to-green-500 text-white shadow-lg scale-105'
                  : 'text-gray-600  hover:text-gray-800 bg-gray-200',
              ]"
              aria-pressed="isYearly"
            >
              Yearly Billing
              <span
                class="text-xs bg-green-600 bg-orange-500 text-white py-1 px-2 rounded-full ml-2"
                >Save 5%</span
              >
            </button>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(plan, index) in plans"
            :key="index"
            class="card backdrop-blur-lg p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden border-2"
            :class="{
              'border-orange-300 ': !plan.recommended,
              'border-cyan-400': plan.recommended,
            }"
          >
            <div
              v-if="plan.recommended"
              class="absolute top-0 right-0 bg-cyan-500 text-white px-4 py-1 rounded-bl-lg text-sm font-semibold"
            >
              Most Popular
            </div>
            <svg
              class="w-12 h-12 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              :class="{ 'text-orange-500': !plan.recommended, 'text-cyan-500': plan.recommended }"
            >
              <path
                :d="plan.icon"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </svg>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ plan.name }}</h3>
            <p
              class="text-3xl font-bold mb-4"
              :class="{ 'text-orange-500': !plan.recommended, 'text-cyan-500': plan.recommended }"
            >
              {{ isYearly ? plan.yearlyPrice : plan.monthlyPrice
              }}<span class="text-sm text-gray-600">{{ isYearly ? '/yr' : '/mo' }}</span>
            </p>
            <ul class="text-gray-600 mb-6 space-y-3 text-left">
              <li v-for="(feature, fIndex) in plan.features" :key="fIndex" class="flex items-start">
                <svg
                  v-if="feature.available"
                  class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  :class="{
                    'text-orange-500': !plan.recommended,
                    'text-cyan-500': plan.recommended,
                  }"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <svg
                  v-else
                  class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span :class="{ 'text-gray-400': !feature.available }">{{ feature.text }}</span>
              </li>
            </ul>
            <RouterLink
              :to="plan.link"
              class="block px-6 py-3 bg-orange-500 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              :class="{
                'bg-gradient-to-r from-orange-500 bg-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white': true,
              }"
            >
              {{ plan.recommended ? 'Get Started Today' : 'Choose Plan' }}
              <span v-if="plan.recommended" class="ml-2 animate-pulse">→</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section (Minimal) -->
    <section class="py-20 bg-gradient-to-b from-white to-gray-50 section overflow-hidden">
      <div class="container mx-auto px-4 text-center">
        <h2
          class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-green-500"
        >
          Voices <span class="text-orange-500">of</span> Success
        </h2>
        <p class="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          See how Growlix is transforming businesses with real success stories.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div
            class="card bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden group"
          >
            <div
              class="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden  ring-orange-200/50"
            >
              <img
                src="../assets/img/fce.jpg"
               
            </div>
            <div class="text-center">
              <p
                class="text-gray-700 italic text-lg mb-4 leading-relaxed before:content-['“'] after:content-['”']"
              >
                {{ testimonials[0].quote }}
              </p>
              <h3 class="text-xl font-semibold text-gray-900 mb-1">{{ testimonials[0].name }}</h3>
              <p class="text-gray-500 text-sm">{{ testimonials[0].business }}</p>
            </div>
            <div
              class="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-orange-500 to-green-500 opacity-20 rounded-full blur-xl group-hover:opacity-40 transition-opacity duration-300"
            ></div>
          </div>
          <!-- Add more testimonial cards as needed -->
          <div
            class="card bg-white/80  p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden group"
          >
            <div
              class="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-orange-200/50"
            >
              <img
                src="../assets/img/test1.jpg"
                alt="Another Happy Customer"
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div class="text-center">
              <p
                class="text-gray-700 italic text-lg mb-4 leading-relaxed before:content-['“'] after:content-['”']"
              >
                Growlix helped us double our online traffic in just one month!
              </p>
              <h3 class="text-xl font-semibold text-gray-900 mb-1">Another Happy Customer</h3>
              <p class="text-gray-500 text-sm">Thriving Local Business</p>
            </div>
            <div
              class="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-orange-500 to-green-500 opacity-20 rounded-full blur-xl group-hover:opacity-40 transition-opacity duration-300"
            ></div>
          </div>
          <div
            class="card bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden group"
          >
            <div
              class="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden  ring-orange-200/50"
            >
              <img
                src="../assets/img/test2.jpg"
                alt="Satisfied Entrepreneur"
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div class="text-center">
              <p
                class="text-gray-700 italic text-lg mb-4 leading-relaxed before:content-['“'] after:content-['”']"
              >
                The analytics dashboard from Growlix is a game-changer for my strategy!
              </p>
              <h3 class="text-xl font-semibold text-gray-900 mb-1">Satisfied Entrepreneur</h3>
              <p class="text-gray-500 text-sm">Growing Startup</p>
            </div>
            <div
              class="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-orange-500 to-green-500 opacity-20 rounded-full blur-xl group-hover:opacity-40 transition-opacity duration-300"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <!-- About the Founder Section -->
<section class="py-20 bg-gradient-to-b from-gray-900 to-gray-700 text-white section overflow-hidden">
  <div class="container mx-auto px-4 text-center relative bg">
    <h2 class="text-3xl md:text-4xl font-bold mb-8 text-orange-500 animate-fade-in">
      The Visionary Behind Growlix
    </h2>
    <div class="max-w-sm mx-auto relative z-10 ">
      <div
        class=" overflow-hidden p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-orange-500"
      >
        <div class="w-24 h-24 md:w-28 md:h-28 mx-auto mb-4 rounded-full overflow-hidden">
          <img
            src="../assets/img/ceo.jpg" 
            alt="Founder"
            class="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"

          />
        </div>
        <h3 class=" text-gray-600 text-xl md:text-2xl font-bold  mb-2">Obasan Joseph Olaniyi</h3> <!-- Hardcoded name -->
        <p class="text-gray-600 mb-3">Developer & Cybersecurity Enthusiast</p> <!-- Hardcoded role -->
        <p class="text-gray-800 text-sm md:text-base leading-relaxed">
          As a Computer Science graduate, I’m channeling my expertise into Growlix, blending innovative development skills with a growing focus on cybersecurity. My mission is to secure and empower businesses with cutting-edge growth tools, making success accessible and safe for all.
        </p>
      </div>
    </div>
    <RouterLink
      to="/about"
      class="mt-6 inline-block bg-gradient-to-r bg-orange-600 from-orange-500 to-green-500 text-white px-4 py-2 md:px-5 md:py-2 rounded-full hover:from-orange-600 hover:to-green-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 animate-bounce-slow"
    >
      Discover My Journey
    </RouterLink>
    <div class="absolute -top-8 -left-8 w-40 h-40 bg-green-400/10 rounded-full blur-xl opacity-50 animate-blob"></div>
    <div class="absolute -bottom-8 -right-8 w-52 h-52 bg-orange-400/10 rounded-full blur-xl opacity-50 animate-blob delay-2000"></div>
  </div>
</section>
    <!-- Growth Hacks & Insights Section -->
<section class="py-20 bg-white section overflow-hidden">
  <div class="container mx-auto px-4 text-center">
    <h2
      class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-green-500"
    >
      Growth Hacks & Insights
    </h2>
    <p class="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
      Discover expert tips to skyrocket your business success.
    </p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div
        v-for="(tip, index) in TipsContent"
        :key="index"
        class="tip-card card bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 relative group"
      >
        <img
          v-if="index === 0"
          src="../assets/img/Boost-map.jpg"
          alt="Boost Google Maps"
          class="w-full h-48 object-cover rounded-xl mb-6"
          loading="lazy"
        />
        <img
          v-if="index === 1"
          src="../assets/img/boost2.jpg"
          alt="Effective Flyers"
          class="w-full h-48   rounded-xl mb-6"
          loading="lazy"
        />
        <img
          v-if="index === 2"
          src="../assets/img/ads.jpg"
          alt="Ad Campaign Strategies"
          class="w-full h-48 object-cover rounded-xl mb-6"
          loading="lazy"
        />
        <h3 class="text-xl font-semibold text-gray-900 mb-4">{{ tip.title }}</h3>
        <p class="text-gray-600 mb-6">{{ tip.description }}</p>
      </div>
    </div>

    <a
      href="#discover-more"
      class="mt-8 inline-block bg-orange-500 text-white px-8 py-4 rounded-full hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
    >
      Discover More
    </a>
  </div>
</section>

    <!-- FAQ Section -->
    <section class="py-20 bg-gradient-to-b from-white to-orange-50 section">
      <div class="container mx-auto px-4 text-center">
        <h2
          class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-green-500"
        >
          Your Questions, Answered
        </h2>
        <p class="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Find answers to common questions or ask us directly for personalized support.
        </p>
        <div class="max-w-3xl mx-auto space-y-4">
          <div
            v-for="(faq, index) in faqQuestions"
            :key="index"
            class="card bg-white/90 backdrop-blur-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-102"
          >
            <button
              @click="toggleFAQ(index + 1)"
              class="w-full text-left p-6 text-gray-900 font-semibold text-lg focus:outline-none flex justify-between items-center hover:bg-orange-50/50 transition-colors duration-300"
              :aria-expanded="faqOpen === index + 1"
              :aria-controls="'faq-' + index"
            >
              <span>{{ faq.question }}</span>
              <span
                :class="{ 'rotate-180': faqOpen === index + 1 }"
                class="transform transition-transform duration-300"
              >
                <svg
                  class="w-6 h-6 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </button>
            <transition name="faq-slide">
              <div
                v-if="faqOpen === index + 1"
                :id="'faq-' + index"
                class="p-6 text-gray-700 bg-gradient-to-b from-white to-gray-50"
              >
                {{ faq.answer }}
              </div>
            </transition>
          </div>
        </div>
        <form
          @submit.prevent="submitQuestion"
          class="mt-12 max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-4"
        >
          <input
            v-model="question"
            type="text"
            placeholder="Ask a question"
            class="w-full p-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-orange-300/50 bg-white/90 backdrop-blur-sm border-2 border-orange-300/50 placeholder-gray-500"
          />
          <button
            type="submit"
            class="bg-gradient-to-r from-orange-500 to-green-500 text-white px-8 py-4 rounded-full hover:from-orange-600 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 animate-pulse"
          >
            Ask Now
          </button>
        </form>
        <p
          v-if="questionSubmitted"
          class="question-feedback mt-6 text-green-600 font-semibold text-lg"
        >
          Thank you! We’ll get back to you soon.
        </p>
      </div>
    </section>

    <!-- Business Growth Quiz Section -->
    <section class="py-20 bg-gradient-to-b from-orange-50 to-green-50 section">
      <div class="container mx-auto px-4 text-center">
        <h2
          class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-green-500"
        >
          Boost Your Business IQ
        </h2>
        <p class="text-lg text-gray-600 mb-12 max-w-xl mx-auto">
          Take our fun quiz to test your growth knowledge and unlock expert tips!
        </p>
        <div
          class="quiz-container max-w-xl mx-auto bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl transform hover:scale-102 transition-all duration-300"
        >
          <div
            v-if="currentQuestion !== null && questions.value[currentQuestion.value]"
            class="space-y-6"
          >
            <p class="text-2xl text-gray-900 font-semibold mb-6">
              {{ questions.value[currentQuestion.value].text }}
            </p>
            <div class="grid grid-cols-1 gap-4">
              <button
                v-for="(option, index) in questions.value[currentQuestion.value].options"
                :key="index"
                @click="selectAnswer(index)"
                :class="`answer-${index} w-full bg-gray-100 text-gray-900 px-6 py-4 rounded-xl hover:bg-orange-100 transition-all duration-300 flex items-center justify-between ${selectedAnswer.value === index ? 'bg-green-500 text-white hover:bg-green-600' : ''}`"
              >
                <span>{{ option }}</span>
                <span v-if="selectedAnswer.value === index">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
              </button>
            </div>
            <button
              v-if="selectedAnswer.value !== null"
              @click="nextQuestion"
              class="mt-8 bg-gradient-to-r from-orange-500 to-green-500 text-white px-8 py-4 rounded-full hover:from-orange-600 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 animate-pulse"
            >
              {{
                currentQuestion.value === questions.value.length - 1
                  ? 'See Results'
                  : 'Next Question'
              }}
            </button>
          </div>
          <div
            v-else-if="score !== null && score.value !== null"
            class="space-y-6"
            data-v-inspector="src/components/Home.vue:677:11"
          >
            <p class="text-4xl font-bold text-gray-900 mb-6">
              Your Score: {{ score.value }} / {{ questions.value.length }}
            </p>
            <p class="text-lg text-gray-600 mb-6">
              {{
                score.value === questions.value.length
                  ? 'Perfect score! You’re a growth guru!'
                  : 'Great effort! Let’s grow even more with Growlix!'
              }}
            </p>
            <RouterLink
              to="/signup"
              class="bg-gradient-to-r from-orange-500 to-green-500 text-white px-8 py-4 rounded-full hover:from-orange-600 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 animate-pulse"
            >
              Start Growing Now
            </RouterLink>
          </div>
          <div v-else>
            <button
              @click="startQuiz"
              class="bg-gradient-to-r from-orange-500 to-green-500 text-white px-8 py-4 rounded-full hover:from-orange-600 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 animate-pulse"
            >
              Start the Challenge
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 section">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center md:text-left">
            <img
              src="@/assets/img/logo.svg"
              alt="Growlix Logo"
              class="w-20 h-auto mx-auto md:mx-0 mb-6"
            />
            <p class="text-gray-300 mb-4">Growlix: Empowering Your Business to Thrive Online</p>
            <div class="flex justify-center md:justify-start space-x-6 sm:space-x-8">
              <a
                href="https://facebook.com/growlix"
                class="text-orange-500 hover:text-orange-400 transition-colors duration-300"
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                  />
                </svg>
              </a>
              <a
                href="https://x.com/growlix"
                class="text-orange-500 hover:text-orange-400 transition-colors duration-300"
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.967 6.817h-3.308l7.725-8.843-8.133-10.657h6.658l4.714 6.213zm-1.161 17.52h1.833l-11.83-15.54h-1.833z"
                  />
                </svg>
              </a>
              <a
                href="https://instagram.com/growlix"
                class="text-orange-500 hover:text-orange-400 transition-colors duration-300"
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849s-.012 3.584-.069 4.849c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849s.012-3.584.07-4.849c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.332.014 7.052.072c-3.91.177-6.615 2.882-6.792 6.792C.202 8.144.189 8.555.189 12c0 3.445.013 3.855.072 5.136.177 3.91 2.882 6.616 6.792 6.792 1.28.058 1.69.072 5.136.072 3.445 0 3.855-.013 5.136-.072 3.91-.177 6.615-2.882 6.792-6.792.058-1.28.072-1.691.072-5.136 0-3.445-.013-3.854-.072-5.135-.177-3.911-2.882-6.616-6.792-6.792C15.855.014 15.445 0 12 0zm0 5.838A6.162 6.162 0 105.838 12a6.162 6.162 0 006.162-6.162zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 100-2.88 1.44 1.44 0 000 2.88z"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div class="text-center">
            <h3 class="text-xl font-semibold text-white mb-6">Quick Links</h3>
            <ul class="space-y-4">
              <li>
                <RouterLink
                  to="/about"
                  class="text-gray-300 hover:text-orange-500 transition-colors duration-300"
                  >About Us</RouterLink
                >
              </li>
              <li>
                <RouterLink
                  to="/services"
                  class="text-gray-300 hover:text-orange-500 transition-colors duration-300"
                  >Services</RouterLink
                >
              </li>
              <li>
                <RouterLink
                  to="/pricing"
                  class="text-gray-300 hover:text-orange-500 transition-colors duration-300"
                  >Pricing</RouterLink
                >
              </li>
              <li>
                <RouterLink
                  to="/blog"
                  class="text-gray-300 hover:text-orange-500 transition-colors duration-300"
                  >Blog</RouterLink
                >
              </li>
            </ul>
          </div>
          <div class="text-center">
            <h3 class="text-xl font-semibold text-white mb-6">Newsletter</h3>
            <form @submit.prevent="submitNewsletter" class="max-w-md mx-auto">
              <input
                type="email"
                placeholder="Subscribe to our newsletter"
                class="w-full p-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-orange-300/50 bg-white/90 backdrop-blur-sm border-2 border-orange-300/50 placeholder-gray-500 mb-4"
              />
              <button
                type="submit"
                class="w-full bg-gradient-to-r from-orange-500 to-green-500 text-white px-8 py-4 rounded-full hover:from-orange-600 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 animate-pulse"
              >
                Subscribe
              </button>
            </form>
            <p v-if="formSuccess.value" class="mt-4 text-green-600 font-semibold text-lg">
              {{ formSuccess.value }}
            </p>
            <p v-if="formError.value" class="mt-4 text-red-600 font-semibold text-lg">
              {{ formError.value }}
            </p>
          </div>
        </div>
        <p class="text-center text-gray-400 mt-12 text-sm">
          © 2025 Growth Analytics LLC. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Base animations */
.animate-fade-in {
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* FAQ slide transition */
.faq-slide-enter-active,
.faq-slide-leave-active {
  transition: all 0.3s ease;
  max-height: 200px;
}

.faq-slide-enter-from,
.faq-slide-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

/* Glassmorphism effect */


/* Button micro-interactions */
button,
a[class*='bg-gradient-to-r'] {
  transition: all 0.3s ease-in-out;
}

button:hover,
a[class*='bg-gradient-to-r']:hover {
  transform: translateY(-2px);
}

/* Pulse animation for buttons */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

/* Custom scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Lazy-loaded images */


/* Tip note styling */
.tip-note {
  transition: all 0.3s ease;
}

/* Enhanced animations */
.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.animate-bounce-slow {
  animation: bounce 2s ease-in-out infinite;
}
.animate-blob {
  animation: blob 10s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
@keyframes blob {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(20px, 20px) scale(1.1); }
  66% { transform: translate(-20px, -20px) scale(0.9); }
  100% { transform: translate(0, 0) scale(1); }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .bg-white { padding: 6; }
  h3 { font-size: 1.5rem; }
  p { font-size: 0.95rem; }
}
</style>
