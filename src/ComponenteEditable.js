import './Disco.css';
import React from 'react';
import Botonera from './Botonera';

class ComponenteEditable extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      'modificado': false
    }
  }

  stored(){
    this.modificado(false);
  }
  reload(){  }
  storageURL(){ return ''; }
  dataToStore(){ return {}; }

  modificado(flag){
    this.setState(
      {...this.state, 'modificado': flag }
    );
  }

  // Componente que exitenda al componenteEditable
  botonera(){
    return <Botonera 
                    modificado={this.state.modificado}
                    storedFunction={()=>this.stored()}
                    cancelFunction={()=>this.reload()}
                    urlFunction={()=>this.storageURL()}
                    dataFunction={()=>this.dataToStore()}/>;
  }
  
}

export default ComponenteEditable;

