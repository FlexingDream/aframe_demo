

class ColladaModel extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <a-entity id={this.props.id} className={this.props.className} collada-model={this.props.asset} position={this.props.position} scale={this.props.scale} rotation={this.props.rotation} look-at={this.props.lookAt} ref={this.props.ref} visible={this.props.visible}>
        {this.props.children}
      </a-entity>
    );
  }

}

ColladaModel.defaultProps = {
  className: '',
  asset: '',
  position: "0 0 0",
  scale: '1 1 1',
  rotation: '0 0 0',
  lookAt: '',
  ref: '',
  visible: true,
  id: '',
};

export default ColladaModel