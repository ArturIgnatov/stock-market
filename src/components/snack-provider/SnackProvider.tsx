import React, { Component } from 'react';
import { Snack, TFullSnack } from './Snack';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { View as AnimatedView } from 'react-native-animatable';
import { delay, of, Subject, Subscription, takeUntil } from 'rxjs';

interface IState {
  messages: TFullSnack[];
}

export class SnackProvider extends Component<{}, IState> {
  private snackSubscription$ = new Subscription();
  private removeSubscription$ = new Subscription();

  private destroy$ = new Subject<void>();

  constructor(props: {}) {
    super(props);

    this.state = {
      messages: [],
    };
  }

  public componentDidMount() {
    this.snackSubscription$ = Snack.emitter$.pipe(takeUntil(this.destroy$)).subscribe(message => {
      this.setState(prev => ({ messages: [...prev.messages, message] }));
      of(message)
        .pipe(delay(message.duration))
        .subscribe(() => this.removeSnack(message.id));
    });

    this.removeSubscription$ = Snack.removeEmitter$.pipe(takeUntil(this.destroy$)).subscribe(id => {
      if (typeof id === 'string') {
        this.removeSnack(id);
      } else {
        this.setState({ messages: [] });
      }
    });
  }

  public componentWillUnmount() {
    this.destroy$.next();
    this.snackSubscription$.unsubscribe();
    this.removeSubscription$.unsubscribe();
  }

  public removeSnack = (id: string) => {
    if (this.state.messages.some(el => el.id === id)) {
      this.setState(prev => ({ messages: prev.messages.filter(el => el.id !== id) }));
    }
  };

  public render() {
    const { children } = this.props;
    const { messages } = this.state;

    return (
      <View style={styles.container}>
        {children}
        <View style={styles.messages}>
          {messages.map(({ id, text, type }) => (
            <AnimatedView
              key={id}
              useNativeDriver
              duration={270}
              animation="fadeInLeft"
              style={[styles.message, type === 'error' && styles.message__error]}
            >
              <Text style={styles.message__text}>{text}</Text>
            </AnimatedView>
          ))}
        </View>
      </View>
    );
  }
}
