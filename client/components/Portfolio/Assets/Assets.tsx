import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';

import AssetsItem from './AssetsItem';
const Assets = () => {
  const [dbData, setdbData] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_DB)
      .then((res) => res.json())
      .then((output) => {
        setdbData(output);
      });
  });

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
          <Text
            style={{
              color: '#fff',

              opacity: 0.6,
              letterSpacing: 2,
              fontFamily: 'Chivo_400Regular',
            }}
          >
            Previous Transactions:
          </Text>
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
