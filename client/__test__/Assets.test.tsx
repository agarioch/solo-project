import React from 'react';
import { render } from '@testing-library/react-native';
import Assets from '../components/Portfolio/Assets/Assets';
import Services from '../services/userCoinApi';

const UserCoinMock = {
  _id: 'a',
  userCoin: 'AAA',
  userAmount: 100,
  date: new Date(),
  boughtPrice: 90,
};

beforeAll(() => {
  jest
    .spyOn(Services, 'getData')
    .mockImplementation(() => Promise.resolve([UserCoinMock]));
  jest.spyOn(Services, 'addData').mockImplementation(() => Promise.resolve());
  jest
    .spyOn(Services, 'deleteData')
    .mockImplementation(() => Promise.resolve());
});
describe.only('testing assets component', () => {
  test.only('Assets block renders', async () => {
    const { getByText, findByText } = render(<Assets />);
    expect(getByText('Previous Transactions:')).not.toBeNull();
    expect(await findByText('AAA')).not.toBeNull();
  });
});
