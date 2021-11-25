import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DetailsItem from './DetailsItem';
import TabIcon from '../../TabIcons/TabIcon';
import Icons from '../../../constants/Icons';
import Services from '../../../services/userCoinApi';
import ApiService from '../../../services/marketApi';
import UserCoin from '../../../types/UserCoin';
import { coinData } from '../../../types/coinData';

const DetailsPage = () => {
  const navigation = useNavigation();
  const [userCoins, setUserCoins] = useState<UserCoin[]>([]);
  const [apiData, setApiData] = useState<coinData[]>([]);

  // Returns total revenue of the portfolio [AG: think this is the purchase cost, not current value?]
  const revenue = () => {
    let total = 0;
    userCoins.map((coin) => {
      const firstAmount = coin.boughtPrice * coin.userAmount;
      total += firstAmount;
    });
    return total;
  };

  const totalRev = revenue();

  let amounts: { [coin: string]: number } = {};
  userCoins.forEach((coin) => {
    amounts[coin.userCoin] = coin.userAmount;
  });
  console.log('amounts', amounts);
  const dataNumber = apiData.map((data) => {
    console.log(data.symbol);
    if (amounts.hasOwnProperty(String(data.symbol).toUpperCase())) {
      return data.current_price * amounts[String(data.symbol).toUpperCase()];
    }
  });
  console.log('dataNumber', dataNumber);
  const coinPrices = dataNumber.map((price) => {
    if (price !== undefined) {
      return price;
    } else {
      return 0;
    }
  });

  const totalAmount =
    coinPrices.reduce(
      (acc: number, curr: number | null) => acc + (curr || 0),
      0
    ) || 0;
  console.log('sumofcoins', coinPrices);
  console.log(totalAmount);
  const handleDelete = async (id: string) => {
    await Services.deleteData(id).then(() => {
      setUserCoins((data) => data.filter((item: any) => item._id !== id));
    });
  };

  const getAllCoinData = async () => {
    try {
      await ApiService.getCoin<coinData[]>().then((output) =>
        setApiData(output)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getDbData = async () => {
    try {
      await Services.getData().then((coinInfo) => {
        setUserCoins(coinInfo);
      });
    } catch (error) {
      console.error(error);
    }
  };

  // @ts-ignore:next-line
  useEffect(async () => {
    getAllCoinData();
    await getDbData();
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: UserCoin }) => (
      <DetailsItem onDelete={handleDelete} item={item} />
    ),
    []
  );
  const keyExtractor = useCallback((item) => item._id, []);

  if (userCoins.length) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}> Portfolio Details </Text>

        <View style={styles.portArea}>
          <Text style={styles.total}>
            Total: ${totalAmount.toLocaleString()}{' '}
          </Text>
          <Text style={styles.revenue}>
            Revenue:
            <Text
              style={totalAmount - totalRev > 0 ? styles.green : styles.red}
            >
              {` $${(totalAmount - totalRev).toLocaleString()}`}
            </Text>
          </Text>
        </View>

        <TouchableOpacity
          style={styles.goback}
          onPress={() => navigation.goBack()}
        >
          <TabIcon icon={Icons.goBack} />
        </TouchableOpacity>

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
              Your Assets:
            </Text>
          }
          data={userCoins}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </SafeAreaView>
    );
  } else {
    return <Text>Loading ...</Text>;
  }
};

export default DetailsPage;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#080808',
  },

  listHeader: {
    color: '#fff',
    opacity: 0.6,
    letterSpacing: 2,
    fontFamily: 'Chivo_400Regular',
  },

  goback: {
    position: 'absolute',
    color: 'white',
    top: 70,
    left: 20,
    opacity: 0.6,
  },

  portArea: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#cdebf9',
    position: 'absolute',
    top: 110,
    height: 50,
    width: '100%',
  },

  green: { color: 'green' },
  red: { color: 'red' },

  header: {
    color: '#fff',
    position: 'absolute',
    top: 70,
    letterSpacing: 2,
    opacity: 0.8,
    fontSize: 20,
  },

  total: {
    color: '#000',
    letterSpacing: 2,
    opacity: 0.8,
    fontSize: 18,
  },

  revenue: {
    color: '#000',
    letterSpacing: 2,
    opacity: 0.8,
    fontSize: 18,
  },

  text: {
    color: '#a0d8f3',
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 2,
    padding: 15,
    marginRight: 30,
    fontFamily: 'Chivo_400Regular',
    fontSize: 20,
    top: 80,
    letterSpacing: 1,
  },

  flatListItem: {
    fontFamily: 'Chivo_400Regular',
    width: '95%',
    marginTop: 120,
    padding: 20,
    marginBottom: 100,
  },
});
