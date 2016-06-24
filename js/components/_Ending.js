import {Animation, Entity} from 'aframe-react';
import Camera from '../components/Camera';
import Cursor from '../components/Cursor';
import Helper from '../other/Helper';
import Text from '../components/Text';
import TextGroup from '../components/TextGroup';
class Ending extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(

      <Entity class='ending'>
        <Entity position={this.props.position}>
          <Text text='Thank You!' size={1}/>
        </Entity>
      </Entity>
    );
  }
}
Ending.defaultProps = {
  position: '0 0 0',
};
export default Ending;