import React from 'react';
import * as auth from '../../utils/auth';
import '../../blocks/Login.sass';

import { useHistory } from "react-router-dom";
import {Link} from "react-router-dom";

const Login = (props) => {

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault()

    const {"input-email": email, "input-password": password} = e.target.elements
    try {

      const response = await auth.Signin(email.value, password.value)

      if (response.token) {
        const tokenValidation = await auth.TokenValidation(response.token)

        if (tokenValidation._id) {

          localStorage.setItem("jwt", response.token);
          props.setIsLoggedIn(true);
          history.push("/");
        } else {
          console.log("Token Validation failed:", tokenValidation.error);
        }
      } else {
        console.log("Login failed:", response.error);
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    }

  }

  return (
    <>
      <main className="main__register">
        <div className="main__login-container">
          <h1 className="main__login-title">Inicia Sesión</h1>

          <form onSubmit={handleSubmit} className="main__login-form">
            <input className="main__input-email" name="input-email" id="input-email" type="email" minLength="2"
                   maxLength="100" required placeholder="Correo electrónico"/>
            <input className="main__input-password" name="input-password" id="input-password" type="password"
                   minLength="2" maxLength="320" required placeholder="Contraseña"/>
            <button className="main__button-login">Inicia Sesión</button>
            <span className="main__login-span">¿Aún no eres miembro?{` `}
              <Link to="/signup" className="main__login-link">
              Registrate aquí
            </Link></span>
          </form>
        </div>
      </main>
    </>
  )
}


export default Login;
