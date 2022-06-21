import './style.css';

function PercentChange({ value } ) {
  return ( 
    <span className={value > 0 ? 'up' : 'down'}>
      {value.toFixed(2)} %
      <span className={value > 0 ? 'up-symbol' : 'down-symbol'}></span>
    </span> 
  );
}

export default PercentChange;