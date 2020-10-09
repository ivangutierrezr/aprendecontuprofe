import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { Layout, Tabs, Modal, Divider } from 'antd';
import ConfigDocente from '../ConfigDocente';
import ConfigEstudiante from '../ConfigEstudiante';
import ConfigAsignatura from '../ConfigAsignatura';
const { TabPane } = Tabs;
const { Header, Content, Footer } = Layout;


export default class Admin extends Component {
    onClickTab = (tab) => {
        if (tab == 1 || tab == "1") {
            this.setState({ 
                mostrarD: true,
                mostrarE: false,
                mostrarA: false
            })
        } else if (tab == 2 || tab == "2") {
            this.setState({ 
                mostrarD: false,
                mostrarE: true,
                mostrarA: false
            })
        } else {
            this.setState({ 
                mostrarD: false,
                mostrarE: false,
                mostrarA: true
            })
        }
    }

    state = {
        irLogin: false,
        mostrarD: true,
        mostrarE: false,
        mostrarA: false,
    }

    componentDidMount() {
    }

    mostrarInfoApp = () => {
        Modal.info({
          title: 'Acerca de aprende con tu profe',
          content: (
            <div>
              <p>Esta aplicación ha sido realizada por:</p>
              <Divider/>
              <span>Dayana Herrera Gallego</span>
              <br/>
              <span>Nelson Iván Gutiérrez</span>
              <Divider/>
              <p>Estudiantes de la Universidad del Valle Sede Tuluá como proyecto final para la asignatura Aplicaciones en la web y redes inhalambricas.</p>
            </div>
          ),
          onOk() {},
        });
      }

    /* mostrarInfoApp = () => {
        console.log("Info de la app")
    } */

    cerrarSesion = () => {
        this.setState({
            irLogin: true
        })
    }

    render() {
        return (
            <Layout className="layout layout-admin">
                {
                    this.state.irLogin && <Redirect to={{pathname: '/'}}/>
                }
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}> 
                    <div className="contenedor-logo">
                        <img src="assets/icon.png" alt="logoAPrendeConTuProfe" />
                    </div>
                    <div className="titulo-pagina">
                        Configuración General
                    </div>
                    <div className="header-end">
                        <FontAwesomeIcon color="white" icon={faInfoCircle} size="2x" className="icon-header pointer" onClick={this.mostrarInfoApp} title="Acerca de la app" />
                        <FontAwesomeIcon color="white" icon={faSignOutAlt} size="2x" className="pointer"onClick={this.cerrarSesion} title="Cerrar sesión" />
                    </div>
                </Header>
                <Content style={{marginTop: '64px'}}>
                    <Tabs 
                        keyboard={true}
                        className="tabs-portal"
                        size="large"
                        defaultActiveKey="1"
                        onTabClick={(tab) => this.onClickTab(tab)}
                    >
                        <TabPane className="layout-tab" tab="Administrar Docentes" key="1" >
                            {
                                this.state.mostrarD && <ConfigDocente />
                            }
                        </TabPane>
                        <TabPane className="layout-tab" tab="Administrar Estudiantes" key="2" >
                            {
                                this.state.mostrarE && <ConfigEstudiante />
                            }
                        </TabPane>
                        <TabPane className="layout-tab" tab="Administrar Asignaturas" key="3" >
                            {
                                this.state.mostrarA && <ConfigAsignatura />
                            }
                        </TabPane>
                    </Tabs>
                </Content>
                <Footer >Aprende con tu profe ©2020 - Todos los derechos reservados</Footer>
            </Layout>
        )
    }
}
