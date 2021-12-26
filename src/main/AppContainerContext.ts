import { createContext } from 'react';
import { ERoutes } from './enums';

interface IAppContainerContext {
  currentActiveTab: ERoutes;
}

export const AppContainerContext = createContext({} as IAppContainerContext);
