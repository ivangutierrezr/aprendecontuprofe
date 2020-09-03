import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './login.css'
import '../../node_modules/bulma/css/bulma.min.css'
// import ListadoMedidas from './listadoMedidas/listadoMedidas'
// import Medida from './listadoMedidas/encuesta'

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    slideIndex: 1,
  }

  componentDidMount() {
    this.showSlides()
  }

  showSlides = () => {
    let slides = document.getElementById("contenedorPrincipalLogin");
    let slideIndex = this.state.slideIndex
    let rutaArchivo = './assets/fondoLogin'+slideIndex+'.jpg'
    slides.style.backgroundImage = "url(" + rutaArchivo + ")";
    slides.style.transition = "background-image 1s ease-in-out";
    if (slideIndex == 3) {
        this.setState({
          slideIndex: 0
        })
    } else {
      slideIndex++
      this.setState({
        slideIndex: slideIndex
      })
    }
    setTimeout(this.showSlides, 5000);
  }

  render() {
    return(
      <div className="content">
          <div className="contenedorPrincipalLogin" id="contenedorPrincipalLogin">
            <div className="contenedorLogin">
                <img src="assets/logoAprende.png" alt="logoAPrendeConTuProfe" />
                <div className="formularioLogin">
                    {/* <p className="tituloLogin">
                        Inicio de sesión
                    </p> */}
                    <div className="loginContainer">
                      <div className="field">
                        <p className="control has-icons-left">
                          <input className="input is-primary is-medium is-rounded" type="text" placeholder="Nombre de usuario" />
                          <span className="icon is-medium is-left">
                            <i className="fas fa-user"></i>
                          </span>
                        </p>
                      </div>
                      <div className="field">
                        <p className="control has-icons-left">
                          <input className="input is-primary is-medium is-rounded" type="password" placeholder="Contraseña" />
                          <span className="icon is-medium is-left">
                            <i className="fas fa-lock"></i>
                          </span>
                        </p>
                      </div>
                      <div className="field is-grouped">
                        <div className="control">
                          <button className="button is-primary is-rounded is-medium">Iniciar sesión</button>
                        </div>
                      </div>
                    </div>
                    {/* <form className="login" action="home.html">
                        <input type="text" id="nombreUsuario" placeholder="Nombre de usuario" />
                        <input type="password" id="password" placeholder="Contraseña" />
                        <input type="submit" id="submit" value="Iniciar sesión" />
                    </form> */}
                    <a className="olvidastePassword">
                        ¿Olvidaste tu contraseña?                      
                    </a>
                </div>
            </div>
          </div>
      </div>
    )
  }
}
