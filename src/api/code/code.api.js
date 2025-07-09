import { instance } from "../base.api";

const model = "codes";

const codeAPI = {
  getCode: (email, type) => {
    return instance.get(`/${model}/codeBy?email=${email}&type=${type}`);
  },

  // Para validad la cuenbta
  validateAccountCode: (email, type, code) => {
    return instance.put(`/${model}/validateAccount`, {
      email,
      type,
      code,
    });
  },

  // Para recuperar la contraseña
  recoveryPasswordCode: (code, type, id, password) => {
    return instance.put(`/${model}/recoveryPassword`, {
      code,
      type,
      id,
      password,
    });
  },

  getRecoveryPasswordCode: (email) => {
    return instance.post(`${model}/getRecoveryPasswordCode`, { email });
  },

  // Para confirmar que desea realizqar una compra
  verifyPurchaseCode: (code, token, type) => {
    return instance.put(
      `/${model}/verifyPurchase`,
      {
        code,
        type,
      },
      {
        headers: {
          "x-token": token,
        },
      }
    );
  },

  // Para confirmar que un producto fue entregado
  verifyDeliveryCode: (code, token, type, clientId) => {
    return instance.put(
      `/${model}/verifyDelivery`,
      {
        code,
        type,
        clientId,
      },
      {
        headers: {
          "x-token": token,
        },
      }
    );
  },

  // Para cancelar una compra
  cancelPurchaseCode: (code, token, type, orderId) => {
    return instance.put(
      `/${model}/cancelPurchase`,
      {
        code,
        type,
        orderId,
      },
      {
        headers: {
          "x-token": token,
        },
      }
    );
  },

  resendCode: (email, type) => {
    return instance.put(`/${model}/resendCode`, {
      email,
      type,
    });
  },

  createCode: (data) => {
    return instance.post(`/${model}`, data);
  },

  verificateBuyCode: (id, data) => {
    return instance.put(`${model}/verificateBuyCode/${id}`, data);
  },

  generateNewVerificationAccountCode: (email) => {
    return instance.post(`${model}/generateNewVerificationAccountCode`, {
      email,
    });
  },

  validatePasswordRecoveryCode: (code, email, password) => {
    return instance.put(`${model}/validatePasswordRecoveryCode`, {
      code,
      email,
      password,
    });
  },
};

export default codeAPI;
