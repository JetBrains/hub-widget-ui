import {Component} from 'react';
import PropTypes from 'prop-types';

class WidgetLoader extends Component {

  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    dashboardApi: PropTypes.object.isRequired
  };

  shouldComponentUpdate(nextProps) {
    if (this.props === nextProps) {
      return false;
    }

    return this.props.isLoading !== nextProps.isLoading;
  }

  render() {
    const {isLoading, dashboardApi} = this.props;
    dashboardApi.setLoadingAnimationEnabled(isLoading);
    return '';
  }
}

export default WidgetLoader;
