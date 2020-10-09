import React, { Component } from 'react'
import { Typography, Space, Layout } from 'antd';
const { Content } = Layout;
const { Title, Text } = Typography;


export default class Inicio extends Component {
    state = {}

    componentDidMount() {
    }

    render() {
        return (
            <Content className="content-usuario" style={{marginTop: '64px'}}>
                <div className="content-usuario-space">
                    <Space direction="vertical">
                        <Title level={2}>
                            Hola {this.props.usuario.nombre},
                        </Title>
                        <Title level={3}>
                            Bienvenid@ a Aprende con tu profe!
                        </Title>
                        {
                            this.props.rol == 2 && <Text>Este espacio académico está hecho para que tu conexión con los estudiantes de tus asignaturas sea mucho más fuerte. En este menú podrás configurar el texto introductorio, textos de clases, talleres, evaluaciones, foro y asistencias</Text>
                        }
                        {
                            this.props.rol == 3 && <Text>Este espacio académico está hecho para que puedas tener todos los recursos de tus clases en un solo lugar. Tus profesores dejarán aquí información para facilitar tus tareas, así como los recursos necesarios para llevar a cabo tu formación de una manera adecuada.</Text>
                        }
                        <Text>En la esquina superior izquierda encontrarás la opción para navegar por las asignaturas a las que tienes acceso. Debes elegir alguna para empezar. Vamos a ello! </Text>
                    </Space>
                </div>
            </Content>
        )
    }
}
