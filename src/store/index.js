import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    libraries: [],
    loading: true,
  },
  mutations: {
    setLibraries(state, libraries) {
      state.libraries = libraries;
    },
    finishLoading(state) {
      state.loading = false;
    }
  },
  actions: {
    setLibraries(store, libraries) {
      store.commit('setLibraries', libraries);
    },
    finishLoading(store) {
      store.commit('finishLoading');
    }
  }
})
