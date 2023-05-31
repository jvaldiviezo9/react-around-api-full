import {React, useContext, useEffect} from 'react';
import '../blocks/Header.sass';

import {Link, useLocation} from "react-router-dom";

import {CurrentUserContext} from "../contexts/CurrentUserContext";

const Header = () => {

  const {signedIn} = useContext(CurrentUserContext);
  const location = useLocation();

  const handleClick = () => {
    localStorage.removeItem("jwt");
    window.location.reload();
  }

  useEffect(() => {

  }, [location]);

  const getLink = () => {
    if (location.pathname === "/signin") {
      return <h3> <Link to="/signup" className="header__link">Registrarse </Link> </h3>
    } else {
      return <h3> <Link to="/signin" className="header__link">Iniciar Sesión </Link> </h3>
    }
  }

  return (
    <header className="header">
      <h1 className="header__title">
        Around <sup>North America</sup>
      </h1>

      {signedIn ? <h3 onClick={handleClick} className="header__link">Cerrar Sesión</h3> : getLink()}

    </header>
  );
}

export default Header;
