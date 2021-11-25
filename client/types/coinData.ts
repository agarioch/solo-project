export interface coinData {
  name: string;
  current_price: number;
  image: string;
  price_change_percentage_24h: number;
  sparkline_in_7d: any;
  ath_date: string;
  symbol?: string;
}
