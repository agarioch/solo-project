import React, { useMemo, useRef, FC, useCallback, useState } from 'react';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { coinData } from '../../types/coinData';
import {
  StyleSheet,
  RefreshControl,
  FlatList,
  SafeAreaView,
} from 'react-native';

import BottomSheet from '../BottomSheet/BottomSheet';
import CoinItem from './CoinItem';

const CoinList: FC<coinData> = ({
  coinData,
  filteredCoin,
  input,
  getMarketData,
}) => {
  const [selectCoin, setSelectCoin] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    try {
      getMarketData();
      setRefreshing(false);
    } catch (error) {
      console.error(error);
    }
  }, [refreshing]);

  const openModel = useCallback((data: any) => {
    setSelectCoin(data);
    bottomSheetModalRef.current?.present();
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <CoinItem openModel={() => openModel(item)} coinItem={item} />
    ),
    []
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  // Bottom Sheet
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['60%', '90%'], []);

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.listContainer}>
        <FlatList
          style={styles.flatListItem}
          data={input.length > 0 ? filteredCoin : coinData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
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
          {selectCoin ? <BottomSheet selectCoin={selectCoin} /> : null}
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
