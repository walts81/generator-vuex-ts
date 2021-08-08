import { AppState } from '../state';

export default (state: AppState, payload: boolean) => {
  state.isBusy = payload;
};
