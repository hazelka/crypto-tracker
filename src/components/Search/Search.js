import { useEffect, useState } from "react";
import SearchResult from "./SearchResult";
import './style.css';

function Search({ showDetail }) {
  const [searchString, setSearchString] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [resultFound, setResultFound] = useState(true);

  async function handleSearch() {
    const url = `https://api.coinpaprika.com/v1/search?q=${searchString}&c=currencies`;
    const response = await fetch(url);
    let data = await response.json();
    data = data.currencies.filter(d => d.type === 'coin');
    setSearchResult(data);
    data.length ? setResultFound(true) : setResultFound(false);
  }

  return (
    <div className="search">
      <div className="search-input-container">
        <input
          className="search-input"
          onChange={(e) => setSearchString(e.target.value)} 
          placeholder="Enter the crypto symbol.." 
          type="text"
          value={searchString}
        ></input>
        <button className="search-btn" onClick={handleSearch}>Search</button> 
      </div>
      <div className="search-result-container">
        {searchResult.map(sr => (
          <SearchResult 
            key={sr.id} 
            name={sr.name} 
            symbol={sr.symbol} 
            handleOnClick={() => showDetail(sr.id)}
          />
        ))}
        <div className={resultFound ? 'hide' : 'show'}>
          No result found - Please enter a different coin
        </div>
      </div>
    </div>
  );
}

export default Search;