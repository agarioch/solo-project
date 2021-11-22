import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NewsList from '../components/NewsPage/NewsList';

const mockArticle = {
  news_url:
    'https://dailyhodl.com/2021/11/22/here-are-the-top-5-metaverse-altcoins-with-the-most-potential-according-to-crypto-analyst-austin-arnold/',
  image_url:
    'https://crypto.snapi.dev/images/v1/7/m/gamer-1jpgfit10242c600ssl1-81940.jpg',
  title: 'A',
  text: "Altcoin Daily host and crypto trader Austin Arnold is naming the metaverse tokens he believes have the most potential in terms of fundamentals. The crypto trader tells his 1.13 million YouTube subscribers that he's looking at peer-to-peer video delivery blockchain Theta Network (THETA), which he says is an essential infrastructure for the development of the [\u2026] The post Here Are the Top 5 Metaverse Altcoins With the Most Potential, According to Crypto Analyst Austin Arnold appeared first on The Daily Hodl.",
  source_name: 'The Daily Hodl',
  date: 'Mon, 22 Nov 2021 03:04:00 -0500',
  topics: [],
  sentiment: 'Neutral',
  type: 'Article',
};

const mockData = [
  mockArticle,
  { ...mockArticle, title: 'B', topics: ['NFT'] },
  { ...mockArticle, title: 'C' },
];

test('news list renders a list of news items', () => {
  const { getAllByText } = render(
    <NewsList cryptoNews={mockData} setShowNFT={() => {}} getData={() => {}} />
  );
  expect(getAllByText('November 22nd 2021')).toHaveLength(3);
});

test('news list renders top nav bar', () => {
  const { getByText } = render(
    <NewsList cryptoNews={mockData} setShowNFT={() => {}} getData={() => {}} />
  );
  expect(getByText('Crypto')).not.toBeNull();
  expect(getByText('NFT')).not.toBeNull();
});

test('clicking NFT should filter the articles for those with NFT topic', () => {
  const setShowNFTMock = jest.fn();
  const { getByText, getAllByText } = render(
    <NewsList
      cryptoNews={mockData}
      setShowNFT={setShowNFTMock}
      getData={() => {}}
    />
  );

  fireEvent.press(getByText('NFT'));
  expect(setShowNFTMock).toHaveBeenCalled();
});
