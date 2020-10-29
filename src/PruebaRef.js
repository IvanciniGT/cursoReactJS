import './Disco.css';
import React from 'react';
import CancionesDisco from './CancionesDisco';
import PropTypes from 'prop-types';

class PruebaRef extends React.Component {
  
  constructor(props){
    super(props);
  }

  render(){
    return <div>
      Soy el <u onClick={()=> this.elemento2.value=this.elemento1.value}> foqueador </u>:
      <br/>
      Elemento1: <input ref={referencia=>this.elemento1=referencia} click={()=>this.asignarFoco(this.elemento1)} defaultValue="Elemento 1"></input>
      <br/>
      Elemento2: <input ref={referencia=>this.elemento2=referencia}  defaultValue="Elemento 2"></input>
      </div>;
  }
}

export default PruebaRef;

