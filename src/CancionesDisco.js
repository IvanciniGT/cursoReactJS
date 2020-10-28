import './Disco.css';
import React from 'react';
import PropTypes from 'prop-types';

class CancionesDisco extends React.Component {
  constructor(props){
    super(props);
    this.state={};
    if(props.discoId){
        //this.state=RepositorioDiscos[props.discoId];
        fetch('http://localhost:3000/canciones.json')
            .then(respuesta=>respuesta.json())
            .then(datos=>this.setState(datos[props.discoId]));
    }else
        this.state={'canciones': props.canciones};
    
  }
  render(){ 
    if(this.state.canciones){
        return <div className="canciones">
                <ol>
                {this.state.canciones.map( cancion => <li onClick={()=>this.props.reproducirCallback(true)}> {cancion.nombre} ({cancion.duracion}) </li> )}
                </ol>
            </div>;
    }else{
        return 'Cargando.....';
    }
  }
}


CancionesDisco.propTypes = {
  discoId: PropTypes.string,
  reproducirCallback: PropTypes.func,
  canciones: PropTypes.array
}

CancionesDisco.defaultProps = {
  reproducirCallback: ()=>{}
}

export default CancionesDisco;