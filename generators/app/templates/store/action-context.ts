import { RootState } from './root-state';

export interface ActionContext<State = any> {
  state: State;
  rootState: RootState;
  getters: { [key: string]: any };
  rootGetters: { [key: string]: any };
  commit: <Payload = any>(mutationType: string, payload?: Payload) => void;
  dispatch: <Payload = any, Result = any>(actionType: string, payload?: Payload) => Promise<Result>;
}
