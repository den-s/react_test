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

    const places = LS.get('places');
    this.state = {places: places || []};
  }

  _calculateFreePlaces = () => {
    const { places } = this.state;
    this.types.map(t => {
      this.currentPlaces[t] = this.defaultPlaces[t] - places.filter(p => p.placeType === t).length;
    })
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

  getFreeSlots = () => {
    return this._calculateFreePlaces();
  }

  getBusySlots = (carType) => {
    return `busy for ${carType}`;
  }

  _calculateIndex = () => {
    const { places } = this.state;
    if (Object.keys(places).length > 0) {
      return places.sort((a, b) => a.id < b.id)[0].id;
    }
    return 0;
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
    }
    return {id: _id};
  }

  getCar = (id) => {
    const { places } = this.state;
    this._getCar(id);
  }

  componentWillMount() {
    window.parking = {
      getFreeSlots: this.getFreeSlots,
      getBusySlots: this.getBusySlots,
      addCar: this.addCar,
      getCar: this.getCar,
    }

    // LS.set('places', [
      // {id: 0, carType: 'truck', placeType: 'truck'},
      // {id: 1, carType: 'sedan', placeType: 'truck'},
      // {id: 2, carType: 'disabled', placeType: 'sedan'},
      // {id: 3, carType: 'sedan', placeType: 'sedan'},
      // {id: 4, carType: 'truck', placeType: 'truck'},
      // {id: 5, carType: 'sedan', placeType: 'sedan'},
    // ])
    this._calculateFreePlaces();
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
