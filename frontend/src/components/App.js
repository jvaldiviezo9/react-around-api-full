import React, {useEffect, useState} from "react";
import '../blocks/App.sass';
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main"
import {CurrentUserContext} from "../contexts/CurrentUserContext"

import ApiElement from "../utils/api"

import {BrowserRouter} from "react-router-dom";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    ApiElement.getUserInfo()
    .then((res) => {
      setCurrentUser(res);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  const contextFunctions = {
    currentUser,
    setCurrentUser,
    signedIn,
    setSignedIn
  }

  return (
    <>

      <CurrentUserContext.Provider value={contextFunctions}>
      <BrowserRouter>
        <Header />
        <Main ApiElement={ApiElement} />
      </BrowserRouter>
      </CurrentUserContext.Provider>
      <Footer />
    </>
  );
}

export default App;
