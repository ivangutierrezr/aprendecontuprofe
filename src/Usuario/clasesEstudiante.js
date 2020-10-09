import React, { Component } from 'react'
import { Typography } from 'antd';
const { Title } = Typography;

export default class ClasesEstudiante extends Component {
    state = {}

    render() {
        return (
            <div className="content-full-start">
                <Title level={2}>
                    Clase {this.props.posClase+1}
                </Title>
                <div className='ql-editor' dangerouslySetInnerHTML={{ __html: this.props.asignatura.clases[this.props.posClase].texto }}></div>
            </div>
        )
    }
}
