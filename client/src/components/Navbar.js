import React, {useContext} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext)
  const logoutHandler = () => {
    auth.logout()
    history.push('/')
  }

  return (
    <nav>
      <div className="nav-wrapper blue darken-1 plr-40">
        <a href="/" className="brand-logo">Сокращение ссылок</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to='/create'>Создать</NavLink></li>
          <li><NavLink to='/links'>Ссылки</NavLink></li>
          <li><button
            type='button'
            onClick={logoutHandler}
          >Выйти</button></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
