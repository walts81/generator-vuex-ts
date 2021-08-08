import { AppState, getDefaultAppState } from './app/state';

export interface RootState {
  app: AppState;
}

export const getDefaultRootState = (): RootState => ({
  app: getDefaultAppState(),
});
