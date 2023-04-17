import React, { useContext } from 'react';
import { Link, useMatch } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const useIsActive = (path) => {
  const match = useMatch(path);
  return match?.isExact ? 'active-link' : '';
};

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const homeActive = useIsActive('/');
  const itemsActive = useIsActive('/items');
  const loginActive = useIsActive('/login');
  const signupActive = useIsActive('/signup');

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link className={homeActive} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={itemsActive} to="/items">
              Items
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <span>Welcome, {user.username}</span>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className={loginActive} to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className={signupActive} to="/signup">
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;