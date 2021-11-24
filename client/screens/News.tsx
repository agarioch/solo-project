import { AxiosResponse } from 'axios';
import React, { FC, useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// Component Import
import NewsList from '../components/NewsPage/NewsList';
import NewsSearch from '../components/NewsPage/NewsSearch';
// Type
import { CoinNews } from '../types/CoinNews';

const News: FC<CoinNews> = () => {
  const [allNews, setAllNews] = useState<CoinNews[]>([]);
  const [FilteredNews, setFilteredNews] = useState<CoinNews[]>([]);
  const [showNFT, setShowNFT] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const filterNews = (input: string) => {
    setSearchInput(input);
    if (input) {
      const filtered = allNews.filter((data: CoinNews) =>
        data.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredNews(filtered);
    }
  };
  const getData = async () => {
    const res = await fetch(
      `https://cryptonews-api.com/api/v1/category?section=general&items=50&token=${process.env.REACT_APP_API_KEY}&items=50`
    );
    const output: AxiosResponse<CoinNews[]> = await res.json();
    setAllNews(output.data);
  };

  useEffect(() => {
    getData();
  }, []);

  let newsToShow = searchInput.length > 0 ? FilteredNews : allNews;
  newsToShow = showNFT
    ? newsToShow.filter((item: any) => item.topics.includes('NFT'))
    : newsToShow;

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
          <NewsSearch input={searchInput} filterNews={filterNews} />
        ) : null}
        <NewsList
          getData={getData}
          cryptoNews={newsToShow}
          setShowNFT={setShowNFT}
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
