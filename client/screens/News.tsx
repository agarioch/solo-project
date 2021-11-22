import React, { FC, useCallback, useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// Component Import
import NewsList from '../components/NewsPage/NewsList';
import NewsSearch from '../components/NewsPage/NewsSearch';
// Type
import { CoinNews } from '../types/CoinNews';

const News: FC<CoinNews> = () => {
  const [cryptoNews, setCryptoNews] = useState([]);

  const [FilteredNews, setFilteredNews] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [input, setInput] = useState('');

  const filterNews = (val: string) => {
    setInput(val);
    if (val) {
      const filtered = cryptoNews.filter((data: CoinNews) =>
        data.title.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredNews(filtered);
    }
  };
  const getData = async () => {
    const res = await fetch(
      `https://cryptonews-api.com/api/v1/category?section=general&items=50&token=${process.env.REACT_APP_API_KEY}&items=50`
    );
    const output = await res.json();
    setCryptoNews(output.data);
  };

  useEffect(() => {
    getData();
  }, []);

  // Resets to crypto Data on click

  const displayCryptoData = () => {
    getData();
  };

  const displayNFTData = () => {
    setCryptoNews((current) =>
      current.filter((item: any) => item.topics.includes('NFT'))
    );
  };

  return (
    <SafeAreaView style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.newsTitles}>News</Text>
          <Ionicons
            onPress={() => setShowSearch(!showSearch)}
            style={styles.searchBar}
            name='ios-search'
            size={30}
            color='#fff'
          />
        </View>
        {showSearch ? (
          <NewsSearch input={input} filterNews={filterNews} />
        ) : null}
        <NewsList
          getData={getData}
          FilteredNews={FilteredNews}
          cryptoNews={cryptoNews}
          displayCryptoData={displayCryptoData}
          displayNFTData={displayNFTData}
          input={input}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default News;

const styles = StyleSheet.create({
  background: { backgroundColor: '#080808', height: 1000 },
  container: {
    padding: 10,
    height: 600,
    backgroundColor: '#080808',
  },
  searchBar: {
    fontSize: 30,
    color: '#BFD7ED',
  },
  newsTitles: {
    textAlign: 'left',
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
    paddingLeft: 20,
    padding: 20,
    marginBottom: 1,
  },
});
