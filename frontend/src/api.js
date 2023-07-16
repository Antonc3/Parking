import axios from 'axios';
import Constants from 'expo-constants'
axios.post('http://10.0.2.2:3000/user/login', { username: "abc", password: "abc" }).then((response) =>{
    console.log(response);
}).catch(error => {

    console.log(":(((((((((",error);
})

axios.defaults.baseURL = Constants.expoConfig.extra.REACT_APP_BACKEND_URL;
axios.defaults.headers['Content-Type'] = 'application/json; charset=utf-8'

export default axios;

