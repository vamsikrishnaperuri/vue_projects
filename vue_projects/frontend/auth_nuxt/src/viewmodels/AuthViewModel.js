import { useNuxtApp } from '#app'
import User from '~/models/User'

class AuthViewModel {

  async signup(name, email, password) {
    console.log("signup model start");
    const { $api } = useNuxtApp();
    const res = await $api.post('/signup', { name, email, password })
    const { id, name: userName, email: userEmail, token } = res.data
    localStorage.setItem('token', token)
    console.log("signup model end");
    return new User(id, userName, userEmail, token)
  }

  async login(email, password) {
    const { $api } = useNuxtApp();
    const res = await $api.post('/login', { email, password })
    const { id, name, email: userEmail, token } = res.data
    localStorage.setItem('token', token)
    return new User(id, name, userEmail, token)
  }
}

export default new AuthViewModel()
