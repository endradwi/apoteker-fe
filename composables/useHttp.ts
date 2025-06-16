// composables/useHttp.ts
import { useCredentialsStore } from "@/stores/credentials";

export default function useHttp() {
  const config = useRuntimeConfig();
  const credentialsStore = useCredentialsStore();
  const token = credentialsStore.token || localStorage.getItem("token");

  const fetcher = $fetch.create({
    baseURL: config.public.apiUrl as string,
    credentials: "omit", // karena kita pakai Authorization, bukan cookie
    headers: {} as Record<string, string>, // <- paksa di sini
    onRequest({ options }) {
      const headers = new Headers();
  
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
  
      options.headers = headers;
    },   
    onResponseError({ response }) {
      if (response.status === 401) {
        console.error("❌ Unauthorized");
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
