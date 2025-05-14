import { instance } from '../base.api'

const model = 'codes'

const codeAPI = {
  getCode: (email, type) => {
    return instance.get(`/${model}/codeBy?email=${email}&type=${type}`)
  },

  validateAccount: (email, type, code) => {
    return instance.put(`/${model}/validateAccount`, {
      email,
      type,
      code,
    })
  },

  resendCode: (email, type) => {
    return instance.put(`/${model}/resendCode`, {
      email,
      type,
    })
  },
}

export default codeAPI
