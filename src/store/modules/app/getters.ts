import state from './state';

const gettersOfApp = {
  appLoaded: () => state.appLoaded,
  authToken: () => state.appAccessToken,
  loggedUser: () => state.loggedUser,
  currentProblem: () => state.currentProblem
};

export default gettersOfApp;
