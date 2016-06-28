/**
  Butterflies.js
  Adds a bunch of stupid butterflies.
  IMPORTANT - BUTTERFLIES ARE WHITE.
*/

import 'aframe-layout-component';

import extras from 'aframe-extras';
import {Entity, Animation} from 'aframe-react';

class Butterflies extends React.Component{
  constructor(props){
    super(props);
  }

  componentWillMount(){
    extras.registerAll();
  }

  render(){
    let butterflyLoader = {
      loader: 'json',
      animation: 'default',
      src: 'url(models/butterfly.js)'
    };

    let butterflyHolder = [];
    for (let i = 0; i < 20; i++){
      butterflyHolder.push(
        (
          <Entity three-model={butterflyLoader}/>
        )
      );
    }

    return(
      <Entity layout={{
        type: 'dodecahedron',
        radius: 75
      }} {...this.props}>
        {this.props.children}
        {butterflyHolder}
      </Entity>
    );
  }
}

export default Butterflies;
