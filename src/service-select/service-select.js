import React from 'react';
import PropTypes from 'prop-types';
import Select from '@jetbrains/ring-ui/components/select/select';
import {MinWidth} from '@jetbrains/ring-ui/components/popup/position';

const service2item = service => service && {
  key: service.id,
  label: service.name,
  description: service.homeUrl,
  service
};

const ServiceSelect =
  ({isLoading, placeholder, selectedService, serviceList, loadError, onServiceSelect}) => (
    <Select
      label={placeholder || 'Select service'}
      multiple={false}
      loading={isLoading}
      filter={true}
      selected={service2item(selectedService)}
      size={Select.Size.FULL}
      minWidth={MinWidth.TARGET}
      data={(serviceList || []).map(service2item)}
      notFoundMessage={loadError}
      onSelect={onServiceSelect}
    />
  );

const SERVICE_PROPS = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  homeUrl: PropTypes.string
};

ServiceSelect.propTypes = {
  isLoading: PropTypes.bool,
  placeholder: PropTypes.string,
  selectedService: PropTypes.shape(SERVICE_PROPS),
  serviceList: PropTypes.arrayOf(PropTypes.shape(SERVICE_PROPS)),
  loadError: PropTypes.string,
  onServiceSelect: PropTypes.func.isRequired
};

export default ServiceSelect;
