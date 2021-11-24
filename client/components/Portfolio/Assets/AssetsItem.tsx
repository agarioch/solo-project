import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import moment from 'moment';

const AssetsItem = ({ dbData }) => {
  const totalSpent = dbData.userAmount * dbData.boughtPrice;

  const ITEMS = {
    BTC: 'https://g.foolcdn.com/art/companylogos/square/btc.png',
    ETH: 'https://downloads.coindesk.com/arc-hosted-images/eth.png',
    ADA: 'https://s3.cointelegraph.com/storage/uploads/view/a7872fcc56858227ffa183256a5d55e1.png',
    SOL: 'https://s2.coinmarketcap.com/static/img/coins/200x200/5426.png',
  };

  const renderImage = ITEMS[dbData.userCoin] || null;

  return (
    <SafeAreaView>
      <View style={styles.coinItem}>
        <Image
          style={styles.img}
          source={{
            uri: renderImage,
          }}
        />
        <Text style={styles.listItem}>{dbData.userCoin}</Text>

        <Text style={styles.listItem}>${totalSpent.toLocaleString()}</Text>

        <Text style={styles.listItem}>
          {moment(dbData.date).format('MMM Do YYYY')}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default AssetsItem;

const styles = StyleSheet.create({
  listItem: {
    color: '#fff',
    padding: 20,
    fontSize: 17,
    fontFamily: 'Chivo_400Regular',
    letterSpacing: 1,
  },
  red: { color: 'red' },
  green: { color: 'green' },
  img: { height: 25, width: 25, marginTop: 20, borderRadius: 20 },
  coinItem: { flexDirection: 'row' },
});
