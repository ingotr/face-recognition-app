import React, { PureComponent, Fragment } from "react";
import PropTypes from 'prop-types';

class Register extends PureComponent {
  render() {
    const { children } = this.props;

    return (
      <Fragment>
        {children}
      </Fragment>
    );
  }
}

Register.propTypes = {
  children: PropTypes.array,
}

export default Register;
