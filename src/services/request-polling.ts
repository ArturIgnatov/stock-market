import { catchError, iif, Observable, of, repeat, switchMap, takeUntil, tap, timer } from 'rxjs';

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
  public static test<T>(
    fn: () => Promise<T>,
    destroyer$: Observable<void>,
    status$: Observable<boolean>,
    pollingTime = 2000,
  ) {
    return status$.pipe(
      switchMap(isPaused =>
        iif(
          () => isPaused === true,
          of(true).pipe(
            switchMap(() =>
              timer(0, pollingTime).pipe(
                switchMap(async () => {
                  const data = await fn();
                  return { message: 'success', data };
                }),
                catchError(err => of({ message: 'error', error: err as unknown })),
                repeat(),
              ),
            ),
          ),
          of(false).pipe(
            tap(() => {
              console.warn('PAUSE');
            }),
          ),
        ),
      ),
      takeUntil(destroyer$),
    );
  }

  public static startPolling<T>(
    fn: () => Promise<T>,
    destroyer$: Observable<void>,
    pollingTime = 2000,
  ): IPollingObservable<T> {
    return timer(0, pollingTime).pipe(
      switchMap<number, Promise<IPollingSuccess<T>>>(async () => {
        const data = await fn();
        return { message: 'success', data };
      }),
      catchError(err => of<IPollingError>({ message: 'error', error: err as unknown })),
      repeat(),
      takeUntil(destroyer$),
    );
  }
}
