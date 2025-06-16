import Swal from "sweetalert2"

export default defineNuxtRouteMiddleware(async (to) => {
  if (process.server) return  // Hindari SSR

  const tokenFromCookie = useCookie('token')
  const credentialsStore = useCredentialsStore()
  credentialsStore.loadToken() // Memuat token dari localStorage jika ada
  const tokenFromLocalStorage = credentialsStore.token
  
  const isProtected =
    ['/regis', '/history', '/profile'].includes(to.path) || to.path.startsWith('/admin')

  if (!tokenFromLocalStorage || !tokenFromCookie.value && isProtected) {
    await Swal.fire({
      icon: 'warning',
      title: 'Akses Ditolak',
      text: 'Anda harus login terlebih dahulu.',
      timer: 3000,
      showConfirmButton: false,
    })
    return navigateTo('/')
  }

  if (tokenFromLocalStorage || tokenFromCookie.value  && to.path.startsWith('/admin')) {
    const store = useUserStore()
    const data = await store.profile() as { results?: { role_id: number } }
    if (data.results?.role_id !== 1) {
      await Swal.fire({
        icon: 'warning',
        title: 'Akses Ditolak',
        text: 'Halaman hanya untuk admin.',
        timer: 3000,
        showConfirmButton: false,
      })
      return navigateTo('/')
    }
  }
})
