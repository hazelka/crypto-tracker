import './style.css';
import { formatPrice } from '../../helper';
import { sample } from '../../sample';
import PercentChange from '../PercentChange/PercentChange';
import Graph from '../Graph/Graph';
import { useState, useEffect } from 'react';

function CoinDetail({ coin_id }) {

  const [coin, setCoin] = useState(sample[0]);

  useEffect(() => {

    async function getCoinMarketDataById() {
      const getCoinDataByIdURL = `https://api.coinpaprika.com/v1/tickers/${coin_id}`;
      const response = await fetch(getCoinDataByIdURL);
      const result = await response.json();
      setCoin(result);
    }

    getCoinMarketDataById();
    const interval = setInterval(getCoinMarketDataById, 60000);
    return () => clearInterval(interval);
  },[coin_id]);

  return ( 
    <div id="coin-detail">
      <div className='row'>
        <h2 className='detail-name'>{coin.name}</h2>
        <div className='coin-symbol'>{coin.symbol}</div>
        <div className='detail-price'>{formatPrice(coin.quotes.USD.price)}</div>
      </div>
      <div className='row'>
        <div className='detail-container'>
          <div className='detail-type'>MARKET CAP</div>
          <div className='detail-data'>
            {formatPrice(coin.quotes.USD.market_cap)}
          </div>
        </div>
        <div className='detail-container'>
          <div className='detail-type'>VOLUMN</div>
          <div className='detail-data'>
            {formatPrice(coin.quotes.USD.volume_24h)}
          </div>
        </div>
        <div className='detail-container'>
          <div className='detail-type'>CIRC. SUPPLY</div>
          <div className='detail-data'>
            {formatPrice(coin.circulating_supply).slice(1)}
          </div>
        </div>
        <div className='detail-container'>
          <div className='detail-type'>TOTAL SUPPLY</div>
          <div className='detail-data'>
            {formatPrice(coin.total_supply).slice(1)}
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='detail-container'>
          <div className='detail-type'>1H USD</div>
          <div className='detail-data'>
            <PercentChange value={coin.quotes.USD.percent_change_1h} />
          </div>
        </div>
        <div className='detail-container'>
          <div className='detail-type'>24H USD</div>
          <div className='detail-data'>
            <PercentChange value={coin.quotes.USD.percent_change_24h} />
          </div>
        </div>
        <div className='detail-container'>
          <div className='detail-type'>7D USD</div>
          <div className='detail-data'>
            <PercentChange value={coin.quotes.USD.percent_change_7d} />
          </div>
        </div>
        <div className='detail-container'>
          <div className='detail-type'>30D USD</div>
          <div className='detail-data'>
            <PercentChange value={coin.quotes.USD.percent_change_30d} />
          </div>
        </div>
        <div className='detail-container'>
          <div className='detail-type'>1Y USD</div>
          <div className='detail-data'>
            <PercentChange value={coin.quotes.USD.percent_change_1y} />
          </div>
        </div>
      </div>
      <Graph coin_id={coin.id} />
    </div>
  );
}

export default CoinDetail;