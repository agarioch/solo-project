import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, ScrollView, RefreshControl, Text } from 'react-native';
import { VictoryPie } from 'victory-native';
import { useNavigation } from '@react-navigation/native';

import Services from '../../services/API';

const CoinPie = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [allData, setAllData] = useState([]);

  let output: {}[] = [];
  let myData: any = {};

  const populateGraph = (coinArgs: any[]) => {
    coinArgs.forEach((item) => {
      let userAmount = item.userAmount;
      let userCoin = item.userCoin;

      const COINS = {
        BTC: 23,
        ETH: 5,
        SOL: 2,
        DOGE: 0.14,
        ADA: 1,
      };

      const timesBy = COINS[userCoin] || 1;

      myData = {};
      myData.x = userCoin;
      myData.y = parseInt(userAmount) * timesBy;
      output.push(myData);
    });
  };

  useEffect(() => {
    Services.getData().then((coinInfo) => {
      populateGraph(coinInfo);
    });
  }, [populateGraph]);

  const getData = () => {
    Services.getData().then((coinInfo) => {
      setAllData(coinInfo);
      populateGraph(allData);
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    try {
      getData();
      setRefreshing(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <ScrollView
      style={styles.pieContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor='#cdebf9'
        />
      }
    >
      <Text style={styles.text}>Click on wheel to expand...</Text>

      <VictoryPie
        labelRadius={({ innerRadius }) => +innerRadius + 20}
        padAngle={({ datum }) => datum.y * 0.7}
        padding={{ top: 10, bottom: 60 }}
        innerRadius={100}
        cornerRadius={({ datum }) => datum.y * 0.4}
        colorScale={['tomato', '#a0d8f3', 'gold', 'cyan', 'navy', '#899cf0']}
        data={output}
        animate={{
          duration: 2000,
        }}
        style={{
          data: {
            fillOpacity: 0.9,
            stroke: '#fff',
            strokeWidth: 3,
          },
          labels: {
            fontSize: 14,
            textAlign: 'center',
            fill: '#fff',
          },
        }}
        events={[
          {
            target: 'data',
            eventHandlers: {
              onPressIn: () => {
                navigation.navigate('Details');
              },
            },
          },
        ]}
      />
    </ScrollView>
  );
};

export default CoinPie;

const styles = StyleSheet.create({
  container: { backgroundColor: '#080808' },
  pieContainer: { marginTop: 10 },

  text: { color: '#fff', textAlign: 'center', opacity: 0.4, marginBottom: 20 },
});
