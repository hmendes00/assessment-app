import { CodingProblem, User } from '@models/index';
import { reactive } from 'vue';

export interface AppState {
  appLoaded: boolean;
  appAccessToken: string;
  loggedUser: User;
  currentProblem?: CodingProblem;
}

const state: AppState = reactive({
  appLoaded: false,
  appAccessToken: '',
  loggedUser: {},
  currentProblem: undefined
});

if (import.meta.env.MODE === 'development') {
  (window as any).appGetters = state;
}

export default state;
