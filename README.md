## Public methods:
# window.parking.methods:
- getFreeSlots()
- addCar(disabled | sedan | truck)
- getCar(id)

# simple random script, paste it into console:
```javascript
setInterval(() => {
  const types = ['disabled', 'sedan', 'truck'];
  const carType = types[Math.floor(Math.random() * types.length)];
  window.parking.addCar(carType);
  console.log(carType)
}, 500)
```
