import axios from '../api'

export const fetchPaymentMethods = () => {
    return async (dispatch, getState) => {
        const token = getState().user.token;
        try{
            const response = await axios.get('')
        }
    }
}
export const fetchQrData = () =>{
    return async (dispatch, getState) =>{
        const token = getState().user.token;
        try{
            const response = await axios.get('/user/qrIdentifier',
                {
                    token: `Bearer: ${token}`
                });
            dispatch(setQrCodeReady(true));
            dispatch(setQrCodeData(response.qrIdentifier));
        } catch(error) {
            dispatch(setQrCodeReady(false));
            dispatch(userError(error.message));
        }
    };
};