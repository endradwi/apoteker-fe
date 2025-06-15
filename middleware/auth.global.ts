import Swal from "sweetalert2"

export default defineNuxtRouteMiddleware(async (to) => {
  if (process.server) return  // Hindari SSR

  const token = useCookie('token', {
    sameSite: 'none',
    secure: true,
  })
  console.log("Cek Token:", document.cookie.includes('token='))
  console.log("Token from client cookie:", token.value)

  const isProtected =
    ['/regis', '/history', '/profile'].includes(to.path) || to.path.startsWith('/admin')

  if (!token.value && isProtected) {
    await Swal.fire({
      icon: 'warning',
      title: 'Akses Ditolak',
      text: 'Anda harus login terlebih dahulu.',
      timer: 3000,
      showConfirmButton: false,
    })
    return navigateTo('/')
  }

  if (token.value && to.path.startsWith('/admin')) {
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
