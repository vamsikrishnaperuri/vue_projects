<template lang="pug">
  q-page.flex.flex-center
    appNotify(ref="notify")
    q-img.fit.absolute(src="bg.jpg")
    q-card(style="width: 400px; border-radius: 20px; background: transparent; backdrop-filter: blur(20px); border: 2px solid white;")
      h4.text-primary(align="center" style="font-weight: bold;") Sign Up
      q-card-section
        InputField(v-model="formData.name" placeholder="Full Name" type="text" rounded)
        InputField(v-model="formData.email" placeholder="Email" type="email" rounded)
        InputField(v-model="formData.password" placeholder="Password" type="password" rounded)

      div.row.justify-center.items-center.q-mb-lg
        q-btn(unelevated rounded color="primary" style="width: 100px;" @click="handleSignUp") signup
      div.q-pl-lg.q-mb-md
        NuxtLink(to="/login" style="text-decoration: none; color: white; font-size: small;") Already had an account? Login
  
</template>

<script setup>
import AuthViewModel from '~/viewmodels/AuthViewModel'; 
import {reactive} from 'vue'
import { Notify } from 'quasar';
import appNotify from '~/components/appNotify.vue'
import InputField from '~/components/InputField.vue';

const notify = ref(null);

const formData = reactive({
  name:'',
  email:'',
  password:''
})

  async function handleSignUp(){
    if (!formData.name || !formData.email || !formData.password) {
    notify.value?.notification("negative","All fields are required")
    return
  }

  if (!/^[A-Za-z\s]+$/.test(formData.name)) {
    notify.value?.notification("negative","Name must contain only letters")
    return
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    notify.value?.notification("negative","Invalid email format")
    return
  }

    try{
      await AuthViewModel.signup(formData.name, formData.email, formData.password)
      console.log("signup res came");
      notify.value?.notification("positive","Account created successfully!")
      console.log("signup notify executed");
      // router.push('/profile')
      navigateTo('/profile')
    }catch (err){
      //alert(err.response?.data?.error || 'Signup failed')
      notify.value?.notification("negative","Signup failed")
    }
  }
  defineExpose({
    handleSignUp
  })
    definePageMeta({
  layout: 'auth-layout'
})
</script>
