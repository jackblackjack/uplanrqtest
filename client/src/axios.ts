import axios from "axios";

const storageUser = window.localStorage.getItem('user')
const user = JSON.parse(storageUser ?? '{}')

axios.defaults.baseURL = process.env.VITE_PROXY_BACKEND_API_TARGET || 'http://localhost:8080/api';

if (user) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token
}
