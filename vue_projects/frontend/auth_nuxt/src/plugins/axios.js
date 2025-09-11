import axios from 'axios'
import { defineNuxtPlugin } from '#app'



export default defineNuxtPlugin(() => {
  const api = axios.create({ baseURL: 'http://localhost:3001/api' })


  return{
    provide: {
      axios,
      api
    }
  }
})
