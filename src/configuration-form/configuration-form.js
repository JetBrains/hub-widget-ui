import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@jetbrains/ring-ui/components/panel/panel';
import Button from '@jetbrains/ring-ui/components/button/button';
import {WarningIcon} from '@jetbrains/ring-ui/components/icon';
import {i18n} from 'hub-dashboard-addons/dist/localization';

import styles from './configuration-form.css';

const ConfigurationForm = (
  {
    saveButtonLabel,
    cancelButtonLabel,
    warning,
    isInvalid,
    isLoading,
    panelControls,
    onSave,
    onCancel,
    children
  }
) => (
  <div data-test="widget-configuration-form">
    <div className={styles.configurationFormContent}>
      {children}
    </div>
    <Panel className={styles.configurationButtonsPanel} data-test="apply-button">
      {
        warning &&
        <div className={styles.configurationWarning}>
          <WarningIcon
            className={styles.configurationWarningIcon}
            size={WarningIcon.Size.Size12}
            color={WarningIcon.Color.RED}
          />
          { warning }
        </div>
      }
      {
        onSave && (
          <Button
            primary={true}
            onClick={onSave}
            disabled={isInvalid}
            loader={isLoading}
          >
            {saveButtonLabel || i18n('Save')}
          </Button>
        )
      }
      {
        onCancel && (
          <Button
            data-test="cancel-button"
            onClick={onCancel}
            loader={isLoading}
          >
            {cancelButtonLabel || i18n('Cancel')}
          </Button>
        )
      }
      {panelControls}
    </Panel>
  </div>
);

ConfigurationForm.propTypes = {
  saveButtonLabel: PropTypes.string,
  cancelButtonLabel: PropTypes.string,
  warning: PropTypes.string,
  isInvalid: PropTypes.bool,
  isLoading: PropTypes.bool,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  panelControls: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default ConfigurationForm;
