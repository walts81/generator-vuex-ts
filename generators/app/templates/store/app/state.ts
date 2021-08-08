export interface AppState {
  isBusy: boolean;
}

export const getDefaultAppState = (): AppState => ({
  isBusy: false,
});
