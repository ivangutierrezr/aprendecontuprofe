import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Space, Button, Input, Select, Spin, message } from 'antd';
import { UserOutlined, LoginOutlined, KeyOutlined, EyeOutlined, EyeInvisibleOutlined, LoadingOutlined  } from '@ant-design/icons';
const { Option } = Select
var sliderImages

export default class Login extends Component {
  state = {
    urlDB: 'http://127.0.0.1:8000',
    spinText: "Cargando Información",
    loading: false,
    username: "",
    password: "",
    rol: null,
    slideIndex: 1,
    irAdmin: false,
    irHome: false,
  }

  /* componentDidMount() {
    this.showSlides()
  } */

  showSlides = () => {
    let slides = document.getElementById("contenedor-principal-login");
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
    sliderImages = setTimeout(this.showSlides, 5000);
  }

  login = () => {
    if (this.state.rol == 1) {
      if (this.state.username == "admin" && this.state.password == "admin") {
        this.setState({
          irAdmin: true,
        });
      } else {
        message.error('Falla en inicio de sesión, datos incorrectos');
      }
    } else {
      this.setState({ loading: true, spinText: "Iniciando sesión"})
      const url = `${this.state.urlDB}/api/login/`;
      const datos = {
        username: this.state.username,
        password: this.state.password,
        rol: this.state.rol
      }
      const self = this
      axios.post(url, datos)
        .then(function (response) {
            console.log(response.data)
            localStorage.setItem('tokenACTP', response.data.token)
            self.setState({
              loading: false,
              irHome: true
          })
        })
        .catch(function (error) {
            console.log(error)
            self.setState({
                loading: false
            })
            message.error('Falla en inicio de sesión, datos incorrectos');
        })
    }

    /* this.setState(state => ({
      irAdmin: true,
    })); */
  }

  render() {
    return (
      <Spin tip={this.state.spinText} spinning={this.state.loading} size="large" indicator={<LoadingOutlined style={{ fontSize: 30, marginBottom: '15px' }} />}>
        <div className="content-login">
          {
            this.state.irAdmin && <Redirect to={{pathname: '/admin'}}/>
          }
          {
            this.state.irHome && <Redirect to={{pathname: '/home'}}/>
          }
          <div className="contenedor-principal-login" id="contenedor-principal-login">
            <div className="contenedor-login">
              <img src="assets/logoAprende.png" alt="logoAPrendeConTuProfe" />
              <div className="formulario-login">
                <div className="login-container">
                  <Space direction="vertical">
                    <Input 
                      size="large" 
                      placeholder="Id de Usuario" 
                      prefix={<UserOutlined />} 
                      onChange={(ele) => {
                        this.setState({ username: ele.target.value})
                      }}
                    />
                    <Input.Password
                      size="large" 
                      placeholder="Contraseña"
                      prefix={<KeyOutlined />} 
                      iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                      onChange={(ele) => {
                        this.setState({ password: ele.target.value})
                      }}
                    />
                    <Select 
                      size="large"
                      style={{width: '100%'}}
                      prefix={<KeyOutlined />} 
                      placeholder="Tipo de usuario"
                      onChange={(ele) => {
                        this.setState({rol: ele})
                      }}
                    >
                      <Option value={3}>Estudiante</Option>
                      <Option value={2}>Docente</Option>
                      <Option value={1}>Administrador</Option>
                    </Select>
                  </Space>
                  <Button 
                    style={{marginTop: '10px'}}
                    type="primary" 
                    shape="round" 
                    size="large"
                    icon={<LoginOutlined />}
                    disabled={this.state.username.replace(/\s/g, '') == "" || this.state.password.replace(/\s/g, '') == "" || this.state.rol == null}
                    onClick={this.login}
                  >
                      Iniciar sesión
                  </Button>
                </div>
                <div className="olvidaste-password">
                  <Button type="text">
                    ¿Olvidaste tu contraseña? 
                  </Button>                   
                </div>
              </div>
            </div>
          </div>
        </div>
      </Spin>
    )
  }
}
