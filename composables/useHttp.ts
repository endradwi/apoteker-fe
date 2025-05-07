import type { UserSession } from "@/types/user";

/* eslint-disable */
export default function useFetch(request: RequestInfo, opts?: any): Promise<any> {
  const config = useRuntimeConfig();
  const token = useCookie<string>("token", {
    domain: config.public.cookieDomain,
    secure: true,
    sameSite: "none"
  });
  const user = useCookie<UserSession>("user", {
    domain: config.public.cookieDomain,
    secure: true,
    sameSite: "none"
  });
  const defaultOptions = (!opts || (opts && !opts.headers))
    ? { ...opts, headers: {} }
    : opts;
  const {
    headers: customHeaders,
    ...customOptions
  } = defaultOptions;

  const options = {
    onRequest({ request, options }: { request: RequestInfo; options: RequestInit }) {
      options.headers = {
        ...options.headers,
        "Authorization": "Bearer " + token.value,
        "USER_ID": user.value.id,
        ...customHeaders
      }
    },
    onRequestError({ request, options, error }: { request: RequestInfo; options: RequestInit; error: any }) {
      // Handle the request errors
    },
    async onResponse({ request, response, options }: { request: RequestInfo; response: Response; options: RequestInit }) {
      // Process the response data
      return await response;
    },
    onResponseError({ request, response, options }: { request: any; response: any; options: any }) {
      // Handle the response errors
      response._data = typeof response._data === "object" ? response._data : JSON.parse(response._data as string);
    },
    ...customOptions
  }

  if (!(request as string).includes("http")) {
    options.baseURL = config.public.apiBaseUrl;
  }

  return $fetch(request, options);
}
/* eslint-enable */
