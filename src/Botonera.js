import './botonera.css';
import React from 'react';
import PropTypes from 'prop-types';

const ESTADO_ESPERA=0;
const ESTADO_ERROR=1;

class Botonera extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      'estado': ESTADO_ESPERA,
      'aviso': false
    };
  }

  componentWillReceiveProps(){
    this.setState({
      ...this.state,
      'estado': ESTADO_ESPERA
    });
  }
  render(){
    var aviso=''
    var botonGuardar=''
    var botonCancelar=''
    if(this.state.aviso)
      aviso=<div className="botonera ok"></div>;

    if(this.props.modificado){
      // Componentes de la botonera
      botonCancelar=<div className="botonera cancel" onClick={()=>this.props.cancelFunction()}></div>
      
      if(this.state.estado==ESTADO_ERROR){
        botonGuardar=<div className="botonera retry" onClick={()=>this.save()}></div>
        aviso=<div className="botonera error"></div>;
      }else if(this.state.estado==ESTADO_ESPERA){
        botonGuardar=<div className="botonera save" onClick={()=>this.save()}></div>
      }

    }
    return <div className="botonera">
    {botonCancelar}
    {botonGuardar}
    {aviso}
 </div>;
}

  save(){
    var url=this.props.urlFunction();
    var datos=this.props.dataFunction();
    fetch(url,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    })
      .then(respuesta => {
        if(respuesta.status == 200){
          this.setState({'aviso': true},()=>{
            this.props.storedFunction();
            setTimeout(()=>this.setState({'aviso': false}),2000);
          });

          //this.props.storedFunction();

        } else {
          this.setState({'estado': ESTADO_ERROR});
        }
      })
      .catch(error => {
        this.setState({'estado': ESTADO_ERROR});
      });
  }

  componentWillUnmount(){

  }
}

Botonera.propTypes = {
  modificado: PropTypes.bool,
  urlFunction: PropTypes.func,
  dataFunction: PropTypes.func,
  storedFunction: PropTypes.func,
  cancelFunction: PropTypes.func
}
Botonera.defaultProps = {
  modificado: false
}
export default Botonera;

