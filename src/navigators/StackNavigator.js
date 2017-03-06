/* @flow */

import React from 'react';
import createNavigationContainer from '../createNavigationContainer';
import createNavigator from './createNavigator';
import CardStack from '../views/CardStack';
import StackRouter from '../routers/StackRouter';

import type {
  NavigationContainerConfig,
  NavigationStackRouterConfig,
  NavigationStackViewConfig,
  NavigationRouteConfigMap,
} from '../TypeDefinition';

export type StackNavigatorConfig =
  & NavigationContainerConfig
  & NavigationStackViewConfig
  & NavigationStackRouterConfig
  & { router: NavigationRouter };

export default (routeConfigMap: NavigationRouteConfigMap, stackConfig: StackNavigatorConfig = {}) => {
  const {
    containerOptions,
    initialRouteName,
    initialRouteParams,
    paths,
    headerComponent,
    headerMode,
    mode,
    cardStyle,
    onTransitionStart,
    onTransitionEnd,
    navigationOptions,
  } = stackConfig;
  const stackRouterConfig = {
    initialRouteName,
    initialRouteParams,
    paths,
    navigationOptions,
  };
  const router = (typeof stackConfig.router !== 'object')
    ? StackRouter(routeConfigMap, stackRouterConfig)
    : stackConfig.router;
  return createNavigationContainer(createNavigator(router)(props => (
    <CardStack
      {...props}
      headerComponent={headerComponent}
      headerMode={headerMode}
      mode={mode}
      cardStyle={cardStyle}
      onTransitionStart={onTransitionStart}
      onTransitionEnd={onTransitionEnd}
    />
  )), containerOptions);
};
