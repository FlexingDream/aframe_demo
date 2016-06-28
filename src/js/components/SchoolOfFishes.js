/**
  SchoolOfFishes.js
  Adds a school of fishes.
*/

import extras from 'aframe-extras';

import {Entity} from 'aframe-react';

class SchoolOfFishes extends React.Component{
  constructor(props){
    super(props);
  }

  componentWillMount(){
    extras.registerAll();
  }

  render(){
    let fishLoader = {
      loader: 'json',
      animation: 'default',
      src: 'url(models/fish.js)'
    };
    return(
      <Entity {...this.props}>
        <Entity three-model={fishLoader}
                position={[0, 0, 0]}/>

        <Entity three-model={fishLoader}
                position={[10, 50, -80]}/>

        <Entity three-model={fishLoader}
                position={[-50, 30, -120]}/>

        <Entity three-model={fishLoader}
                position={[-50, 50, 0]}/>

        <Entity three-model={fishLoader}
                position={[-50, -25, -40]}/>
        {this.props.children}
      </Entity>
    );
  }

}

export default SchoolOfFishes;
