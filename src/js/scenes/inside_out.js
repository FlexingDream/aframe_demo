import 'babel-polyfill';
import 'aframe-particle-system-component';

import {Scene} from 'aframe-react';
import ReactDOM from 'react-dom';
import SkyToOcean from '../components/_SkyToOcean';


class InsideOut extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Scene stats id="scene">
        <SkyToOcean/>
      </Scene>
    );
  }

}

ReactDOM.render(<InsideOut/>, document.querySelector('.scene-container'));
