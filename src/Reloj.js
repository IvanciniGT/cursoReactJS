import './Reloj.css';
import React from 'react';

class Reloj extends React.Component {
  
  constructor(props){
    super(props);
    this.state={'hora':0};
  }
  
  actualizarHora(){
    this.setState({'hora': this.state.hora+1});
  }
  
  render(){
    return (
    <div> La hora es: <span className="Reloj">{this.state.hora}</span> </div>
    );
  }

  componentDidMount(){
    this.identificadorHilo=setInterval( this.actualizarHora.bind(this),  1000);    
  }
  componentWillUnmount(){
    clearInterval(this.identificadorHilo);
  }

}


/*
setInterval( this.actualizarHora,  1000);

setInterval( ()=> this.actualizarHora(),  1000);

function actualiza(){
  this.actualizarHora();
}
setInterval( actualiza,  1000);


print('Hola'.toUpperCase());
print('HOLA');
*/
export default Reloj;

