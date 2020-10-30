import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

class ComponenteA extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return <p>
      Texto: {this.props.texto}
      Número: {this.props.numero}
    </p>;
  }  
}

ComponenteA.propTypes = {
  texto: PropTypes.string,
  numero: PropTypes.number
}

//export default ComponenteA;

//////////////////////////
// VINCULACION CON REACT
//////////////////////////

const mapStateToProps = (state) => {
  return {
    texto: state.Texto,
    numero: state.Numero,
  }
}

const ComponenteAConectado = connect(
  mapStateToProps,
  ()=>{}
)(ComponenteA);
export default ComponenteAConectado
