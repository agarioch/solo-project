import React, { useMemo, useRef, FC, useCallback, useState } from 'react';
import {
  StyleSheet,
  RefreshControl,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

import BottomSheet from '../BottomSheet/BottomSheet';
import CoinItem from './CoinItem';
import { coinData } from '../../types/coinData';

type CoinListProps = {
  coinData: coinData[];
  getMarketData: () => void;
};

const CoinList = ({ coinData, getMarketData }: CoinListProps) => {
  const [selectedCoin, setSelectedCoin] = useState<coinData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    try {
      getMarketData();
      setIsRefreshing(false);
    } catch (error) {
      console.error(error);
    }
  }, [isRefreshing]);

  const openModel = useCallback((coin: coinData) => {
    setSelectedCoin(coin);
    bottomSheetModalRef.current?.present();
  }, []);

  const renderItem = useCallback(
    ({ item: coin }: { item: coinData }) => (
      <CoinItem openModel={() => openModel(coin)} coinItem={coin} />
    ),
    []
  );

  const keyExtractor = useCallback((coin) => coin.id.toString(), []);

  // Bottom Sheet
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['60%', '90%'], []);

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.listContainer}>
        <FlatList
          style={styles.flatListItem}
          data={coinData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor='#cdebf9'
            />
          }
        />
      </SafeAreaView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: '#121212' }}
      >
        <SafeAreaView style={styles.listContainer}>
          {selectedCoin ? <BottomSheet selectCoin={selectedCoin} /> : null}
        </SafeAreaView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default CoinList;

const styles = StyleSheet.create({
  listContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },

  flatListItem: {
    fontFamily: 'Chivo_400Regular',
    backgroundColor: '#080808',
    marginTop: 20,
    paddingTop: 0,
    padding: 20,
    marginBottom: 250,
  },
});
