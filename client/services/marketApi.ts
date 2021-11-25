import axios from 'axios';

const API_URL =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=7d';

async function fetchApi(options: { [key: string]: string }) {
  try {
    const res = await axios({
      url: API_URL,
      ...options,
    });
    if (res.status <= 400) {
      return res.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
  }
}

function getCoin<T>(): Promise<T> {
  return fetchApi({ method: 'GET' });
}

const ApiService = { getCoin };
export default ApiService;
