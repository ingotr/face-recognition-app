import React, { Fragment } from 'react';
import Navigation from '../Navigation/Navigation';
import withForm from '../../hocs/withForm';
import Signin from '../Signin/Signin';
import Register from '../Register/Register';
import Logo from '../Logo/Logo';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
import Rank from '../Rank/Rank';
import Background from '../Background/Background';
import FaceRecognition from '../FaceRecognition/FaceRecognition';

import calculateFaceLocation from '../../utils/api';
import './App.css';
import 'tachyons';

const SigninWrapped = withForm(Signin);
const RegisterWrapped = withForm(Register);

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onImageSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    fetch('https://sleepy-garden-13124.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://sleepy-garden-13124.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(
                Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log);
        }
        this.displayFaceBox(calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }

    this.setState({ route: route });
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Background />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange} />
        {route === 'home'
          ? <Fragment>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onImageSubmit={this.onImageSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </Fragment>
          : (
            route === 'signin'
              ? <SigninWrapped
                isRegister={false}
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange}
              />
              : <RegisterWrapped
                isRegister={true}
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange}
              />
          )
        }
      </div>
    );
  }
}

export default App;
