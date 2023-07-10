import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { SvgXml } from 'react-native-svg';
import axios from '../api.js';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';

const Home = () => {
  const [qrCodeData, setQRCodeData] = useState('');
  const token = useSelector((state) => state.user.token);
  useEffect(() => {
    fetchQRCodeData();
  }, []);

  const fetchQRCodeData = async () => {
    try {
      const response = await axios.get('/user/qrCode',
        {
            headers: {
                Authorization: `Bearer: ${token}`,
            }
        });
      setQRCodeData(response.data.qrCode);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  if (isLoading) {ata
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

    </View>
  );
};

export default Home;

