import { <%= moduleNameTitle %>State } from '../state';

export default (state: <%= moduleNameTitle %>State, payload: <%= dataType %>) => {
  state.something = payload;
};
