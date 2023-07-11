import React, { useEffect } from 'react';
import connect from 'react-redux';
import { fetchQrData } from '../actions/UserActions.js';
import QRCode from 'qrcode.react';

const Home = ({ user, fetchQrData }) =>{
    useEffect(() => {
        if(!user.qrDataReady){
            fetchQrData();
        }
    }, [user.qrCodeData, fetchQrData]);
    //add loading image later
    if(user.error){
        return <div> Error: {user.error} </div>;
    }
    if(!user.qrDataReady){
        return <div>
            Loading...
            </div>
    }
    return (
        <div>
        <QRCode value={user.qrCodeData} />
        </div>
    );
};
const mapStateToProps = (state) =>{
    return {
        user: state.user,
    };
};
const mapDispatchToProps = {
    fetchQrData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
