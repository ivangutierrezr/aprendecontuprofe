import React, { Component } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';
import { ConfigProvider, Empty, Table, Row, Col, Space, Input, Select, Typography, Button, DatePicker, Popconfirm, message, Spin, Tooltip } from 'antd';
import { QuestionCircleOutlined, LoadingOutlined  } from '@ant-design/icons';
const { Option } = Select
const { Title } = Typography;


export default class ConfigEstudiante extends Component {
    state = {
        urlDB: 'https://aprendecontuprofeapi.herokuapp.com',
        spinText: "Cargando Información",
        loading: true,
        edicion: false,
        estudiante: {
            nombre: "",
            apellidos: "",
            tipoIdentificacion: "",
            numeroIdentificacion: "",
            fechaNacimiento: "",
            lugarNacimiento: "",
            direccionResidencia: "",
            nombreCompletoAcudiente: "",
            tipoIdentificaionAcudiente: "",
            numeroIdentificacionAcudiente: "",
            numeroTelefonicoAcudiente: "",
            correoElectroncoAcudiente: "",
            idInicioSesion: "",
            contrasena: "",
            urlFotografia: "",
        },
        estudiantes: []
    }

    componentDidMount() {
        this.cargarInfo()
    }

    cargarInfo() {
        const url = `${this.state.urlDB}/api/estudiantes/`;
        const self = this
        axios.get(url)
            .then(function (response) {
                console.log(response.data)
                self.setState({
                    estudiantes: response.data,
                    loading: false
                })
            })
            .catch(function (error) {
                console.log(error)
                self.setState({
                    estudiantes: [],
                    loading: false
                })
            })
    }

    resetEstudiante = () => {
        this.setState({
            estudiante: {
                nombre: "",
                apellidos: "",
                tipoIdentificacion: "",
                numeroIdentificacion: "",
                fechaNacimiento: "",
                lugarNacimiento: "",
                direccionResidencia: "",
                nombreCompletoAcudiente: "",
                tipoIdentificaionAcudiente: "",
                numeroIdentificacionAcudiente: "",
                numeroTelefonicoAcudiente: "",
                correoElectroncoAcudiente: "",
                idInicioSesion: "",
                contrasena: "",
                urlFotografia: "",
            },
            edicion: false
        })
    }

    _renderDataEstudiante = () => {
        let data = []
        for (let i = 0; i < this.state.estudiantes.length; i++) {
            const estudiante = this.state.estudiantes[i];
            let objEstudiante = {
                key: i,
                numeroIdentificacion: estudiante.numeroIdentificacion,
                nombreCompleto: estudiante.nombre + " " + estudiante.apellidos,
                item: estudiante
            }
            data.push(objEstudiante)
        }
        return data
    }

    manejoEdicion = () => {
        if (this.state.edicion == true) {
            return (
                <div className="content-form-buttons">
                    <Button type="primary" shape="round" style={{marginRight: '15px'}} onClick={() => this.guardarEdicionEstudiante()}>
                        Guardar edición
                    </Button>
                    <Button type="danger" shape="round" onClick={() => this.resetEstudiante()}>
                        Cancelar edición
                    </Button>
                </div>
            )
        } else {
            return (
                <div className="content-form-buttons">
                    <Button type="primary" shape="round" style={{marginRight: '15px'}} onClick={() => this.guardarNuevoEstudiante()}>
                        Guardar estudiante
                    </Button>
                    <Button type="danger" shape="round" onClick={() => this.resetEstudiante()}>
                        Borrar formulario
                    </Button>
                </div>
            ) 
        }
    }

    guardarNuevoEstudiante = () => {
        this.setState({ loading: true, spinText: "Guardando estudiante, espere un momento por favor"})
        let estudiante = this.state.estudiante
        const url = `${this.state.urlDB}/api/estudiantes/`;
        const self = this
        axios.post(url, estudiante)
            .then(function (response) {
                self.setState({
                    estudiantes: response.data,
                    loading: false
                })
                message.success('Estudiante agregado con éxito');
                self.resetEstudiante()
            })
            .catch(function (error, response) {
                console.log(error)
                self.setState({
                    loading: false
                })
                message.error('Todos los campos son obligatorios');
            })
    }

