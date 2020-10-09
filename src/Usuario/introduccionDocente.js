import React, { Component } from 'react'
import { Typography, Layout, Space, Input, Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
const { Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;


export default class IntroduccionDocente extends Component {
    state = {}

    componentDidMount() {
    }

    render() {
        return (
            <Content className="content-usuario" style={{marginTop: '64px'}}>
                <div className="content-usuario-space">
                    <Title level={2}>
                        Introducción {this.props.asignatura.nombre}
                    </Title>
                    <Space direction="vertical">
                        <Text>En este espacio puedes editar la introducción al curso, debe ser breve, de máximo 500 caracteres y que de una visión general de lo que encuentren en este espacio</Text>
                        <TextArea
                            value={this.props.asignatura.introduccion}
                            onChange={(ele) => {
                                /* let asignatura = this.props.asignatura
                                asignatura.introduccion = ele.target.vaue
                                this.setState({asignatura: asignatura}) */
                                this.props.cambiarDatosAsignatura(1, ele.target.value)
                            }}
                            placeholder="Digite en este espacio la introducción de la asignatura"
                            autoSize={{ minRows: 2}}
                        />
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                            <Button type="primary" shape="round" icon={<SaveOutlined />} size="large" onClick={() => this.props.guardarDatosAsignatura(1, null)}>
                                Guardar cambios
                            </Button>
                        </div>
                    </Space>
                </div>
            </Content>
        )
    }
}
