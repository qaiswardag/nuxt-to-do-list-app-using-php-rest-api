<template>
  <header class="bg-[#f6f1eb]">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div class="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
        <div class="flex items-center">
          <NuxtLink to="/">
            <span class="sr-only">Workflow</span>
            <img class="h-10 w-auto" src="https://www.hermes.com/sites/all/themes/custom/hermes/img/hermes-logo-small.svg" alt="" />
          </NuxtLink>

          <div class="hidden ml-10 space-x-8 lg:block">
            <NuxtLink to="/" class="text-base font-medium text-gray-900 hover:text-opacity-75">Home</NuxtLink>
            <NuxtLink to="/task" class="text-base font-medium text-gray-900 hover:text-opacity-75">Task</NuxtLink>
            <NuxtLink to="/account" class="text-base font-medium text-gray-900 hover:text-opacity-75">Account</NuxtLink>
          </div>

        </div>
        <div class="ml-10 space-x-4">
          <NuxtLink to="/login" class="text-base font-medium text-gray-900 hover:text-opacity-75">Sign in</NuxtLink>
          <NuxtLink to="/register" class="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-gray-900 hover:text-opacity-75">Sign up</NuxtLink>
        </div>
      </div>
      <div class="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
        <NuxtLink to="/" class="text-base font-medium text-gray-900 hover:text-opacity-75">Home</NuxtLink>
        <NuxtLink to="/task" class="text-base font-medium text-gray-900 hover:text-opacity-75">Task</NuxtLink>
        <NuxtLink to="/account" class="text-base font-medium text-gray-900 hover:text-opacity-75">Account</NuxtLink>
      </div>
    </nav>
  </header>
</template>

<script>
const navigation = [
  { name: 'Solutions', href: '#' },
  { name: 'Pricing', href: '#' },
  { name: 'Docs', href: '#' },
  { name: 'Company', href: '#' },
]

export default {
  setup() {
    return {
      navigation,
    }
  },
}
</script>