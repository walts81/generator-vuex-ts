import { createStore as vuexCreateStore } from 'vuex';
import { modules } from './modules';
import { getDefaultRootState, RootState } from './root-state';
import { storeAccess } from './store-access';

export const createStore = (startingState?: RootState) => {
  if (storeAccess.store !== null) {
    throw new Error('Store already created');
  }

  storeAccess.store = vuexCreateStore({
    state: getDefaultRootState(),
    modules,
  });

  if (!!startingState) {
    storeAccess.store.replaceState(startingState);
  }
  return storeAccess.store;
};

export const updateStore = (state: RootState) => {
  if (storeAccess.store === null) {
    throw new Error('Store has not been initialized');
  }

  const stateToUse = state || getDefaultRootState();
  storeAccess.store.replaceState(stateToUse);
  return storeAccess.store;
};
