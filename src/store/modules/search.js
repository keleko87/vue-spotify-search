import apiSearch from "@/api/search/index";
import { TYPE } from "@/model/search";

const itemType = {
  data: "",
  page: 0,
  loading: false
};

const state = {
  query: "",
  result: "",
  album: { ...itemType },
  artist: { ...itemType },
  track: { ...itemType },
  error: null
};

const getters = {
  query: state => state.query,
  result: state => state.result,
  album: state => state.album,
  artist: state => state.artist,
  track: state => state.track
};

const mutations = {
  SET_SEARCH_QUERY(state, data) {
    state.query = data;
  },

  REQUEST_SEARCH_SUCCESS(state, data) {
    state.result = { ...data };
    state.artist.data = {
      ...(data.artists ? data.artists : state.artist.data)
    };
    state.album.data = { ...(data.albums ? data.albums : state.album.data) };
    state.track.data = { ...(data.tracks ? data.tracks : state.track.data) };
  },

  REQUEST_SEARCH_ERROR(state, error) {
    state.error = error;
  },

  CLEAR_SEARCH_RESULT(state, type) {
    state.result = "";
    state[type].data = "";
    state[type].page = 0;
    state[type].loading = false;
  },

  SET_ITEM_PAGE(state, { type, page }) {
    state[type].page = page;
  },

  RESET_ITEM_PAGE(state, type) {
    state[type].page = 0;
  },

  SET_ITEM_LOADING(state, { type, loading }) {
    state[type].loading = loading;
  }
};

const actions = {
  requestSearchSuccess({ commit }, data) {
    commit("REQUEST_SEARCH_SUCCESS", data);
  },

  requestSearchError({ commit }, error) {
    commit("REQUEST_SEARCH_ERROR", error);
  },

  setItemPage({ commit }, { type, page }) {
    commit("SET_ITEM_PAGE", { type, page });
  },

  resetItemsTypePage({ commit }, types = []) {
    types.forEach(type => {
      commit("RESET_ITEM_PAGE", type);
    });
  },

  setItemLoading({ commit }, { type, loading }) {
    const existsType = Object.values(TYPE).find(item => item === type);

    if (existsType) {
      commit("SET_ITEM_LOADING", { type, loading });
    } else {
      const types = type.split(",");
      types.forEach(elemType => {
        commit("SET_ITEM_LOADING", { type: elemType, loading });
      });
    }
  },

  clearSearchResult({ commit }) {
    Object.values(TYPE).forEach(type => {
      commit("CLEAR_SEARCH_RESULT", type);
    });
  },

  async search(
    { commit, dispatch },
    { query, type, offset, limit, globalSearch = false }
  ) {
    commit("SET_SEARCH_QUERY", query);
    dispatch("setItemLoading", { type, loading: true });

    try {
      const response = await apiSearch.search(query, type, offset, limit);
      dispatch("requestSearchSuccess", response.data);

      if (globalSearch) {
        dispatch("resetItemsTypePage", Object.values(TYPE));
      }
    } catch (e) {
      dispatch("requestSearchError", e);
    }

    dispatch("setItemLoading", { type, loading: false });
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
