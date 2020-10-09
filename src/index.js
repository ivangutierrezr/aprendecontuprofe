import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import './Login/login.css'
import './Admin/admin.css'
import './Header/header.css'
import './ConfigDocente/configDocente.css'
import './ConfigEstudiante/configEstudiante.css'
import './ConfigAsignatura/configAsignatura.css'
import './Usuario/usuario.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
/* import '../node_modules/bulma/css/bulma.min.css' */

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
