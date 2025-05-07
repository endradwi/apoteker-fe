import { defineStore, acceptHMRUpdate } from "pinia"
import { createState } from "~/stores/user/state"
import getters from "~/stores/user/getters"
import actions from "~/stores/user/actions"

export const useUser = defineStore('user', {
  state: createState,
  getters: getters,
  actions: {
    ...actions()
  }
});

// Ensure correct store definition for HMR
if ((import.meta as any).hot) {
  (import.meta as any).hot.accept(acceptHMRUpdate(useUser, (import.meta as any).hot));
}

// export default useUser;
