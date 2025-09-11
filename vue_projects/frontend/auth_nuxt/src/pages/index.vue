<template>
  <div class="flex flex-center justify-center min-h-screen">
    <img v-if="hasError" src="/404.png" alt="Error" class="max-w-md" width="500px" />
    <div v-else>
      <p>Redirecting to login...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'

const hasError = ref(false)
const {$api} = useNuxtApp();

onMounted(async () => {
  try {
    const res = await $api.get('/healthcheck')

    if (res) {
      return navigateTo('/login')
    } else {
      hasError.value = true
    }
  } catch (err) {
    console.error('Healthcheck failed:', err)
    hasError.value = true
  }
})
</script>
