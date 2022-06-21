import { useEffect, useState } from 'react';
import { formatPrice } from '../../helper';
import PercentChange from '../PercentChange/PercentChange';

function BrowsingHistoryItem({ coin_id, handleOnClick, handleDelete }) {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState(0);
  const [change, setChange] = useState(0);

  useEffect(() => {
    getMarketDataById();
    const interval = setInterval(getMarketDataById, 60000);
    return () => clearInterval(interval);
  }, []);

  async function getMarketDataById() {
    const getCoinDataByIdURL = `https://api.coinpaprika.com/v1/tickers/${coin_id}`;
    const response = await fetch(getCoinDataByIdURL);
    const result = await response.json();
    setName(result.name);
    setSymbol(result.symbol);
    setPrice(result.quotes.USD.price);
    setChange(result.quotes.USD.percent_change_24h);
  }

  return (  
    <div className="browse-result" onClick={handleOnClick}>
      <div className="browse-result-name">
        {name} &middot; <span className="browse-result-symbol">{symbol}</span>
      </div>
      <div className="browse-result-market">
        <span className='browse-result-pice'>
          {formatPrice(price)}
        </span>
        <span className='browse-result-change'>
          <PercentChange value={change} />
        </span>
        <span className='browse-result-delete' onClick={handleDelete}>
          X
        </span>
      </div>
    </div>
  );
}

export default BrowsingHistoryItem;