import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faInfoCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { LoadingOutlined, SaveOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Typography, Layout, Tabs, Modal, Divider, Menu, Select, Spin, Space, Input, message, Button, Tooltip, Popconfirm } from 'antd';
import Inicio from './inicio'
import IntroduccionDocente from './introduccionDocente'
import ClasesDocente from './clasesDocente'
import ClasesEstudiante from './clasesEstudiante'
import Foro from './foro'
/* import ConfigDocente from '../ConfigDocente';
import ConfigEstudiante from '../ConfigEstudiante';
import ConfigAsignatura from '../ConfigAsignatura'; */
const { TabPane } = Tabs;
const { Option } = Select
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;


export default class Usuario extends Component {
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

    rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4'];

    state = {
        urlDB: 'https://aprendecontuprofeapi.herokuapp.com/',
        spinText: "Cargando Información",
        loading: true,
        irLogin: false,
        mostrarD: true,
        mostrarE: false,
        mostrarA: false,
        asignaturas: [],
        estudiantes: [],
        asignatura: {},
        usuario: {},
        posAsignatura: null,
        inicio: true,
        introduccion: false,
        clases: false,
        foro: false,
        tituloForo: '',
        postForo: '',
        nuevoComentario: "",
        openKeys: [],
        rol: null
    }

    componentDidMount() {
        let token = localStorage.getItem('tokenACTP')
        if (token == null || token == undefined) {
            message.error('Debe iniciar sesión');
            this.setState({
                irLogin: true
            })
        } else {
            this.setState({ loading: true, spinText: "Cargando información, espere un momento por favor"})
            const url = `${this.state.urlDB}/api/asignaturasusuario/`;
            const datos = {
                token: token
            }
            const self = this
            axios.post(url, datos)
                .then(function (response) {
                    console.log(response.data)
                    self.setState({
                        asignaturas: response.data.asignaturas,
                        usuario: response.data.usuario,
                        rol: response.data.rol,
                        loading: false
                    })
                    if (response.data.asignaturas.length > 0) {
                        self.setState({
                            inicio: true,
                        })
                    }
                })
                .catch((error) => {
                    console.log(error)
                    message.error('Error al autenticar');
                    self.setState({
                        loading: false,
                        irLogin: true
                    })
                })
        }
    }

    cargarAsignatura = (pos) => {
        let pk = this.state.asignaturas[pos].id
        this.setState({ loading: true, spinText: "Cargando asignatura, espere un momento por favor"})
        const url = `${this.state.urlDB}/api/asignaturaestudiantes/${pk}`;
        const self = this
        axios.get(url)
            .then(function (response) {
                console.log(response.data)
                self.setState({
                    asignatura: response.data.asignatura,
                    estudiantes: response.data.estudiantes,
                    docente: response.data.docente,
                    posAsignatura: pos,
                    inicio: false,
                    introduccion: true,
                    clases: false,
                    menuKeys: ['s1'],
                    openKeys: [],
                    loading: false,
                    edicion: true
                })
            })
            .catch(function (error, response) {
                console.log(error)
                self.setState({
                    loading: false
                })
                message.error('Error al cargar asignatura');
            })
    }

    agregarNuevaClase = () => {
        let asignatura = this.state.asignatura
        asignatura.clases.push({
            texto: '<p><br></p>',
        })
        this.setState({
            asignatura: asignatura,
            openKeys: ['sub1'],
            menuKeys: ['c0']
        })
    }

