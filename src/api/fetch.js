import axios from "axios";
let baseURL = '';

if(process.env.NODE_ENV === 'production'&& window.API_BASE_URL){
  
  baseURL = window.API_BASE_URL
}else{
  baseURL = process.env.VUE_APP_BASE_URL 
}
console.log(process.env.NODE_ENV)
export function fetch(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL,
      timeout: 100000
    });
    instance.interceptors.response.use(
      response => {
        let data;
        if (response.data === undefined) {
          data = response.request.responseText;
        } else {
          data = response.data;
        }
        // return data.data || data;
        return data
      },
      err => {
        return Promise.reject(err);
      }
    );
    instance(options)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}
