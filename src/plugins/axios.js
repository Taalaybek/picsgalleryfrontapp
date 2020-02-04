"use strict";

import Vue from 'vue';
import axios from "axios";
import TokenService from '@/services/TokenService'
import store from '@/store/index'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';

let config = {
  baseURL: process.env.apiUrl || process.env.VUE_APP_API_URL,
  timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control,
  headers: {
    'Accept': 'application/json'
  }
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  async function (error) {
    if (error.response.status == 401) {
      if (
        error.response.request.requestURL === process.env.VUE_APP_API_URL + 'auth/login' || 
        error.response.request.requestURL === process.env.VUE_APP_API_URL + 'auth/logout'
      ) {
        return Promise.reject(error);
      } else {
        await store.dispatch('refreshToken')
        return _axios({
          method: error.response.config.method,
          url: error.response.config.url,
          data: error.response.config.data,
        })
      }
    } else {
      return Promise.reject(error);
    }
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
