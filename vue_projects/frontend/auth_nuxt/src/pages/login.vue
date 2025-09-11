<template lang="pug">
  q-page.flex.flex-center
    appNotify(ref="notify")
    q-img.fit.absolute(src="bg.jpg")
    q-card(style="width: 400px; border-radius: 20px; background: transparent; backdrop-filter: blur(20px); border: 2px solid white;")
      h4(align="center" class="text-primary" style="font-weight: bold;") Login
      q-card-section
        InputField(v-model="formData.email" placeholder="Email" type="email" rounded)
        InputField(v-model="formData.password"  placeholder="Password" type="password" rounded)
      div.row.justify-center.items-center.q-mb-lg
        q-btn(unelevated rounded color="primary" style="width: 100px;" @click="handleLogin") Login
      div.q-pl-lg.q-mb-md
        NuxtLink(to="/signup" style="text-decoration: none; color: white; font-size: small;") Did'nt have an account? SignUp
  
</template>

<script setup>
import AuthViewModel from '~/viewmodels/AuthViewModel'; 
import {reactive} from 'vue'
import appNotify from '~/components/appNotify.vue';
import InputField from '~/components/InputField.vue';


const notify = ref(null)

const formData = reactive({
  email:'',
  password:''
})

  async function handleLogin(){
    if (!formData.email || !formData.password) {
    notify.value?.notification("negative", "All fields are required")
    return
  }

    try{
      await AuthViewModel.login(formData.email, formData.password)
      notify.value?.notification("positive","logged in successfully!")
      navigateTo('/profile')
    }catch (err){
      // Notify.create({
      //   type: 'negative',
      //   message: err.response?.data?.error || 'Login failed'
      // })
      notify.value?.notification("negative", "Login failed")
    }
  }
  defineExpose({
    handleLogin
  })

  definePageMeta({
  layout: 'auth-layout'
})
</script>