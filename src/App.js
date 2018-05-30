import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      messagesGetCurrentPosition: [],
      messages: []
    };
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.handleClickGetCurrentPosition = this.handleClickGetCurrentPosition.bind(
      this
    );
  }

  getPosition(options) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  handleClickGetCurrentPosition() {
    this.getPosition()
      .then(position => {
        this.setState({
          messagesGetCurrentPosition: [
            ...this.state.messagesGetCurrentPosition,
            `Date: ${new Date().toLocaleTimeString()} Latitude: ${
              position.coords.latitude
            } Longitude ${position.coords.longitude} Accuracy ${
              position.coords.accuracy
            }`
          ]
        });
      })
      .catch(err => {
        this.setState({
          messagesGetCurrentPosition: [
            ...this.state.messagesGetCurrentPosition,
            `Erreur code: ${err.code}  message: ${err.message} `
          ]
        });
      });
  }

  success(position) {
    this.setState({
      messages: [
        ...this.state.messages,
        `Date: ${new Date().toLocaleTimeString()} Latitude: ${
          position.coords.latitude
        } Longitude ${position.coords.longitude} Accuracy ${
          position.coords.accuracy
        }`
      ]
    });
    console.log("postion: ", position);
  }

  error(err) {
    this.setState({
      messages: [
        ...this.state.messages,
        `Erreur code: ${err.code}  message: ${err.message} `
      ]
    });
  }

  handleClick() {
    var options = {
      enableHighAccuracy: false,
      timeout: 6000,
      maximumAge: 0
    };
    navigator.geolocation.watchPosition(this.success, this.error, options);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <button onClick={this.handleClickGetCurrentPosition}>
            GPS getCurrentPosition
          </button>
          {this.state.messagesGetCurrentPosition.map((m, i) => (
            <div key={i}>{m}</div>
          ))}
          <br />
          <br />
          <button onClick={this.handleClick}>GPS watchPosition</button>
          <br />
          <br />
          {this.state.messages.map((m, i) => <div key={i}>{m}</div>)}
        </div>
      </div>
    );
  }
}

export default App;
