import { Store } from 'vuex';
import { RootState } from './root-state';

interface StoreAccess {
  store: Store<RootState>;
}

export const storeAccess: StoreAccess = {
  store: null as any,
};
