import { api } from 'boot/axios'
import User from 'src/models/User'

class AuthViewModel {
  async signup(name, email, password) {
    const res = await api.post('/signup', { name, email, password })
    const { id, name: userName, email: userEmail, token } = res.data
    localStorage.setItem('token', token)
    return new User(id, userName, userEmail, token)
  }

  async login(email, password) {
    const res = await api.post('/login', { email, password })
    const { id, name, email: userEmail, token } = res.data
    localStorage.setItem('token', token)
    return new User(id, name, userEmail, token)
  }
}

export default new AuthViewModel()
