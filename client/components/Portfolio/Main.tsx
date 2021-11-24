import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
  KeyboardAvoidingView,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebase';
import CoinPie from './CoinPie';
import Header from './Header';

import UserInputNav from './UserInputArea/UserInputNav';

import TabIcon5 from '../TabIcons/TabIcon5';

import Icons from '../../constants/Icons';
import ApiService from '../../services/marketApi';

const Main = () => {
  const [coinValues, setCoinValues] = useState([]);
  const formatEmail = auth.currentUser?.email.split('@')[0];

  useEffect(() => {
    ApiService.getCoin().then((output) => {
      setCoinValues(output);
    });
  }, []);

  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => navigation.goBack())
      .catch((err: Error) => console.log(err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior='position'>
        <SafeAreaView style={styles.coinDataArea}>
          <Header formatEmail={formatEmail} />
          <CoinPie coinValues={coinValues} />
          <UserInputNav coinValues={coinValues} />
        </SafeAreaView>
      </KeyboardAvoidingView>
      <TouchableOpacity style={styles.signOutArea} onPress={handleSignOut}>
        <TabIcon5 icon={Icons.logoutcolor} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  addPosition: { position: 'absolute', top: 420, right: 20 },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#000',
  },
  row: { flexDirection: 'row' },

  addText: {
    color: '#fff',
    paddingTop: 10,
    fontFamily: 'Chivo_400Regular',
    letterSpacing: 1,
    textAlign: 'center',
    fontSize: 18,
    opacity: 0.7,
    marginTop: 45,
    paddingLeft: 10,
    marginRight: 10,
  },

  asset: {
    color: '#fff',
    paddingTop: 10,
    fontFamily: 'Chivo_400Regular',
    letterSpacing: 1,
    textAlign: 'center',
    fontSize: 18,
    opacity: 0.5,
    marginTop: 45,
    marginRight: 10,
  },

  coinDataArea: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  text: {
    color: '#fff',
    textAlign: 'center',
    marginVertical: 15,
  },
  signOutArea: {
    paddingHorizontal: 15,
    position: 'absolute',
    bottom: 100,
    right: 10,
    borderRadius: 20,
  },
});

export default Main;
