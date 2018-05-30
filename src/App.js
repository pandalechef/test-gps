import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: undefined,
      longitude: undefined,
      error: undefined,
      messages: []
    };
    this.handleClick = this.handleClick.bind(this);
  }
  getPosition(options) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.watchPosition(resolve, reject, options);
    });
  }

  handleClick() {
    var options = {
      enableHighAccuracy: false,
      timeout: 30000,
      maximumAge: 0
    };
    this.getPosition(options)
      .then(location => {
        console.log("latitude: ", location.coords.latitude, " longitude", location.coords.longitude);
        this.setState({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          messages: [
            ...this.state.messages,
            `Date: ${new Date().toLocaleTimeString()} Latitude: ${
              location.coords.latitude
            } Longitude ${location.coords.longitude} Accuracy ${
              location.coords.accuracy
            }`
          ]
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
        {this.state.messages.map((m, i) => <div key={i}>{m}</div>)}
      </div>
    );
  }
}

export default App;
