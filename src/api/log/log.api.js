import { instance } from "../base.api";

const model = "logs";

const logAPI = {
  createLog: (log, token) => {
    return instance.post(`/${model}`, log, {
      headers: {
        "x-token": token,
      },
    });
  },

  getLogs: (token) => {
    return instance.get(`/${model}`, {
      headers: {
        "x-token": token,
      },
    });
  },

  getByEvent: (token, event) => {
    return instance.get(`/${model}/event/${event}`, {
      headers: {
        "x-token": token,
      },
    });
  },

  getByUser: (token) => {
    return instance.get(`/${model}/user/${id}`, {
      headers: {
        "x-token": token,
      },
    });
  },
};

export default logAPI;
