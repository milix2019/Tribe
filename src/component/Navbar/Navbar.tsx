import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="topnav" data-testid="topnav-element">
      <div className="menu-container">
        <div className="home">
          <Link to="/">
            <Icon icon="octicon:home-24" width="30" height="30" />
          </Link>
        </div>
        <div className="search">
          <input type="text" className="search-term" placeholder="search" />
          <button type="submit" className="search-button">
            <Icon icon="octicon:search-24" width="15" height="15" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
