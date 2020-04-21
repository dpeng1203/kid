import axios from 'axios';
import { stringify } from "qs";
import router from '../router'
import { Toast } from 'vant';
import hostName from './hostName';

// 配置axios请求头与baseUrl
axios.defaults.timeout = 80000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//跨域携带凭证
axios.defaults.withCredentials = true;


// http request 拦截器
axios.interceptors.request.use(
  config => {
    config.baseURL = hostName
    return config
  },
  err => {
    return Promise.reject(err)
  },
)
// http响应拦截器
axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

const ajax_main = (method, url = "", params, config = { showLoading: true }) => {
  return new Promise((resolve, reject) => {
    const notBodyMethod = ["GET", "DELETE"];

    let configObj = {
      method,
      url,
    };

    if (notBodyMethod.indexOf(method) > -1) {
      if(method=="GET"){
        configObj.url = configObj.url + "?" + stringify(params);
      }else{
        configObj.data = params;
      }
    } else {
      configObj.data = params;
    }

    if(config.showLoading) {
      Toast.loading({
        mask: true,
        duration: 10000,
        forbidClick: true, // 禁用背景点击
        message: '加载中...'
      });
    }

    axios(configObj).then(function (response) {
      Toast.clear()
      resolve(response.data)
      if(response.data.resultCode < 0) {
        Toast(response.data.msg)
        if(response.data.resultCode == -6) {
          localStorage.clear()
          router.push('/')
        }
      }
    })
    .catch(function (error) {
      reject(error)
      Toast.clear()
    })
  })
}

export const $ = {
  get: (url, params, config) => ajax_main("GET", url, params, config),
  delete: (url, params, config) => ajax_main("DELETE", url, params, config),
  post: (url, params, config) => ajax_main("POST", url, params, config),
  put: (url, params, config) => ajax_main("PUT", url, params, config)
};



