import { instance } from '../base.api'

const model = 'auth'

const authAPI = {
  login: (email, password) => {
    return instance.post(`/${model}/login`, { email, password })
  },
}

export default authAPI
