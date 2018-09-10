import {Component} from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {

  static propTypes = {
    period: PropTypes.number,
    onTick: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.schedule();
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps && this.props.period !== nextProps.period;
  }

  componentDidUpdate() {
    this.cancel();
    this.schedule();
  }

  componentWillUnmount() {
    this.cancel();
  }

  handler = null;

  task = () => {
    this.props.onTick();
    this.schedule();
  };

  schedule = () => {
    if (this.props.period) {
      this.handler = setTimeout(this.task, this.props.period);
    } else {
      this.handler = null;
    }
  };

  cancel = () => {
    if (this.handler) {
      clearTimeout(this.handler);
      this.handler = null;
    }
  };

  render() {
    return '';
  }
}

export default Timer;
