import React, { PureComponent, Fragment } from "react";

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

export default Signin;
