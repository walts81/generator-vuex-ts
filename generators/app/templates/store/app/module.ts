import { actions } from './actions/_actions';
import { getters } from './getters/_getters';
import { mutations } from './mutations/_mutations';
import { getDefaultAppState } from './state';

export const app = {
  state: getDefaultAppState(),
  actions,
  getters,
  mutations,
};
