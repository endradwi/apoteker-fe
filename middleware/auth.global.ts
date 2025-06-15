import Swal from "sweetalert2"

export default defineNuxtRouteMiddleware(async (to) => {
  // if (process.server) return  // ✅ Hindari SSR

  const token = useCookie('token')
  console.log("Cookies from document:", document.cookie)

  console.log("Token from client cookie:", token.value)
  const isProtected =
    to.path === '/regis' || to.path === '/history' || to.path === '/profile' || to.path.startsWith('/admin')

  console.log("token from middleware:", token.value)

  // ⛔ Tidak ada token tapi akses halaman protected
  if (!token.value && isProtected ) {
    await Swal.fire({
      icon: 'warning',
      title: 'Akses Ditolak',
      text: 'Anda harus login terlebih dahulu untuk mengakses halaman ini.',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    })
    return navigateTo('/')
  }

  // ✅ Jika ada token, cek role
  if (token.value && to.path.startsWith('/admin')) {
    const store = useUserStore()
    const data = await store.profile() as { results?: { role_id: number } }
    if (data?.results?.role_id !== 1) {
      await Swal.fire({
        icon: 'warning',
        title: 'Akses Ditolak',
        text: 'Halaman ini hanya bisa diakses oleh admin.',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      })
      return navigateTo('/')
    }
  }
  
})
