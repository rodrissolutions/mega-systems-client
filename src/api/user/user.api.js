import { instance } from '../base.api'

const model = 'users'

const userAPI = {
  register: (data) => {
    return instance.post(`/${model}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}

export default userAPI
