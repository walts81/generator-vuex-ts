import { RootState } from '../../root-state';
import { <%= moduleNameTitle %>State } from '../state';
import { getterTypes } from './_types';

export default (
  state: <%= moduleNameTitle %>State,
  getters: { [key: string]: any },
  rootState: RootState,
  rootGetters: { [key: string]: any }
) => {
  return state.something;
};
