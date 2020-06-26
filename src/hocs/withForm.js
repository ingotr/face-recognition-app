import React, { PureComponent } from "react";
import PropTypes from 'prop-types';

const withForm = () => {
  class WithForm extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isRegister: '',
        email: '',
        password: '',
        name: '',
      }
    }

    onNameChange = (event) => {
      this.setState({ name: event.target.value });
    }

    onEmailChange = (event) => {
      this.setState({ email: event.target.value });
    }

    onPasswordChange = (event) => {
      this.setState({ password: event.target.value });
    }

    onSubmitSignIn = (event) => {
      const isRegister = this.props.isRegister;
      const routeRegister = 'register';
      const routeSignin = 'signin';
      event.preventDefault();
      fetch(`https://sleepy-garden-13124.herokuapp.com/${isRegister ? routeRegister : routeSignin}`,
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
            name: isRegister ? this.state.name : ``
          })
        })
        .then(response => response.json())
        .then(user => {
          if (user.id) {
            this.props.loadUser(user);
            this.props.onRouteChange('home');
          }
        })
    }

    render() {
      const { onRouteChange } = this.props;
      const isRegister = this.props.isRegister;
      return (
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
          <main className="pa4 black-80">
            <form className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">
                  {this.props.isRegister ? `Register` : `Sign In`}
                </legend>
                {
                  isRegister
                    ? <div className="mt3">
                      <label className="db fw6 lh-copy f6" htmlFor="Name">Name</label>
                      <input
                        onChange={this.onNameChange}
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                        type="text"
                        name="Name"
                        id="Name"
                      />
                    </div>
                    : null
                }
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                  <input
                    onChange={this.onEmailChange}
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="email-address"
                    id="email-address"
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password </label>
                  <input
                    onChange={this.onPasswordChange}
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="password"
                    name="password"
                    id="password"
                  />
                </div>
              </fieldset>
              <div className="">
                <input
                  onClick={this.onSubmitSignIn}
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value={this.props.isRegister ? `Register` : `Sign In`}
                />
              </div>
              {
                !this.props.isRegister
                  ? <div className="lh-copy mt3">
                    <p
                      onClick={() => onRouteChange('register')}
                      className="f6 link dim black db pointer">Register</p>
                  </div>
                  : null
              }

            </form>
          </main>
        </article>
      );
    }
  }

  WithForm.propTypes = {
    isRegister: PropTypes.bool,
    loadUser: PropTypes.func,
    onRouteChange: PropTypes.func,
  }

  return WithForm;
};

export default withForm;

