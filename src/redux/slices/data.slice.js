import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  user: null,
  products: [],
  filteredProducts: [],
  categories: [],
  fileteredCategories: [],
  bankAccounts: [],
  currentBankAccount: null,
  offer: null,
  offers: [],
  product: null,
  buy: null,
  services: [],
  category: {},
  currentUser: null,
  appointment: null,
  service: null,
  filteredServices: [],
  buys: [],
  fileteredBuys: [],
  favorites: [],
  allFavorites: [],
  allSales: [],
  allReviews: [],
  filteredFavorites: [],
  cart: null,
  residency: null,
  subtotal: 0.0,
  total: 0.0,
  allViews: [],
  currentSale: null,
  category: null,
  schedules: [],
  appointments: [],
  allAppointments: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },

    setAllApointments: (state, action) => {
      state.allAppointments = action.payload;
    },

    setBankAccounts: (state, action) => {
      state.bankAccounts = action.payload;
    },

    setAppointments: (state, action) => {
      state.appointments = action.payload;
    },

    setAppointment: (state, action) => {
      state.appointment = action.payload;
    },

    setCategory: (state, action) => {
      state.category = action.payload;
    },

    setSchedules: (state, action) => {
      state.schedules = action.payload;
    },

    setOffers: (state, action) => {
      state.offers = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },

    setCurrentSale: (state, action) => {
      state.currentSale = action.payload;
    },

    setCurrentBankAccount: (state, action) => {
      state.currentBankAccount = action.payload;
    },

    setAllViews: (state, action) => {
      state.allViews = action.payload;
    },
    setAllSales: (state, action) => {
      state.allSales = action.payload;
    },

    setAllReviews: (state, action) => {
      state.allReviews = action.payload;
    },

    setAllFavorites: (state, action) => {
      state.allFavorites = action.payload;
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },

    setProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },

    setCategories: (state, action) => {
      state.categories = action.payload;
      state.fileteredCategories = action.payload;
    },
    setOffer: (state, action) => {
      state.offer = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },

    setServices: (state, action) => {
      state.services = action.payload;
      state.filteredServices = action.payload;
    },

    setFavorites: (state, action) => {
      state.favorites = action.payload;
      state.filteredFavorites = action.payload;
    },

    setResidency: (state, action) => {
      state.residency = action.payload;
    },

    setBuys: (state, action) => {
      state.buys = action.payload;
      state.fileteredBuys = action.payload;
    },

    setBuy: (state, action) => {
      state.buy = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setSubtotal: (state, action) => {
      state.subtotal = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },

    setService: (state, action) => {
      state.service = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.cart = null;
      state.favorites = [];
    },

    addOrIncrementItem: (state, action) => {
      const product = action.payload;

      const existingIndex = state.cart.Items.findIndex(
        (item) => item.ProductId === product.id
      );

      if (existingIndex !== -1) {
        // El producto ya está, solo incrementa quantity
        state.cart.Items[existingIndex].quantity += 1;
      } else {
        // El producto no está, agrégalo con quantity 1
        state.cart.Items.push({
          ProductId: product.id,
          quantity: 1,
          Product: product,
        });
      }
    },

    decrementItem: (state, action) => {
      const product = action.payload;

      const existingIndex = state.cart.Items.findIndex(
        (item) => item.ProductId === product.id
      );

      if (existingIndex !== -1) {
        const item = state.cart.Items[existingIndex];
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // Si la cantidad es 1, lo eliminamos del carrito
          state.cart.Items.splice(existingIndex, 1);
        }
      }
    },

    removeItem: (state, action) => {
      const product = action.payload;
      state.cart.Items = state.cart.Items.filter(
        (item) => item.ProductId !== product.id
      );
    },

    resetCart: (state) => {
      state.cart = null;
    },
  },
});

export const {
  setUser,
  logout,
  setProducts,
  setBuys,
  setUsers,
  setBuy,
  setCategories,
  setOffer,
  setProduct,
  setServices,
  setFavorites,
  setCart,
  addOrIncrementItem,
  decrementItem,
  setResidency,
  setTotal,
  setSubtotal,
  resetCart,
  setService,
  setAppointments,
  setAppointment,
  removeItem,
  setAllFavorites,
  setAllReviews,
  setAllSales,
  setAllViews,
  setCurrentUser,
  setCurrentSale,
  setOffers,
  setBankAccounts,
  setCurrentBankAccount,
  setCategory,
  setSchedules,
  setAllApointments,
} = dataSlice.actions;
export default dataSlice.reducer;