    cargarEstudiante = (pk) => {
        this.setState({ loading: true, spinText: "Cargando estudiante, espere un momento por favor"})
        const url = `${this.state.urlDB}/api/estudiante/${pk}`;
        const self = this
        axios.get(url)
            .then(function (response) {
                console.log(response.data)
                self.setState({
                    estudiante: response.data,
                    loading: false,
                    edicion: true
                })
            })
            .catch(function (error, response) {
                console.log(error)
                self.setState({
                    loading: false
                })
                message.error('Error al cargar estudiante');
            })
    }

    guardarEdicionEstudiante = () => {
        let estudiante = this.state.estudiante
        let pk = estudiante.id
        this.setState({ loading: true, spinText: "Guardando estudiante, espere un momento por favor"})
        const url = `${this.state.urlDB}/api/estudiante/${pk}`;
        const self = this
        axios.put(url, estudiante)
            .then(function (response) {
                console.log(response.data)
                self.setState({
                    estudiantes: response.data,
                    loading: false,
                    edicion: false
                })
                message.success('Estudiante editado con éxito');
                self.resetEstudiante()
            })
            .catch(function (error, response) {
                console.log(error)
                self.setState({
                    loading: false
                })
                message.error('Error al editar estudiante');
            })
    }

    eliminarEstudiante = (pk) => {
        this.setState({ loading: true, spinText: "Eliminando estudiante, espere un momento por favor"})
        const url = `${this.state.urlDB}/api/estudiante/${pk}`;
        const self = this
        axios.delete(url)
            .then(function (response) {
                console.log(response.data)
                self.setState({
                    estudiantes: response.data,
                    loading: false,
                    edicion: false
                })
                message.success('Estudiante eliminado con éxito');
                self.resetEstudiante()
            })
            .catch(function (error, response) {
                console.log(error)
                self.setState({
                    loading: false
                })
                message.error('Error al eliminar estudiante');
            })
    }

