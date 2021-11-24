import React from 'react';
import { render } from '@testing-library/react-native';
import AssetsItem from '../components/Portfolio/Assets/AssetsItem';
import moment from 'moment';

const dbData = {
  userAmount: 1,
  boughtPrice: 1,
  userCoin: 'BTC',
  date: new Date(),
};

test('Asset details from server render', () => {
  const { getByText } = render(<AssetsItem dbData={dbData} />);
  expect(getByText(dbData.userCoin)).not.toBeNull();
  const totalSpent = (dbData.userAmount * dbData.boughtPrice).toLocaleString();
  expect(getByText(`$${totalSpent}`)).not.toBeNull();
  expect(getByText(moment(dbData.date).format('MMM Do YYYY'))).not.toBeNull();
});
