import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, ScrollView, RefreshControl, Text } from 'react-native';
import { VictoryPie } from 'victory-native';
import { useNavigation } from '@react-navigation/native';

import Services from '../../services/userCoinApi';
import UserCoin from '../../types/UserCoin';

const CoinPie = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [chartData, setChartData] = useState<{ x: string; y: number }[]>([]);

  const populateGraph = (coinArgs: UserCoin[]) => {
    setChartData(
      coinArgs.map((coin) => ({ x: coin.userCoin, y: coin.userAmount }))
    );
  };

  const getData = () => {
    Services.getData().then((coinInfo) => {
      populateGraph(coinInfo);
    });
  };

  useEffect(() => {
    getData();
  }, []);

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
        labelRadius={({ innerRadius }) => Number(innerRadius) + 20}
        padAngle={5}
        padding={{ top: 10, bottom: 60 }}
        innerRadius={100}
        cornerRadius={0.5}
        colorScale={['tomato', '#a0d8f3', 'gold', 'cyan', 'navy', '#899cf0']}
        data={chartData}
        animate={{
          duration: 1000,
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
