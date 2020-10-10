import React, { Component } from 'react'
import { Typography, Layout, Space, Input, Button } from 'antd';
const { Content } = Layout;
const { Title, Text } = Typography;


export default class IntroduccionEstudiante extends Component {
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
                        {
                            this.props.asignatura.introduccion.split('\n').map((parrafo, p) => {
                                return (
                                    <Text key={p}>
                                        {parrafo}
                                    </Text>
                                )
                            })
                        }
                    </Space>
                </div>
            </Content>
        )
    }
}