import {Component} from 'react';
import PropTypes from 'prop-types';


class ConfigurationMode extends Component {

  static propTypes = {
    isConfiguring: PropTypes.bool.isRequired,
    dashboardApi: PropTypes.object.isRequired
  };

  shouldComponentUpdate(nextProps) {
    if (this.props === nextProps) {
      return false;
    }

    return this.props.isConfiguring !== nextProps.isConfiguring;
  }

  render() {
    const {isConfiguring, dashboardApi} = this.props;

    if (isConfiguring) {
      dashboardApi.enterConfigMode();
    } else {
      dashboardApi.exitConfigMode();
    }
    return '';
  }
}

export default ConfigurationMode;
