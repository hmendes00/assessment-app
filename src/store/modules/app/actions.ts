import { PlatformService } from './../../../services/platform-service';
/* eslint-disable @typescript-eslint/no-use-before-define */
import ToguroUserService from '@/services/user-service';
import appCommitter, { AppMutationTypes } from './mutations';

export enum AppActionTypes {
  SETUP_APP = 'APP - SETUP_APP',
  GET_LOGGED_USER = 'APP - GET_LOGGED_USER',
  GET_CODING_PROBLEM = 'APP - GET_CODING_PROBLEM'
}

const actionOfApp = {
  /**
   *  Get user credentials
   */
  async [AppActionTypes.SETUP_APP]() {
    await appDispatcher(AppActionTypes.GET_LOGGED_USER);
    appCommitter(AppMutationTypes.SET_APP_LOADED_STATE, true);
  },
  /**
   *  Get logged user info
   */
  async [AppActionTypes.GET_LOGGED_USER]() {
    const user = await ToguroUserService.getLoggedUser();
    appCommitter(AppMutationTypes.SET_LOGGED_USER, user);
  },

  async [AppActionTypes.GET_CODING_PROBLEM]() {
    const codingProblem = await PlatformService.getCodingProblem();
    appCommitter(AppMutationTypes.SET_CURRENT_PROBLEM, codingProblem);
  }
};

// all AppActionTypes needs to be in actionsOfApp
function appDispatcher<T extends AppActionTypes, K extends Parameters<typeof actionOfApp[T]>>(
  action: T,
  payload?: K[0]
) {
  if (import.meta.env.MODE === 'development') {
    console.debug(action, payload);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  //@ts-ignore
  actionOfApp[action](payload);
}

export default appDispatcher;
