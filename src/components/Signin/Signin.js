import React, { PureComponent, Fragment } from "react";
import PropTypes from 'prop-types';

class Signin extends PureComponent {
  render() {
    const { children } = this.props;

    return (
      <Fragment>
        {children}
      </Fragment>
    );
  }
}

Signin.propTypes = {
  children: PropTypes.array,
}

export default Signin;
