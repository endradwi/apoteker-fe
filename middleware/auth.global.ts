import Swal from "sweetalert2"

export default defineNuxtRouteMiddleware(async (to) => {
  if (process.server) return  // Hindari SSR

  const tokenFromCookie = useCookie('token')
  const credentialsStore = useCredentialsStore()
  credentialsStore.loadToken() // Memuat token dari localStorage jika ada
  const tokenFromLocalStorage = credentialsStore.token
  const store = useUserStore()
  
  const isProtected =
    ['/regis', '/history', '/profile'].includes(to.path) || to.path.startsWith('/admin')
  const isProtectedWithoutAdmin = ['/', '/regis', '/history', '/profile'].includes(to.path)

  // Jika tidak ada token dan halaman dilindungi
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

  // Hanya cek profil jika ada token
  if (tokenFromLocalStorage) {
    try {
      const data = await store.profile() as { results?: { role_id: number } } | null
      
      // Jika gagal mendapatkan profil, redirect ke home
      if (!data || !data.results) {
        console.error('Failed to get profile data or user not found')
        credentialsStore.clearToken() // Clear invalid token
        
        if (isProtected) {
          await Swal.fire({
            icon: 'warning',
            title: 'Sesi Berakhir',
            text: 'Silakan login kembali.',
            timer: 3000,
            showConfirmButton: false,
            timerProgressBar: true,
          })
          return navigateTo('/')
        }
        return
      }

      const userRole = data.results.role_id

      // Cek akses admin
      if (to.path.startsWith('/admin')) {
        console.log('Token dari localStorage:', tokenFromLocalStorage)
        console.log('Data dari middleware:', data)
        
        if (userRole !== 1) {
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

      // Redirect admin dari halaman user
      if (userRole === 1 && isProtectedWithoutAdmin) {
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
      
    } catch (error) {
      console.error('Error in auth middleware:', error)
      credentialsStore.clearToken() // Clear token on error
      
      if (isProtected) {
        await Swal.fire({
          icon: 'error',
          title: 'Terjadi Kesalahan',
          text: 'Silakan login kembali.',
          timer: 3000,
          showConfirmButton: false,
          timerProgressBar: true,
        })
        return navigateTo('/')
      }
    }
  }
})
