import React from 'react';
import { Disabled, Sedan, Truck } from "../Components";

import LS from '../utils/LocalStorage';

export default class Parking extends React.Component {

  constructor() {
    super();
    this.types = ['disabled', 'sedan', 'truck']

    this.defaultPlaces = {
      disabled: 5,
      truck: 10,
      sedan: 25
    }

    this.currentPlaces = {
      ...this.defaultPlaces
    }

    this.state = {places: []};
  }

  _calculateFreePlaces = () => {
    const { places } = this.state;
    this.types.map(t => {
      this.currentPlaces[t] = this.defaultPlaces[t] - places.filter(p => p.placeType === t).length;
    })
    this.forceUpdate();
  }

  _addCar = (id, carType, placeType) => {
    const { places } = this.state;
    this.setState({
      places: [...places, {id: id, placeType: placeType, carType: carType}]
    }, () => {
      LS.set('places', places);
      this._calculateFreePlaces();
    });
    return true;
  }

  _getCar = (id) => {
    const { places } = this.state;
    this.setState({
      places: places.filter(p => p.id !== id)
    }, () => {
      LS.set('places', places);
      this._calculateFreePlaces();
    });
  }

  _addDisabled = (id) => {
    if (this.currentPlaces.disabled > 0) {
      return this._addCar(id, 'disabled', 'disabled');
    } else if (this.currentPlaces.sedan > 0) {
      return this._addCar(id, 'disabled', 'sedan');
    } else if (this.currentPlaces.truck > 0) {
      return this._addCar(id, 'disabled', 'truck');
    } else {
      return false;
    }
  }

  _addSedan = (id) => {
    if (this.currentPlaces.sedan > 0) {
      return this._addCar(id, 'sedan', 'sedan');
    } else if (this.currentPlaces.truck > 0) {
      return this._addCar(id, 'sedan', 'truck');
    } else {
      return false;
    }
  }

  _addTruck = (id) => {
    if (this.currentPlaces.truck > 0) {
      return this._addCar(id, 'truck', 'truck');
    } else {
      return false;
    }
  }

  _calculateIndex = () => {
    const { places } = this.state;
    if (Object.keys(places).length > 0) {
      return places.sort((a, b) => a.id < b.id)[0].id;
    }
    return 0;
  }

  getFreeSlots = () => {
    return this.currentPlaces;
  }

  addCar = (carType) => {
    const _id = this._calculateIndex() + 1;
    switch(carType) {
        case 'disabled': this._addDisabled(_id);
        break;
        case 'sedan': this._addSedan(_id);
        break;
        case 'truck': this._addTruck(_id);
        break;
        default: return false;
    }
    return {id: _id};
  }

  getCar = (id) => {
    const { places } = this.state;
    console.info(places.find(p => p.id === id));
    this._getCar(id);
  }

  componentWillMount() {
    window.parking = {
      getFreeSlots: this.getFreeSlots,
      addCar: this.addCar,
      getCar: this.getCar,
    }

    this.setState({
      places: LS.get('places') || []
    }, () => {
      this._calculateFreePlaces();
    });
  }

  render() {
    const { disabled, sedan, truck } = this.currentPlaces;
    return (
      <div>
        <Disabled counter={disabled} />
        <Sedan counter={sedan}/>
        <Truck counter={truck}/>
      </div>
    );
  }
}
