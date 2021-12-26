import { catchError, NEVER, Observable, of, repeat, switchMap, takeUntil, timer } from 'rxjs';

type IPollingObservable<T> = Observable<IPollingResponse<T>>;
export type IPollingResponse<T> = IPollingSuccess<T> | IPollingError;

interface IPollingSuccess<T> {
  message: 'success';
  data: Awaited<T>;
}

interface IPollingError {
  message: 'error';
  error: unknown;
}

export class RequestPolling {
  public static startPolling<T>(
    fn: () => Promise<T>,
    destroyer$: Observable<void>,
    pollingTime = 5000,
    pause$?: Observable<boolean>,
  ): IPollingObservable<T> {
    const timerObsereble = timer(0, pollingTime).pipe(
      switchMap<number, Promise<IPollingSuccess<T>>>(async () => {
        const data = await fn();
        return { message: 'success', data };
      }),
      catchError(err => of<IPollingError>({ message: 'error', error: err as unknown })),
      takeUntil(destroyer$),
      repeat(),
    );

    return pause$
      ? pause$.pipe(
          switchMap(isPaused => (isPaused ? NEVER : timerObsereble)),
          takeUntil(destroyer$),
        )
      : timerObsereble;
  }
}
