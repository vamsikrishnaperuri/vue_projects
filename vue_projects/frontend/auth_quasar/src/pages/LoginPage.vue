<template lang="pug">
  q-page.flex.flex-center
    q-card(style="width: 400px; border-radius: 20px; background: transparent; backdrop-filter: blur(20px); border: 2px solid white;")
      h4(align="center" class="text-primary" style="font-weight: bold;") Login
      q-card-section
        q-input(rounded outlined v-model="formData.email" placeholder="Email" type="email" class="q-ma-md" bg-color="white")
        q-input(rounded outlined v-model="formData.password" placeholder="Password" type="password" class="q-ma-md" bg-color="white")
      div.row.justify-center.items-center.q-mb-lg
        q-btn(unelevated rounded color="primary" style="width: 100px;" @click="handleLogin") Login
      div.q-pl-lg.q-mb-md
        a(href="/signup" style="text-decoration: none; color: white; font-size: small;") Did'nt have an account? SignUp
  
</template>

<script setup>
import AuthViewModel from 'src/viewmodels/AuthViewModel'; 
import {reactive} from 'vue'
import { Notify } from 'quasar';
import {useRouter} from 'vue-router';

const router = useRouter()

const formData = reactive({
  email:'',
  password:''
})

  async function handleLogin(){
    if (!formData.email || !formData.password) {
    Notify.create({
      type: 'negative',
      message: 'All fields are required'
    })
    return
  }

    try{
      await AuthViewModel.login(formData.email, formData.password)
      Notify.create({
        type: 'positive',
        message: 'logged in successfully!'
      })
      router.push('/profile')
    }catch (err){
      Notify.create({
        type: 'negative',
        message: err.response?.data?.error || 'Login failed'
      })
    }
  }
  defineExpose({
    handleLogin
  })
</script>
