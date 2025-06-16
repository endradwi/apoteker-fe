export const useCredentialsStore = defineStore("credentials", {
    state:() =>({
        token: "" as string,
    }),
    actions: {
        async setToken(token: string) {
        
        }
    },
})