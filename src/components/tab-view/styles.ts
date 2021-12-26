import { COLORS } from '@constants/color';
import { StyleSheet } from 'react-native';

export const TRACK_HEIGHT = 2;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },

  header: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.BLACK_PEARL,
  },

  header__button: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  button__text: {
    fontWeight: '500',
    fontSize: 13,
    color: COLORS.WHITE,
    letterSpacing: 0.4,
  },

  track: {
    height: TRACK_HEIGHT,
    backgroundColor: 'blue',
  },

  track__container: {
    height: TRACK_HEIGHT,
  },

  tabs: {
    flex: 1,
  },

  tab: {
    flex: 1,
  },

  top: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.BLACK_PEARL,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BALTIC_SEA,
    paddingHorizontal: 10,
  },
});
