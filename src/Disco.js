import './Disco.css';
import React from 'react';
import CancionesDisco from './CancionesDisco';
import PropTypes from 'prop-types';
import ComponenteEditable from './ComponenteEditable';

class Disco extends ComponenteEditable {
  
  constructor(props){
    super(props);
    /*this.state={
        ...RepositorioDiscos[props.discoId], 
        'mostrarCanciones': false
      };*/
      this.reload();
  }

  edicion(nuevoEstadoEdicion, elementoActivo, callback=()=>{}){
    this.setState({
        ...this.state, 
        'edicion': nuevoEstadoEdicion
      },
      ()=>{
        nuevoEstadoEdicion && elementoActivo && this[elementoActivo].focus();
        callback();
      }
      );
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
  
  teclaPulsada(evento){

    var codigoTecla= 13;
    if(evento!=undefined){
      codigoTecla=evento.which || evento.keyCode;
    }
    if( codigoTecla === 27){
      this.edicion(false);
    }else if( codigoTecla === 13 ){
      var modificado=false;
      if(this.state.titulo!= this.titulo.value)
        modificado=true;
      if(this.state.autor!= this.autor.value)
        modificado=true;
      if(this.state.fecha!= this.fecha.value)
        modificado=true;

      this.setState(
        {
          ...this.state,
          'titulo': this.titulo.value,
          'autor': this.autor.value,
          'fecha': this.fecha.value,
        },
        ()=>{
          this.edicion(evento==undefined,undefined,()=>this.modificado(modificado));
        }
      );
    }
  }
  

  reload(){ 
    fetch(this.storageURL())
            .then(respuesta=>respuesta.json())
            .then(datos=>this.setState({
              ...datos['_source'],
              'mostrarCanciones': this.props.mostrarCanciones,
              'reproduciendo': false,
              'edicion': this.props.edicion
            },()=>this.modificado(false))).catch(e=>console.log(e));
  }

  storageURL(){ 
    return 'http://localhost:8083/discos/_doc/'+this.props.discoId; 
  }
  dataToStore(){ 
    return {
      'titulo': this.state.titulo,
      'autor': this.state.autor,
      'fecha': this.state.fecha,
      'canciones': this.state.canciones,
    }; 
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
    var datosDisco='';
    if(this.state.edicion){
      datosDisco=
        <div className="datosDisco">
          <input className="titulo" id={this.props.discoId+'_titulo'}  
            className="titulo" defaultValue={this.state.titulo} 
            onKeyUp={(e)=>this.teclaPulsada(e)} 
            onBlur={()=>this.teclaPulsada()} 
            ref={referencia=>this.titulo=referencia} />
          <input className="autor" id={this.props.discoId+'_autor'} 
            className="autor" defaultValue={this.state.autor} 
            onBlur={()=>this.teclaPulsada()} 
            onKeyUp={(e)=>this.teclaPulsada(e)}
            ref={referencia=>this.autor=referencia} />
          <input className="fecha" id={this.props.discoId+'_fecha'} 
            className="fecha" defaultValue={this.state.fecha} 
            onBlur={()=>this.teclaPulsada()} 
            onKeyUp={(e)=>this.teclaPulsada(e)}
            ref={referencia=>this.fecha=referencia} />
        </div>;
    }else{
      datosDisco=
        <div className="datosDisco">
          <div className="titulo" onClick={()=>this.edicion(true,'titulo')}>{this.state.titulo}</div>
          <div className="autor" onClick={()=>this.edicion(true,'autor')}>{this.state.autor}</div>
          <div className="fecha" onClick={()=>this.edicion(true,'fecha')}>{this.state.fecha}</div>
        </div>;
    }
    var estilo='disco';
    if(this.state.reproduciendo)
      estilo+=' play';
    estilo+=' '+this.props.visualizacion;
    return (
      <div className={estilo}>
        <div className="imagen"><img src={this.props.discoId+'.jpg'}/></div>
        {datosDisco}
        {this.botonera()}
        {extras}
      </div>
    );
  }

}

Disco.propTypes = {
  discoId: PropTypes.string.isRequired,
  mostrarCanciones: PropTypes.bool,
  edicion: PropTypes.bool,
  visualizacion: PropTypes.oneOf(['full', 'normal', 'nano'])
}
Disco.defaultProps = {
  mostrarCanciones: true,
  edicion: false,
  visualizacion: 'normal'
}
export default Disco;

