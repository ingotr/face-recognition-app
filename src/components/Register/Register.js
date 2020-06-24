import React, { PureComponent, Fragment } from "react";

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

export default Register;
