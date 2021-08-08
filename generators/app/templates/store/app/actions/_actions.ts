import setAppBusy from './set-app-busy';
import { actionTypes } from './_types';

const actions = {
  [actionTypes.setAppBusy]: setAppBusy,
};

export { actionTypes, actions };
