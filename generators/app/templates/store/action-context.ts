import { RootState } from './root-state';

export interface ActionContext<State = any> {
  state: State;
  rootState: RootState;
  getters: { [key: string]: any };
  dispatch: <T = any>(action: string, payload?: T) => Promise<any>;
  commit: <T = any>(mutation: string, payload?: T) => void;
}
