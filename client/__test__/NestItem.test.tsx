import React from 'react';
import { render } from '@testing-library/react-native';
import NewsItem from '../components/NewsPage/NewsItem';

const testArticle = {
  news_url:
    'https://dailyhodl.com/2021/11/22/here-are-the-top-5-metaverse-altcoins-with-the-most-potential-according-to-crypto-analyst-austin-arnold/',
  image_url:
    'https://crypto.snapi.dev/images/v1/7/m/gamer-1jpgfit10242c600ssl1-81940.jpg',
  title:
    'Here Are the Top 5 Metaverse Altcoins With the Most Potential, According to Crypto Analyst Austin Arnold',
  text: "Altcoin Daily host and crypto trader Austin Arnold is naming the metaverse tokens he believes have the most potential in terms of fundamentals. The crypto trader tells his 1.13 million YouTube subscribers that he's looking at peer-to-peer video delivery blockchain Theta Network (THETA), which he says is an essential infrastructure for the development of the [\u2026] The post Here Are the Top 5 Metaverse Altcoins With the Most Potential, According to Crypto Analyst Austin Arnold appeared first on The Daily Hodl.",
  source_name: 'The Daily Hodl',
  date: 'Mon, 22 Nov 2021 03:04:00 -0500',
  topics: [],
  sentiment: 'Neutral',
  type: 'Article',
};

test('news item renders article from api', () => {
  const { getByText, getByRole } = render(<NewsItem data={testArticle} />);
  expect(getByText(testArticle.title)).not.toBeNull();
  // expect(getByRole('image')).toHaveProperty('src', testArticle.image_url);
  expect(getByText(`Source: ${testArticle.source_name}`)).not.toBeNull();
  expect(getByText('November 22nd 2021')).not.toBeNull();
});
