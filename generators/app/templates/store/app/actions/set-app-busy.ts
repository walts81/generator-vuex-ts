import { ActionContext } from '../../action-context';
import { AppState } from '../state';
import { runAsync } from '../../helpers';
import { mutationTypes } from '../mutations/_types';

let busyCount = 0;

export default async (ctx: ActionContext<AppState>, payload: boolean) => {
  await runAsync(() => {
    if (payload) busyCount++;
    else if (busyCount > 0) busyCount--;

    const isBusy = busyCount > 0;
    if (ctx.state.isBusy !== isBusy) ctx.commit(mutationTypes.setIsAppBusy, isBusy);
  });
};
