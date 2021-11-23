import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CoinItem from '../components/MarketPage/CoinItem';

const coinItemMock = {
  name: 'Test',
  current_price: 100,
  image: 'notavailable',
  price_change_percentage_24h: 10,
  sparkline_in_7d: { price: [70, 80, 90, 100] },
  ath_date: 'Mon, 22 Nov 2021 03:04:00 -0500',
};

const openModalMock = jest.fn();

test('news search renders correctly', () => {
  const { getByText } = render(
    <CoinItem coinItem={coinItemMock} openModal={openModalMock} />
  );
  expect(getByText(' Test ')).not.toBeNull();
  expect(getByText('$100')).not.toBeNull();
  expect(getByText('10.00%').props.style.color).toEqual('#34C759');
});

test('user can open the modal', () => {
  const { getByText } = render(
    <CoinItem coinItem={coinItemMock} openModal={openModalMock} />
  );
  const title = getByText(' Test ');
  fireEvent.press(title);
  expect(openModalMock).toHaveBeenCalledTimes(1);
});
