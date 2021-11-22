import React from 'react';
import { render } from '@testing-library/react-native';
import MarketLoading from '../components/MarketPage/MarketLoading';

test('news search renders correctly', () => {
  const { getByText } = render(<MarketLoading />);
  expect(getByText('Market Data Loading...')).not.toBeNull();
});
