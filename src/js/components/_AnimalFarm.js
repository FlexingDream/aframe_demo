/**
  _AnimalFarm.js
  Animals running around and stuff scene.
  Optimal case is that you include this ontop of any scene.
*/

import extras from 'aframe-extras';

import {Entity, Animation} from 'aframe-react';
import WalkableCameraCursor from './WalkableCameraCursor';
import Ocean from './Ocean';
import Sky from './Sky';

class AnimalFarm extends React.Component{
  constructor(props){
    super(props);
  }

  /**
    componentWillMount
    Registers the importer for animals.
  */
  componentWillMount(){
    extras.registerAll();
  }


  render(){
    return(
      <Entity>

        <Entity>
          <WalkableCameraCursor position={[0, 0, 0]}>
          </WalkableCameraCursor>
        </Entity>

        <Entity three-model="loader: json; animation: default; src: url(models/fish.js);"
                position={[0, -100, -200]}
                rotation={[0, 90, 0]}/>

        <Entity three-model="loader: json; animation: default; src: url(models/fish.js);"
                position={[10, -50, -300]}
                rotation={[0, 90, 0]}/>

        <Entity three-model="loader: json; animation: default; src: url(models/fish.js);"
                position={[-50, -50, -350]}
                rotation={[0, 90, 0]}/>

        <Entity three-model="loader: json; animation: default; src: url(models/fish.js);"
                position={[-50, -50, -200]}
                rotation={[0, 90, 0]}/>
        <Entity three-model="loader: json; animation: default; src: url(models/fish.js);"
                position={[-50, -125, -200]}
                rotation={[0, 90, 0]}/>




        <Sky color='black'/>
      </Entity>


    );
  }
}

export default AnimalFarm;
