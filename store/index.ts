import Vuex, { Store } from "vuex";
import Vue from "vue";
interface RootState {}
Vue.use(Vuex);
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
