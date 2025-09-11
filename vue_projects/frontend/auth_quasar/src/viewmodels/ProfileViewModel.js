import { api } from 'boot/axios'
import User from 'src/models/User'

class ProfileViewModel {
  async getProfile() {
    const token = localStorage.getItem('token')
    //console.log("TOKEN USED:", token)
    if (!token) throw new Error('No token found')

    const res = await api.get('/users/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
    //console.log("PROFILE RESPONSE:", res.data)

    const { id, name, email, phone } = res.data
    const user = new User(id, name, email, phone, token)

    // store in localStorage
    localStorage.setItem('user', JSON.stringify(user))

    return user
  }

  async updateProfile(name, email, phone){
    const token = localStorage.getItem('token')
    const res = await api.put('/users/me', {name, email, phone}, {
      headers : {Authorization: `Bearer ${token}`}
    })
    console.log("adding data");

    return res.data
  }

  async deleteProfile(){
    const token = localStorage.getItem('token')
    const res = await api.delete('/users/me', {
      headers : {Authorization: `Bearer ${token}`}
    })
    return res.data
  }
}

export default new ProfileViewModel()
