<script setup lang="ts">
import { ref } from "vue";

const showDropdown = ref(false);
const profileData = ref(false);
const name = ref("");
const router = useRouter();
const email = ref("");

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};
const store = useUserStore();

async function profile() {
  const response = await store.profile();
  if (response) {
    profileData.value = !profileData.value;
    name.value = (response as any).results.fullname;
    email.value = (response as any).results.email;
  } else {
    // Handle profile retrieval error
    console.error("Failed to retrieve profile");
  }
}
const logout = async () => {
  const tokenFromCookie = useCookie("token");
  // token.value = null;
  const creadential = useCredentialsStore();
  creadential.clearToken();
  store.$reset();
  profileData.value = false;
  router.push("/");
  // location.reload();
};
onMounted(() => {
  profile();
});
</script>
<template>
  <div class="w-full h-full mb-2 shadow-xl sticky top-0 bg-white z-50">
    <div class="flex justify-between items-center px-32 py-2">
      <nuxt-link to="/">
        <img
          src="../assets/Logogsu.png"
          alt="Logo Perusahaan"
          class="w-14 h-14"
        />
      </nuxt-link>
      <div class="flex items-center gap-2" v-if="profileData">
        <div v-if="name === ''">{{ email }}</div>
        <div v-else>{{ name }}</div>
        <div class="flex items-center">
          <NuxtLink to="/profile">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 32 32"
            >
              <path
                fill="currentColor"
                d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5m0 8a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3"
              />
              <path
                fill="currentColor"
                d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2m-6 24.377V25a3.003 3.003 0 0 1 3-3h6a3.003 3.003 0 0 1 3 3v1.377a11.9 11.9 0 0 1-12 0m13.993-1.451A5 5 0 0 0 19 20h-6a5 5 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0"
              />
            </svg>
          </NuxtLink>
          <div @click="toggleDropdown">
            <svg
              v-if="showDropdown"
              class="rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="m7 10l5 5l5-5z" />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="m7 10l5 5l5-5z" />
            </svg>
          </div>
        </div>
        <div
          v-if="showDropdown"
          class="absolute bg-white shadow-lg rounded-md top-20 w-44 text-right border border-gray-300"
        >
          <ul class="flex flex-col gap-2 p-2">
            <NuxtLink to="/profile">
              <li
                class="px-4 py-2 hover:bg-gray-200 cursor-pointer hover:bg-slate-200"
              >
                Profile
              </li>
            </NuxtLink>
            <NuxtLink to="/history">
              <li
                class="px-4 py-2 hover:bg-gray-200 cursor-pointer hover:bg-slate-200"
              >
                History Pendaftaran
              </li>
            </NuxtLink>
            <div @click="logout">
              <li
                class="px-4 py-2 hover:bg-gray-200 cursor-pointer hover:bg-slate-200"
              >
                Logout
              </li>
            </div>
          </ul>
        </div>
      </div>
      <div class="flex gap-5" v-else>
        <nuxt-link
          to="/login"
          class="bg-[#3D365C] px-5 py-2 rounded-md text-white"
          >Login</nuxt-link
        >
        <nuxt-link
          to="/register"
          class="px-5 py-2 rounded-md border border-[#3D365C] text-[#3D365C]"
        >
          Register</nuxt-link
        >
      </div>
    </div>
    <NuxtLink to="https://wa.me/6281330770221">
      <button
        class="absolute bottom-[-900px] left-5 z-50 bg-green-500 text-white p-2 rounded-xl rounded flex items-center gap-2 hover:bg-green-600 transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-white"
      >
        Butuh Bantuan?
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="31.76"
          height="32"
          viewBox="0 0 256 258"
        >
          <defs>
            <linearGradient
              id="logosWhatsappIcon0"
              x1="50%"
              x2="50%"
              y1="100%"
              y2="0%"
            >
              <stop offset="0%" stop-color="#1FAF38" />
              <stop offset="100%" stop-color="#60D669" />
            </linearGradient>
            <linearGradient
              id="logosWhatsappIcon1"
              x1="50%"
              x2="50%"
              y1="100%"
              y2="0%"
            >
              <stop offset="0%" stop-color="#F9F9F9" />
              <stop offset="100%" stop-color="#FFF" />
            </linearGradient>
          </defs>
          <path
            fill="url(#logosWhatsappIcon0)"
            d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a123 123 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004"
          />
          <path
            fill="url(#logosWhatsappIcon1)"
            d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416m40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513z"
          />
          <path
            fill="#FFF"
            d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561s11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716s-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64"
          />
        </svg>
      </button>
    </NuxtLink>
  </div>
</template>
