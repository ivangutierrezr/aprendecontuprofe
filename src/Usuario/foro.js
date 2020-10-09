import React, { Component } from 'react'
import moment from 'moment'
import { Typography, Layout, Space, Input, Button, Divider, Popconfirm, message } from 'antd';
import { SaveOutlined, DeleteOutlined, QuestionCircleOutlined, PlusSquareOutlined } from '@ant-design/icons';
import 'moment/locale/es';
moment.locale('es')
const { Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;

export default class Foro extends Component {
    state = {}

    componentDidMount() {
    }

    /* shouldComponentUpdate(nextProps, nextState) {
        if (this.props.posClase !== nextProps.posClase) {
            this.quill.root.innerHTML = this.props.asignatura.clases[nextProps.posClase].texto
            return true;
        } else if (nextProps.claseEliminada == true) {
            this.quill.root.innerHTML = this.props.asignatura.clases[this.props.posClase].texto
            return true;
        }
        return false;
    } */

    render() {
        return (
            <div className="content-full-center">
                <div className="content-full-between-center">
                    <Title level={2}>
                        { this.props.asignatura.foro[this.props.posForo].title }
                    </Title>
                    <Popconfirm 
                        title="¿Está seguro que desea eliminar este foro?" 
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => this.props.guardarDatosAsignatura(6, this.props.posForo)}
                        onCancel={() => message.success('Eliminación cancelada')}
                        okText="Si"
                        cancelText="No"
                    >
                        <Button type="danger" shape="round" icon={<DeleteOutlined />} size="default">
                            Eliminar foro
                        </Button>
                    </Popconfirm>
                </div>
                <Space direction="vertical" className="content-space-foro">    
                    {
                        this.props.asignatura.foro[this.props.posForo].post.split('\n').map((parrafo, p) => {
                            return (
                                <Text key={p}>
                                    {parrafo}
                                </Text>
                            )
                        })
                    }
                </Space>
                <div className="content-full-end">
                    <span className="publicado-hace">
                        <i>Publicado {moment(this.props.asignatura.foro[this.props.posForo].date).fromNow()}</i>
                    </span>
                </div>
                <TextArea placeholder="Agregar nuevo comentario" value={this.props.nuevoComentario}  autoSize={{ minRows: 2 }} onChange={(ele) => this.props.editarComentario(ele.target.value)} style={{ margin: '15px 0 10px 0' }}/>
                <div className="content-full-start">
                    <Button style={{margin: '10px 0'}} type="primary" icon={<PlusSquareOutlined />} onClick={() => this.props.guardarDatosAsignatura(7, this.props.posForo)}>
                        Agregar Comentario
                    </Button>
                </div>
                <div className="content-full-start">
                    <Title level={4} style={{marginTop: '15px', borderBottom: '2px solid black', width: '100%'}}>
                        Comentarios
                    </Title>
                    {
                        this.props.asignatura.foro[this.props.posForo].replicas.length > 0 ? this.props.asignatura.foro[this.props.posForo].replicas.map((replica, r) => {
                            let nombreAutor = ""
                            let claseAutor = ""
                            console.log(replica.rol)
                            if (replica.rol == 3) {
                                let indexEstudiante = this.props.estudiantes.findIndex(est => est.id == replica.autor)
                                let estudiante = this.props.estudiantes[indexEstudiante]
                                nombreAutor = estudiante.nombre + " " + estudiante.apellidos
                            } else {
                                nombreAutor = this.props.docente.nombre + " " + this.props.docente.apellidos + " (Docente)"
                                claseAutor = "docente-replica"
                            }
                            if (replica.autor == this.props.usuario.id) {
                                claseAutor = "autor-replica"
                            }
                            return (
                                <div key={r} className={"content-replicas-foro " + claseAutor}>
                                    <span className={"replica-foro-autor " + claseAutor}>{nombreAutor}</span>
                                    {
                                        replica.comentario.split('\n').map((parrafo, p) => {
                                            return (
                                                <Text className={"replica-foro-comentario " + claseAutor} key={p}>
                                                    {parrafo}
                                                </Text>
                                            )
                                        })
                                    }
                                    {/* <span className={"replica-foro-comentario " + claseAutor}>{replica.comentario}</span> */}
                                    <span className={"replica-foro-fecha " + claseAutor}>{moment(replica.fecha).fromNow()}</span>
                                    {
                                        replica.autor == this.props.usuario.id && <Popconfirm 
                                            title="¿Está seguro que desea eliminar este comentario?" 
                                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                            onConfirm={() => this.props.guardarDatosAsignatura(8, this.props.posForo, r)}
                                            onCancel={() => message.success('Eliminación cancelada')}
                                            okText="Si"
                                            cancelText="No"
                                        >
                                            <Text type="danger" className="replica-foro-eliminar-comentario pointer">
                                                Eliminar comentario
                                            </Text>
                                        </Popconfirm>
                                        
                                        
                                    }
                                </div>
                            )
                        }).reverse() : <Text type="success">
                            Sin comentarios aún...
                        </Text>
                    }
                </div>
            </div>
        )
    }
}
