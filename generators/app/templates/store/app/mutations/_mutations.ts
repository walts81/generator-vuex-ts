import { mutationTypes } from './_types';
import setIsAppBusy from './set-is-app-busy';

export const mutations = {
  [mutationTypes.setIsAppBusy]: setIsAppBusy,
};
