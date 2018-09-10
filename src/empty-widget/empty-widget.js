import React from 'react';
import PropTypes from 'prop-types';

import styles from './empty-widget.css';

const EmptyWidgetSmiles = {
  ERROR: '{{ (>_<) }}',
  JOY: '(⌒‿⌒)',
  OK: '(・_・)'
};

const EmptyWidget = ({smile, message, children}) => (
  <div className={styles.empty}>
    {
      smile &&
      <div className={styles.smile}>
        {smile}
      </div>
    }
    {
      message &&
      <div className={styles.message}>
        {message}
      </div>
    }
    {
      children &&
      <div className={styles.additionalContent}>
        {children}
      </div>
    }
  </div>
);

EmptyWidget.propTypes = {
  smile: PropTypes.string,
  message: PropTypes.string,
  children: PropTypes.node
};


export default EmptyWidget;

export {EmptyWidgetSmiles};
