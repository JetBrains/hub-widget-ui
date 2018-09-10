import React from 'react';
import PropTypes from 'prop-types';

import ConfigurationMode from '../configuration-mode/configuration-mode';


const ConfigurableWidget = ({isConfiguring, Title, Configuration, Content, dashboardApi}) => (
  <div>
    <ConfigurationMode
      isConfiguring={isConfiguring}
      dashboardApi={dashboardApi}
    />
    {<Title dashboardApi={dashboardApi}/>}
    {isConfiguring ? <Configuration/> : <Content/>}
  </div>
);

ConfigurableWidget.propTypes = {
  isConfiguring: PropTypes.bool.isRequired,
  dashboardApi: PropTypes.object.isRequired,
  // React component
  Title: PropTypes.func,
  // React component
  Configuration: PropTypes.func.isRequired,
  // React component
  Content: PropTypes.func.isRequired
};

export default ConfigurableWidget;
