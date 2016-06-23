class Scene extends React.Component{
  attachEvents(el){
    if (el) {
      el.addEventListener('enter-vr', event => {
        this.props.onEnterVR(event);
      });
      el.addEventListener('exit-vr', event => {
        this.props.onExitVR(event);
      });
      el.addEventListener('loaded', event => {
        this.props.onLoaded(event);
      });
      if (this.props.onTick) {
        setTimeout(() => {
          el.addBehavior({
            tick: this.props.onTick,
            el: el
          });
        });
      }
    }
  };

  componentDidMount(){
    if (this.props.includeFog){
      document.querySelector("#scene").setAttribute('fog',true);
    }
  }

  render() {
    return (
      <a-scene ref={this.attachEvents.bind(this)} {...serializeComponents(this.props)}>
        {this.props.children}
      </a-scene>
    );
  }

}

Scene.propTypes = {
  onEnterVR: React.PropTypes.func,
  onExitVR: React.PropTypes.func,
  onLoaded: React.PropTypes.func,
  onTick: React.PropTypes.func
};

function serializeComponents (props) {
  let serialProps = {};
  Object.keys(props).forEach(component => {
    if (['children', 'mixin'].indexOf(component) !== -1) { return; }

    if (props[component].constructor === Function) { return; }

    if (props[component].constructor === Array) {
      //Stringify components passed as array.
      serialProps[component] = props[component].join(' ');
    } else if (props[component].constructor === Object) {
      // Stringify components passed as object.
      serialProps[component] = styleParser.stringify(props[component]);
    } else {
      // Do nothing for components otherwise.
      serialProps[component] = props[component];
    }
  });
  return serialProps;
};

Scene.defaultProps = {
  onEnterVR: () => {},
  onExitVR: () => {},
  onLoaded: () => {},
  includeFog: false,
};

export default Scene;