import React, { PureComponent } from 'react';
import { IPollingResponse, RequestPolling } from '@services/request-polling';
import { View } from 'react-native';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { styles } from './styles';
import { ITikers } from '@models/ticker';
import { QuotesViewer } from './QuotesViewer';
import { AppLoader } from '@components/app-loader/AppLoader';
import { Snack } from '@components/snack-provider/Snack';
import { AppContainerContext } from '../../main/AppContainerContext';
import { ERoutes } from '../../main/enums';
import Api from '@services/api';

interface IState {
  quotes: ITikers | null;
}

export class QuotesScreen extends PureComponent<{}, IState> {
  declare context: React.ContextType<typeof AppContainerContext>;
  private subscription$ = new Subscription();
  private destroy$ = new Subject<void>();
  private pause$ = new BehaviorSubject<boolean>(true);
  private errorMessageId = '';
  private previousContext = this.context;

  constructor(props: {}) {
    super(props);

    this.state = {
      quotes: null,
    };
  }

  public componentDidMount() {
    this.subscription$ = RequestPolling.startPolling(
      () => Api.getActualTicker(),
      this.destroy$,
      5000,
      this.pause$,
    ).subscribe(this.eventHandler);
  }

  public componentWillUnmount() {
    this.subscription$.unsubscribe();
  }

  public componentDidUpdate() {
    const { currentActiveTab } = this.context;
    if (currentActiveTab !== this.previousContext?.currentActiveTab) {
      this.pause$.next(currentActiveTab !== ERoutes.QUETES);
    }

    this.previousContext = this.context;
  }

  public eventHandler = (event: IPollingResponse<ITikers>) => {
    console.log('EVENT', event);
    if (event.message === 'success') {
      if (this.errorMessageId) {
        Snack.remove(this.errorMessageId);
      }
      this.setState({ quotes: event.data });
    } else {
      console.log('Error', event.error);
      const message = Snack.show({ text: 'Error', type: 'error' });
      this.errorMessageId = message.id;
    }
  };

  public render(): React.ReactNode {
    const { quotes } = this.state;

    return (
      <View style={styles.container}>
        {quotes ? <QuotesViewer {...{ quotes }} /> : <AppLoader />}
      </View>
    );
  }
}

QuotesScreen.contextType = AppContainerContext;
