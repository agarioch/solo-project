import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel,
  ChartXLabel,
} from '@rainbow-me/animated-charts';
import { ScrollView } from 'react-native-gesture-handler';

// Format Line graph
const formatSparkline = (numbers: any[]) => {
  const sevenDaysAgo = moment().subtract(7, 'days').unix();
  return numbers.map((item, index) => {
    return {
      x: sevenDaysAgo + (index + 1) * 3600,
      y: item,
    };
  });
};

// Format Date
const formatDatetime = (value: string | number) => {
  'worklet';
  return `${(value === ''
    ? new Date()
    : new Date(Number(value) * 1000)
  ).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })}`;
};

export const { width: SIZE, height: HEIGHT } = Dimensions.get('window');

const BottomSheet = ({ selectCoin }) => {
  // This state & effect fixes a bug with rainbow charts
  // prevData & currData not updated when chart path rendered
  const [chartVisible, setChartVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setChartVisible(true);
    }, 0);
  }, [selectCoin]);

  let price: string = selectCoin.current_price.toLocaleString('USD', {
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  // Format Currency
  const formatUSD = (value: string) => {
    'worklet';
    if (value === '') {
      return `$${price}`;
    }
    return ` $${parseFloat(value)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  };
  return (
    <ChartPathProvider
      data={{
        points: formatSparkline(selectCoin.sparkline_in_7d.price),
        smoothingStrategy: 'bezier',
      }}
    >
      <SafeAreaView style={styles.bottomSheetContainer}>
        <View style={styles.imgArea}>
          <Image source={{ uri: selectCoin.image }} style={styles.image} />
        </View>
        <View style={styles.coinInfo}>
          <View style={styles.border}>
            <Text style={styles.listItem}>
              Market Cap: ${selectCoin.market_cap.toLocaleString()}
            </Text>
          </View>
          <View style={styles.border}>
            <Text style={styles.listItem}>
              ATH: ${selectCoin.ath.toLocaleString()}
            </Text>
          </View>
          {HEIGHT > 700 && (
            <>
              <View style={styles.border}>
                <Text style={styles.listItem}>
                  ATH Date: {moment(selectCoin.ath_date).format('MMMM Do YYYY')}
                </Text>
              </View>
              <View style={styles.border}>
                <Text style={styles.listItem}>
                  Circulating Supply:{' '}
                  {selectCoin.circulating_supply.toLocaleString()}
                </Text>
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
      <View style={styles.prices}>
        <ChartYLabel style={styles.dynamicData} format={formatUSD} />
        <ChartXLabel style={styles.dynamicData} format={formatDatetime} />
      </View>

      {chartVisible && (
        <ChartPath
          height={SIZE / 2}
          stroke={
            selectCoin.price_change_percentage_24h > 0 ? '#34C759' : '#FF3B30'
          }
          strokeWidth='3'
          width={SIZE}
        />
      )}
      <ChartDot size={9} style={{ backgroundColor: '#003B73' }} />
    </ChartPathProvider>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    justifyContent: 'space-evenly',
    backgroundColor: '#181818',
    borderRadius: 20,
    margin: 10,
    marginRight: 20,
    marginLeft: 20,
  },

  dynamicData: {
    color: 'white',
    backgroundColor: '#60A3D9',
    borderRadius: 50,
    width: 150,
    textAlign: 'center',
    letterSpacing: 2,
    fontWeight: 'bold',
    padding: 15,
    marginBottom: 15,
    marginHorizontal: 20,
  },

  prices: {
    marginTop: 5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    color: '#fff',
  },

  border: {
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
  },

  coinInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginLeft: 10,
    color: '#fff',
    fontFamily: 'Chivo_400Regular',
    letterSpacing: 1,
  },

  image: {
    height: 60,
    width: 60,
    borderRadius: 25,
    marginTop: 10,
  },
  imgArea: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    margin: 15,
    fontFamily: 'Chivo_400Regular',
    letterSpacing: 0.5,
    fontSize: 14,
    color: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    width: 300,
    textAlign: 'center',
    padding: 8,
    overflow: 'hidden',
  },
});
