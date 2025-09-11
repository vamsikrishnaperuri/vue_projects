<template lang="pug">
  q-page.flex.flex-center
    q-img.fit.absolute(src="bg.jpg")
    appNotify(ref="notify")

    div.flex.flex-center
      q-card.q-pa-md.q-mr-md(style="width: 250px; border: 1px solid #ccc;  border-radius: 20px;")
        div.flex.flex-center
          q-avatar(size="100px" class="q-mb-md" color="primary" text-color="white" icon="person")
          q-separator(spaced)
          q-btn(flat icon="edit" label="Edit Profile" color="primary" class="q-mb-sm full-width" @click="openEditDialog")
          q-btn(flat icon="delete" label="Delete Account" color="negative" class="q-mb-sm full-width" @click="askconfirm")
          q-btn(flat icon="logout" label="Logout" color="amber" class="full-width" @click="handleLogout")
          q-btn(flat label="Logs" color="amber" to="/logs")

      q-card.flex.row.q-pa-md(style="width: 600px; border-radius: 20px; background:white")
        q-card-section.col.q-ml-md
          h4.text-primary.text-center(style="font-weight: bold;") My Profile

          div.row.q-mt-md(style="display: flex; justify-content: space-between;")
            div.col-6.q-pa-md(style="border: 2px solid black; border-radius:10px; width:250px")
              b Name: 
              | {{ user.name }}
            div.col-6.q-pa-md(style="border: 2px solid black; border-radius:10px; width:250px")
              b Last Name: 
              | {{ user.lastname }}

          div.row.q-mt-sm(style="display: flex; justify-content: space-between;")
            div.col-6.q-pa-md(style="border: 2px solid black; border-radius:10px; width:250px")
              b Email: 
              | {{ user.email }}
            div.col-6.q-pa-md(style="border: 2px solid black; border-radius:10px; width:250px")
              b Phone: 
              | {{ user.phone }}

          div.row.q-mt-sm
            div.col-12.q-pa-md(style="border: 2px solid black; border-radius:10px; width:250px")
              b Gender: 
              | {{ user.gender }}


    Dialog(v-model="showDialog" message="Are you sure you want to delete your account?" @confirm="handleDelete" @cancel="")

    q-dialog(v-model="showEdit")
      q-card.q-pb-sm(style="min-width: 450px; border-radius: 16px;")
        q-img(src="/banner.png" alt="Profile Picture" style="height: 150px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;")
          div(class="absolute-full flex flex-center bg-opacity-30 text-white text-h6")
            | Edit Profile

        //- q-separator(inset class="q-mt-sm q-mb-md")

        q-card-section
          InputField(v-model="formData.editName" label="First Name" type="text")
          InputField(v-model="formData.editLastName" label="Last Name" type="text")
          InputField(v-model="formData.editEmail" label="Email" type="email")
          InputField(v-model="formData.editphoneNumber" label="Phone Number" type="number")
          p.q-pl-md Gender
            q-option-group(
              v-model="formData.editgender"
              type="radio"
              :options="[{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }]"
              color="primary"
              inline
            )
        q-card-actions.q-mr-md(align="right")
          q-btn(outline elevated label="Cancel" color="grey-7" v-close-popup)
          q-btn(elevated label="Save" color="primary" @click="handleUpdate")
</template>


<script setup>
import { ref, onMounted } from 'vue'
import {reactive} from 'vue'
import appNotify from '~/components/appNotify.vue'
import ProfileViewModel from '~/viewmodels/ProfileViewModel'
import InputField from '~/components/InputField.vue'
import Dialog from '~/components/Dialog.vue'

const user = ref({ id: '', name: '', email: '', phone: '', lastname: '', gender: ''})
const notify = ref(null)
const showDialog = ref(false)

const showEdit = ref(false)
const formData = reactive({
  editName :'',
  editEmail : '',
  editphoneNumber : '',
  editLastName:'',
  editgender:''
})

onMounted(async () => {
  try {
    user.value = await ProfileViewModel.getProfile()
  } catch (err) {
    alert(err.response?.data?.error || 'Session expired, please login again.')
    navigateTo('/login')
  }
})

function openEditDialog() {
  formData.editName = user.value.name
  formData.editLastName = user.value.lastname
  formData.editEmail = user.value.email
  formData.editphoneNumber = user.value.phone
  formData.editgender = user.value.gender

  showEdit.value = true
} 

function handleLogout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  navigateTo('/login')
}

function askconfirm(){
  showDialog.value = true
}
async function handleDelete(){

  try{
    await ProfileViewModel.deleteProfile()
    notify.value?.notification("info","Account deleted successfully")
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigateTo('/signup')
  }catch(err){
    notify.value?.notification("negative","Failed to delete your account")
  }

}

async function handleUpdate(){

  if (!formData.editName || !formData.editEmail) {
    notify.value?.notification("negative","Name and Email are required")
    return
  }

  if (!/^[A-Za-z\s]+$/.test(formData.editName)) {
    notify.value?.notification("negative","Name must contain only letters")
    return
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.editEmail)) {
    notify.value?.notification("negative","Invalid email format")
    return
  }
  try{
    const updated = await ProfileViewModel.updateProfile(formData.editName, formData.editEmail, formData.editphoneNumber, formData.editLastName, formData.editgender)
    user.value.name = updated.name
    user.value.email = updated.email
    user.value.phone = updated.phone
    user.value.lastname = updated.lastname,
    user.value.gender = updated.gender
    showEdit.value = false
    notify.value?.notification("positive","Profile updated successfully!")
  }catch(err){
    notify.value?.notification("negative","Failed to update profile")
  }
  
}
defineExpose({
  handleDelete,
  handleLogout,
  handleUpdate
})

  definePageMeta({
  layout: 'auth-layout'
})
</script>