<script setup lang="ts">
const route = useRoute();
</script>
<template>
  <aside class="bg-[#C95792] w-52 pt-10">
    <div class="w-full border-b-white border-b-2 flex justify-center pb-5">
      <NuxtLink to="/">
        <img src="@/assets/Logogsu.png" alt="" class="w-20 h-20" />
      </NuxtLink>
    </div>
    <ul>
      <NuxtLink
        to="/admin"
        class="*:pl-5 *:py-3 *:border-b-white *:border-b-2 text-white"
        ><li
          class="hover:bg-white"
          :class="[
            'hover:bg-white',
            route.path === '/admin' ? 'bg-white font-bold text-black' : '',
          ]"
        >
          Dashboard
        </li></NuxtLink
      >
      <NuxtLink
        to="/admin/user"
        class="*:pl-5 *:py-3 *:border-b-white *:border-b-2 text-white"
        ><li
          class="hover:bg-white"
          :class="[
            'hover:bg-white',
            route.path === '/admin/user' ? 'bg-white font-bold text-black' : '',
          ]"
        >
          Users
        </li></NuxtLink
      >
      <NuxtLink
        to="/admin/pasien"
        class="*:pl-5 *:py-3 *:border-b-white *:border-b-2 text-white"
        ><li
          class="hover:bg-white"
          :class="[
            'hover:bg-white',
            route.path === '/admin/pasien'
              ? 'bg-white font-bold text-black'
              : '',
          ]"
        >
          Pasien
        </li></NuxtLink
      >
      <NuxtLink to="/admin/admin" class="*:pl-5 *:py-3 text-white">
        <li
          class="hover:bg-white"
          :class="[
            'hover:bg-white',
            route.path === '/admin/admin'
              ? 'bg-white font-bold text-black'
              : '',
          ]"
        >
          Admin
        </li></NuxtLink
      >
    </ul>
  </aside>
</template>
