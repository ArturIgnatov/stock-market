import { COLORS } from '@constants/color';
import { StyleSheet } from 'react-native';

export const ROW_HEIGHT = 50;

export const styles = StyleSheet.create({
  container: {
    height: ROW_HEIGHT,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.BLACK_PEARL,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BALTIC_SEA,
    paddingHorizontal: 10,
  },

  text: {
    fontSize: 10,
    fontWeight: '500',
  },

  row: {
    width: '25%',
    borderWidth: 1,
  },
});
