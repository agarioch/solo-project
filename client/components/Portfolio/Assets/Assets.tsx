import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList } from 'react-native';
import Services from '../../../services/userCoinApi';
import UserCoin from '../../../types/UserCoin';

import AssetsItem from './AssetsItem';
const Assets = () => {
  const [dbData, setdbData] = useState<UserCoin[]>([]);

  useEffect(() => {
    Services.getData().then((output) => {
      setdbData(output);
    });
  }, []);

  const renderItem = useCallback(
    ({ item }) => <AssetsItem dbData={item} />,
    []
  );
  const keyExtractor = useCallback((item) => item._id, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.flatListItem}
        ListHeaderComponent={
          <Text style={styles.txt}>Previous Transactions:</Text>
        }
        data={dbData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </SafeAreaView>
  );
};

export default Assets;

const styles = StyleSheet.create({
  txt: {
    color: '#fff',
    opacity: 0.6,
    letterSpacing: 2,
    fontFamily: 'Chivo_400Regular',
  },
  container: {
    position: 'absolute',
    top: 10,

    width: '100%',
  },
  flatListItem: {
    fontFamily: 'Chivo_400Regular',
    width: '95%',
    padding: 20,
  },
});
