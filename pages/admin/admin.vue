<script setup lang="ts">
definePageMeta({
  layout: "admin",
  //   name: "AdminUserPage",
});
useSeoMeta({
  title: "Admin-Pasien Page",
});
</script>
<template>
  <div class="w-screen h-screen flex flex-col py-24 px-52 gap-10">
    <h1 class="text-5xl font-black">Akun Admin</h1>
    <table>
      <thead>
        <tr>
          <th class="border border-black py-2 px-4">No</th>
          <th class="border border-black py-2 px-4">Username</th>
          <th class="border border-black py-2 px-4">Password</th>
          <th class="border border-black py-2 px-4">Role</th>
          <th class="border border-black py-2 px-4">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border border-black py-2 px-4">1</td>
          <td class="border border-black py-2 px-4">admin</td>
          <td class="border border-black py-2 px-4">admin123</td>
          <td class="border border-black py-2 px-4">Admin</td>
          <td class="border border-black py-2 px-4">
            <button class="bg-red-500 text-white py-1 px-3 rounded">
              Delete
            </button>
          </td>
        </tr>
        <!-- Add more rows as needed -->
      </tbody>
    </table>
  </div>
</template>

<style scoped>
* {
  font-family: "Mulish";
}
</style>
