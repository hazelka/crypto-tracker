import BrowsingHistoryItem from './BrowsingHistoryItem';
import './style.css';

function BrowsingHistory({ browseHistory , showDetail, handleDelete }) {

  return (  
    <div id="browsing-history">
      <h3>Browsing History</h3>
      <div className='browing-history-container'>
        {browseHistory.map((history, i) => (
          <BrowsingHistoryItem
            key={history} 
            coin_id={history} 
            handleOnClick={() => showDetail(history)} 
            handleDelete={() => handleDelete(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default BrowsingHistory;