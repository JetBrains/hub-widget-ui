import React from 'react';
import PropTypes from 'prop-types';

import ConfigurationMode from '../configuration-mode/configuration-mode';
import withWidgetTitleHOC from '../widget-title/widget-title';


const ConfigurableWidget = ({isConfiguring, Configuration, Content, dashboardApi}) => (
  <div>
    <ConfigurationMode
      isConfiguring={isConfiguring}
      dashboardApi={dashboardApi}
    />
    {isConfiguring ? <Configuration/> : <Content/>}
  </div>
);

ConfigurableWidget.propTypes = {
  isConfiguring: PropTypes.bool.isRequired,
  dashboardApi: PropTypes.object.isRequired,
  // React component
  Configuration: PropTypes.func.isRequired,
  // React component
  Content: PropTypes.func.isRequired
};

export default withWidgetTitleHOC(ConfigurableWidget);
