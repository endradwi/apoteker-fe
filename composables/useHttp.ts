// composables/useHttp.ts
import type { UserSession } from "@/types/user";

export default function useHttp() {
  const config = useRuntimeConfig();

  // Hanya ambil user ID untuk header tambahan (tidak wajib jika backend tidak perlu)
  const user = useCookie<UserSession>("user", {
    domain: config.public.cookieDomain as string,
    secure: true,
    sameSite: "none"
  });

  const fetcher = $fetch.create({
    baseURL: config.public.apiUrl as string,
    credentials: "include", // ini penting agar browser kirim cookie
    onRequest({ options }) {
      options.headers = {
        ...options.headers,
        // Authorization tidak diperlukan karena token sudah di cookie
        // USER_ID bisa dihilangkan jika tidak digunakan oleh backend
        // USER_ID: user.value?.id || '',
      };
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
