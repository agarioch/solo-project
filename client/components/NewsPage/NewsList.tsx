import React, { useCallback, useState } from 'react';
import { SafeAreaView, FlatList, RefreshControl } from 'react-native';
import TopNav from './TopNav';
import NewsItem from './NewsItem';

const NewsList = ({ cryptoNews, setShowNFT, getData }) => {
  const [refreshing, setRefreshing] = useState(false);

  const renderItem = useCallback(
    ({ item }) => <NewsItem data={item} />,
    [cryptoNews]
  );
  const keyExtractor = useCallback((item) => item.title, [cryptoNews]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    try {
      getData();
      setRefreshing(false);
    } catch (error) {
      console.error(error);
    }
  }, [refreshing]);

  return (
    <SafeAreaView>
      <TopNav setShowNFT={setShowNFT} />
      <FlatList
        data={cryptoNews}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor='#fff'
          />
        }
      />
    </SafeAreaView>
  );
};

export default NewsList;
