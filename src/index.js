import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Reloj from './Reloj';
import Disco from './Disco';
import CancionesDisco from './CancionesDisco';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(  
    <React.StrictMode>
        <Disco discoId="disco1" visualizacion="full"/>
        <Disco discoId="disco2" mostrarCanciones={false}/>

        <div className="listadoDiscos">
            <Disco discoId="disco3"  visualizacion="nano"/>
            <Disco discoId="disco3"  visualizacion="nano"/>
            <Disco discoId="disco3"  visualizacion="nano"/>
            <Disco discoId="disco3"  visualizacion="nano"/>
        </div>
        <hr/>
        <CancionesDisco discoId="disco3" />
    </React.StrictMode>, 
    document.getElementById('root') );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
