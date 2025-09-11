<template lang="pug">
  q-page.flex.flex-center
    q-card(style="width: 400px; border-radius: 20px; background: transparent; backdrop-filter: blur(20px); border: 2px solid white;")
      h4.text-primary(align="center" style="font-weight: bold;") My Profile
      q-card-section.q-ml-xl(style="font-size: large;")
        div
          b Name:
          | {{ user.name }}
        div
          b Email:
          | {{ user.email }}
        div
          b Phone:
          | {{ user.phone }}
      
      q-card-actions.q-ma-md(align="right")
        q-btn(round color="green-4" icon="edit" @click="showEdit = true")
        q-btn(push label="Delete account" color="negative" @click="handleDelete")
        q-btn(push label="Logout" color="amber" @click="handleLogout")

      q-dialog(v-model="showEdit")
        q-card.q-pa-md(style="min-width: 400px; border-radius: 20px; border: 2px solid white;")
          q-card-section
            div.text-h6 Edit Profile

          q-card-section
            q-input(rounded outlined v-model="formData.editName" label="Name" class="q-mb-lg" bg-color="grey-4")
            q-input(rounded outlined v-model="formData.editEmail" label="Email" class="q-mb-lg" bg-color="grey-4")
            q-input(rounded outlined v-model="formData.phoneNumber" label="Phone number" class="q-mb-lg" bg-color="grey-4")

          q-card-actions(align="right")
            q-btn(push label="Cancel" v-close-popup)
            q-btn(push label="Save" color="secondary" @click="handleUpdate")
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {reactive} from 'vue'
import { useRouter } from 'vue-router'
import ProfileViewModel from 'src/viewmodels/ProfileViewModel'
import { Notify } from 'quasar'

const user = ref({ id: '', name: '', email: '', phone: '' })
const router = useRouter()

const showEdit = ref(false)
const formData = reactive({
  editName :'',
  editEmail : '',
  phoneNumber : ''
})

onMounted(async () => {
  try {
    user.value = await ProfileViewModel.getProfile()
  } catch (err) {
    alert(err.response?.data?.error || 'Session expired, please login again.')
    router.push('/login')
  }
})

function handleLogout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}

async function handleDelete(){
  if(!confirm("Are you sure you want to delete your account?")) return

  try{
    await ProfileViewModel.deleteProfile()
    Notify.create({
      type: 'none',
      message: 'Account deleted successfully'
    })
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/signup')
  }catch(err){
    alert(err.response?.data?.error || 'Failed to delete your account')
  }

}

async function handleUpdate(){

  if (!formData.editName || !formData.editEmail) {

    Notify.create({
      type: 'negative',
      message: 'All fields are required'
    })
    return
  }

  if (!/^[A-Za-z\s]+$/.test(formData.editName)) {
    Notify.create({
      type: 'negative',
      message: 'Name must contain only letters'
    })
    return
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.editEmail)) {
    Notify.create({
      type: 'negative',
      message: 'Invalid email format'
    })
    return
  }
  try{
    const updated = await ProfileViewModel.updateProfile(formData.editName, formData.editEmail, formData.phoneNumber)
    user.value.name = updated.name
    user.value.email = updated.email
    user.value.phone = updated.phone
    showEdit.value = false
    Notify.create({
      type: 'positive',
      message: 'Profile updated successfully!'
    })
  }catch(err){
    alert(err.response?.data?.error || 'Failed to update profile')
  }
  
}
defineExpose({
  handleDelete,
  handleLogout,
  handleUpdate
})
</script>
