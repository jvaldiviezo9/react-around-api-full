import {React, useContext, useState, useEffect} from "react";
import '../blocks/App.sass';
import Profile from "./AuxComponents/Profile";
import Elements from "./Elements";

import {CurrentUserContext} from "../contexts/CurrentUserContext";

import Login from "./LoginComponents/Login";
import Register from "./LoginComponents/Register";
import ProtectedRoute from "./ProtectedRoute";

import {Route, Switch, Redirect, useLocation} from "react-router-dom";
import * as auth from "../utils/auth";

function Main(props) {
  
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {currentUser, setSignedIn} = useContext(CurrentUserContext);

  useEffect(() => {
    const checkToken = async () => {
      if (localStorage.getItem("jwt")) {
        const token = localStorage.getItem("jwt");
        // validate token
        try {
          const tokenValidation = await auth.TokenValidation(token);

          if (tokenValidation.data._id) {
            setIsLoggedIn(true);
            setSignedIn(true);
            }

          }catch (error) {
          console.error("Error occurred during login:", error);
          setIsLoggedIn(false);
        }
      }
    }
    checkToken();
  }, [isLoggedIn, location.pathname]);

  return (

      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <>
            <Profile currentUser={currentUser} ApiElement={props.ApiElement}/>
            <Elements ApiElement={props.ApiElement}/>
          </> : <Redirect to="/signin" />}
        </Route>
        <Route path="/signin">
          {isLoggedIn ? <Redirect to="/" /> : <Login setIsLoggedIn={setIsLoggedIn}/>}
        </Route>
        <Route path="/signup">
          {isLoggedIn ? <Redirect to="/" /> : <Register/>}
        </Route>
        <Route path="/register">
          <Redirect to="/signup"/>
        </Route>
        <ProtectedRoute path="/" isLoggedIn={isLoggedIn} component={() => <Redirect to="/" />} />
      </Switch>

  );
}

export default Main;
