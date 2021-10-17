import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login: {
      auth: false
    }
  },
  mutations: {
    LOGIN: (state, data) => {
      state.login = data;
    },
    LOGOUT: state => {
      state.login = {
        auth: false
      };
    },
  },
  actions: {
    logInAction: (context, data) => {
      context.commit('LOGIN', data);
    },
    logOutAction: context => {
      context.commit('LOGOUT');
    },
  },
  getters: {
    getLogin: state => {
      return state.login;
    }
  },
  plugins: [createPersistedState()],
})