// composables/useHttp.ts
import type { UserSession } from "@/types/user";

export default function useHttp() {
  const config = useRuntimeConfig();
  const token = useCookie<string>("token", {
    domain: config.public.cookieDomain as string,
    secure: true,
    sameSite: "none"
  });
  console.log("Token:", token.value);
  const user = useCookie<UserSession>("user", {
    domain: config.public.cookieDomain as string,
    secure: true,
    sameSite: "none"
  });

  const fetcher = $fetch.create({
    baseURL: config.public.apiUrl as string,
    credentials: "include",
    onRequest({ options }) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token.value}`,
        USER_ID: user.value?.id || '',
      };
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        console.error("Unauthorized");
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
