const initialState = {
    paymentMethods: [],
    activePaymentIndex: 0,
}

const paymentReducer = (state = initialState, action) =>{
    switch (action.type) {
        case 'LOGOUT':
            return {
                ...state,
                paymentMethods: [],
                activePaymentIndex: 0,
            }
        case 'SET_ACTIVEPAYMENTINDEX':
            return { ...state, activePaymentIndex: action.payload}
    }
}