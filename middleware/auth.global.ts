import Swal from "sweetalert2"

export default defineNuxtRouteMiddleware(async (to) => {
  const token = useCookie('token')
  const isProtected =
    to.path === '/regis' || to.path === '/history' || to.path === '/profile' || to.path.startsWith('/admin')

  // ⛔ Tidak ada token tapi akses halaman protected
  if (isProtected && !token.value) {
    if (process.client) {
      await Swal.fire({
        icon: 'warning',
        title: 'Akses Ditolak',
        text: 'Anda harus login terlebih dahulu untuk mengakses halaman ini.',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      })
      window.location.href = '/'
    }
    return abortNavigation()
  }

  // ✅ Jika ada token, cek role
  if (token.value && to.path.startsWith('/admin')) {
    const store = useUserStore()
    const data = await store.profile() as { results?: { role_id: number } }

    console.log("data profile=", data)

    if (data?.results?.role_id !== 1) {
      if (process.client) {
        await Swal.fire({
          icon: 'warning',
          title: 'Akses Ditolak',
          text: 'Halaman ini hanya bisa diakses oleh admin.',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        })
        window.location.href = '/'
      }
      return abortNavigation()
    }
  }
})
