import {Component} from 'react';
import PropTypes from 'prop-types';

import toSuperDigitsString from '../super-digits/super-digits';

class WidgetTitle extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    counter: PropTypes.number,
    href: PropTypes.string,
    dashboardApi: PropTypes.object.isRequired
  };

  shouldComponentUpdate(nextProps) {
    if (this.props === nextProps) {
      return false;
    }

    const {title: oldTitle, counter: oldCounter, href: oldHref} = this.props;
    const {title: newTitle, counter: newCounter, href: newHref} = nextProps;
    return oldTitle !== newTitle || oldCounter !== newCounter || oldHref !== newHref;
  }

  render() {
    const {title, counter, href, dashboardApi} = this.props;
    dashboardApi.setTitle(
      `${title} ${counter != null && counter >= 0 ? toSuperDigitsString(counter) : ''}`,
      href
    );
    return '';
  }
}

export default WidgetTitle;
