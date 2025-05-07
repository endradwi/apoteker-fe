<script setup lang="ts">
definePageMeta({
  layout: false,
  name: "RegisterPage",
});
useSeoMeta({
  title: "Register Page",
});

import { useUser } from "~/stores/user";

const store = useUser();

const onClick = async () => {
  const register = await store.register();
  console.log("Register button clicked", register);
  const url = useRuntimeConfig().public.apiUrl;
  console.log("API URL:", url);
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
          <form class="flex flex-col gap-5 w-full px-10">
            <input
              type="text"
              placeholder="Username"
              class="border border-gray-300 rounded-md px-4 py-2"
            />
            <input
              type="password"
              placeholder="Password"
              class="border border-gray-300 rounded-md px-4 py-2"
            />
            <div
              class="bg-[#3D365C] text-white rounded-md px-4 py-2 font-bold text-center"
              @click="onClick"
            >
              Register
            </div>
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
