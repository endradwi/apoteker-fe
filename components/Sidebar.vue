<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const store = useUserStore();
const logout = async () => {
  const token = useCookie("token");
  token.value = null;
  store.$reset();
  router.push("/");
  // location.reload();
};
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
          Pendaftaran
        </li></NuxtLink
      >
      <li
        @click="logout"
        class="bg-red-500 pl-5 py-3 rounded-lg hover:bg-red-300 font-bold border-2 border-red-500 text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Logout
      </li>
    </ul>
  </aside>
</template>
