import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Reloj from './Reloj';
import Disco from './Disco';
import Botonera from './Botonera';
import CancionesDisco from './CancionesDisco';
import PruebaRef from './PruebaRef';
import reportWebVitals from './reportWebVitals';
import ListadoDiscosConectado from './ListadoDiscos';

import ComponenteAConectado from './redux/ComponenteA';
import ComponenteBConectado from './redux/ComponenteB';
import FiltroConectado from './Filtro';
import miReducer from './reducers/mireducer';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
let elStoreMio = createStore(miReducer);

ReactDOM.render(  
    <React.StrictMode>
        <Provider store={elStoreMio}>
        <FiltroConectado></FiltroConectado>
        <FiltroConectado></FiltroConectado>
        <FiltroConectado></FiltroConectado>
            <ListadoDiscosConectado></ListadoDiscosConectado>
            <FiltroConectado></FiltroConectado>
            <FiltroConectado></FiltroConectado>
        </Provider>
    </React.StrictMode>, 
    document.getElementById('root') );

/*
            <ComponenteAConectado/>
            <ComponenteBConectado/>
        <ListadoDiscos></ListadoDiscos>

<Disco discoId="disco1" visualizacion="full" />
        <Disco discoId="disco2" visualizacion="full" />
        <Disco discoId="disco3" visualizacion="full" />
        <Disco discoId="disco1" visualizacion="full" />
    <Disco discoId="disco2" mostrarCanciones={false}/>

    <div className="listadoDiscos">
        <Disco discoId="disco3"  visualizacion="nano"/>
        <Disco discoId="disco3"  visualizacion="nano"/>
        <Disco discoId="disco3"  visualizacion="nano"/>
        <Disco discoId="disco3"  visualizacion="nano"/>
    </div>
    <hr/>
    <CancionesDisco discoId="disco3" />
*/


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
