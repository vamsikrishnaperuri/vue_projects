<script setup>
import {ref} from 'vue'
import productDisplay from './components/prodectDisplay.vue'
const premium = ref(true)
</script>

<template>
  <productDisplay :premium="premium"></productDisplay>
</template>

<style scoped></style>
