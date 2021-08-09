import { getterTypes } from './_types';
import getIsAppBusy from './get-is-app-busy';

export const getters = {
  [getterTypes.isAppBusy]: getIsAppBusy,
};
