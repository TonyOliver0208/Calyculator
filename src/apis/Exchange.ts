// src/apis/exchange.ts
import axios from 'axios';
// import { EXCHANGE_API_URL } from '../constants/Exchange';

interface ExchangeParams {
  base: string;
  convertTo: string;
  fromValue: number;
}

const getExchange = async ({ base, convertTo, fromValue }: ExchangeParams) => {
  // const url = `${EXCHANGE_API_URL}?to=${convertTo}&from=${base}&amount=${fromValue}`;
  // const config = {
  //   headers: {
  //     'apikey': 'NSlTyGPA06FzVWrhFHSIJ12Vv8Pgcg5g'
  //   },
  // };
  // try {
  //   const { data } = await axios.get(url, config);
  //   return data;
  // } catch (err) {
  //   console.log("Issue in fetching currency exchange: ", err);
  //   return {};
  // }
};

const ExchangeAPI = { getExchange };

export default ExchangeAPI;
