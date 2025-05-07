<script setup lang="ts">
definePageMeta({
  layout: false,
  name: "RegisterPage",
});
useSeoMeta({
  title: "Register Page",
});

import { ref } from "vue";

const email = ref("");
const password = ref("");

const onClick = async () => {
  const url = useRuntimeConfig().public.apiUrl;
  const res = await fetch(`${url}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  });

  const data = await res.json();
  console.log("API URL:", url);
  console.log("Response:", data);
};
</script>
<template>
  <div class="w-screen h-screen flex">
    <div class="flex-1 flex items-end mt-32">
      <img
        src="@/assets/regisDoc.png"
        alt="Register Dockter"
        class="w-full h-full object-cover"
      />
    </div>
    <div
      class="flex-1 bg-[#C95792]/90 rounded-l-[200px] shadow-2xl shadow-[#3D365C]"
    >
      <div class="flex items-center justify-center h-full">
        <div
          class="bg-white w-96 h-96 rounded-xl shadow-lg flex flex-col items-center justify-center gap-5"
        >
          <img
            src="@/assets/Logogsu.png"
            alt="Logo Perusahaan"
            class="w-20 h-20"
          />
          <h1 class="text-3xl font-bold">Register</h1>
          <form
            @submit.prevent="onClick"
            class="flex flex-col gap-5 w-full px-10"
          >
            <input
              type="text"
              v-model="email"
              placeholder="Email"
              class="border border-gray-300 rounded-md px-4 py-2"
            />
            <input
              type="password"
              v-model="password"
              placeholder="Password"
              class="border border-gray-300 rounded-md px-4 py-2"
            />
            <button
              type="submit"
              class="bg-[#3D365C] text-white rounded-md px-4 py-2 font-bold text-center"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: "Mulish";
}
</style>
