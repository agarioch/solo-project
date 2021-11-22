import React, { useState, useEffect, FC, useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
// Component Import
import CoinList from '../components/MarketPage/CoinList';
import CoinSearch from '../components/MarketPage/CoinSearch';
// Type
import { coinData } from '../types/coinData';
import ApiService from '../services/marketApi';

const Market: FC = () => {
  const [coin, setCoin] = useState<coinData[]>([]);
  const [filteredCoin, setFilteredCoin] = useState<coinData[]>([]);
  const [input, setInput] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const filterCoins = (val: string) => {
    setInput(val);
    if (val) {
      const filtered = coin.filter((data: coinData) =>
        data.name.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredCoin(filtered);
    }
  };

  const getMarketData = useCallback(() => {
    ApiService.getCoin<coinData[]>().then((data) => {
      setCoin(data);
    });
  }, []);

  useEffect(() => {
    getMarketData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.marketTitle}>Market</Text>
        <Ionicons
          onPress={() => setShowSearch(!showSearch)}
          style={styles.searchBar}
          name='ios-search'
          size={30}
          color='#fff'
        />
      </View>
      {showSearch ? (
        <CoinSearch filterCoins={filterCoins} input={input} />
      ) : null}
      <CoinList
        input={input}
        filteredCoin={filteredCoin}
        filterCoins={filterCoins}
        coinData={coin}
        getMarketData={getMarketData}
      />
    </SafeAreaView>
  );
};

export default Market;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    bottom: 20,
    backgroundColor: '#080808',
  },

  searchBar: {
    fontSize: 30,
    color: '#BFD7ED',
  },
  marketTitle: {
    letterSpacing: 1,
    fontWeight: 'bold',
    color: '#BFD7ED',
    fontSize: 25,
    fontFamily: 'Chivo_700Bold',
  },

  titleContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomColor: '#BFD7ED',
    borderBottomWidth: 2,
    padding: 20,
    marginTop: 25,
  },
});
