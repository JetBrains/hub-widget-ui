import React, {Component} from 'react';
import PropTypes from 'prop-types';


function withConfigurationModeHOC(WrappedComponent) {

  function updateConfigMode(dashboardApi, isConfiguring) {
    if (isConfiguring) {
      dashboardApi.enterConfigMode();
    } else {
      dashboardApi.exitConfigMode();
    }
  }

  return class ConfigurationMode extends Component {

    static propTypes = {
      isConfiguring: PropTypes.bool.isRequired,
      dashboardApi: PropTypes.object.isRequired
    };

    static getDerivedStateFromProps(props, state) {
      if (Boolean(props.isConfiguring) !== Boolean(state.prevIsConfiguring)) {
        updateConfigMode(props.dashboardApi, props.isConfiguring);
        return {
          prevIsConfiguring: props.isConfiguring
        };
      }

      return {
        prevWidgetTitle: state.prevIsConfiguring
      };
    }

    render() {
      return (
        <WrappedComponent {...this.props}/>
      );
    }
  };
}

export default withConfigurationModeHOC;
