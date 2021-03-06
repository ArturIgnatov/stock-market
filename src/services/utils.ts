import { Platform } from 'react-native';

class Utils {
  public getRandomHEXColor() {
    return `#${Math.floor(Math.random() * 0xfffff * 1000000)
      .toString(16)
      .slice(0, 6)}`;
  }

  public getRandomId() {
    return Math.random().toString(36).slice(2, 10);
  }

  public isAnroid() {
    return Platform.OS === 'android';
  }

  public isIOS() {
    return Platform.OS === 'ios';
  }
}

export default new Utils();
