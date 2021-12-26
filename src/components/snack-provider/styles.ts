import { COLORS } from '@constants/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.TRANSPARENT,
  },

  messages: {
    width: '100%',
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 0,
    zIndex: 100,
    paddingBottom: 10,
  },

  message: {
    width: '100%',
    height: 40,
    borderRadius: 6,
    marginBottom: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: COLORS.CLEAR_CHILL,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  message__text: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.WHITE,
  },

  message__error: {
    backgroundColor: COLORS.WATERMELON,
  },
});
