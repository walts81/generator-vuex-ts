import { ActionContext } from '../../action-context';
import { runAsync } from '../../helpers';
import { <%= moduleNameTitle %>State } from '../state';
import { mutationTypes } from '../mutations/_types';

export default async (ctx: ActionContext<<%= moduleNameTitle %>State>, payload: <%= dataType %>) => {
  await runAsync(() => {
    ctx.commit(mutationTypes.someMutation, payload);
  });
};
