import { useNuxtApp } from '#app'
import User from '~/models/User'

class ProfileViewModel {
  async getProfile() {
    const { $api } = useNuxtApp();
    const token = localStorage.getItem('token')
    //console.log("TOKEN USED:", token)
    if (!token) throw new Error('No token found')

    const res = await $api.get('/users/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
    //console.log("PROFILE RESPONSE:", res.data)

    const { id, name, email, phone, lastname, gender } = res.data
    const user = new User(id, name, email, phone, lastname, gender, token)

    // store in localStorage
    localStorage.setItem('user', JSON.stringify(user))

    return user
  }

  async updateProfile(name, email, phone, lastname, gender){
    const { $api } = useNuxtApp();
    const token = localStorage.getItem('token')
    const res = await $api.put('/users/me', {name, email, phone, lastname, gender}, {
      headers : {Authorization: `Bearer ${token}`}
    })
    console.log("adding data");

    return res.data
  }

  async deleteProfile(){
    const { $api } = useNuxtApp();
    const token = localStorage.getItem('token')
    const res = await $api.delete('/users/me', {
      headers : {Authorization: `Bearer ${token}`}
    })
    return res.data
  }
}

export default new ProfileViewModel()
