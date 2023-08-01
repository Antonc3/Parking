import axios from 'axios';
import Constants from 'expo-constants'
const { manifest } = Constants;
const uri = `http://${manifest.debuggerHost.split(':').shift()}:3000`;


console.log(uri)
axios.defaults.baseURL = uri;
axios.defaults.headers['Content-Type'] = 'application/json; charset=utf-8'

export default axios;

