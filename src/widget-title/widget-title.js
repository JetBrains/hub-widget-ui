import React, {Component} from 'react';
import PropTypes from 'prop-types';

import toSuperDigitsString from '../super-digits/super-digits';

function withWidgetTitleHOC(WrappedComponent) {

  const widgetTitleAsObject = widgetTitle =>
    (typeof widgetTitle === 'string'
      ? {text: widgetTitle, counter: -1, href: null}
      : widgetTitle);

  const shouldTitleUpdate = (currentTitle, prevTitle) => {
    if (currentTitle === prevTitle) {
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

    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      const {widgetTitle, ...restProps} = this.props;

      if (widgetTitle && shouldTitleUpdate(widgetTitle, this.state.prevWidgetTitle)) {
        if (restProps.dashboardApi) {
          const {text, counter, href} = widgetTitleAsObject(widgetTitle);

          const superDigitTitlePart = counter != null && counter >= 0
            ? ` ${toSuperDigitsString(counter)}`
            : '';
          restProps.dashboardApi.setTitle(
            `${text}${superDigitTitlePart}`, href
          );
        }
        this.setState({prevWidgetTitle: widgetTitle});
      }

      return (
        <WrappedComponent {...restProps}/>
      );
    }
  };
}

export default withWidgetTitleHOC;
