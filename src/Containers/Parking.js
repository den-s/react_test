import React from 'react';
import { Sedan, Truck } from "../Components";

export default class Parking extends React.Component {
  render() {
    return (
      <div>
        <Sedan/>
        <Truck/>
      </div>
    );
  }
}
