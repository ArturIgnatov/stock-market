import { COLORS } from '@constants/color';
import React, { createRef, FC, memo, ComponentType, useRef, useMemo } from 'react';
import {
  Animated,
  FlatList,
  Text,
  TouchableHighlight,
  useWindowDimensions,
  View,
  ViewabilityConfigCallbackPair,
  ViewToken,
  Easing,
} from 'react-native';
import { styles } from './styles';

interface IProps<T = object> {
  routes: IRoute[];
  routesMap: { [key: IProps['routes'][0]['key']]: ComponentType<T> };
  indicatorColor?: string;
  onTabsChanged?: (prevTab: { index: number; key: IProps['routes'][0]['key'] }) => void;
}

interface IRoute {
  key: string;
  title: string;
}

export const TabView: FC<IProps> = memo(
  ({ routes, routesMap, indicatorColor = COLORS.CLEAR_CHILL, onTabsChanged }) => {
    const { width } = useWindowDimensions();
    const fatListPagesRef = createRef<FlatList<[string, React.ComponentType<object>]>>();
    const fatListButtonsRef = createRef<FlatList<IRoute>>();
    const trackX = useRef(new Animated.Value(0)).current;
    const currentIndex = useRef(0);

    const runTrackAnimation = (index: number) => {
      const position = (width / routes.length) * index;
      Animated.timing(trackX, {
        toValue: position,
        duration: 150,
        delay: 0,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    };

    const onViewableItemsChanged = ({
      viewableItems,
    }: {
      viewableItems: Array<ViewToken>;
      changed: Array<ViewToken>;
    }) => {
      if (viewableItems.length === 1) {
        const nextRoute = viewableItems[0];
        if (nextRoute.index !== null) {
          const { index, key } = nextRoute;
          currentIndex.current = index;
          runTrackAnimation(index);
          onTabsChanged?.({ index, key });
        }
      }
    };

    const viewabilityConfig: ViewabilityConfigCallbackPair['viewabilityConfig'] = {
      viewAreaCoveragePercentThreshold: 0.5,
      waitForInteraction: true,
    };

    const viewabilityConfigCallbackPairs = useRef<ViewabilityConfigCallbackPair[]>([
      { viewabilityConfig, onViewableItemsChanged },
    ]);

    const setPage = (index: number, key: string) => {
      currentIndex.current = index;
      runTrackAnimation(index);
      fatListPagesRef.current?.scrollToIndex({ index });
      fatListButtonsRef.current?.scrollToIndex({ index });
      onTabsChanged?.({ index, key });
    };

    const renderData = useMemo(() => {
      return Object.entries(routesMap);
    }, [routesMap]);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <FlatList
            ref={fatListButtonsRef}
            horizontal
            scrollEventThrottle={16}
            renderToHardwareTextureAndroid
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            data={routes}
            keyExtractor={item => item.key}
            renderItem={({ item, index }) => (
              <TouchableHighlight
                style={[styles.header__button, { width: width / routes.length }]}
                onPress={() => setPage(index, item.key)}
                underlayColor={COLORS.UNDERLAY}
              >
                <Text style={styles.button__text}>{item.title}</Text>
              </TouchableHighlight>
            )}
          />
          <View style={[styles.track__container, { width }]}>
            <Animated.View
              style={[
                styles.track,
                {
                  transform: [{ translateX: trackX }],
                  width: width / routes.length,
                  backgroundColor: indicatorColor,
                },
              ]}
            />
          </View>
        </View>
        <View style={styles.tabs}>
          <FlatList
            data={renderData}
            ref={fatListPagesRef}
            horizontal
            renderToHardwareTextureAndroid
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            pagingEnabled
            nestedScrollEnabled
            keyExtractor={item => item[0]}
            viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
            renderItem={({ item: [_, item] }) => <Tab component={item} {...{ width }} />}
          />
        </View>
      </View>
    );
  },
);

const Tab: FC<{ width: number; component: React.ComponentType<object> }> = memo(
  ({ component, width }) => {
    return <View style={{ width }}>{React.createElement(component)}</View>;
  },
);
