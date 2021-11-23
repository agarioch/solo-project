import React, { useState, useEffect, FC, useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// Component Import
import CoinList from '../components/MarketPage/CoinList';
import CoinSearch from '../components/MarketPage/CoinSearch';
// Type
import { coinData } from '../types/coinData';
import ApiService from '../services/marketApi';

const Market: FC = () => {
  const [coins, setCoins] = useState<coinData[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<coinData[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const filterCoins = (input: string) => {
    setSearchInput(input);
    if (input) {
      const filtered = coins.filter((coin: coinData) =>
        coin.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredCoins(filtered);
    }
  };
  const getMarketData = useCallback(() => {
    ApiService.getCoin<coinData[]>().then((data) => {
      setCoins(data);
    });
  }, []);
  useEffect(() => {
    getMarketData();
  }, []);

  const coinsToDisplay = searchInput === '' ? coins : filteredCoins;
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
        <CoinSearch filterCoins={filterCoins} input={searchInput} />
      ) : null}
      <CoinList coinData={coinsToDisplay} getMarketData={getMarketData} />
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