    cambiarDatosAsignatura = (tipo, datos, pos) => {
        let asignatura = this.state.asignatura
        if (tipo == 1) {
            asignatura.introduccion = datos
        }
        this.setState({
            asignatura: asignatura
        })
    }
    editarComentario = (texto) => {
        this.setState({
            nuevoComentario: texto
        })
    }
    guardarDatosAsignatura = (tipo, pos, data) => {
        let asignatura = this.state.asignatura
        let datos = {
            tipo: tipo,
            pos: pos
        }
        let mensaje = ""
        let mensajeError = ""
        if (tipo == 1) {
            datos.introduccion = asignatura.introduccion
            mensaje = "Introducción de la asignatura editada con éxito"
            mensajeError = "Error al editar introducción de la asignatura"
        } else if (tipo == 2) {
            mensaje = "Clase agregada con éxito"
            mensajeError = "Error al agregar clase a la asignatura"
        } else if (tipo == 3) {
            datos.texto = data
            mensaje = "Clase editada con éxito"
            mensajeError = "Error al editar la clase"
        } else if (tipo == 4) {
            mensaje = "Clase eliminada con éxito"
            mensajeError = "Error al eliminar la clase"
        } else if (tipo == 5) {
            datos.title = this.state.tituloForo
            datos.post = this.state.postForo
            datos.date = Date.now()
            mensaje = "Foro agragado con éxito'"
            mensajeError = "Error al agregar foro a la asignatura"
        } else if (tipo == 6) {
            mensaje = "Foro eliminado con éxito"
            mensajeError = "Error al eliminar el foro"
        } else if (tipo == 7) {
            datos.autor = this.state.usuario.id
            datos.comentario = this.state.nuevoComentario
            datos.fecha = Date.now()
            datos.rol = this.state.rol
            mensaje = "Comentario agregado con éxito"
            mensajeError = "Error al agregar comentario"
        } else if (tipo == 8) {
            datos.posC = data
            mensaje = "Comentario eliminado con éxito"
            mensajeError = "Error al eliminar comentario"
        }
        let pk = asignatura.id
        this.setState({ loading: true, spinText: "Guardando asignatura, espere un momento por favor"})
        const url = `${this.state.urlDB}/api/asignaturaitems/${pk}`;
        const self = this
        axios.put(url, datos)
            .then(function (response) {
                console.log(response.data)
                self.setState({
                    asignatura: response.data,
                    loading: false,
                    edicion: false
                })
                if (tipo == 2) {
                    if (self.state.openKeys.length == 0) {
                        self.setState({
                            openKeys: ['sub1'],
                            menuKeys: ['c0']
                        })
                    }
                }
                if (tipo == 4) {
                    self.setState({
                        itemEliminado: true,
                    })
                }
                if (tipo == 5) {
                    self.setState({
                        tituloForo: '',
                        postForo: ''
                    })
                    if (self.state.openKeys.length == 0) {
                        self.setState({
                            openKeys: ['sub2'],
                            menuKeys: ['f0'],
                        })
                    }
                }
                if (tipo == 7) {
                    self.setState({
                        nuevoComentario: '',
                    })
                }
                message.success(mensaje);
            })
            .catch(function (error, response) {
                console.log(error)
                self.setState({
                    loading: false
                })
                message.error(mensajeError);
            })
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

    cerrarSesion = () => {
        let token = localStorage.getItem('tokenACTP')
        if (token == null || token == undefined) {
            this.setState({
                irLogin: true
            })
        } else {
            this.setState({ loading: true, spinText: "Cerrando sesión"})
            const url = `${this.state.urlDB}/api/logout/`;
            const datos = {
                token: token
            }
            const self = this
            axios.post(url, datos)
                .then(function (response) {
                    localStorage.removeItem('tokenACTP')
                    message.success("Sesión cerrada con éxito")
                    self.setState({
                        loading: false,
                        irLogin: true
                    })
                })
                .catch((error) => {
                    console.log(error)
                    message.error('Error al autenticar');
                    self.setState({
                        loading: false,
                        irLogin: true
                    })
                })
        }
        this.setState({
            irLogin: true
        })
    }

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            })
        }
    }

    render() {
        return (
            <Spin tip={this.state.spinText} spinning={this.state.loading} size="large" indicator={<LoadingOutlined style={{ fontSize: 30, marginBottom: '15px' }} />}>
                <Layout className="layout layout-usuario">
                    {
                        this.state.irLogin && <Redirect to={{pathname: '/'}}/>
                    }
                    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}> 
                        <div className="contenedor-logo">
                            <img src="assets/icon.png" alt="logoAPrendeConTuProfe" />
                        </div>
                        <div className="titulo-pagina">
                            Aprende con tu profe!
                        </div>
                        <div className="header-end">
                            <FontAwesomeIcon color="white" icon={faInfoCircle} size="2x" className="icon-header pointer" onClick={this.mostrarInfoApp} title="Acerca de la app" />
                            <Popconfirm 
                                title="¿Está seguro que desea cerrar sesión?" 
                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                onConfirm={this.cerrarSesion}
                                onCancel={() => console.log("")}
                                okText="Si"
                                cancelText="No"
                            >
                                <FontAwesomeIcon color="white" icon={faSignOutAlt} size="2x" className="pointer" title="Cerrar sesión" />
                            </Popconfirm>
                        </div>
                    </Header>
                    <Sider width={200} className="content-menu-usuario" style={{marginTop: '64px'}}>
                        <span className="textMenu">Selecciona una asignatura:</span>
                        <Select 
                            size="large"
                            placeholder="Elije una clase!"
                            style={{width: '100%', marginBottom: '15px', marginTop: '10px'}}
                            value={this.state.posAsignatura}
                            onChange={(ele) => {
                                this.cargarAsignatura(ele)
                            }}
                        >
                            {
                                this.state.asignaturas.map((asignatura, a) => {
                                    return (
                                        <Option key={a} value={a}>{asignatura.nombre} - {asignatura.grado}</Option>
                                    )
                                })
                            }
                        </Select>
                        {
                            this.state.inicio == false && <Menu
                                className="menu-usuario"
                                mode="inline"
                                defaultSelectedKeys={['s1']}
                                defaultOpenKeys={[]}
                                selectedKeys={this.state.menuKeys}
                                openKeys={this.state.openKeys}
                                onOpenChange={this.onOpenChange}
                                style={{ borderRight: 0, marginBottom: '50px' }}
                            >
                                <Menu.Item key="s1" onClick={() => this.setState({
                                    introduccion: true,
                                    clases: false,
                                    itemEliminado: false,
                                    posClase: null,
                                    menuKeys: ['s1'],
                                    openKeys: []
                                })}>
                                    Introducción
                                </Menu.Item>
                                {
                                    this.state.asignatura.clases.length == 0 && <Menu.Item key="s2" onClick={() => this.setState({
                                        introduccion: false,
                                        clases: true,
                                        itemEliminado: false,
                                        posClase: 0,
                                        menuKeys: ['s2'],
                                        openKeys: [],
                                        foros: false,
                                    })}>
                                        Clases
                                    </Menu.Item>
                                }
                                {
                                    this.state.asignatura.clases.length > 0 && <SubMenu key="sub1" title="Clases">
                                        {
                                            this.state.asignatura.clases.map((clase, c) => {
                                                return (
                                                    <Menu.Item key={'c'+c} onClick={() => {
                                                        this.setState({
                                                            introduccion: false,
                                                            clases: true,
                                                            itemEliminado: false,
                                                            posClase: c,
                                                            menuKeys: ['c'+c],
                                                            foros: false,
                                                        })
                                                    }}>
                                                        Clase {c+1}
                                                    </Menu.Item>
                                                )
                                            })
                                        }
                                    </SubMenu>
                                }
                                {
                                    this.state.asignatura.foro.length == 0 && <Menu.Item key="s3" onClick={() => this.setState({
                                        introduccion: false,
                                        clases: false,
                                        itemEliminado: false,
                                        foros: true,
                                        posForo: 0,
                                        menuKeys: ['s3'],
                                        openKeys: [],
                                    })}>
                                        Foros
                                    </Menu.Item>
                                }
                                {
                                    this.state.asignatura.foro.length > 0 && <SubMenu key="sub2" title="Foros">
                                        {
                                            this.state.asignatura.foro.map((foro, f) => {
                                                return (
                                                    <Menu.Item key={'f'+f} onClick={() => {
                                                        this.setState({
                                                            introduccion: false,
                                                            clases: false,
                                                            itemEliminado: false,
                                                            foros: true,
                                                            posForo: f,
                                                            menuKeys: ['f'+f]
                                                        })
                                                    }}>
                                                        Foro {f+1}
                                                    </Menu.Item>
                                                )
                                            })
                                        }
                                    </SubMenu>
                                }
                            </Menu>
                        }
                        
                    </Sider>
                    {
                        this.state.inicio && <Inicio rol={this.state.rol} usuario={this.state.usuario} />
                    }
                    {
                        (this.state.rol == 2 && this.state.introduccion) && <IntroduccionDocente asignatura={this.state.asignatura} cambiarDatosAsignatura={this.cambiarDatosAsignatura} guardarDatosAsignatura={this.guardarDatosAsignatura} />
                    }
                    {
                        (this.state.rol == 2 && this.state.clases) && <Content className="content-usuario" style={{marginTop: '64px'}}>
                            <div className="content-usuario-space">
                                <div className="content-full-center">
                                    <div className="content-usuario-nueva-clase pointer" onClick={() => this.guardarDatosAsignatura(2, null)}>
                                        <FontAwesomeIcon icon={faPlusCircle} size="3x" color={"green"} />
                                        <span>Añadir nueva clase</span>
                                    </div>
                                </div>
                                <Divider />
                                {
                                    this.state.asignatura.clases.length > 0 && <ClasesDocente asignatura={this.state.asignatura} posClase={this.state.posClase} cambiarDatosAsignatura={this.cambiarDatosAsignatura} guardarDatosAsignatura={this.guardarDatosAsignatura} itemEliminado={this.state.itemEliminado} />
                                }
                            </div>
                        </Content>
                    }
                    {
                        (this.state.rol == 3 && this.state.clases) && <Content className="content-usuario" style={{marginTop: '64px'}}>
                            <div className="content-usuario-space">
                                {
                                    this.state.asignatura.clases.length > 0 ? <ClasesEstudiante asignatura={this.state.asignatura} posClase={this.state.posClase} /> : <Text type="success">
                                        No hay clases disponibles aún
                                    </Text>
                                }
                            </div>
                        </Content>
                    }
                    {
                        this.state.foros && <Content className="content-usuario" style={{marginTop: '64px'}}>
                            <div className="content-usuario-space">
                                {
                                    this.state.rol == 2 && <div className="content-full-center">
                                        <Title level={3}>
                                            Agregar nuevo tema de foro
                                        </Title>
                                        <Space direction="vertical">
                                            <Text>
                                                En este espacio puede agregar nuevos temas de foro. Debe ingresar el tìtulo y el texto introductorio para poder guardar la informaciòn.
                                            </Text>
                                        </Space>
                                        <Tooltip title="Tìtulo del foro" placement="topLeft" color={'#2C4652'}>
                                            <Input placeholder="Tìtulo del foro" value={this.state.tituloForo} allowClear onChange={(ele) => this.setState({tituloForo: ele.target.value})} style={{ marginBottom: '15px' }}/>
                                        </Tooltip>
                                        <Tooltip title="Introducción del foro" placement="topLeft" color={'#2C4652'}>
                                            <TextArea placeholder="Digite en este espacio el texto introductorio del foro" value={this.state.postForo} size='large'  autoSize={{ minRows: 4 }} onChange={(ele) => this.setState({postForo: ele.target.value})} style={{ marginBottom: '15px' }}/>
                                        </Tooltip>
                                        <Button type="primary" shape="round" icon={<SaveOutlined />}  size="large" onClick={() => this.guardarDatosAsignatura(5, null)} disabled={this.state.tituloForo.replace(/\s/g, '') == '' || this.state.postForo.replace(/\s/g, '') == ''}>
                                            Agregar nuevo tema de foro
                                        </Button>
                                        {/* <div className="content-usuario-nueva-clase pointer" onClick={() => this.guardarDatosAsignatura(5, null)}>
                                            <FontAwesomeIcon icon={faPlusCircle} size="3x" color={"green"} />
                                            <span>Añadir nueva clase</span>
                                        </div> */}
                                        <Divider />
                                    </div>
                                }
                                {
                                    this.state.asignatura.foro.length > 0 && <Foro asignatura={this.state.asignatura} posForo={this.state.posForo} guardarDatosAsignatura={this.guardarDatosAsignatura} editarComentario={this.editarComentario} itemEliminado={this.state.itemEliminado} nuevoComentario={this.state.nuevoComentario} estudiantes={this.state.estudiantes} usuario={this.state.usuario} docente={this.state.docente}/>
                                }
                            </div>
                        </Content>
                    }
                    
                    <Footer >Aprende con tu profe ©2020 - Todos los derechos reservados</Footer>
                </Layout>
            </Spin>
        )
    }
}
