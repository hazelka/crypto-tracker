import { formatPrice } from '../../helper';
import './style.css';

function CoinStats({ data, columns, showDetail }) {
  const mapColumnsToStats = {
    "Rank": "rank",
    "Name": "name",
    "Price": "quotes.USD.price",
    "24h Change": "quotes.USD.percent_change_24h"
  };

  function renderTableHead(columns) {
    const th = columns.map(c => <th key={c}>{c}</th>);
    return(
      <thead>
        <tr>{th}</tr>
      </thead>
    );
  }

  function renderCoinStats(coin) {
    const td = columns.map(c => {
      let value = getPropByString(coin, mapColumnsToStats[c]);

      if (c === 'Name') {
        return (
          <td key={coin.id + c} className="name-stat">
            {value} &middot; {coin.symbol}
          </td>
        );
      }

      if (c === 'Price') {
        return (
          <td key={coin.id + c} className="number-stat">
            {formatPrice(value)}
          </td>
        );
      };

      if (c === '24h Change') {
        return (
          <td key={coin.id + c} className="number-stat change">
            <span className={value > 0 ? 'up' : 'down'}>
              {value.toFixed(2)} %
              <span className={value > 0 ? 'up-symbol' : 'down-symbol'}></span>
            </span>
          </td>
        );
      }

      return <td key={coin.id + c}>{value}</td>;
    });
    
    return(
      <tr key={coin.id} onClick={() => showDetail(coin.id)}>{td}</tr>
    );
  }

  function getPropByString(obj, propString) {
    let props = propString.split('.');
    let prop = obj;
    while (props.length) {
      prop = prop[props[0]];
      props.shift();
    }
    return prop;
  }

  return (  
    <table className='coin-stats'>
        {renderTableHead(columns)}
        <tbody>
          {data.map((d, i) => renderCoinStats(d, i))}
        </tbody>
    </table>
  );
}

export default CoinStats;