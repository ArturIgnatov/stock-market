import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IPollingResponse, RequestPolling } from '@services/request-polling';
import { View } from 'react-native';
import { Subject } from 'rxjs';
import { styles } from './styles';
import { ITikers } from '@models/ticker';
import { QuotesViewer } from './QuotesViewer';
import { AppLoader } from '@components/app-loader/AppLoader';
import Api from '@services/api';

export const QuotesScreen = () => {
  const [quotes, setQuotes] = useState<ITikers | null>(null);
  const [error, setError] = useState(false);

  const destroy$ = useRef(new Subject<void>()).current;

  const eventHandler = useCallback(
    (event: IPollingResponse<ITikers>) => {
      console.log('event', event);
      if (event.message === 'success') {
        if (error) {
          setError(false);
        }
        setQuotes(event.data);
      } else {
        setError(true);
      }
    },
    [error],
  );

  useEffect(() => {
    const subscription$ = RequestPolling.startPolling(
      () => Api.getActualTicker(),
      destroy$,
      3000,
    ).subscribe(eventHandler);

    return () => subscription$.unsubscribe();
  }, [destroy$, eventHandler]);

  return (
    <View style={styles.container}>
      {quotes ? <QuotesViewer {...{ quotes }} /> : <AppLoader />}
    </View>
  );
};
