import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import CoinList from '../components/MarketPage/CoinList';

const coinItemMock = {
  name: 'Test',
  current_price: 100,
  image: 'notavailable',
  price_change_percentage_24h: 10,
  sparkline_in_7d: { price: [70, 80, 90, 100] },
  ath_date: 'Mon, 22 Nov 2021 03:04:00 -0500',
  ath: 100,
};

const coinDataMock = [
  { ...coinItemMock, name: 'Test1', id: 1 },
  { ...coinItemMock, name: 'Test2', id: 2 },
  { ...coinItemMock, name: 'Test3', id: 3 },
];
const promise = Promise.resolve();
const getMarketDataMock = jest.fn(() => promise);

test('coin list renders coins as coin items', () => {
  const { getAllByText } = render(
    <CoinList coinData={coinDataMock} getMarketData={getMarketDataMock} />
  );
  expect(getAllByText('$100')).toHaveLength(coinDataMock.length);
});
