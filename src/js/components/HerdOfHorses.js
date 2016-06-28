/**
  HerdOfHorses.js
  Generates a herd of horses.
*/

import extras from 'aframe-extras';

import {Entity} from 'aframe-react';

class HerdOfHorses extends React.Component{
  constructor(props){
    super(props);
  }

  componentWillMount(){
    extras.registerAll();
  }

  render(){
    let horseLoader = {
      loader: 'json',
      animation: 'default',
      src: 'url(models/horse.js)'
    };
    return(
      <Entity {...this.props}>
        <Entity three-model={horseLoader}
                position={[0, 0, 0]}/>
        <Entity three-model={horseLoader}
                position={[100, 0, -100]}/>
        <Entity three-model={horseLoader}
                position={[-100, 0, -80]}/>

        {this.props.children}
      </Entity>
    );
  }

}

export default HerdOfHorses;
