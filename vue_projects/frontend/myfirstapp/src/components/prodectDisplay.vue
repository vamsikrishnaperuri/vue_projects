<script setup>
import {ref, computed} from 'vue'
import vueImg from '@/assets/vueimg.png'
import vueImg2 from '@/assets/vueimg2.jpg'

const props = defineProps({
    premium: {
        type:Boolean,
        required: true
    }
})

const shipping = computed(() => {
    if(props.premium){
        return 'Free'
    }
    else{
        return '3.99'
    }
})

const img = ref(vueImg)
const count = ref(0)
const addcount = () => count.value +=1
const inStock = ref(true)
const items = ref([
  {id: 1, color: 'green', image:vueImg},
  {id: 2, color: 'red', image:vueImg2}
])
const changeimg = (selectedimg) => img.value = selectedimg
</script>

<template>
  <h1 v-if="inStock">Cart({{ count }})</h1>
  <h1 v-else>Cart({{ count }})</h1>
  <p>Shipping {{shipping}}</p>
  <img :src="img" alt="vueimage">
  <p v-for="item in items" @mouseover="changeimg(item.image)" :style="{backgroundColor: item.color}">{{ item.color }}</p>
  <button @click="addcount" :disabled="!inStock">Click</button>
</template>