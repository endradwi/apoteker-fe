import Swal from "sweetalert2"

export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('token')
  const isProtected =
    to.path === '/regis' || to.path === '/history' || to.path === '/profile' || to.path.startsWith('/admin')

  if (isProtected && !token.value) {
    if (process.client) {
      Swal.fire({
        icon: 'warning',
        title: 'Akses Ditolak',
        text: 'Anda harus login terlebih dahulu untuk mengakses halaman ini.',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      }).then(() => {
        window.location.href = '/' // Gunakan ini karena `router.push()` tidak bisa di middleware secara langsung
      })
    }

    return abortNavigation() // Ini menghentikan navigasi tanpa error 500
  }
})

// if (isProtected && !token.value) {
//   return navigateTo('/unauthorized')
// }

// halaman custom //Anauthorized
// <template>
//   <div class="text-center mt-10">
//     <h1 class="text-2xl font-bold text-red-600">Akses Ditolak</h1>
//     <p>Silakan login terlebih dahulu untuk mengakses halaman ini.</p>
//   </div>
// </template>
