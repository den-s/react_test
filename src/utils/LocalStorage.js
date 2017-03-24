export default class LS {
  static set = (key, data) => {
    try {
      switch (typeof data) {
          case 'object':
            localStorage.setItem(key, JSON.stringify(data));
            break;
          case 'string':
            localStorage.setItem(key, data);
            break;
          case 'number':
            localStorage.setItem(key, toString(data));
            break;
          default: false
      }
    } catch (e) {
        return false;
    }
    return true;
  }
  static get = (key) => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return false;
    }
  }
}
