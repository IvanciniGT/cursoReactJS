import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { incremento, actualizacionTexto } from './actions/index.js'

class ComponenteB extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return <div>actualizacionTexto
      <input 
        ref={referencia=>this.input=referencia} 
        onKeyUp={()=>this.props.asignarTexto(this.input.value)}/>
      <button
        onClick={()=>this.props.incrementar()}
      >INCREMENTAR</button>
    </div>;
  }  
}

ComponenteB.propTypes = {
  incrementar: PropTypes.func,
  asignarTexto: PropTypes.func
}

//////////////////////////
// VINCULACION CON REACT
//////////////////////////
const mapDispatchToProps = (dispatch) => {
  return {
    incrementar:  () => {dispatch(incremento())},
    asignarTexto: (texto) => {dispatch(actualizacionTexto(texto))}
  }
}
const ComponenteBConectado = connect(
  ()=>{},
  mapDispatchToProps
)(ComponenteB);
export default ComponenteBConectado
