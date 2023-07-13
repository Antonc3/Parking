import DataStatus from '../status/DataStatus'
const initialState = {
    paymentMethods: [],
    activePayment: '',
    paymentStatus: DataStatus.IDLE,
    error: '',
}

const paymentReducer = (state = initialState, action) =>{
    switch (action.type) {
        case 'LOGOUT':
            return {
                ...state,
                paymentMethods: [],
                activePayment: '',
                paymentStatus: DataStatus.IDLE,
                error: '',
            }
        case 'PAYMENT_ADDPAYMENTMETHOD':
            return {
                ...state,
                paymentMethods: [...paymentMethods, action.payload]
            }
        case 'PAYMENT_SETPAYMENTMETHODS':
            return { ...state, paymentMethods: action.payload};
        case 'PAYMENT_SETACTIVEPAYMENTINDEX':
            return { ...state, activePayment: action.payload};
        case 'PAYMENT_SETSTATUS':
            return {...state, paymentStatus: action.payload};
        case 'PAYMENT_ERROR':
            return {...state, paymentStatus: DataStatus.ERROR, error: action.payload}
        default:
            return state
    }
}