import Swal from "sweetalert2"

export default defineNuxtRouteMiddleware(async (to) => {
  if (process.server) return  // Hindari SSR

  const tokenFromCookie = useCookie('token')
  const credentialsStore = useCredentialsStore()
  credentialsStore.loadToken() // Memuat token dari localStorage jika ada
  const tokenFromLocalStorage = credentialsStore.token
  const store = useUserStore()
    const data = await store.profile() as { results?: { role_id: number } }
  
  const isProtected =
    ['/regis', '/history', '/profile'].includes(to.path) || to.path.startsWith('/admin')
    const isProtectedWithoutAdmin = ['/', '/regis', '/history', '/profile'].includes(to.path)
// Jika Domai sama gunakan cookie
  if (!tokenFromLocalStorage && isProtected) { 
    await Swal.fire({
      icon: 'warning',
      title: 'Akses Ditolak',
      text: 'Anda harus login terlebih dahulu.',
      timer: 3000,
      showConfirmButton: false,
      timerProgressBar: true,
    })
    return navigateTo('/')
  }

  if (tokenFromLocalStorage && to.path.startsWith('/admin')) {
    const store = useUserStore()
    const data = await store.profile() as { results?: { role_id: number } }
    console.log('Token dari localStorage:', tokenFromLocalStorage)
    console.log('Data dari middleware:', data)
    if (data.results?.role_id !== 1) {
      await Swal.fire({
        icon: 'warning',
        title: 'Akses Ditolak',
        text: 'Halaman hanya untuk admin.',
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
      })
      return navigateTo('/')
    }
  }
  if (tokenFromLocalStorage && data.results?.role_id === 1 && isProtectedWithoutAdmin){
    await Swal.fire({
      icon: 'warning',
        title: 'Akses Ditolak',
        text: 'Halaman hanya untuk user atau pasien.',
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
    })
    return navigateTo('/admin')
  }
})
