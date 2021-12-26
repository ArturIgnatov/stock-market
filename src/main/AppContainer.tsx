import React, { ComponentProps, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { TabView } from '@components/tab-view/TabView';
import { MainScreen } from '@screens/main-screen/MainScreen';
import { QuotesScreen } from '@screens/quotes-screen/QuotesScreen';
import { COLORS } from '@constants/color';
import { ERoutes } from './enums';
import { AppContainerContext } from './AppContainerContext';

type TabViewProps = ComponentProps<typeof TabView>;

const ROUTES: TabViewProps['routes'] = [
  { key: ERoutes.MAIN, title: 'О приложении' },
  { key: ERoutes.QUETES, title: 'Котировки' },
];

const ROUTES_MAP: TabViewProps['routesMap'] = {
  [ERoutes.MAIN]: MainScreen,
  [ERoutes.QUETES]: QuotesScreen,
};

export const AppContainer = () => {
  const [currentActiveTab, setCurrentActiveTab] = useState<ERoutes>(ERoutes.MAIN);

  const onTabsChanged = (changedTab: ERoutes) => {
    setCurrentActiveTab(changedTab);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.BLACK_PEARL} />
      <AppContainerContext.Provider value={{ currentActiveTab }}>
        <TabView
          routes={ROUTES}
          routesMap={ROUTES_MAP}
          onTabsChanged={data => onTabsChanged(data.key as ERoutes)}
        />
      </AppContainerContext.Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
