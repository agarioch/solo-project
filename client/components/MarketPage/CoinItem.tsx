import React from 'react';
import { coinData } from '../../types/coinData';

import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const CoinItem = ({ coinItem, openModel }: { coinItem: coinData } | any) => {
  return (
    <TouchableOpacity onPress={openModel}>
      <View style={styles.wrapper}>
        <View style={styles.coinItemStyle}>
          <View style={styles.left}>
            <View style={styles.imgArea}>
              <Image source={{ uri: coinItem.image }} style={styles.image} />
            </View>
            <View style={styles.name}>
              <Text style={styles.listItem}> {coinItem.name} </Text>
            </View>
          </View>

          <View style={styles.right}>
            <View style={styles.coinInfo}>
              <Text style={styles.listItem}>
                $
                {coinItem.current_price.toLocaleString('USD', {
                  currency: 'USD',
                  minimumFractionDigits: 0,
                })}
              </Text>
            </View>
            <View style={styles.coinInfo}>
              <Text
                style={
                  coinItem.price_change_percentage_24h > 0
                    ? { color: '#34C759' }
                    : { color: '#FF3B30' }
                }
              >
                {coinItem.price_change_percentage_24h.toFixed(2)}%
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CoinItem;

const styles = StyleSheet.create({
  coinItemStyle: {
    marginLeft: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },

  name: {
    width: 100,
    marginRight: 10,
    justifyContent: 'center',
  },
  left: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  right: {
    width: '60%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },

  coinInfo: {},

  wrapper: {
    justifyContent: 'space-between',
    padding: 25,
    paddingLeft: 0,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },

  image: {
    height: 40,
    width: 40,
  },
  imgArea: {
    width: 50,
  },

  listItem: {
    margin: 10,
    color: 'white',
    fontFamily: 'Chivo_700Bold',
    letterSpacing: 1,
    fontSize: 15,
  },
});
