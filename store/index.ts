import Vuex, { Store } from "vuex";

interface RootState {}

export const store = new Vuex.Store<RootState>({
  actions: {
    nuxtServerInit: async () => {
      // await Technologies.fetch();
    },
  },
});
const createStore = (): Store<RootState> => {
  return store;
};
export default createStore;
