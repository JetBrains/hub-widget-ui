import React, {Component} from 'react';
import PropTypes from 'prop-types';

import toSuperDigitsString from '../super-digits/super-digits';

function withWidgetTitleHOC(WrappedComponent) {

  const widgetTitleAsObject = widgetTitle =>
    (typeof widgetTitle === 'string'
      ? {text: widgetTitle, counter: -1, href: null}
      : widgetTitle);

  const shouldTitleUpdate = (currentTitle, prevTitle) => {
    if (!currentTitle || currentTitle === prevTitle) {
      return false;
    }

    const {
      text: oldText, counter: oldCounter, href: oldHref
    } = widgetTitleAsObject(prevTitle || {});
    const {
      text: newText, counter: newCounter, href: newHref
    } = widgetTitleAsObject(currentTitle || {});
    return oldText !== newText || oldCounter !== newCounter || oldHref !== newHref;
  };

  return class WidgetTitle extends Component {

    static propTypes = {
      widgetTitle: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
      ]),
      dashboardApi: PropTypes.object
    };

    static getDerivedStateFromProps(props, state) {
      if (shouldTitleUpdate(props.widgetTitle, state.prevWidgetTitle)) {
        return {
          prevWidgetTitle: props.widgetTitle,
          shouldTitleUpdate: true
        };
      }
      return {
        prevWidgetTitle: state.prevWidgetTitle,
        shouldTitleUpdate: false
      };
    }

    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      const {widgetTitle, ...restProps} = this.props;

      if (this.state.shouldTitleUpdate && restProps.dashboardApi) {
        const {text, counter, href} = widgetTitleAsObject(widgetTitle);

        const superDigitTitlePart = counter != null && counter >= 0
          ? ` ${toSuperDigitsString(counter)}`
          : '';
        restProps.dashboardApi.setTitle(
          `${text}${superDigitTitlePart}`, href
        );
      }

      return (
        <WrappedComponent {...restProps}/>
      );
    }
  };
}

export default withWidgetTitleHOC;
