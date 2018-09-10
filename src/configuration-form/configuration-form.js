import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@jetbrains/ring-ui/components/panel/panel';
import Button from '@jetbrains/ring-ui/components/button/button';

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
  <div>
    {children}
    <Panel className={styles.configurationButtonsPanel}>
      <Button primary={true} onClick={onSave}>
        {saveButtonLabel || 'Save'}
      </Button>
      <Button onClick={onCancel}>
        {cancelButtonLabel || 'Cancel'}
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
