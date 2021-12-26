import React, { FC, memo, useCallback, useEffect, useRef } from 'react';
import { ITicker } from '@models/ticker';
import { Animated } from 'react-native';
import { styles } from './styles';
import { QuoteCell } from '../qoute-cell/QouteCell';
import { COLORS } from '@constants/color';

export const QuoteRow: FC<ITicker & { quoteName: string }> = memo(
  ({ quoteName, percentChange, last, highestBid }) => {
    const animation = useRef(new Animated.Value(0)).current;
    // IT'S PROBLEM
    const isFirstRender = useRef(true);

    const handleAnimation = useCallback(() => {
      Animated.spring(animation, {
        toValue: 1,
        useNativeDriver: false,
      }).start(() => {
        Animated.spring(animation, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      });
    }, [animation]);

    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
      } else {
        handleAnimation();
      }
    }, [quoteName, percentChange, last, highestBid, handleAnimation]);

    const backgroundColor = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [COLORS.BLACK_PERL_RGB, COLORS.DARK_GRAY_RGB],
    });

    return (
      <Animated.View style={[styles.container, { backgroundColor }]}>
        <QuoteCell value={quoteName.replace('_', '/')} fontWeight="700" />
        <QuoteCell value={percentChange} align="center" colorValue={COLORS.GREENLAND} />
        <QuoteCell value={last} align="center" colorValue={COLORS.ORANGE} />
        <QuoteCell value={highestBid} align="flex-end" colorValue={COLORS.GREEN_SEA} />
      </Animated.View>
    );
  },
);
