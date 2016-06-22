import '../aframe_components/chain-events';
class Animation extends React.Component {


  attachEvents = el => {
    if (el) {
      el.addEventListener('animationend', event => {
        this.props.onAnimationEnd(event);
      });
      el.addEventListener('animationstart', event => {
        this.props.onAnimationStart(event);
      });
    }
  };

  render() {
    return (
      <a-animation ref={this.attachEvents} {...serializeComponents(this.props)} ></a-animation>
    );
  }
}

/**
 * Stringify components passed as an object.
 *
 * {primitive: box; width: 10} to 'primitive: box; width: 10'
 */
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

Animation.propTypes = {
  onAnimationEnd: React.PropTypes.func,
  onAnimationStart: React.PropTypes.func
};

Animation.defaultProps = {
  onAnimationEnd: () => {},
  onAnimationStart: () => {},
};

export default Animation;