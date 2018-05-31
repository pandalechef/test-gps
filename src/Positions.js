import React, { Component } from "react";

export default class Positions extends Component {
  render() {
    console.log(this.props.positions);
    const positions = this.props.positions;
    if (positions.length === 0) {
      return "";
    }
    return (
      <table align="center">
        <thead>
          <tr>
            <th>Heure</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Accuracy</th>
          </tr>
        </thead>
        <tbody>{positions.map((p, i) => PositionLigne(p, i))}</tbody>
      </table>
    );
  }
}

const PositionLigne = (p, index) =>
  p.code && p.message ? (
    <tr key={index}>
      <td>{p.heure}</td>
      <td colSpan={3}>{`Code ${p.code} Message ${p.message}`}</td>
    </tr>
  ) : (
    <tr key={index}>
      <td>{p.heure}</td>
      <td>{p.latitude}</td>
      <td>{p.longitude}</td>
      <td>{p.accuracy}</td>
    </tr>
  );
