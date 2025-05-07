import { defineStore, acceptHMRUpdate } from "pinia"
import { createState } from "~/stores/home/state"
import getters from "~/stores/home/getters"
import actions from "~/stores/home/actions"

const useHome = defineStore('home', {
  state: createState,
  getters: getters,
  actions: {
    ...actions()
  }
});

// Ensure correct store definition for HMR
if ((import.meta as any).hot) {
  (import.meta as any).hot.accept(acceptHMRUpdate(useHome, (import.meta as any).hot));
}

export default useHome;
