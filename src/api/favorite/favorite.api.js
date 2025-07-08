import { instance } from "../base.api";

const model = "favorites";

const favoriteAPI = {
  getByUser: (id) => {
    return instance.get(`/${model}/user/${id}`);
  },

  addFavorite: (UserId, ProductId) => {
    return instance.post(`/${model}`, {
      UserId,
      ProductId,
    });
  },

  deleteFavorite: (UserId, ProductId) => {
    return instance.delete(`/${model}?ProductId=${ProductId}&UserId=${UserId}`);
  },

  deleteAll: (UserId) => {
    return instance.delete(`/${model}/all/user/${UserId}`);
  },
};

export default favoriteAPI;