    render() {
        const customizeRenderEmpty = () => (
            <Empty description={false} />
          );
        return (
            <Spin tip={this.state.spinText} spinning={this.state.loading} size="large" indicator={<LoadingOutlined style={{ fontSize: 30, marginBottom: '15px' }} />}>
                <div className="site-layout-content">
                    <div className="grid-config-estudiante">
                        <div className="grid-config-estudiante-form">
                            {
                                this.state.edicion ? <Title level={3}>Editar Estudiante</Title> : <Title level={3}>Agregar Estudiante</Title>
                            }
                            <Space direction="vertical">
                                <Title level={4}>Información del estudiante</Title>
                                <Row gutter={[16, 16]}>
                                    <Col className="gutter-row" sm={12} xs={24}>
                                        <Tooltip title="Nombre(s)" placement="topLeft" color={'#2C4652'}>
                                            <Input placeholder="Nombre(s)" value={this.state.estudiante.nombre} onChange={(ele) => {
                                                let estudiante = this.state.estudiante
                                                estudiante.nombre = ele.target.value
                                                this.setState({
                                                    estudiante: estudiante
                                                })
                                            }} />
                                        </Tooltip>
                                    </Col>
                                    <Col className="gutter-row" sm={12} xs={24}>
                                        <Tooltip title="Apellido(s)" placement="topLeft" color={'#2C4652'}>
                                            <Input placeholder="Apellido(s)" value={this.state.estudiante.apellidos} onChange={(ele) => {
                                                let estudiante = this.state.estudiante
                                                estudiante.apellidos = ele.target.value
                                                this.setState({
                                                    estudiante: estudiante
                                                })
                                            }} />
                                        </Tooltip>
                                    </Col>
                                    <Col className="gutter-row" sm={6} xs={24}>
                                        <Tooltip title="Tipo de documento" placement="topLeft" color={'#2C4652'}>
                                            <Select placeholder="Tipo de documento" style={{width: '100%'}} value={this.state.estudiante.tipoIdentificacion == "" ? null : this.state.estudiante.tipoIdentificacion} onChange={(ele) => {
                                                let estudiante = this.state.estudiante
                                                estudiante.tipoIdentificacion = ele
                                                this.setState({
                                                    estudiante: estudiante
                                                })
                                            }}>
                                                {/* <Option value={null}>Tipo documento</Option> */}
                                                <Option value={"T.I"}>T.I</Option>
                                                <Option value={"C.C"}>C.C</Option>
                                                <Option value={"C.E"}>C.E</Option>
                                            </Select>
                                        </Tooltip>
                                    </Col>
                                    <Col className="gutter-row" sm={18} xs={24}>
                                        <Tooltip title="Número de identificación" placement="topLeft" color={'#2C4652'}>
                                            <Input type="number" placeholder="Número de identificación" value={this.state.estudiante.numeroIdentificacion} onChange={(ele) => {
                                                let estudiante = this.state.estudiante
                                                estudiante.numeroIdentificacion = ele.target.value
                                                this.setState({
                                                    estudiante: estudiante
                                                })
                                            }} />
                                        </Tooltip>
                                    </Col>
                                    <Col className="gutter-row" sm={12} xs={24}>
                                        <Tooltip title="Fecha de nacimiento" placement="topLeft" color={'#2C4652'}>
                                            <DatePicker placeholder="Fecha de nacimiento" style={{width: '100%'}} value={this.state.estudiante.fechaNacimiento == "" ? null : moment(this.state.estudiante.fechaNacimiento)} onChange={(date, dateString) => {
                                                let estudiante = this.state.estudiante
                                                estudiante.fechaNacimiento = dateString
                                                this.setState({
                                                    estudiante: estudiante
                                                })
                                            }} />
                                        </Tooltip>
                                    </Col>
                                    <Col className="gutter-row" sm={12} xs={24}>
                                        <Tooltip title="Lugar de nacimiento" placement="topLeft" color={'#2C4652'}>
                                            <Input placeholder="Lugar de nacimiento" value={this.state.estudiante.lugarNacimiento} onChange={(ele) => {
                                                let estudiante = this.state.estudiante
                                                estudiante.lugarNacimiento = ele.target.value
                                                this.setState({
                                                    estudiante: estudiante
                                                })
                                            }} />
                                        </Tooltip>
                                    </Col>
                                    <Col className="gutter-row" sm={24} xs={24}>
                                        <Tooltip title="Dirección de residencia" placement="topLeft" color={'#2C4652'}>
                                            <Input placeholder="Dirección de residencia" value={this.state.estudiante.direccionResidencia} onChange={(ele) => {
                                                let estudiante = this.state.estudiante
                                                estudiante.direccionResidencia = ele.target.value
                                                this.setState({
                                                    estudiante: estudiante
                                                })
                                            }} />
                                        </Tooltip>
                                    </Col>
                                </Row>
                                <Title level={4}>Información del acudiente</Title>
                                <Row gutter={[16, 16]}>
                                    <Col className="gutter-row" sm={24} xs={24}>
                                        <Tooltip title="Nombre Completo" placement="topLeft" color={'#2C4652'}>
                                            <Input placeholder="Nombre Completo" value={this.state.estudiante.nombreCompletoAcudiente} onChange={(ele) => {
                                                let estudiante = this.state.estudiante
                                                estudiante.nombreCompletoAcudiente = ele.target.value
                                                this.setState({
                                                    estudiante: estudiante
                                                })
                                            }} />
                                        </Tooltip>
                                    </Col>
                                    <Col className="gutter-row" sm={6} xs={24}>
                                        <Tooltip title="Tipo de documento" placement="topLeft" color={'#2C4652'}>
                                            <Select placeholder="Tipo de documento" style={{width: '100%'}} value={this.state.estudiante.tipoIdentificaionAcudiente == "" ? null : this.state.estudiante.tipoIdentificaionAcudiente} onChange={(ele) => {
                                                let estudiante = this.state.estudiante
                                                estudiante.tipoIdentificaionAcudiente = ele
                                                this.setState({
                                                    estudiante: estudiante
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
                                            <Input type="number" placeholder="Número de identificación" value={this.state.estudiante.numeroIdentificacionAcudiente} onChange={(ele) => {
                                                let estudiante = this.state.estudiante
                                                estudiante.numeroIdentificacionAcudiente = ele.target.value
                                                this.setState({
                                                    estudiante: estudiante
                                                })
                                            }} />
                                        </Tooltip>
                                    </Col>
                                    <Col className="gutter-row" sm={12} xs={24}>
                                        <Tooltip title="Número de teléfono" placement="topLeft" color={'#2C4652'}>
                                            <Input type="tel" placeholder="Número de teléfono" value={this.state.estudiante.numeroTelefonicoAcudiente} onChange={(ele) => {
                                                let estudiante = this.state.estudiante
                                                estudiante.numeroTelefonicoAcudiente = ele.target.value
                                                this.setState({
                                                    estudiante: estudiante
                                                })
                                            }} />
                                        </Tooltip>
                                    </Col>
                                    <Col className="gutter-row" sm={12} xs={24}>
                                        <Tooltip title="Correo electrónico" placement="topLeft" color={'#2C4652'}>
                                            <Input type="email" placeholder="Correo electrónico" value={this.state.estudiante.correoElectroncoAcudiente} onChange={(ele) => {
                                                let estudiante = this.state.estudiante
                                                estudiante.correoElectroncoAcudiente = ele.target.value
                                                this.setState({
                                                    estudiante: estudiante
                                                })
                                            }} />
                                        </Tooltip>
                                    </Col>
                                </Row>
                                <Title level={4}>Información para inicio de sesión</Title>
                                <Row gutter={[16, 16]}>
                                    <Col className="gutter-row" sm={12} xs={24}>
                                        <Tooltip title="Id Usuario" placement="topLeft" color={'#2C4652'}>
                                            <Input type="text" placeholder="Id Usuario" value={this.state.estudiante.idInicioSesion} onChange={(ele) => {
                                                let estudiante = this.state.estudiante
                                                estudiante.idInicioSesion = ele.target.value
                                                this.setState({
                                                    estudiante: estudiante
                                                })
                                            }} />
                                        </Tooltip>
                                    </Col>
                                    <Col className="gutter-row" sm={12} xs={24}>
                                        <Tooltip title="Contraseña" placement="topLeft" color={'#2C4652'}>
                                            <Input type="text" placeholder="Contraseña" value={this.state.estudiante.contrasena} onChange={(ele) => {
                                                let estudiante = this.state.estudiante
                                                estudiante.contrasena = ele.target.value
                                                this.setState({
                                                    estudiante: estudiante
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
                                        title: '',  className: 'column-center', dataIndex: '', key: 'x', width: 100, render: (record) => <FontAwesomeIcon title="Editar estudiante" size='2x' color='#DEC226' icon={faEdit} onClick={() => this.cargarEstudiante(record.item.id)}/>
                                    },
                                    {
                                        title: '',  className: 'column-center', dataIndex: '', key: 'y', width: 100, render: (record) => 
                                        <Popconfirm 
                                            title="¿Está seguro que desea eliminar este estudiante?" 
                                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                            onConfirm={() => this.eliminarEstudiante(record.item.id)}
                                            onCancel={() => message.success('Eliminación cancelada')}
                                            okText="Si"
                                            cancelText="No"
                                        >
                                            <FontAwesomeIcon title="Eliminar estudiante" size='2x' color='#D9534E' icon={faTrash}/>
                                        </Popconfirm>
                                        
                                    }
                                ]} 
                                pagination={{ pageSize: 10 }}
                                dataSource={this._renderDataEstudiante()} 
                            />
                        </ConfigProvider>
                    </div>
                </div>
            </Spin>
        )
    }
}
