import './ListadoDiscos.css';
import React from 'react';
import Disco from './Disco';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

class ListadoDiscos extends React.Component {
  
  constructor(props){
    super(props);
    this.state={ 
      'discos': [  ] ,
      'from': 0
    }
    this.cargarDiscos(0);
  }

  componentDidMount(){
    window.addEventListener("scroll",(e)=>this.scrolleando(e));
//    window.onscroll=(e)=>this.scrolleando(e);
  }
  scrolleando(evento){
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight-200) {
      this.cargarDiscos(5);
    }  
  }

  componentWillReceiveProps(){
    this.setState({ 
      'discos': [  ] ,
      'from': 0
    },()=>this.cargarDiscos(0));
  }
  cargarDiscos(offset){

    fetch('http://localhost:8083/discos/_search?q=titulo:'+this.props.filtro,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'size':5,'from':this.state.from+offset})
      })
            .then(respuesta=>respuesta.json())
            .then(datos=>{
                var nuevosDiscos=[];
                console.log(datos.hits.hits);
                (datos.hits.hits).forEach(objeto=>nuevosDiscos.push(objeto._id))
                this.setState({ 
                  ...this.state,
                  'from':this.state.from+offset,
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

//export default ListadoDiscos;

ListadoDiscos.propTypes = {
  filtro: PropTypes.string
}

//export default ComponenteA;

//////////////////////////
// VINCULACION CON REACT
//////////////////////////

const mapStateToProps = (state) => {
  return {
    filtro: state.filtro
  }
}

const ListadoDiscosConectado = connect(
  mapStateToProps,
  ()=>{}
)(ListadoDiscos);
export default ListadoDiscosConectado
