## Project Summary

A react-native app built to made parking easier and hassle free. Uses qrcodes instead of traditional machines to manage payment.

Frontend built using react-native, expo, react native elements, redux toolkit, axios, socket.io-client  

Backend built using express, socket.io, mongoose

Payment handled using stripe

## Get Started - Frontend
1. ```cd frontend/```

2. ```npm install```
3. Create a file named app.config.js
```
export default {
    extra:{
        REACT_APP_BACKEND_URL: "YOUR OWN BACKEND URL",
        STRIPE_PUB_KEY: "YOUR OWN STRIPE PUBLIC KEY",
    }
}
```
4. ```npx expo start```

## Get Started - Backend


1. ```cd backend/```

2. ```npm install```

3. Create a file named config.js
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

4. Follow instructions on stripe to setup webhook, or download stripe cli and test webhook locally

5. ```node index.js```

## Get Started - Single Lot

1. cd single_lot_server

2. ```pip install pyyaml requests numpy opencv-python```

3. Create a file named config.yaml
```
--- 
backendUrl: "YOUR_BACKEND_URL"
singleLotId: "YOUR_SINGLE_LOT_ID (can be retrieved through backend api calls)"
lotAuthToken: "YOUR_LOT_AUTH_TOKEN (can be retrieved through backend api calls)"
```

4. ```python createTicket.py``` and ```python endTicket.py``` in order to run the scripts to start scanning for qrCodes


## How to create a parking lot and single parking lot

1. Make a post request to your backend at ```"your backend url"/lot/create``` and attach the following information as json
```
{
    "name": "NAME_OF_PARKING_LOT_COMPANY"
    "password": "YOUR_PASSWORD"
    "email": "YOUR_EMAIL"
}
```
2. You can then make a post request login by making a call to ```"your backend url"/lot/login``` and attach the following information as json
```
{
    "email": "YOUR_EMAIL"
    "password": "YOUR_PASSWORD"
}
```
3. You will recieve a json token if information is correctly inputed, which should be put into your single_lot_server config file under "lotAuthToken"

4. Make a post request to ```"your backend url"/lot/singleLot/create``` and attach the following information as json
```
{
    "name": "YOUR_SINGLE_LOT_NAME",
    "location": "LOCATION_OF_THE_ACTUAL_PARKING_LOT",
    "hourlyRate": 10 (or any integer of how much you want to be paid per hour spent in the parking lot"
    (optional) "minutesBeforePay": (minutes spent before payment is started default is 15, minimum is 1 minute)
}
```
And set the headers to be 
```
{
    "Authorization": "Bearer: YOUR_LOT_AUTH_TOKEN_FROM_BEFORE"
    "Content-Type": "application/json"
}
```

5. Make a call to ```"your backend url"/lot/singleLot/list``` to get your list of single lots, and put the _id into config.yaml in single_lot_server
Headers should be 
```
{
    "Authorization": "Bearer: YOUR_LOT_AUTH_TOKEN_FROM_BEFORE"
    "Content-Type": "application/json"
}
```

This should get the basic functionality of the app to work

To get information regarding payments, make a get request to ```"your backend url"/lot/stripe/accountUrl``` which will get you your onboarding link
Headers should be 
```
{
    "Authorization": "Bearer: YOUR_LOT_AUTH_TOKEN_FROM_BEFORE"
    "Content-Type": "application/json"
}
```

After onboarding make a get request to ```"your backend url"/lot/stripe/loginUrl``` which will let you log in and view payments
Headers should be 
```
{
    "Authorization": "Bearer: YOUR_LOT_AUTH_TOKEN_FROM_BEFORE"
    "Content-Type": "application/json"
}
```

Password Changes can be made to your lot through a put request to ```"your backend url"/lot/changePassword```
Body should be
```
{
    "oldPassword": "YOUR_OLD_LOT_PASSWORD"
    "newPassword": "YOUR_NEW_LOT_PASSWORD"
}
```
Headers should be 
```
{
    "Authorization": "Bearer: YOUR_LOT_AUTH_TOKEN_FROM_BEFORE"
    "Content-Type": "application/json"
}
```
