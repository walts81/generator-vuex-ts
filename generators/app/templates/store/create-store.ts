<% if (vuexVersion == '4') { %>import { createStore as vuexCreateStore } from 'vuex';<% } else { %>import Vue from 'vue';
import Vuex from 'vuex';<% } %>
import { modules } from './modules';
import { getDefaultRootState, RootState } from './root-state';
import { storeAccess } from './store-access';
<% if (vuexVersion == '3') { %>
Vue.use(Vuex);
<% } %>
export const createStore = (startingState?: RootState) => {
  if (storeAccess.store !== null) {
    throw new Error('Store already created');
  }

  storeAccess.store = <% if (vuexVersion == '4') { %>vuexCreateStore({<% } else { %>new Vuex.Store({<% } %>
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
