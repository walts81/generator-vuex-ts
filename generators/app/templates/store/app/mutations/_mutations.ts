import { mutationTypes } from './_types';
import setIsAppBusy from './set-is-app-busy';

const mutations = {
  [mutationTypes.setIsAppBusy]: setIsAppBusy,
};

export { mutationTypes, mutations };
