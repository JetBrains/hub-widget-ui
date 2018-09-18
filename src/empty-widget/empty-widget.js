import React from 'react';
import PropTypes from 'prop-types';

import styles from './empty-widget.css';

const EmptyWidgetFaces = {
  ERROR: '{{ (>_<) }}',
  JOY: '(⌒‿⌒)',
  HAPPY: '＼(＾▽＾)／',
  OK: '(・_・)'
};

const EmptyWidget = ({face, message, children}) => (
  <div className={styles.empty}>
    {
      face &&
      <div className={styles.face}>
        {face}
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
  face: PropTypes.string,
  message: PropTypes.string,
  children: PropTypes.node
};


export {EmptyWidgetFaces};
export default EmptyWidget;
