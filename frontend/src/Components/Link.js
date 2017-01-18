import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import classNames from 'classnames';
import styles from './Link.css';

class Link extends Component {

  //
  // Listeners

  @autobind
  onClick(event) {
    const {
      disabled,
      onPress
    } = this.props;

    if (!disabled && onPress) {
      onPress(event);
    }
  }

  //
  // Render

  render() {
    const {
      className,
      component,
      to,
      target,
      disabled,
      ...otherProps
    } = this.props;

    const linkProps = { target };
    let el = component;

    if (to) {
      el = 'a';

      if (to.startsWith('http')) {
        linkProps.href = to;
        linkProps.target = target || '_blank';
      } else if (to.startsWith(window.Sonarr.UrlBase)) {
        linkProps.href = to;
        linkProps.target = target || '_self';
      } else {
        linkProps.href = `${window.Sonarr.UrlBase}/${to}`;
        linkProps.target = target || '_self';
      }
    }

    if (el === 'button' || el === 'input') {
      linkProps.type = otherProps.type || 'button';
      linkProps.disabled = disabled;
    }

    linkProps.className = classNames(
      className,
      styles.link,
      disabled && 'disabled',
      'no-router'
    );

    return (
      React.createElement(el, {
        ...otherProps,
        ...linkProps,
        onClick: this.onClick
      })
    );
  }
}

Link.propTypes = {
  className: PropTypes.string,
  component: PropTypes.string,
  to: PropTypes.string,
  target: PropTypes.string,
  disabled: PropTypes.bool,
  onPress: PropTypes.func
};

Link.defaultProps = {
  component: 'button'
};

export default Link;
