import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { filtro } from './actions/index.js'

class Filtro extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return <div>actualizacionTexto
      <input 
        ref={referencia=>this.input=referencia} 
        />
      <button
        onClick={()=>this.props.filtrar(this.input.value)}
      >FILTRAR</button>
    </div>;
  }  
}

Filtro.propTypes = {
  filtrar: PropTypes.func
}

//////////////////////////
// VINCULACION CON REACT
//////////////////////////
const mapDispatchToProps = (dispatch) => {
  return {
    filtrar:  (texto) => {dispatch(filtro(texto))}
  }
}
const FiltroConectado = connect(
  ()=>{},
  mapDispatchToProps
)(Filtro);
export default FiltroConectado
