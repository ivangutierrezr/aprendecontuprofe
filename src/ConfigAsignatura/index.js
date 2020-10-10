import React, { Component } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { ConfigProvider, Empty, Table, Row, Col, Space, Input, Select, Typography, Button, DatePicker, Popconfirm, message, Spin, Tooltip } from 'antd';
import { QuestionCircleOutlined, LoadingOutlined  } from '@ant-design/icons';
const { TextArea } = Input;
const { Option } = Select
const { Title } = Typography;


export default class ConfigAsignatura extends Component {
    state = {
        urlDB: 'https://aprendecontuprofeapi.herokuapp.com',
        spinText: "Cargando Información",
        loading: true,
        edicion: false,
        asignatura: {
            nombre: "",
            grado: "",
            docente: "",
            introduccion: "",
            estudiantes: [],
            clases: [],
            talleres: [],
            evaluaciones: [],
            respuestasTalleres: [],
            respuestasEvaluaciones: [],
            asistencias: [],
            foro: []
        },
        asignaturas: [],
        estudiantes: [],
        docentes: []
    }

    componentDidMount() {
        this.cargarInfo()
    }

    cargarInfo() {
        const url = `${this.state.urlDB}/api/asignaturas/`;
        const self = this
        axios.get(url)
            .then(function (response) {
                console.log(response.data)
                self.setState({
                    asignaturas: response.data.asignaturas,
                    estudiantes: response.data.estudiantes,
                    docentes: response.data.docentes,
                    loading: false
                })
            })
            .catch(function (error) {
                console.log(error)
                self.setState({
                    asignaturas: [],
                    loading: false
                })
            })
    }

    resetAsignatura = () => {
        this.setState({
            asignatura: {
                nombre: "",
                grado: "",
                docente: "",
                introduccion: "",
                estudiantes: [],
                clases: [],
                talleres: [],
                evaluaciones: [],
                respuestasTalleres: [],
                respuestasEvaluaciones: [],
                asistencias: [],
                foro: []
            },
            edicion: false
        })
    }

    _renderDataAsignatura = () => {
        let data = []
        for (let i = 0; i < this.state.asignaturas.length; i++) {
            const asignatura = this.state.asignaturas[i];
            let docente = ""
            let indexDocente = this.state.docentes.findIndex(doc => doc.id == asignatura.docente)
            if (indexDocente > -1) {
                docente = this.state.docentes[indexDocente].nombre + " " + this.state.docentes[indexDocente].apellidos
            }
            let objAsignatura = {
                key: i,
                nombre: asignatura.nombre,
                grado: asignatura.grado,
                docente: docente,
                item: asignatura
            }
            data.push(objAsignatura)
        }
        return data
    }
    _renderDataEstudiantesAsignatura = () => {
        let data = []
        for (let i = 0; i < this.state.asignatura.estudiantes.length; i++) {
            const estudianteCurso = this.state.asignatura.estudiantes[i];
            let indexEstudiante = this.state.estudiantes.findIndex(est => est.id == estudianteCurso)
            let estudianteBD = this.state.estudiantes[indexEstudiante]
            let objEstudiante = {
                key: i,
                numeroIdentificacion: estudianteBD.numeroIdentificacion,
                nombreCompleto: estudianteBD.nombre + " " + estudianteBD.apellidos,
            }
            data.push(objEstudiante)
        }
        return data
    }

    manejoEdicion = () => {
        if (this.state.edicion == true) {
            return (
                <div className="content-form-buttons">
                    <Button type="primary" shape="round" style={{marginRight: '15px'}} onClick={() => this.guardarEdicionAsignatura()}>
                        Guardar edición
                    </Button>
                    <Button type="danger" shape="round" onClick={() => this.resetAsignatura()}>
                        Cancelar edición
                    </Button>
                </div>
            )
        } else {
            return (
                <div className="content-form-buttons">
                    <Button type="primary" shape="round" style={{marginRight: '15px'}} onClick={() => this.guardarNuevaAsignatura()}>
                        Guardar asignatura
                    </Button>
                    <Button type="danger" shape="round" onClick={() => this.resetAsignatura()}>
                        Borrar formulario
                    </Button>
                </div>
            ) 
        }
    }

    guardarNuevaAsignatura = () => {
        this.setState({ loading: true, spinText: "Guardando asignatura, espere un momento por favor"})
        let asignatura = this.state.asignatura
        const url = `${this.state.urlDB}/api/asignaturas/`;
        const self = this
        axios.post(url, asignatura)
            .then(function (response) {
                self.setState({
                    asignaturas: response.data,
                    loading: false
                })
                message.success('Asignatura agregada con éxito');
                self.resetAsignatura()
            })
            .catch(function (error, response) {
                console.log(error)
                self.setState({
                    loading: false
                })
                message.error('Todos los campos son obligatorios');
            })
    }

