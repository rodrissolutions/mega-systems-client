import { instance } from "../base.api";

const model = "reviews";

const reviewAPI = {
  createReview: (review) => {
    return instance.post(`/${model}`, review);
  },
  deleteProductComment: (token, productId, comment) => {
    return instance.udpate(`/${model}/deleteComment/${productId}`, comment, {
      headers: {
        "x-token": token,
      },
    });
  },

  deleteReview: (id) => {
    console.log(id);
    return instance.delete(`/${model}/${id}`);
  },
};

export default reviewAPI;
