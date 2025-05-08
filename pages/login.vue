<script setup lang="ts">
definePageMeta({
  layout: false,
  name: "LoginPage",
});
useSeoMeta({
  title: "Login Page",
});
import { ref } from "vue";

const email = ref("");
const password = ref("");

const store = useUserStore();

const onClick = async () => {
  const response = await store.register(email.value, password.value);
  console.log("Registration successful = ", response);
};
</script>
<template>
  <div class="w-screen h-screen flex">
    <div
      class="flex-1 bg-[#C95792]/90 rounded-r-[200px] shadow-xl shadow-[#3D365C]"
    >
      <div class="flex items-center justify-center h-full">
        <div
          class="bg-white w-96 h-96 rounded-xl shadow-lg flex flex-col items-center justify-center gap-5"
        >
          <h1 class="text-3xl font-bold">Login</h1>
          <form
            @submit.prevent="onClick"
            class="flex flex-col gap-5 w-full px-10"
          >
            <input
              type="text"
              placeholder="Email"
              v-model="email"
              class="border border-gray-300 rounded-md px-4 py-2"
            />
            <input
              type="password"
              placeholder="Password"
              v-model="password"
              class="border border-gray-300 rounded-md px-4 py-2"
            />
            <button
              type="submit"
              class="bg-[#3D365C] text-white rounded-md px-4 py-2 font-bold text-center"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
    <div class="flex-1">
      <img
        src="@/assets/loginDoc.png"
        alt="Login Dockter"
        class="w-full h-full object-cover transform scale-x-[-1]"
      />
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: "Mulish";
}
</style>
