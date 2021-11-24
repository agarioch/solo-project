import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CoinSearch from '../components/MarketPage/CoinSearch';

test('search inputs sent to filter function', () => {
  const filterCoinsMock = jest.fn();
  const { getByPlaceholderText } = render(
    <CoinSearch input='' filterCoins={filterCoinsMock} />
  );
  fireEvent.changeText(getByPlaceholderText('Search...'), 'asdf');
  expect(filterCoinsMock).toHaveBeenCalled();
});
