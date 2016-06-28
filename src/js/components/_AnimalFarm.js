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
import SchoolOfFishes from './SchoolOfFishes';
import HerdOfHorses from './HerdOfHorses';


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

  /**
    <HerdOfHorses position={[0, -100, -300]} rotation={[0, 90, 0]}/>
    <SchoolOfFishes position={[0, -100, -300]} rotation={[0, 90, 0]}/>
  */
  render(){
    return(
      <Entity>

        <Entity>
          <WalkableCameraCursor position={[0, 0, 0]}>
          </WalkableCameraCursor>
        </Entity>




        <Sky/>
      </Entity>


    );
  }
}

export default AnimalFarm;
