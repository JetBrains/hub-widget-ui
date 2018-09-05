import React from 'react';
import PropTypes from 'prop-types';

import styles from './empty-widget.css';

const EmptyWidget = ({header, children}) => (
  <div className={styles.empty}>
    <div className={styles.smile}>{header}</div>
    <div className={styles.message}>{children}</div>
  </div>
);

EmptyWidget.propTypes = {
  header: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export const ERROR_FACE = '{{ (>_<) }}';
export const JOY_FACE = '(⌒‿⌒)';
export const OK_FACE = '(・_・)';

export default EmptyWidget;
