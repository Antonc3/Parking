import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { SvgXml } from 'react-native-svg';
import axios from 'axios';

const Home = () => {
  const [qrCodeData, setQRCodeData] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQRCodeData();
  }, []);

  const fetchQRCodeData = async () => {
    try {
      const response = await axios.get('YOUR_SERVER_ENDPOINT');
      const qrCodeData = response.data.qrCodeData;
      setQRCodeData(qrCodeData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <SvgXml xml={qrCodeData} width={200} height={200} />
    </View>
  );
};

export default Home;

