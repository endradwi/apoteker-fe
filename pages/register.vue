<script setup lang="ts">
definePageMeta({
  layout: false,
  name: "RegisterPage",
});
useSeoMeta({
  title: "Register Page",
});
</script>
<template>
  <div class="w-screen h-screen flex">
    <div class="flex-1"></div>
    <div class="flex-1 bg-blue-500 rounded-l-[200px]">
      <div class="flex items-center justify-center h-full">
        <div
          class="bg-white w-1/3 h-1/2 rounded-xl shadow-lg flex flex-col items-center justify-center gap-5"
        >
          <h1 class="text-3xl font-bold">Login</h1>
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
            <button
              type="submit"
              class="bg-blue-500 text-white rounded-md px-4 py-2 font-bold"
            >
              Login
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
