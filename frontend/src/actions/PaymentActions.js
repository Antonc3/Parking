import axios from '../api'
import DataStatus from '../status/DataStatus'

export const fetchPaymentMethods = () => {
    return async (dispatch, getState) => {
        const token = getState().user.token;
        dispatch(setPaymentStatus(DataStatus.LOADING));
        try{
            const response = await axios.get('/user/payment/getPaymentMethods',
                {
                    token: `Bearer: ${token}`,
                }
            );
            const paymentMethods = response.paymentMethods;
            const activePaymentId = response.activePaymentId;
            dispatch(setPaymentMethods(paymentMethods));
            dispatch({
                type: 'PAYMENT_SETACTIVEPAYMENTMETHOD',
                payload: activePaymentId,
            });
            dispatch(setPaymentStatus(DataStatus.SUCCESS));
        } catch(error) {
            dispatch(payment(error.message));
        }
    }
}

export const setActivePaymentMethod = (activePaymentId) => {
    return async (dispatch, getState) => {
        const token = getState().user.token;
        try{
            const response = await axios.put('/user/payment/changeActivePaymentMethod',
                {
                    token: `Bearer: ${token}`,
                    activePaymentId,
                }
            );
            dispatch({
                type: 'PAYMENT_SETACTIVEPAYMENTMETHOD',
                payload: activePaymentId,
            });
            dispatch(setPaymentStatus(DataStatus.SUCCESS));
        } catch(error) {
            dispatch(payment(error.message));
        }
    }
}
export const addPaymentMethod = (paymentMethod) => {
    return async (dispatch, getState) => {
        const token = getState().user.token;
        try{
            const response = await axios.post('/user/payment/saveCard',
                {
                    token: `Bearer: ${token}`,
                    paymentMethod: paymentMethod.id,
                }
            );
            dispatch(setPaymentStatus(DataStatus.SUCCESS));
            disdpatch({
                type: 'PAYMENT_ADDPAYMENTMETHOD',
                payload: paymentMethod,
            })
        } catch(error) {
            dispatch(payment(error.message));
        }
    }
}

export const paymentError = (error) => {
    return {
        type: 'PAYMENT_ERROR',
        payload: error,
    }
}
export const setPaymentStatus = (paymentStatus) =>{
    return {
        type: 'PAYMENT_SETSTATUS',
        payload: paymentStatus,
    }
}
export const setPaymentMethods = (paymentMethods) => {
    return {
        type: 'PAYMENT_SETPAYMENTMETHODS',
        payload: paymentMethods,
    }
}