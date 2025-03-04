<template>
  <div :class="{ 'dark': isDarkMode }">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import {useThemeStore} from '~/stores/theme'

const themeStore = useThemeStore()
const isDarkMode = computed(() => themeStore.isDarkMode)

onMounted(() => {
  themeStore.initTheme()
})
</script>
