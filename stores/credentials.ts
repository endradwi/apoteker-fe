export const useCredentialsStore = defineStore("credentials", {
    state: () => ({
      token: "" as string,
    }),
    actions: {
      setToken(token: string) {
        this.token = token;
        localStorage.setItem("token", token); // optional: persist
      },
      loadToken() {
        const token = localStorage.getItem("token");
        if (token) {
          this.token = token;
        }
      },
      clearToken() {
        this.token = "";
        localStorage.removeItem("token");
      },
    },
  });
  