import React from 'react';
import BaseCar from './BaseCar';

export default class Truck extends BaseCar {
  render() {
    return (
      <div>Trucks = {this.props.counter}</div>
    );
  }
}

