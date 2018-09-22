import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@jetbrains/ring-ui/components/panel/panel';
import Button from '@jetbrains/ring-ui/components/button/button';
import {i18n} from 'hub-dashboard-addons/dist/localization';

import styles from './configuration-form.css';

const ConfigurationForm = (
  {
    saveButtonLabel,
    cancelButtonLabel,
    panelControls,
    onSave,
    onCancel,
    children
  }
) => (
  <div data-test="widget-configuration-form">
    {children}
    <Panel className={styles.configurationButtonsPanel} data-test="apply-button">
      <Button primary={true} onClick={onSave}>
        {saveButtonLabel || i18n('Save')}
      </Button>
      <Button onClick={onCancel} data-test="cancel-button">
        {cancelButtonLabel || i18n('Cancel')}
      </Button>
      {panelControls}
    </Panel>
  </div>
);

ConfigurationForm.propTypes = {
  saveButtonLabel: PropTypes.string,
  cancelButtonLabel: PropTypes.string,
  panelControls: PropTypes.arrayOf(PropTypes.node),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default ConfigurationForm;
