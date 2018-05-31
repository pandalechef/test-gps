import React, { Component } from "react";
import logo from "./logo.svg";
import spinner from "./oval.svg";
import "./App.css";
import Positions from "./Positions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      messagesGetCurrentPosition: [],
      messagesWatchPosition: []
    };
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.handleClickWatchPosition = this.handleClickWatchPosition.bind(this);
    this.handleClickGetCurrentPosition = this.handleClickGetCurrentPosition.bind(
      this
    );
  }

  options = {
    enableHighAccuracy: false,
    timeout: 20000,
    maximumAge: 0
  };

  getPosition(options) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  handleClickGetCurrentPosition() {
    this.setState({ isLoading: true });
    this.getPosition(this.options)
      .then(position => {
        this.setState({
          isLoading: false,
          messagesGetCurrentPosition: [
            ...this.state.messagesGetCurrentPosition,
            {
              heure: new Date().toLocaleTimeString(),
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy
            }
          ]
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false,
          messagesGetCurrentPosition: [
            ...this.state.messagesGetCurrentPosition,
            {
              heure: new Date().toLocaleTimeString(),
              code: err.code,
              message: err.message
            }
          ]
        });
      });
  }

  success(position) {
    this.setState({
      messagesWatchPosition: [
        ...this.state.messagesWatchPosition,
        {
          heure: new Date().toLocaleTimeString(),
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        }
      ]
    });
  }

  error(err) {
    this.setState({
      messagesWatchPosition: [
        ...this.state.messagesWatchPosition,
        {
          heure: new Date().toLocaleTimeString(),
          code: err.code,
          message: err.message
        }
      ]
    });
  }

  handleClickWatchPosition() {
    navigator.geolocation.watchPosition(this.success, this.error, this.options);
  }

  render() {
    const {
      messagesGetCurrentPosition,
      messagesWatchPosition,
      isLoading
    } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Test du GPS</h1>
        </header>
        <div>
          <br />
          <div>
            <button onClick={this.handleClickGetCurrentPosition}>
              GPS avec getCurrentPosition
            </button>
            {isLoading && <img src={spinner} alt="logo" />}
          </div>

          <br />
          <Positions positions={messagesGetCurrentPosition} />
          <br />
          <button onClick={this.handleClickWatchPosition}>
            GPS avec watchPosition
          </button>
          <br />
          <br />
          <Positions positions={messagesWatchPosition} />
        </div>
      </div>
    );
  }
}

export default App;
