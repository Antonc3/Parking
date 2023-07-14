import axios from 'axios';
import Constants from 'expo-constants'

axios.defaults.baseURL = Constants.expoConfig.extra.REACT_APP_BACKEND_URL;

export default axios;

