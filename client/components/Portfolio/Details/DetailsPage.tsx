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
import Services from '../../../services/API';
import ApiService from '../../../services/marketApi';

const DetailsPage = () => {
  const navigation = useNavigation();
  const [values, setValues] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Returns total revenue of the portfolio
  const revenue = () => {
    let total = 0;
    values.map((item) => {
      const firstAmount = item['boughtPrice'] * item['userAmount'];
      total += firstAmount;
    });
    return total;
  };

  const totalRev = revenue();

  const valuesCoin: any = values.map((item) => item['userCoin']);
  const valuesAmount: any = values.map((item) => item['userAmount']);

  const dataNumber = apiData.map((data) => {
    if (valuesCoin.includes(data['symbol'])) {
      return parseInt(data['price']) * parseInt(valuesAmount);
    }
  });

  const sumofCoins = dataNumber.map((price) => {
    let totalSum = 0;
    if (price !== undefined) {
      totalSum += price;
    } else {
      return null;
    }
    return totalSum;
  });

  // @ts-ignore:next-line
  const totalAmount = (sumofCoins[0] +=
    // @ts-ignore:next-line
    sumofCoins[1] + sumofCoins[2] + sumofCoins[3]);

  // DELETE HTTP REQUEST
  const handleDelete = (id: string) => {
    Services.deleteData(id).then(() => {
      setValues((data) => data.filter((item: any) => item._id !== id));
    });
  };

  const getAllCoinData = async (...userInput) => {
    try {
      await ApiService.getCoin().then((output) => {
        setApiData(output);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getDbData = async () => {
    try {
      await Services.getData().then((coinInfo) => {
        setValues(coinInfo);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // @ts-ignore:next-line
  useEffect(async () => {
    getAllCoinData('BTC', 'ETH', 'SOL', 'ADA', 'DOGE', 'XRP', 'SHIB');
    await getDbData();
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <DetailsItem apiData={apiData} onDelete={handleDelete} item={item} />
    ),
    []
  );
  const keyExtractor = useCallback((item) => item._id, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}> Portfolio Details </Text>

      <View style={styles.portArea}>
        <Text style={styles.total}>
          Total: ${totalAmount.toLocaleString()}{' '}
        </Text>
        <Text style={styles.revenue}>
          Revenue:
          <Text style={totalAmount - totalRev > 0 ? styles.green : styles.red}>
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
        data={values}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </SafeAreaView>
  );
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
