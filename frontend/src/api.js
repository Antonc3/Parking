import axios from 'axios';
import Constants from 'expo-constants'
const uri = Constants.expoConfig.extra.REACT_APP_BACKEND_URL

console.log(uri)
axios.defaults.baseURL = uri;
axios.defaults.headers['Content-Type'] = 'application/json; charset=utf-8'

export default axios;

