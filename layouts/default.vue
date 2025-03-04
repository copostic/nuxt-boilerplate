<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <AppHeader />
    <main class="flex-grow container mx-auto px-4 py-8">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
// Default layout for authenticated and non-authenticated pages
</script>
