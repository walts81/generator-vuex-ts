import { actions } from './actions/_actions';
import { getters } from './getters/_getters';
import { mutations } from './mutations/_mutations';
import { getDefault<%= moduleNameTitle %>State } from './state';

export const <%= moduleNameCamel %> = {
  state: getDefault<%= moduleNameTitle %>State(),
  actions,
  getters,
  mutations,
};
