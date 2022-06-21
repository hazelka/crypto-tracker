import Particles from 'react-tsparticles';
import { particlesConfig } from './particlesConfig';
import './style.css';

function Header() {
  return (  
    <header>
      <Particles height="50vh" options={particlesConfig}/>
      <div id="header-info">
        <h1 id="header-title">Crypto Currency Tracker</h1>
        <p id="header-desc">MANAGE YOUR CRYPTO PORTFOLIO</p>
      </div>
      
    </header>
  );
}

export default Header;