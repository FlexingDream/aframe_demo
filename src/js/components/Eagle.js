/**
  Eagle.js
  Adds a stupid eagle.
*/

import extras from 'aframe-extras';

import {Entity} from 'aframe-react';

class Eagle extends React.Component{

  constructor(props){
    super(props);
  }

  componentWillMount(){
    extras.registerAll();
  }

  render(){

    let eagleLoader = {
      loader: 'json',
      animation: 'default',
      src: 'url(models/eagle.js)'
    };

    return(
      <Entity {...this.props}>

        <Entity three-model={eagleLoader}
                position={[0, 0, 0]}/>

        {this.props.children}

      </Entity>
    );
  }

}

export default Eagle;
