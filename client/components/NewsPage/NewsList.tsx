import React, { useCallback, useState } from 'react';
import { SafeAreaView, FlatList, RefreshControl } from 'react-native';
import TopNav from './TopNav';
import NewsItem from './NewsItem';
import { CoinNews } from '../../types/CoinNews';

type NewsListProps = {
  cryptoNews: CoinNews[];
  setShowNFT: React.Dispatch<React.SetStateAction<boolean>>;
  getData: () => Promise<void>;
};

const NewsList = ({ cryptoNews, setShowNFT, getData }: NewsListProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const renderItem = useCallback(
    ({ item }: { item: CoinNews }) => <NewsItem data={item} />,
    [cryptoNews]
  );
  const keyExtractor = useCallback(
    (item: CoinNews) => item.title,
    [cryptoNews]
  );

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    try {
      getData();
      setIsRefreshing(false);
    } catch (error) {
      console.error(error);
    }
  }, [isRefreshing]);

  return (
    <SafeAreaView>
      <TopNav setShowNFT={setShowNFT} />
      <FlatList
        data={cryptoNews}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor='#fff'
          />
        }
      />
    </SafeAreaView>
  );
};

export default NewsList;
