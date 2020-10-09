import React, { Component } from 'react'
import Quill from 'quill'
import { Typography, Layout, Space, Input, Button, Divider, Popconfirm, message } from 'antd';
import { SaveOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
const { Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;

var toolbarOptions = [['bold', 'italic', 'underline', 'strike'], ['blockquote', 'code-block'], [{ 'header': 1 }, { 'header': 2 }], [{ 'list': 'ordered' }, { 'list': 'bullet' }], [{ 'script': 'sub' }, { 'script': 'super' }], [{ 'indent': '-1' }, { 'indent': '+1' }], [{ 'direction': 'rtl' }], [{ 'size': ['small', false, 'large', 'huge'] }], ['link', 'image', 'video', 'formula'], [{ 'color': [] }, { 'background': [] }], [{ 'font': [] }], [{ 'align': [] }]];

export default class ClasesDocente extends Component {
    state = {}

    componentDidMount() {
        console.log(this.props.posClase)
        var idEditor = "#editorDocente" + this.props.posClase
        this.quill = new Quill(idEditor, {
            theme: "snow",
            modules: {
                toolbar: toolbarOptions
            }
        })
        this.quill.root.innerHTML = this.props.asignatura.clases[this.props.posClase].texto
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.posClase !== nextProps.posClase) {
            this.quill.root.innerHTML = this.props.asignatura.clases[nextProps.posClase].texto
            return true;
        } else if (nextProps.itemEliminado == true) {
            this.quill.root.innerHTML = this.props.asignatura.clases[this.props.posClase].texto
            return true;
        }
        return false;
    }

    render() {
        return (
            <div className="content-full-center">
                <div className="content-full-between-center">
                    <Title level={2}>
                        Clase {this.props.posClase+1}
                    </Title>
                    <Popconfirm 
                        title="¿Está seguro que desea eliminar esta clase?" 
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => this.props.guardarDatosAsignatura(4, this.props.posClase)}
                        onCancel={() => message.success('Eliminación cancelada')}
                        okText="Si"
                        cancelText="No"
                    >
                        <Button type="danger" shape="round" icon={<DeleteOutlined />} size="default">
                            Eliminar clase
                        </Button>
                    </Popconfirm>
                    
                </div>
                <Button style={{margin: '10px 0'}} type="primary" shape="round" icon={<SaveOutlined />} size="large" onClick={() => this.props.guardarDatosAsignatura(3, this.props.posClase, this.quill.root.innerHTML)}>
                    Guardar cambios
                </Button>
                <div id={`editorDocente${this.props.posClase}`}></div>
            </div>
        )
    }
}
