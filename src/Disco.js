import './Disco.css';
import React from 'react';
import CancionesDisco from './CancionesDisco';
import PropTypes from 'prop-types';

class Disco extends React.Component {
  
  constructor(props){
    super(props);
    /*this.state={
        ...RepositorioDiscos[props.discoId], 
        'mostrarCanciones': false
      };*/
      fetch('http://localhost:3000/canciones.json')
            .then(respuesta=>respuesta.json())
            .then(datos=>this.setState({
              ...datos[this.props.discoId],
              'mostrarCanciones': this.props.mostrarCanciones,
              'reproduciendo': false
            }));
  }

  reproduciendo(flag){
    this.setState({
        ...this.state, 
        'reproduciendo': flag
      });
  }

  mostrarCanciones(flag){
    this.setState({
        ...this.state, 
        'mostrarCanciones': flag
      });
  }
  
  render(){
    if(!this.state){
        return 'Cargando...';
    }
    var extras=<div className="cancionesInfo"><div className="boton mostrar" onClick={()=>this.mostrarCanciones(true)}></div></div>;
    if(this.state.mostrarCanciones){
      extras=<div className="cancionesInfo">
              <div className="boton ocultar" onClick={()=>this.mostrarCanciones(false)}></div>
              <CancionesDisco 
                canciones={this.state.canciones} 
                reproducirCallback={(param)=>this.reproduciendo(param)}/>
             </div>;
    }
    var estilo='disco';
    if(this.state.reproduciendo)
      estilo+=' play';
    estilo+=' '+this.props.visualizacion;
    return (
      <div className={estilo}>
        <div className="imagen"><img src={this.props.discoId+'.jpg'}/></div>
        <div className="titulo">{this.state.titulo}</div>
        <div className="autor">{this.state.autor}</div>
        <div className="fecha">{this.state.fecha}</div>
        {extras}
      </div>
    );
  }

}

Disco.propTypes = {
  discoId: PropTypes.string.isRequired,
  mostrarCanciones: PropTypes.bool,
  visualizacion: PropTypes.oneOf(['full', 'normal', 'nano'])
}
Disco.defaultProps = {
  mostrarCanciones: true,
  visualizacion: 'normal'
}
export default Disco;

