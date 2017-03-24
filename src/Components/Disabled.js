import React from 'react';
import BaseCar from './BaseCar'

export default class Disabled extends BaseCar {
  render() {
    return (
      <div>Disabled = {this.props.counter}</div>
    );
  }
}
