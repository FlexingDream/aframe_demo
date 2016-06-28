import 'babel-polyfill';
import 'aframe-particle-system-component';
import '../aframe_components/mobile-touch-interaction';

import $ from 'jquery';
import {Scene, Entity} from 'aframe-react';
import ReactDOM from 'react-dom';
import AnimalFarm from '../components/_AnimalFarm';

class TryAnimals extends React.Component{
  constructor(props){
    super(props);

  }

  render(){
    return(
      <Scene stats id="scene">
        <AnimalFarm/>
      </Scene>
    );
  }

}

window.$ = $;

ReactDOM.render(<TryAnimals/>, document.querySelector('.scene-container'));
