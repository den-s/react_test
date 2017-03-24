import React from 'react';

export default class BaseCar extends React.Component {

  static propTypes = {
    counter: React.PropTypes.number,
  }

  render() {
    return (
      <div>Base Car</div>
    );
  }
}
