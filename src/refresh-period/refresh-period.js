import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '@jetbrains/ring-ui/components/tooltip/tooltip';
import {ChevronDownIcon, ChevronUpIcon, TimeIcon} from '@jetbrains/ring-ui/components/icon';
import {i18n} from 'hub-dashboard-addons/dist/localization';

import styles from './refresh-period.css';

const REFRESH_PERIOD_MINUTE = 60; // eslint-disable-line no-magic-numbers

const increaseRefreshPeriod = (seconds, onChange) => () => {
  const newSeconds = seconds + REFRESH_PERIOD_MINUTE;
  onChange(newSeconds);
};

const decreaseRefreshPeriod = (seconds, onChange) => () => {
  if (seconds > REFRESH_PERIOD_MINUTE) {
    const newSeconds = seconds - REFRESH_PERIOD_MINUTE;
    onChange(newSeconds);
  }
};

const RefreshPeriod = ({seconds, onChange, label, tooltip}) => {
  const minutesCount = seconds / REFRESH_PERIOD_MINUTE;

  return (
    <span className={styles.refreshPeriod} data-test="refresh-period-control">
      <Tooltip
        delay={1000}
        popupProps={{top: -4}}
        title={tooltip(minutesCount)}
      >
        <TimeIcon
          size={TimeIcon.Size.Size12}
        />&nbsp;<span data-test="refresh-period-label">{label(minutesCount)}</span>
      </Tooltip>
      <ChevronUpIcon
        onClick={increaseRefreshPeriod(seconds, onChange)}
        className={[styles.button, styles.up].join(' ')}
        size={ChevronUpIcon.Size.Size12}
        color={ChevronUpIcon.Color.BLUE}
        data-test="refresh-period-up"
      />
      <ChevronDownIcon
        onClick={decreaseRefreshPeriod(seconds, onChange)}
        className={[styles.button, styles.down].join(' ')}
        size={ChevronDownIcon.Size.Size12}
        color={ChevronDownIcon.Color.BLUE}
        data-test="refresh-period-down"
      />
    </span>
  );
};

RefreshPeriod.propTypes = {
  seconds: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.func,
  tooltip: PropTypes.func
};

RefreshPeriod.defaultProps = {
  label: minutesCount => i18n(
    '{{minutesCount}} min', {minutesCount}, minutesCount
  ),
  tooltip: minutesCount => (
    minutesCount === 1
      ? i18n('Widget refreshes every minute')
      : i18n('Widget refreshes every {{minutesCount}} minutes', {minutesCount}, minutesCount)
  )
};

export default RefreshPeriod;
