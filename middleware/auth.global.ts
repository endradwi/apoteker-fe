export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('token')
  const isProtected =
    to.path === '/regis' || to.path.startsWith('/admin')

  if (isProtected && !token.value) {
    return navigateTo('/')
  }
})