<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
    <div class="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
