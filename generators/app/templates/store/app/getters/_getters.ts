import { AppState } from '../state';
import { getterTypes } from './_types';

const getters = {
  [getterTypes.isAppBusy]: (state: AppState) => state.isBusy,
};

export { getterTypes, getters };
