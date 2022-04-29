<template>
  <div class="container mx-auto sm:px-6 lg:px-8 mb-48">

    <div v-if="userStore.user" class="mt-24">
      <h2 class="text-lg font-medium text-gray-900">Hello, {{userStore.getUser.fullname}}</h2>
      <h2 class="text-lg font-medium text-gray-900">Username: {{userStore.getUser.username}}</h2>
      <h2 class="text-lg font-medium text-gray-900">user ID: {{userStore.getUser.userID}}</h2>
    </div>

    <p class="mt-8 text-sm text-gray-500">If you haven’t created a todo yet. Get started by selecting a template or start from an empty project.</p>
    <ul role="list" class="mt-12 border-t border-b border-gray-200 py-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
      <li class="flow-root">
        <div class="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-50 focus-within:ring-2 focus-within:ring-yellow-300">
          <div class="bg-green-400 flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-lg">
            <ViewListIcon class="h-6 w-6 text-white"></ViewListIcon>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-900">
              <NuxtLink to="/" class="focus:outline-none">
                <span class="absolute inset-0" aria-hidden="true" />
                View Todos
              </NuxtLink>
            </h3>
            <p class="mt-1 text-sm text-gray-500">View all of your todos.</p>
          </div>
        </div>
      </li>
      <li class="flow-root">
        <div class="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-50 focus-within:ring-2 focus-within:ring-yellow-300">
          <div class="bg-yellow-400 flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-lg">
            <ViewListIcon class="h-6 w-6 text-white"></ViewListIcon>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-900">
              <NuxtLink to="/create" class="focus:outline-none">
                <span class="absolute inset-0" aria-hidden="true" />
                Create a todo
              </NuxtLink>
            </h3>
            <p class="mt-1 text-sm text-gray-500">If you haven’t created a todo yet. Get started now..</p>
          </div>
        </div>
      </li>

    </ul>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth'],
  // or middleware: 'auth'
})

import { ArrowCircleRightIcon, ViewListIcon } from '@heroicons/vue/outline'

import { useUsersStore } from '../stores'

const userStore = computed(() => {
  return useUsersStore()
})
</script>
