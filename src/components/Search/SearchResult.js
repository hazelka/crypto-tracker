function SearchResult({id, name, symbol, handleOnClick }) {
  return (
    <div className="search-result" onClick={handleOnClick}>
      <div className="search-result-name">{name}</div>
      <div className="search-result-symbol">{symbol}</div>
    </div>
  );
}

export default SearchResult;