import {Animation, Entity} from 'aframe-react';
import 'aframe-layout-component';
import Helper from '../other/Helper';
import ColladaModel from './ColladaModel';
import ReactDOM from 'react-dom';
class Rings extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    let nodes = document.querySelectorAll('.ring');
    for (let i =0;i<nodes.length;i++){
      ReactDOM.findDOMNode(nodes[i]).addEventListener('click',function(){
        this.setAttribute('material',
          'color',Helper.getRandomColor());
      });
    }
  }

  render(){
    let rings = [];
    for (let i =0; i<this.props.numRings;i++){
      let radOut = (i+2) * 100;
      let radIn = radOut - 5;
      rings.push(
        <Entity class="ring" geometry={{primitive: 'ring', radiusOuter: radOut, radiusInner: radIn}} position="0 -100 0" rotation="90 0 0" material={{color: 'white', side: 'double', opacity: 0.4, transparent: true}}>
          <Animation attribute="scale" to="1.2 1.2 1.2" from="1 1 1" begin="click" dur="5000" ease="ease-in-out" fill='both' repeat='1' direction='alternate'/>
        </Entity>
      );
    }
    return(
      <Entity class="rings">
        {rings}
      </Entity>
    );
  }
}
Rings.defaultProps = {
  numRings: 12,
}

export default Rings;