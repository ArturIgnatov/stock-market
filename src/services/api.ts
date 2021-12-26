import { ITicker } from '@models/ticker';
import axios from 'axios';

class Api {
  public async getActualTicker() {
    try {
      return (
        await axios.get<{ [key: string]: ITicker }>(
          'https://poloniex.com/public?command=returnTicker',
        )
      ).data;
    } catch (e) {
      throw e;
    }
  }

  public fakePromise(delayTime = 1000) {
    return new Promise<string>((resolve, reject) => {
      console.log('START NEW PROMISE');
      setTimeout(() => {
        if (Math.random() < 0.5) {
          reject('ERROR');
        } else {
          resolve('SUCCESS');
        }
      }, delayTime);
    });
  }
}

export default new Api();
