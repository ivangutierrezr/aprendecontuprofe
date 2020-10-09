import React, { Component } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';
import { ConfigProvider, Empty, Table, Row, Col, Space, Input, Select, Typography, Button, DatePicker, Popconfirm, message, Spin, Tooltip } from 'antd';
import { QuestionCircleOutlined, LoadingOutlined  } from '@ant-design/icons';
const { Option } = Select
const { Title } = Typography;


export default class ConfigDocente extends Component {
    state = {
        urlDB: 'http://127.0.0.1:8000',
        spinText: "Cargando Información",
        loading: true,
        edicion: false,
        docente: {
            nombre: "",
            apellidos: "",
            tipoIdentificacion: "",
            numeroIdentificacion: "",
            fechaNacimiento: "",
            lugarNacimiento: "",
            correoElectronco: "",
            direccionResidencia: "",
            numeroCelular: "",
            numeroTelefonoFijo: "",
            idInicioSesion: "",
            contrasena: "",
            urlFotografia: "",
        },
        docentes: []
    }

    componentDidMount() {
        this.cargarInfo()
    }

    cargarInfo() {
        const url = `${this.state.urlDB}/api/docentes/`;
        const self = this
        axios.get(url)
            .then(function (response) {
                console.log(response.data)
                self.setState({
                    docentes: response.data,
                    loading: false
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    resetDocente = () => {
        this.setState({
            docente: {
                nombre: "",
                apellidos: "",
                tipoIdentificacion: "",
                numeroIdentificacion: "",
                fechaNacimiento: "",
                lugarNacimiento: "",
                correoElectronco: "",
                direccionResidencia: "",
                numeroCelular: "",
                numeroTelefonoFijo: "",
                idInicioSesion: "",
                contrasena: "",
                urlFotografia: "",
            },
            edicion: false
        })
    }

    _renderDataDocente = () => {
        let data = []
        for (let i = 0; i < this.state.docentes.length; i++) {
            const docente = this.state.docentes[i];
            let objDocente = {
                key: i,
                numeroIdentificacion: docente.numeroIdentificacion,
                nombreCompleto: docente.nombre + " " + docente.apellidos,
                item: docente
            }
            data.push(objDocente)
        }
        return data
    }

    manejoEdicion = () => {
        if (this.state.edicion == true) {
            return (
                <div className="content-form-buttons">
                    <Button type="primary" shape="round" style={{marginRight: '15px'}} onClick={() => this.guardarEdicionDocente()}>
                        Guardar edición
                    </Button>
                    <Button type="danger" shape="round" onClick={() => this.resetDocente()}>
                        Cancelar edición
                    </Button>
                </div>
            )
        } else {
            return <div className="content-form-buttons">
                <Button type="primary" shape="round" style={{marginRight: '15px'}} onClick={() => this.guardarNuevoDocente()}>
                    Guardar docente
                </Button>
                <Button type="danger" shape="round" onClick={() => this.resetDocente()}>
                    Borrar formulario
                </Button>
            </div>
        }
    }

    guardarNuevoDocente = () => {
        this.setState({ loading: true, spinText: "Guardando docente, espere un momento por favor"})
        let docente = this.state.docente
        const url = `${this.state.urlDB}/api/docentes/`;
        const self = this
        axios.post(url, docente)
            .then(function (response) {
                self.setState({
                    docentes: response.data,
                    loading: false
                })
                message.success('Docente agregado con éxito');
                self.resetDocente()
            })
            .catch(function (error, response) {
                console.log(error)
                self.setState({
                    loading: false
                })
                message.error('Todos los campos son obligatorios');
            })
    }

    cargarDocente = (pk) => {
        this.setState({ loading: true, spinText: "Cargando docente, espere un momento por favor"})
        const url = `${this.state.urlDB}/api/docente/${pk}`;
        const self = this
        axios.get(url)
            .then(function (response) {
                console.log(response.data)
                self.setState({
                    docente: response.data,
                    loading: false,
                    edicion: true
                })
            })
            .catch(function (error, response) {
                console.log(error)
                self.setState({
                    loading: false
                })
                message.error('Error al cargar docente');
            })
    }

    guardarEdicionDocente = () => {
        let docente = this.state.docente
        let pk = docente.id
        this.setState({ loading: true, spinText: "Guardando docente, espere un momento por favor"})
        const url = `${this.state.urlDB}/api/docente/${pk}`;
        const self = this
        axios.put(url, docente)
            .then(function (response) {
                console.log(response.data)
                self.setState({
                    docentes: response.data,
                    loading: false,
                    edicion: false
                })
                message.success('Docente editado con éxito');
                self.resetDocente()
            })
            .catch(function (error, response) {
                console.log(error)
                self.setState({
                    loading: false
                })
                message.error('Error al editar docente');
            })
    }

    eliminarDocente = (pk) => {
        this.setState({ loading: true, spinText: "Eliminando docente, espere un momento por favor"})
        const url = `${this.state.urlDB}/api/docente/${pk}`;
        const self = this
        axios.delete(url)
            .then(function (response) {
                console.log(response.data)
                self.setState({
                    docentes: response.data,
                    loading: false,
                    edicion: false
                })
                message.success('Docente eliminado con éxito');
                self.resetDocente()
            })
            .catch(function (error, response) {
                console.log(error)
                self.setState({
                    loading: false
                })
                message.error('Error al eliminar docente');
            })
    }

    render() {
        const customizeRenderEmpty = () => (
            <Empty description={false} />
        );
        return (
            <Spin tip={this.state.spinText} spinning={this.state.loading} size="large" indicator={<LoadingOutlined style={{ fontSize: 30, marginBottom: '15px' }} />}>
                <div className="site-layout-content">
                    <div className="grid-config-docente">
                        <div className="grid-config-docente-form">
                            {
                                this.state.edicion ? <Title level={3}>Editar Docente</Title> : <Title level={3}>Agregar Docente</Title>
                            }
                            <Space direction="vertical">
                                <Row gutter={[16, 16]}>
                                    <Col className="gutter-row" sm={12} xs={24}>
                                        <Tooltip title="Nombre(s)" placement="topLeft" color={'#2C4652'}>
                                            <Input placeholder="Nombre(s)" value={this.state.docente.nombre} onChange={(ele) => {
                                                let docente = this.state.docente
                                                docente.nombre = ele.target.value
                                                this.setState({
                                                    docente: docente
                                                })
                                            }} />
                                        </Tooltip>
                                    </Col>
                                    <Col className="gutter-row" sm={12} xs={24}>
                                        <Tooltip title="Apellido(s)" placement="topLeft" color={'#2C4652'}>
                                            <Input placeholder="Apellido(s)" value={this.state.docente.apellidos} onChange={(ele) => {
                                                let docente = this.state.docente
                                                docente.apellidos = ele.target.value
                                                this.setState({
                                                    docente: docente
                                                })
                                            }} />
                                        </Tooltip>
                                    </Col>
                                    <Col className="gutter-row" sm={6} xs={24}>
                                        <Tooltip title="Tipo de documento" placement="topLeft" color={'#2C4652'}>
                                            <Select placeholder="Tipo de documento" style={{width: '100%'}} value={this.state.docente.tipoIdentificacion == "" ? null : this.state.docente.tipoIdentificacion} onChange={(ele) => {
                                                let docente = this.state.docente
                                                docente.tipoIdentificacion = ele
                                                this.setState({
                                                    docente: docente
                                                })
                                            }}>
                                                {/* <Option value={null}>Tipo documento</Option> */}
                                                <Option value={"C.C"}>C.C</Option>
                                                <Option value={"C.E"}>C.E</Option>
                                            </Select>
                                        </Tooltip>
                                    </Col>
                                    <Col className="gutter-row" sm={18} xs={24}>
                                        <Tooltip title="Número de identificación" placement="topLeft" color={'#2C4652'}>
                                            <Input type="number" placeholder="Número de identificación" value={this.state.docente.numeroIdentificacion} onChange={(ele) => {
                                                let docente = this.state.docente
                                                docente.numeroIdentificacion = ele.target.value
                                                this.setState({
                                                    docente: docente
                                                })
                                            }} />
                                        </Tooltip>
                                    </Col>
                                    <Col className="gutter-row" sm={12} xs={24}>
                                        <Tooltip title="Fecha de nacimiento" placement="topLeft" color={'#2C4652'}>
                                            <DatePicker placeholder="Fecha de nacimiento" style={{width: '100%'}} value={this.state.docente.fechaNacimiento == "" ? null : moment(this.state.docente.fechaNacimiento)} onChange={(date, dateString) => {
                                                let docente = this.state.docente
                                                docente.fechaNacimiento = dateString
                                                this.setState({
                                                    docente: docente
                                                })
                                            }} />
                                        </Tooltip>
                                    </Col>
                                    <Col className="gutter-row" sm={12} xs={24}>
                                        <Tooltip title="Lugar de nacimiento" placement="topLeft" color={'#2C4652'}>
                                            <Input placeholder="Lugar de nacimiento" value={this.state.docente.lugarNacimiento} onChange={(ele) => {
                                                let docente = this.state.docente
                                                docente.lugarNacimiento = ele.target.value
                                                this.setState({
                                                    docente: docente
                                                })
                                            }} />
                                        </Tooltip>
                                    </Col>
                                    <Col className="gutter-row" sm={12} xs={24}>
                                        <Tooltip title="Correo electrònico" placement="topLeft" color={'#2C4652'}>
                                            <Input type="email" placeholder="Correo electrònico" value={this.state.docente.correoElectronco} onChange={(ele) => {
                                                let docente = this.state.docente
                                                docente.correoElectronco = ele.target.value
                                                this.setState({
                                                    docente: docente
                                                })
                                            }} />
                                        </Tooltip>
                                    </Col>
                                    <Col className="gutter-row" sm={12} xs={24}>
                                        <Tooltip title="Dirección de residencia" placement="topLeft" color={'#2C4652'}>
                                            <Input placeholder="Dirección de residencia" value={this.state.docente.direccionResidencia} onChange={(ele) => {
                                                let docente = this.state.docente
                                                docente.direccionResidencia = ele.target.value
                                                this.setState({
                                                    docente: docente
                                                })
                                            }} />
                                        </Tooltip>
                                    </Col>
                                    <Col className="gutter-row" sm={12} xs={24}>
                                        <Tooltip title="Número celular" placement="topLeft" color={'#2C4652'}>
                                            <Input type="tel" placeholder="Número celular" value={this.state.docente.numeroCelular} onChange={(ele) => {
                                                let docente = this.state.docente
                                                docente.numeroCelular = ele.target.value
                                                this.setState({
                                                    docente: docente
                                                })
                                            }} />
                                        </Tooltip>
                                    </Col>
                                    <Col className="gutter-row" sm={12} xs={24}>
                                        <Tooltip title="Teléfono fijo" placement="topLeft" color={'#2C4652'}>
                                            <Input type="tel" placeholder="Teléfono fijo" value={this.state.docente.numeroTelefonoFijo} onChange={(ele) => {
                                                let docente = this.state.docente
                                                docente.numeroTelefonoFijo = ele.target.value
                                                this.setState({
                                                    docente: docente
                                                })
                                            }} />
                                        </Tooltip>
                                    </Col>
                                </Row>
                                <Title level={4}>Información para inicio de sesión</Title>
                                <Row gutter={[16, 16]}>
                                    <Col className="gutter-row" sm={12} xs={24}>
                                        <Tooltip title="Id Usuario" placement="topLeft" color={'#2C4652'}>
                                            <Input type="text" placeholder="Id Usuario" value={this.state.docente.idInicioSesion} onChange={(ele) => {
                                                let docente = this.state.docente
                                                docente.idInicioSesion = ele.target.value
                                                this.setState({
                                                    docente: docente
                                                })
                                            }} />
                                        </Tooltip>
                                    </Col>
                                    <Col className="gutter-row" sm={12} xs={24}>
                                        <Tooltip title="Contraseña" placement="topLeft" color={'#2C4652'}>
                                            <Input type="text" placeholder="Contraseña" value={this.state.docente.contrasena} onChange={(ele) => {
                                                let docente = this.state.docente
                                                docente.contrasena = ele.target.value
                                                this.setState({
                                                    docente: docente
                                                })
                                            }} />
                                        </Tooltip>
                                    </Col>
                                </Row>
                            </Space>
                            {
                                this.manejoEdicion()
                            }
                        </div>
                        <ConfigProvider renderEmpty={customizeRenderEmpty}>
                            <Table 
                                bordered
                                size="small"
                                style={{ width: '100%', marginTop: '20px' }}
                                className="tablas-nivel-uno"
                                columns={[
                                    {
                                        title: 'ID',
                                        width: 100,
                                        dataIndex: 'numeroIdentificacion',
                                        key: 'numeroIdentificacion',
                                        responsive: ['md'],
                                    },
                                    {
                                        title: 'Nombre(s) y apellidos',
                                        dataIndex: 'nombreCompleto',
                                        key: 'nombreCompleto',
                                    },
                                    {
                                        title: '',  className: 'column-center', dataIndex: '', key: 'x', width: 100, render: (record) => <FontAwesomeIcon title="Editar docente" size='2x' color='#DEC226' icon={faEdit} onClick={() => this.cargarDocente(record.item.id)}/>
                                    },
                                    {
                                        title: '',  className: 'column-center', dataIndex: '', key: 'y', width: 100, render: (record) => 
                                        <Popconfirm 
                                            title="¿Está seguro que desea eliminar este docente?" 
                                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                            onConfirm={() => this.eliminarDocente(record.item.id)}
                                            onCancel={() => message.success('Eliminación cancelada')}
                                            okText="Si"
                                            cancelText="No"
                                        >
                                            <FontAwesomeIcon title="Eliminar docente" size='2x' color='#D9534E' icon={faTrash}/>
                                        </Popconfirm>
                                        
                                    }
                                ]} 
                                pagination={{ pageSize: 10 }}
                                dataSource={this._renderDataDocente()} 
                            />
                        </ConfigProvider>
                    </div>
                </div>
            </Spin>
        )
    }
}
