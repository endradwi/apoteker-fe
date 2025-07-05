// composables/useHttp.ts
import { useCredentialsStore } from "@/stores/credentials";

export default function useHttp() {
  const config = useRuntimeConfig();

  const fetcher = $fetch.create({
    baseURL: config.public.apiUrl as string,
    credentials: "omit", // karena kita pakai Authorization, bukan cookie
    headers: {} as Record<string, string>, // <- paksa di sini
    onRequest({ options }) {
      const headers = new Headers();
      
      // Get fresh token on each request
      const credentialsStore = useCredentialsStore();
      const token = credentialsStore.token || localStorage.getItem("token");
  
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
  
      options.headers = headers;
    },   
    onResponseError({ response }) {
      if (response.status === 401) {
        console.error("❌ Unauthorized - Token may be invalid or expired");
        // Clear token on 401 error
        const credentialsStore = useCredentialsStore();
        credentialsStore.clearToken();
      } else if (response.status >= 500) {
        console.error("❌ Server Error:", response.status, response.statusText);
      }
    }
  });

  return {
    get: (url: string, opts?: any) => fetcher(url, { ...opts, method: 'GET' }),
    post: (url: string, body?: any, opts?: any) => fetcher(url, { ...opts, method: 'POST', body }),
    put: (url: string, body?: any, opts?: any) => fetcher(url, { ...opts, method: 'PUT', body }),
    patch: (url: string, body?: any, opts?: any) => fetcher(url, { ...opts, method: 'PATCH', body }),
    del: (url: string, opts?: any) => fetcher(url, { ...opts, method: 'DELETE' }),
  };
}
