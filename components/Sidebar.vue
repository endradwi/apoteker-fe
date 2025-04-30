<template>
  <aside class="bg-red-500 w-52 pt-10">
    <div class="w-full border-b-black border-b-2 flex justify-center pb-5">
      <img src="@/assets/Logogsu.png" alt="" class="w-20 h-20" />
    </div>
    <ul>
      <NuxtLink to="/admin" class="*:pl-5 *:py-3 *:border-b-black *:border-b-2"
        ><li class="hover:bg-white">Dashboard</li></NuxtLink
      >
      <NuxtLink
        to="/admin/user"
        class="*:pl-5 *:py-3 *:border-b-black *:border-b-2"
        ><li class="hover:bg-white">Users</li></NuxtLink
      >
      <NuxtLink
        to="/admin/pasien"
        class="*:pl-5 *:py-3 *:border-b-black *:border-b-2"
        ><li class="hover:bg-white">Pasien</li></NuxtLink
      >
      <NuxtLink to="/admin/admin" class="*:pl-5 *:py-3">
        <li class="hover:bg-white">Orders</li></NuxtLink
      >
    </ul>
  </aside>
</template>
