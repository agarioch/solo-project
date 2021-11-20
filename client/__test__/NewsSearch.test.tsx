import React from 'react';
import renderer from 'react-test-renderer';
import NewsSearch from '../components/NewsPage/NewsSearch';

test('news search renders correctly', () => {
  const tree = renderer
    .create(<NewsSearch input={''} filterNews={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
