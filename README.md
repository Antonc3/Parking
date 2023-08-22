## Project Summary

A react-native app built to made parking easier and hassle free. Uses qrcodes instead of traditional machines to manage payment.

Frontend built using react-native, expo, react native elements, redux toolkit, axios, socket.io-client  

Backend built using express, socket.io, mongoose

Payment handled using stripe

## Get Started - Frontend
Clone the project
```cd frontend/```
```npm install```
Create a file named app.config.js
```
export default {
    extra:{
        REACT_APP_BACKEND_URL: "YOUR OWN BACKEND URL",
        STRIPE_PUB_KEY: "YOUR OWN STRIPE PUBLIC KEY",
    }
}
```
```npx expo start``

### Get Started - Backend


```cd backend/```
```npm install```
Create a file named config.js
```
const config = {
  database: {
      user: "YOUR_MONGOB_USERNAME",
      password: "YOUR_MONGODB_PASSWORD",
      uri: "YOUR_MONGODB_URI",
      name: 'data',
  },
  server: {
    port: 3000,
  },
  secret_key: "SECRET_KEY_FOR_JWT",
  stripe: {
    secret_key: "YOUR_STRIPE_SECRET_KEY",
    onboarding_finish_url: "https://google.com"
  },
  identifierLength: 40,
};

module.exports = config;
```
```node index.js```