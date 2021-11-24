import React from 'react';
import { render } from '@testing-library/react-native';
import Assets from '../components/Portfolio/Assets/Assets';

test('Assets blobk renders', () => {
  const { getByText } = render(<Assets />);
  expect(getByText('Previous Transactions:')).not.toBeNull();
});
