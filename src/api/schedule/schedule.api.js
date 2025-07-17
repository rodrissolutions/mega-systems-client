import { instance } from "../base.api";

const model = "schedules";

const scheduleAPI = {
  listAll: () => {
    return instance.get(`/${model}`);
  },

  listAllWorking: () => {
    return instance.get(`/${model}/working`);
  },

  newSchedule: (token, schedule) => {
    return instance.post(`/${model}`, schedule, {
      headers: {
        "x-token": token,
      },
    });
  },

  deleteSchedule: (token, id) => {
    return instance.delete(`/${model}/${id}`, {
      headers: {
        "x-token": token,
      },
    });
  },
};

export default scheduleAPI;
