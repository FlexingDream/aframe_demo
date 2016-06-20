import {Entity} from 'aframe-react';


class Camera extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (<Entity class="camera" camera="" look-controls="" wasd-controls="" {...this.props}/>);
  }

  shouldComponentUpdate(nextProps,nextState){
    return false;
  }
};



export default Camera;
