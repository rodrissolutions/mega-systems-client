import { instance } from "../base.api";

const model = "appointments";

const appointmentAPI = {
  getAppointments: (token) => {
    return instance.get(`/${model}`, {
      headers: {
        "x-token": token,
      },
    });
  },

  getAppointmentsByUser: (id) => {
    return instance.get(`/${model}/user/${id}`);
  },

  createAppointment: (appointment) => {
    return instance.post(`/${model}/generate`, appointment);
  },

  verifyDisponibility: (data) => {
    return instance.post(`/${model}/checkAvailability`, data);
  },

  updateAppointment: (token, id, appointment) => {
    return instance.put(`/${model}/update/${id}`, appointment, {
      headers: {
        "x-token": token,
      },
    });
  },

  deleteAppointment: (id) => {
    return instance.delete(`/${model}/${id}`);
  },
};

export default appointmentAPI;
