import React, { FC, memo, useEffect, useRef } from 'react';
import { COLORS } from '@constants/color';
import { View, ViewStyle, TextStyle, Animated } from 'react-native';
import { styles } from './styles';

interface IProps {
  value: string | number;
  align?: ViewStyle['alignItems'];
  colorValue?: string;
  fontWeight?: TextStyle['fontWeight'];
}

export const QuoteCell: FC<IProps> = memo(
  ({ value, align, colorValue = COLORS.WHITE, fontWeight = '500' }) => {
    const scale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
      Animated.spring(scale, {
        toValue: 1.2,
        useNativeDriver: true,
      }).start(() => {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
      });
    }, [scale, value]);

    return (
      <View style={[styles.row, { alignItems: align }]}>
        <Animated.Text
          style={[styles.row__text, { transform: [{ scale }], color: colorValue, fontWeight }]}
        >
          {value}
        </Animated.Text>
      </View>
    );
  },
);
