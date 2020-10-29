import './ListadoDiscos.css';
import React from 'react';
import Disco from './Disco';

class ListadoDiscos extends React.Component {
  
  constructor(props){
    super(props);
    this.state={ 
      'discos': [  ] ,
      'from': 0
    }
    this.cargarDiscos();
  }

  cargarDiscos(){

    fetch('http://localhost:8083/discos/_search',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'size':5,'from':this.state.from})
      })
            .then(respuesta=>respuesta.json())
            .then(datos=>{
                var nuevosDiscos=[];
                console.log(datos.hits.hits);
                (datos.hits.hits).forEach(objeto=>nuevosDiscos.push(objeto._id))
                this.setState({ 
                  ...this.state,
                  'discos': [ ...this.state.discos,...nuevosDiscos  ] ,
                  }
                )
              }
            )
            .catch(e=>console.log(e));
  }

  render(){
    return <div className="listadoDiscos">
        { this.state.discos.map(discoId => 
          <Disco discoId={discoId} visualizacion="full" />)
        }
    </div>;
  }

}

export default ListadoDiscos;