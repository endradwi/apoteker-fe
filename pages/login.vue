<script setup lang="ts">
definePageMeta({
  layout: false,
  name: "LoginPage",
});
useSeoMeta({
  title: "Login Page",
});
import Swal from "sweetalert2";
import { ref } from "vue";

const email = ref("");
const password = ref("");
const router = useRouter();

const store = useUserStore();
const eye = ref(false);
const togglePasswordVisibility = () => {
  eye.value = !eye.value;
};

const onClick = async () => {
  const response = await store.login(email.value, password.value);
  if ((response as any).success !== false) {
    if ((response as any).results.role_id === 1) {
      Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        text: "Anda berhasil login sebagai Admin!",
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        router.push("/admin");
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        text: "Anda akan diarahkan ke halaman utama!",
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        router.push("/");
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Login Gagal",
      text: (response as any).message,
      timer: 3000,
      showConfirmButton: false,
      timerProgressBar: true,
    });
  }
};
</script>
<template>
  <div class="w-screen h-screen flex">
    <div
      class="flex-1 bg-[#C95792]/90 lg:rounded-r-[200px] shadow-xl shadow-[#3D365C]"
    >
      <div class="flex flex-col items-center justify-center h-full">
        <img
          src="@/assets/Logogsu.png"
          alt="Logo Perusahaan"
          class="w-20 h-20"
        />
        <div
          class="bg-white w-96 h-96 rounded-xl shadow-lg flex flex-col items-center justify-center gap-5"
        >
          <h1 class="text-3xl font-bold">Login</h1>
          <form
            @submit.prevent="onClick"
            class="flex flex-col gap-5 w-full px-10"
          >
            <div class="flex flex-col gap-2">
              <label for="email" class="mr-2">Email</label>
              <input
                type="text"
                placeholder="Email"
                v-model="email"
                class="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border focus:border-black focus:shadow-lg transition-all duration-300 ease-in-out"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label for="password" class="mr-2">Password</label>
              <div
                class="flex border border-gray-300 rounded-md justify-between items-center pr-4 focus-within:border focus-within:border-black focus-within:shadow-lg transition-all duration-300 ease-in-out overflow-hidden"
              >
                <input
                  :type="eye ? 'text' : 'password'"
                  placeholder="Password"
                  v-model="password"
                  class="px-4 py-2 outline-none w-full"
                />
                <!-- eye buka -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  v-if="eye"
                  @click="togglePasswordVisibility"
                >
                  <!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
                  <path
                    fill="currentColor"
                    d="M12 16q1.875 0 3.188-1.312T16.5 11.5t-1.312-3.187T12 7T8.813 8.313T7.5 11.5t1.313 3.188T12 16m0-1.8q-1.125 0-1.912-.788T9.3 11.5t.788-1.912T12 8.8t1.913.788t.787 1.912t-.787 1.913T12 14.2m0 4.8q-3.35 0-6.113-1.8t-4.362-4.75q-.125-.225-.187-.462t-.063-.488t.063-.488t.187-.462q1.6-2.95 4.363-4.75T12 4t6.113 1.8t4.362 4.75q.125.225.188.463t.062.487t-.062.488t-.188.462q-1.6 2.95-4.362 4.75T12 19m0-2q2.825 0 5.188-1.487T20.8 11.5q-1.25-2.525-3.613-4.012T12 6T6.813 7.488T3.2 11.5q1.25 2.525 3.613 4.013T12 17"
                  />
                </svg>
                <!-- // eye tutup -->
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  @click="togglePasswordVisibility"
                >
                  <!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
                  <path
                    fill="currentColor"
                    d="M15.175 8.325q.725.725 1.063 1.65t.237 1.9q0 .375-.275.638t-.65.262t-.638-.262t-.262-.638q.125-.65-.075-1.25T13.95 9.6t-1.025-.65t-1.275-.1q-.375 0-.638-.275t-.262-.65t.263-.637t.637-.263q.95-.1 1.875.238t1.65 1.062M12 6q-.475 0-.925.037t-.9.138q-.425.075-.763-.125t-.462-.6t.088-.775t.612-.45q.575-.125 1.163-.175T12 4q3.425 0 6.263 1.8t4.337 4.85q.1.2.15.413t.05.437t-.038.438t-.137.412q-.45 1-1.112 1.875t-1.463 1.6q-.3.275-.7.225t-.65-.4t-.212-.763t.337-.687q.6-.575 1.1-1.25t.875-1.45q-1.25-2.525-3.613-4.012T12 6m0 13q-3.35 0-6.125-1.812T1.5 12.425q-.125-.2-.187-.437T1.25 11.5t.05-.475t.175-.45q.5-1 1.163-1.912T4.15 7L2.075 4.9q-.275-.3-.262-.712T2.1 3.5t.7-.275t.7.275l17 17q.275.275.288.688t-.288.712q-.275.275-.7.275t-.7-.275l-3.5-3.45q-.875.275-1.775.413T12 19M5.55 8.4q-.725.65-1.325 1.425T3.2 11.5q1.25 2.525 3.613 4.013T12 17q.5 0 .975-.062t.975-.138l-.9-.95q-.275.075-.525.113T12 16q-1.875 0-3.188-1.312T7.5 11.5q0-.275.038-.525t.112-.525zm4.2 4.2"
                  />
                </svg>
              </div>
            </div>
            <button
              type="submit"
              class="bg-[#3D365C] text-white rounded-md px-4 py-2 font-bold text-center"
            >
              Login
            </button>
          </form>
          <p class="text-sm text-gray-500">
            Belum punya akun?
            <nuxt-link to="/register" class="text-[#3D365C] underline"
              >Daftar</nuxt-link
            >
          </p>
        </div>
      </div>
    </div>
    <div class="flex-1 lg:block hidden">
      <img
        src="@/assets/loginDoc.png"
        alt="Login Dockter"
        class="w-full h-full object-cover transform scale-x-[-1]"
      />
    </div>
  </div>
</template>

<style scoped>
/* * {
  font-family: "Mulish";
} */
</style>
