import {React, useState} from 'react';
import * as auth from '../../utils/auth'
import '../../blocks/Register.sass';
import {Link, useHistory} from "react-router-dom";

import PopupWithForm from "../PopupWithForm";
import InfoTooltip from "./InfoTooltip";

const Register = () => {
  
  const history = useHistory()
  
  const [isRegister, setIsRegister] = useState(false);
  const [infoResponse, setInfoResponse] = useState(false);
  
  const storeToken = async (email, password) => {
    try {
      const response = await auth.Signin(email.value, password.value)
      if (response.token) {
        const tokenValidation = await auth.TokenValidation(response.token)
        if (tokenValidation.data._id) {
          localStorage.setItem("jwt", response.token);
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
  
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    
    const {"input-email": email, "input-password": password} = e.target.elements
    
    try {
      const response = await auth.Signup(email.value, password.value)
      
      if (response.data._id) {
        setIsRegister(true);
        
        // delay 1000 ms and redirect to "/"
        // se hace para esperar a que el servidor actualice la base de datos
        setTimeout(() => {
          
          storeToken(email, password).then(() => {
            history.push("/")
          }).catch((error) => {
            // un error pasó al guardar el token, pero si hubo registro exitoso.
            // se forza la redirección a "/", y automaticamente sería enviado a "/signin"
            // se remueve el token con la intención de forzar al usuario a ingresar de nuevo sus credenciales
            console.error("Error occurred during login:", error);
            localStorage.removeItem("jwt")
            history.push("/")
          })
          
        }, 1000);
        
      } else {
        setIsRegister(false);
      }
    } catch (error) {
      setIsRegister(false);
      console.error("Error occurred during Register:", error);
    } finally {
      setInfoResponse(true);
    }
  }
  
  return (
    
    <>
      <main className="main__register">
        <div className="main__register-container">
          <h1 className="main__register-title">Registrarse</h1>
          <form onSubmit={handleSubmit} className="main__register-form">
            <input className="main__input-email" name="input-email" id="input-email" type="email" minLength="2"
                   maxLength="100" required placeholder="Correo electrónico"/>
            <input className="main__input-password" name="input-password" id="input-password" type="password"
                   minLength="2" maxLength="320" required placeholder="Contraseña"/>
            <button className="main__button-register">Registrarse</button>
            <span className="main__register-span">¿Ya eres miembro? {' '}
              <Link to="/signin" className="main__register-link">
                Inicia sesión aquí
              </Link>
            </span>
          </form>
        </div>
      </main>
      
      <PopupWithForm popupStatus={infoResponse} setPopupStatus={setInfoResponse}>
        <InfoTooltip isRegistered={isRegister}></InfoTooltip>
      </PopupWithForm>
    </>
  )
}

export default Register;
