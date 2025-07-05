<template>
  <section class="flex min-h-screen bg-gray-50">
    <!-- Sidebar Component -->
    <Sidebar />
    
    <!-- Main Content Area -->
    <main class="flex-1 lg:ml-0 transition-all duration-300 ease-in-out">
      <!-- Content wrapper with proper spacing -->
      <div class="w-full min-h-screen">
        <NuxtPage />
      </div>
    </main>
  </section>
</template>

<style scoped>
/* Ensure proper layout on mobile */
@media (max-width: 1023px) {
  main {
    margin-left: 0 !important;
    width: 100%;
  }
}

/* Ensure content doesn't overlap with mobile menu trigger */
main {
  padding-top: 0;
}

@media (max-width: 1023px) {
  main {
    padding-top: 0;
  }
}
</style>
