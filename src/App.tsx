import React, { ComponentProps } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { TabView } from '@components/tab-view/TabView';
import { MainScreen } from '@screens/main-screen/MainScreen';
import { QuotesScreen } from '@screens/quotes-screen/QuotesScreen';
import { COLORS } from '@constants/color';

type TabViewProps = ComponentProps<typeof TabView>;

enum ERoutes {
  MAIN = 'MAIN',
  QUETES = 'QUETES',
}

const ROUTES: TabViewProps['routes'] = [
  { key: ERoutes.MAIN, title: 'О приложении' },
  { key: ERoutes.QUETES, title: 'Катировки' },
];

const ROUTES_MAP: TabViewProps['routesMap'] = {
  [ERoutes.MAIN]: MainScreen,
  [ERoutes.QUETES]: QuotesScreen,
};

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.BLACK_PEARL} />
      <TabView routes={ROUTES} routesMap={ROUTES_MAP} />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
});
