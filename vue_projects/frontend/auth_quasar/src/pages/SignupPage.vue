<template lang="pug">
  q-page.flex.flex-center
    q-card(style="width: 400px; border-radius: 20px; background: transparent; backdrop-filter: blur(20px); border: 2px solid white;")
      h4.text-primary(align="center" style="font-weight: bold;") Sign Up
      q-card-section
        q-input.q-ma-md(rounded outlined v-model="formData.name" placeholder="Full Name" type="text" bg-color="white")
        q-input.q-ma-md(rounded outlined v-model="formData.email" placeholder="Email" type="email" bg-color="white")
        q-input.q-ma-md(rounded outlined v-model="formData.password" placeholder="Password" type="password" bg-color="white")

      div.row.justify-center.items-center.q-mb-lg
        q-btn(unelevated rounded color="primary" style="width: 100px;" @click="handleSignUp") signup
      div.q-pl-lg.q-mb-md
        a(href="/login" style="text-decoration: none; color: white; font-size: small;") Already had an account? Login
  
</template>

<script setup>
import AuthViewModel from 'src/viewmodels/AuthViewModel'; 
import {reactive} from 'vue'
import { Notify } from 'quasar';
import { useRouter } from 'vue-router';

const router = useRouter()

const formData = reactive({
  name:'',
  email:'',
  password:''
})

  async function handleSignUp(){
    if (!formData.name || !formData.email || !formData.password) {

    Notify.create({
      type: 'negative',
      message: 'All fields are required'
    })
    return
  }

  if (!/^[A-Za-z\s]+$/.test(formData.name)) {
    Notify.create({
      type: 'negative',
      message: 'Name must contain only letters'
    })
    return
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    Notify.create({
      type: 'negative',
      message: 'Invalid email format'
    })
    return
  }

    try{
      await AuthViewModel.signup(formData.name, formData.email, formData.password)
      Notify.create({
        type: 'positive',
        message: 'Account created successfully!'
      })
      router.push('/profile')
    }catch (err){
      //alert(err.response?.data?.error || 'Signup failed')
      Notify.create({
        type: 'negative',
        message: err.response?.data?.error || 'Signup failed'
      })
    }
  }
  defineExpose({
    handleSignUp
  })
</script>
