import Vuex, { Store } from "vuex";
import Vue from "vue";
import { getModule } from "vuex-module-decorators";
import Landing, { LandingPageState } from "./pages/LandingPage";
import EditProfile, { EditProfileState } from "./pages/EditProfile";
import CreateProject, { CreateProjectState } from "./pages/CreateProject";
import LoginState, { LoginStateInterface } from "./pages/LoginState";
import StartupPage, { StartupPageState } from "./pages/Startup";
import CreateChallenge, { CreateChallengeState } from "./pages/CreateChallenge";
import { SpinnerState } from "./modules/Spinner";
import { ToastState } from "./modules/Toast";

interface RootState {
  Landing: LandingPageState;
  EditProfile: EditProfileState;
  Spinner: SpinnerState;
  Toast: ToastState;
  CreateProject: CreateProjectState;
  StartupPage: StartupPageState;
  CreateChallenge: CreateChallengeState;
  LoginState: LoginStateInterface;
}

Vue.use(Vuex);

export const store = new Store<RootState>({
  modules: {
    Landing,
    EditProfile,
    CreateProject,
    StartupPage,
    CreateChallenge,
    LoginState,
  },
  actions: {
    nuxtServerInit: () => {},
  },
});
const createStore = (): Store<RootState> => {
  return store;
};
export default createStore;
export const LandingPage = getModule(Landing, store);
export const EditProfilePage = getModule(EditProfile, store);
export const CreateProjectPage = getModule(CreateProject, store);
export const Startup = getModule(StartupPage, store);
export const Challenge = getModule(CreateChallenge, store);
export const Authenticated = getModule(LoginState, store);
