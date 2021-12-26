import { COLORS } from '@constants/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.IMPERIAL,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 20,
    color: COLORS.WHITE,
  },

  subtitle: {
    fontWeight: '300',
    color: COLORS.WHITE,
    textAlign: 'center',
  },
});
