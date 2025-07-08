import { instance } from "../base.api";

const model = "offers";

const offerAPI = {
  getOffers: () => {
    return instance.get(`/${model}`);
  },

  getOfferById: (id) => {
    return instance.get(`/${model}/${id}`);
  },

  createOffer: (token, offer) => {
    return instance.post(`/${model}`, offer, {
      headers: {
        "x-token": token,
      },
    });
  },

  deleteOffer: (token, id) => {
    return instance.delete(`/${model}/${id}`, {
      headers: {
        "x-token": token,
      },
    });
  },

  updateOffer: (token, id, offer) => {
    return instance.put(`/${model}/${id}`, offer, {
      headers: {
        "x-token": token,
      },
    });
  },
};

export default offerAPI;
