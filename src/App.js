import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: undefined,
      longitude: undefined,
      error: undefined
    };
    this.handleClick = this.handleClick.bind(this);
  }
  getPosition(options) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  handleClick() {
    this.getPosition()
      .then(location => {
        this.setState({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        });
      })
      .catch(e => this.setState({ error: e.message }));
  }
  render() {
    const { latitude, longitude, error } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.handleClick}>GPS</button>
        <br />
        {latitude && longitude
          ? `Latitude:  ${latitude} Longitude:  ${longitude}`
          : ''}
        {error ? `Erreur ${error}` : ''}
      </div>
    );
  }
}

export default App;
