import './style.css';
import { sample } from '../../sample';
import CoinStats from '../../components/CoinStats/CoinStats';
import Search from '../../components/Search/Search';
import CoinDetail from '../../components/CoinDetail/CoinDetail';
import BrowsingHistory from '../../components/BrowsingHistory/BrowsingHistory';
import { useEffect, useState } from 'react';

function Main() {
  const [top10Coins, setTop10Coins] = useState(sample);
  const [browseHistory, setBrowseHistory] = useState(
    JSON.parse(localStorage.getItem('browseHistory')) || ['btc-bitcoin']
  );
  const [detailID, setDetailID] = useState('btc-bitcoin');

  useEffect(() => {
    getCoinsMarketData();
    const interval = setInterval(getCoinsMarketData, 60000);
    return () => clearInterval(interval);
  }, []);

  async function getCoinsMarketData() {
    const getAllCoinsDataURL = 'https://api.coinpaprika.com/v1/tickers';
    const response = await fetch(getAllCoinsDataURL);
    const result = await response.json();
    setTop10Coins(result.slice(0, 10));
  }

  function handleShowSearchDetail(coin_id) {
    setDetailID(coin_id);

    let index = browseHistory.findIndex(h => h === coin_id);
    let history = browseHistory.slice();
    if (index > -1) {
      history.splice(index, 1);
      history.push(coin_id);
    } else if (browseHistory.length === 5) {
      history.shift();
      history.push(coin_id);
    } else {
      history.push(coin_id);
    }
    setBrowseHistory(history);
  }

  function handleHistoryDelete(i) {
    let newHistory = browseHistory.slice();
    newHistory.splice(i, 1);
    setBrowseHistory(newHistory);
  }

  useEffect(() => {
    localStorage.setItem('browseHistory', JSON.stringify(browseHistory));
  }, [browseHistory]);

  return ( 
    <main>
      <CoinStats
        data={top10Coins}
        columns={["Rank", "Name", "Price", "24h Change"]}
        showDetail={setDetailID}
      />
      <CoinDetail coin_id={detailID} />
      <Search showDetail={handleShowSearchDetail} />
      <BrowsingHistory
        browseHistory={browseHistory} 
        showDetail={setDetailID}
        handleDelete={handleHistoryDelete}
      />
    </main>
  );
}

export default Main;