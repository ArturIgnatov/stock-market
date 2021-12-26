import Utils from '@services/utils';
import { Subject } from 'rxjs';

export interface ISnack {
  text: string;
  type: 'info' | 'error';
}

export type TFullSnack = ISnack & { duration: number; id: string };

const DEFAULT_SNACK: TFullSnack = {
  text: 'Ok',
  type: 'info',
  id: Utils.getRandomId(),
  duration: 3000,
};

export class Snack {
  public static readonly emitter$ = new Subject<TFullSnack>();
  public static readonly removeEmitter$ = new Subject<string | void>();

  public static clear() {
    this.removeEmitter$.next();
  }

  public static remove(id: string) {
    this.removeEmitter$.next(id);
  }

  public static show(settings: Partial<ISnack>) {
    const newSnack: TFullSnack = { ...DEFAULT_SNACK, ...settings, id: Utils.getRandomId() };
    this.emitter$.next(newSnack);
    return newSnack;
  }
}
