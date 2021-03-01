import request from "./request";

const requestInterceptor = store => {
  request.interceptors.request.use(function(config) {
    if (store.getters["auth/getAccessToken"]) {
      config.headers.common[
        "Authorization"
      ] = `Bearer ${store.getters["auth/getAccessToken"]}`;
    }
    return config;
  }, null);
};

const responseInterceptor = store => {
  request.interceptors.response.use(null, async error => {
    const { status } = error.response;

    if (status !== 401) {
      return Promise.reject(error);
    }

    try {
      store.dispatch("auth/login");
    } catch (e) {
      console.error(e);
    }
  });
};

const interceptors = store => {
  requestInterceptor(store);
  responseInterceptor(store);
};

export default interceptors;
