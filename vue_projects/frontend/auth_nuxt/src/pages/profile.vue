<template lang="pug">
  q-layout(view="lHh Lpr lff" :style="{ background: appColor.background, minHeight: '100vh' }")
    
    
    appNotify(ref="notify")

    // Top Navigation Bar
    q-header(elevated :style="{background: appColor.cardbg}")
      q-toolbar
        q-toolbar-title.text-center(:style="{color:appColor.primary}") {{ t('profile') }}
        q-btn(round dense icon="brightness_6" color="primary" @click="theme.toggleTheme")

    q-img.fit.absolute(:src="theme.mode === 'light' ? 'figma.png' : 'figma1.png'")
      q-drawer(show-if-above bordered :style="{ background: appColor.cardbg, borderRight: '1px solid' ,  borderColor: appColor.cardboarder}")
        div.q-pa-md.column
          div.flex.flex-center.column
            q-avatar(size="100px" icon="person" :style="{ background: appColor.primary, color: appColor.background }")
            div.text-h6.q-mt-sm(:style="{ color: appColor.text }") {{ t('account')}}

          q-list.q-mt-xl
            q-item(clickable v-ripple @click="openEditDialog")
              q-item-section(avatar)
                q-icon(name="edit" :color="appColor.primary")
              q-item-section
                q-item-label(:style="{ color: appColor.text }") {{ t('editprofile')}}

            q-separator(spaced inset :color="appColor.text")

            q-item(clickable v-ripple @click="askconfirm")
              q-item-section(avatar)
                q-icon(name="delete" color="negative")
              q-item-section
                q-item-label(:style="{ color: appColor.text }") {{ t('deleteaccount')}}

            q-separator(spaced inset :color="appColor.cardboarder")

            q-item(clickable v-ripple @click="handleLogout")
              q-item-section(avatar)
                q-icon(name="logout" color="amber")
              q-item-section
                q-item-label(:style="{ color: appColor.text }") {{ t('logout')}}

            q-separator(spaced inset :color="appColor.cardboarder")

            //- q-item(clickable v-ripple @click="")
            //-   q-item-section(avatar)
            //-     q-icon(name="logout" color="amber")
            //-   q-item-section
            //-     q-item-label(:style="{ color: appColor.text }") {{ t('language')}}
            //-   q-separator(spaced inset :color="appColor.cardboarder")

            div.q-pa-md(style="boarder: 2px solid #ccc")
              q-select(
                v-model="languageStore.current"
                :options="[ { label: 'English', value: 'en' },{ label: 'हिन्दी', value: 'hi' },{ label: 'తెలుగు', value: 'te' }]"
                option-value="value"
                option-label="label"
                emit-value
                map-options
                label="Language"
                @update:model-value="languageStore.setLanguage"
                :style="{color:appColor.secondary}"
              )




      // Main Profile Content - Centered
      q-page-container(style="background: transparent;")
        q-page.flex.flex-center
          q-card.q-ml-md(:style="{width: '100%', maxWidth: '1200px', borderRadius: '20px', border: '2px solid', background: appColor.cardbg, borderColor: appColor.cardboarder}")
            q-card-section
              div.row.q-col-gutter-md.flex.flex-center
                // Left-aligned Profile Data (First column)
                div.col-12.col-md-3.flex.flex-center
                  div.q-pa-md.q-mb-md(:style="{width:'250px',border: '2px solid', borderRadius:'10px', color:appColor.text, borderColor: appColor.cardboarder}")
                    b {{ t('name')}}: 
                    span(:style="{color: appColor.secondary, fontWeight:'bold'}") {{ user.name }}
                  div.q-pa-md.q-mb-md(:style="{width:'250px',border: '2px solid', borderRadius:'10px', color:appColor.text, borderColor: appColor.cardboarder}")
                    b {{ t('lastname')}}: 
                    span(:style="{color: appColor.secondary, fontWeight:'bold'}") {{ user.lastname }}
                  div.q-pa-md.q-mb-md(:style="{width:'250px',border: '2px solid', borderRadius:'10px', color:appColor.text, borderColor: appColor.cardboarder}")
                    b(:style="{color:appColor.text}") {{ t('email')}}: 
                    span(:style="{color: appColor.secondary, fontWeight:'bold'}") {{ user.email }}
                  div.q-pa-md.q-mb-md(:style="{width:'250px',border: '2px solid', borderRadius:'10px', color:appColor.text, borderColor: appColor.cardboarder}")
                    b {{ t('phone')}}: 
                    span(:style="{color: appColor.secondary, fontWeight:'bold'}") {{ user.phone }}
                  div.q-pa-md.q-mb-md(:style="{width:'250px',border: '2px solid', borderRadius:'10px', color:appColor.text, borderColor: appColor.cardboarder}")
                    b {{ t('gender')}}: 
                    span(:style="{color: appColor.secondary, fontWeight:'bold'}") {{ user.gender }}
                // Placeholder for Log Data Table (Second column)
                div.col-12.col-md-9
                  div.q-pa-sm(:style="{height: '100%', border: '2px solid', borderRadius:'10px', color:appColor.text, borderColor: appColor.cardboarder}")
                    Logs

      Dialog(v-model="showDialog" message="Are you sure you want to delete your account?" @confirm="handleDelete" @cancel="")

      q-dialog(v-model="showEdit")
        q-card.q-pb-sm(:style="{minWidth: '450px', borderRadius: '16px', background:appColor.cardbg, borderColor: appColor.cardboarder}")
          q-img(src="/banner.png" alt="Profile Picture" style="height: 150px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;")
            div(class="absolute-full flex flex-center bg-opacity-30 text-white text-h6")
              | Edit Profile

          q-card-section
            InputField(v-model="formData.editName" label="First Name" type="text")
            InputField(v-model="formData.editLastName" label="Last Name" type="text")
            InputField(v-model="formData.editEmail" label="Email" type="email")
            InputField(v-model="formData.editphoneNumber" label="Phone Number" type="number")
            p.q-pl-md(:style="{color:appColor.text}") Gender
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
import { useAppColors,useAppLanguage } from'~/composables/useProperties'
import { useThemeStore } from '~/stores/theme'
import Logs from '~/components/logs.vue'
import { useLanguageStore  } from '~/stores/language'
import { watch } from 'vue'

const appColor = useAppColors()
const theme = useThemeStore()
const { t } = useAppLanguage()
const languageStore = useLanguageStore()

watch(
  () => languageStore.current,
  (newVal, oldVal) => {
    console.log(`[Watcher] Language changed: ${oldVal} → ${newVal}`)
  }
)

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