    cargarAsignatura = (pk) => {
        this.setState({ loading: true, spinText: "Cargando asignatura, espere un momento por favor"})
        const url = `${this.state.urlDB}/api/asignatura/${pk}`;
        const self = this
        axios.get(url)
            .then(function (response) {
                console.log(response.data)
                self.setState({
                    asignatura: response.data,
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

    guardarEdicionAsignatura = () => {
        let asignatura = this.state.asignatura
        let pk = asignatura.id
        this.setState({ loading: true, spinText: "Guardando asignatura, espere un momento por favor"})
        const url = `${this.state.urlDB}/api/asignatura/${pk}`;
        const self = this
        axios.put(url, asignatura)
            .then(function (response) {
                console.log(response.data)
                self.setState({
                    asignaturas: response.data,
                    loading: false,
                    edicion: false
                })
                message.success('Asignatura editada con éxito');
                self.resetAsignatura()
            })
            .catch(function (error, response) {
                console.log(error)
                self.setState({
                    loading: false
                })
                message.error('Error al editar asignatura');
            })
    }

    eliminarAsignatura = (pk) => {
        this.setState({ loading: true, spinText: "Eliminando asignatura, espere un momento por favor"})
        const url = `${this.state.urlDB}/api/asignatura/${pk}`;
        const self = this
        axios.delete(url)
            .then(function (response) {
                console.log(response.data)
                self.setState({
                    asignaturas: response.data,
                    loading: false,
                    edicion: false
                })
                message.success('Asignatura eliminada con éxito');
                self.resetAsignatura()
            })
            .catch(function (error, response) {
                console.log(error)
                self.setState({
                    loading: false
                })
                message.error('Error al eliminar asignatura');
            })
    }

    render() {
        const customizeRenderEmpty = () => (
            <Empty description={false} />
          );
        return (
            <Spin tip={this.state.spinText} spinning={this.state.loading} size="large" indicator={<LoadingOutlined style={{ fontSize: 30, marginBottom: '15px' }} />}>
                <div className="site-layout-content">
                    <div className="grid-config-asignatura">
                        <div className="grid-config-asignatura-form">
                            {
                                this.state.edicion ? <Title level={3}>Editar Asignatura</Title> : <Title level={3}>Agregar Asignatura</Title>
                            }
                            <Space direction="vertical">
                                <Title level={4}>Información del asignatura</Title>
                                <Row gutter={[16, 16]}>
                                    <Col className="gutter-row" sm={18} xs={24}>
                                        <Tooltip title="Nombre Asignatura" placement="topLeft" color={'#2C4652'}>
                                            <Input placeholder="Nombre Asignatura" value={this.state.asignatura.nombre} onChange={(ele) => {
                                                let asignatura = this.state.asignatura
                                                asignatura.nombre = ele.target.value
                                                this.setState({
                                                    asignatura: asignatura
                                                })
                                            }} />
                                        </Tooltip>
                                    </Col>
                                    <Col className="gutter-row" sm={6} xs={24}>
                                        <Tooltip title="Grado" placement="topLeft" color={'#2C4652'}>
                                            <Input placeholder="Grado" value={this.state.asignatura.grado} onChange={(ele) => {
                                                let asignatura = this.state.asignatura
                                                asignatura.grado = ele.target.value
                                                this.setState({
                                                    asignatura: asignatura
                                                })
                                            }} />
                                        </Tooltip>
                                    </Col>
                                    <Col className="gutter-row" sm={24} xs={24}>
                                        <Tooltip title="Texto introductorio de la asignatura" placement="topLeft" color={'#2C4652'}>
                                            <TextArea placeholder="Texto introductorio de la asignatura" autosize={{ minRows: 1 }} value={this.state.asignatura.introduccion} onChange={(ele) => {
                                                let asignatura = this.state.asignatura
                                                asignatura.introduccion = ele.target.value
                                                this.setState({
                                                    asignatura: asignatura
                                                })
                                            }} style={{width: '100%'}} />
                                        </Tooltip>
                                    </Col>
                                    <Col className="gutter-row" sm={24} xs={24}>
                                        <Tooltip title="Asignar docente" placement="topLeft" color={'#2C4652'}>
                                            <Select
                                                showSearch
                                                style={{ width: '100%' }}
                                                placeholder="Asignar docente"
                                                optionFilterProp="children"
                                                value={this.state.asignatura.docente == "" ? null : this.state.asignatura.docente}
                                                onChange={(ele) => {
                                                    let asignatura = this.state.asignatura
                                                    asignatura.docente = ele
                                                    this.setState({
                                                        asignatura: asignatura
                                                    })
                                                }}
                                                /* onSearch={onSearch} */
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                {
                                                    this.state.docentes.map((docente, d) => {
                                                        return <Option key={d} value={docente.id+""}>{docente.nombre + ' ' + docente.apellidos}</Option>
                                                    })
                                                }
                                            </Select>
                                        </Tooltip>
                                    </Col>
                                    <Col className="gutter-row" sm={24} xs={24}>
                                        <Tooltip title="Inscribir estudiantes" placement="topLeft" color={'#2C4652'}>
                                            <Select
                                                showSearch
                                                style={{ width: '100%' }}
                                                placeholder="Inscribir estudiantes"
                                                optionFilterProp="children"
                                                value={null}
                                                onChange={(ele) => {
                                                    let asignatura = this.state.asignatura
                                                    asignatura.estudiantes.push(ele)
                                                    this.setState({
                                                        asignatura: asignatura
                                                    })
                                                    ele = null
                                                }}
                                                /* onSearch={onSearch} */
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                {
                                                    this.state.estudiantes.map((estudiante, e) => {
                                                        let indexEstudiante = this.state.asignatura.estudiantes.findIndex(est => est == estudiante.id)
                                                        if (indexEstudiante == -1) {
                                                            return <Option key={e} value={estudiante.id}>{estudiante.nombre + ' ' + estudiante.apellidos}</Option>
                                                        }
                                                    })
                                                }
                                            </Select>
                                        </Tooltip>
                                    </Col>
                                    {
                                        this.state.asignatura.estudiantes.length > 0 && <Col className="gutter-row" sm={24} xs={24}>
                                            <ConfigProvider renderEmpty={customizeRenderEmpty}>
                                                <Table 
                                                    bordered
                                                    size="small"
                                                    style={{ width: '100%', marginTop: '20px' }}
                                                    className="tablas-nivel-uno"
                                                    columns={[
                                                        {
                                                            title: 'Nro Documento',
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
                                                            title: '',  className: 'column-center', dataIndex: '', key: 'y', width: 100, render: (record) => 
                                                            <Popconfirm 
                                                                title="¿Está seguro que desea eliminar este estudiante?" 
                                                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                                                onConfirm={() => {
                                                                    let asignatura = this.state.asignatura
                                                                    asignatura.estudiantes.splice(record.key, 1)
                                                                    this.setState({
                                                                        asignatura: asignatura
                                                                    })
                                                                }}
                                                                onCancel={() => message.success('Eliminación cancelada')}
                                                                okText="Si"
                                                                cancelText="No"
                                                            >
                                                                <FontAwesomeIcon title="Eliminar asignatura" size='2x' color='#D9534E' icon={faTrash}/>
                                                            </Popconfirm>
                                                            
                                                        }
                                                    ]} 
                                                    pagination={{ pageSize: 10 }}
                                                    dataSource={this._renderDataEstudiantesAsignatura()} 
                                                />
                                            </ConfigProvider>
                                        </Col>
                                    }
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
                                        title: 'Nombre',
                                        dataIndex: 'nombre',
                                        key: 'nombre',
                                    },
                                    {
                                        title: 'Grado',
                                        width: 100,
                                        dataIndex: 'grado',
                                        key: 'grado',
                                    },
                                    {
                                        title: 'Docente',
                                        dataIndex: 'docente',
                                        key: 'docente',
                                        responsive: ['sm'],
                                    },
                                    {
                                        title: '',  className: 'column-center', dataIndex: '', key: 'x', width: 100, render: (record) => <FontAwesomeIcon title="Editar asignatura" size='2x' color='#DEC226' icon={faEdit} onClick={() => this.cargarAsignatura(record.item.id) }/>
                                    },
                                    {
                                        title: '',  className: 'column-center', dataIndex: '', key: 'y', width: 100, render: (record) => 
                                        <Popconfirm 
                                            title="¿Está seguro que desea eliminar este asignatura?" 
                                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                            onConfirm={() => this.eliminarAsignatura(record.item.id)}
                                            onCancel={() => message.success('Eliminación cancelada')}
                                            okText="Si"
                                            cancelText="No"
                                        >
                                            <FontAwesomeIcon title="Eliminar asignatura" size='2x' color='#D9534E' icon={faTrash}/>
                                        </Popconfirm>
                                        
                                    }
                                ]} 
                                pagination={{ pageSize: 10 }}
                                dataSource={this._renderDataAsignatura()} 
                            />
                        </ConfigProvider>
                    </div>
                </div>
            </Spin>
        )
    }
}
