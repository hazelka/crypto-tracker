import { useEffect, useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { history as sample_history} from '../../sample';

function Graph({ coin_id }) {
  const [history, setHistory] = useState([]);
  const graphStyle = { 
    width: '100%', 
    height: '300px', 
    marginTop: '2rem' 
  };

  useEffect(() => {
    async function getCoinHistory() {
      let oneYearAgo = new Date(Date.now() - 31536000 * 1000);
      oneYearAgo = Math.ceil(oneYearAgo / 1000 + 300); 
      const historyURL = `https://api.coinpaprika.com/v1/tickers/${coin_id}/historical?start=${oneYearAgo}&interval=24h`;
      const response = await fetch(historyURL);
      const data = await response.json();
      let history = data.map(d => ({
        date: d.timestamp.slice(0, 10),
        price: d.price
      }));
      setHistory(history);
    }
    
    getCoinHistory();
  }, [coin_id]);

  return (
    <div id="graph" style={graphStyle}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={history}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip labelStyle={{ color: 'black' }}/>
          <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }}  dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Graph;