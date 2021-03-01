import apiAuth from "../../api/auth";

const state = {
  accessToken: ""
};

const getters = {
  getAccessToken: state => state.accessToken
};

const mutations = {
  SET_ACCESS_TOKEN(state, token) {
    state.accessToken = token;
  }
};

const actions = {
  login: async function({ commit }) {
    try {
      const hash = window.location.hash;

      if (apiAuth.existsHashValue(hash)) {
        const hashParams = apiAuth.getHashParams(hash);
        const { access_token } = hashParams;

        commit("SET_ACCESS_TOKEN", access_token);
        return access_token;
      }

      // Authorize URL for login
      const response = await apiAuth.getLoginURL();
      if (response) {
        window.location.href = response;
      }
    } catch (e) {
      console.log(e);
    }
  },

  setAccessToken({ commit }, token) {
    commit("SET_ACCESS_TOKEN", token);
  }
};

const module = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default module;
