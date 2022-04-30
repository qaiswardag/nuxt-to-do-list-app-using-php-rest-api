<template>
  <Popover class="relative bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div v-if="isPending">
        <Spinner></Spinner>
      </div>
      <div class="flex justify-between items-center py-6 md:justify-start md:space-x-10">
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <NuxtLink to="/">
            <span class="sr-only">Workflow</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 124 124" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M55.7498 27.1551C52.5277 21.615 44.4723 21.6149 41.2502 27.1551L6.13404 87.5346C2.91191 93.0748 6.93956 100 13.3838 100H40.7975C38.0438 97.5934 37.0241 93.4303 39.1079 89.8584L65.7033 44.2694L55.7498 27.1551Z"
                    fill="#80EEC0"/>
              <path
                  d="M78.0002 40.3997C80.6668 35.8668 87.3332 35.8668 89.9998 40.3997L119.061 89.801C121.728 94.3339 118.395 100 113.062 100H54.9383C49.6052 100 46.2719 94.3339 48.9385 89.801L78.0002 40.3997Z"
                  fill="#00DC82"/>
            </svg>
          </NuxtLink>
        </div>
        <div class="-mr-2 -my-2 md:hidden">
          <PopoverButton
              class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span class="sr-only">Open menu</span>
            <MenuIcon aria-hidden="true" class="h-6 w-6"/>
          </PopoverButton>
        </div>
        <PopoverGroup as="nav" class="hidden md:flex space-x-10">
          <NuxtLink to="/" class="text-base font-medium text-gray-500 hover:text-gray-900">Tasks
          </NuxtLink>

          <NuxtLink to="/create" class="text-base font-medium text-gray-500 hover:text-gray-900">
            + Create
          </NuxtLink>

          <div v-if="userStore.user">
            <NuxtLink to="/account" class="text-base font-medium text-gray-500 hover:text-gray-900">
              {{ userStore.user.fullname }}
            </NuxtLink>
          </div>

          <div v-if="true">
            <NuxtLink to="/account" class="text-base font-medium text-gray-500 hover:text-gray-900">
              account
            </NuxtLink>

          </div>

        </PopoverGroup>

        <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0 gap-8">

          <div v-if="!userStore.user" class="flex gap-8 justify-content-center items-center">
            <NuxtLink to="/login" class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
              Sign
              in
            </NuxtLink>
            <NuxtLink to="/register"
                      class="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-800 bg-yellow-200 hover:bg-yellow-300">
              Sign up
            </NuxtLink>
          </div>

        </div>
      </div>


      <div v-if="userStore.user">
        <div class="py-2 pl-2 border border-amber-500 my-4">access token expires at:
          {{ userStore.user.accessTokenExpiresAt }}
        </div>
        <div class="py-2 pl-2 border border-green-600 my-4">refresh token expires at:
          {{ userStore.user.refreshTokenExpiresAt }}
        </div>
        <div class="py-2 pl-2 border-2 border-fuchsia-800 my-4">username: {{ userStore.user.username }}</div>
        <div class="py-2 pl-2 border-2 border-fuchsia-800 my-4">fullname: {{ userStore.user.fullname }}</div>
        <div class="py-2 pl-2 border-2 border-fuchsia-800 my-4">sessionID: {{ userStore.user.sessionID }}</div>
        <div class="py-2 pl-2 border border-amber-500 my-4 break-words">access token: {{
            userStore.user.accessToken
          }}
        </div>
        <div class="py-2 pl-2 border border-green-600 my-4 break-words">refresh token: {{
            userStore.user.refreshToken
          }}
        </div>
      </div>


    </div>

    <transition enter-active-class="duration-200 ease-out" enter-from-class="opacity-0 scale-95"
                enter-to-class="opacity-100 scale-100" leave-active-class="duration-100 ease-in"
                leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
      <PopoverPanel class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-10" focus>
        <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
          <div class="pt-5 pb-6 px-5">
            <div class="flex items-center justify-between">
              <div>
                <NuxtLink to="/">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 124 124" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M55.7498 27.1551C52.5277 21.615 44.4723 21.6149 41.2502 27.1551L6.13404 87.5346C2.91191 93.0748 6.93956 100 13.3838 100H40.7975C38.0438 97.5934 37.0241 93.4303 39.1079 89.8584L65.7033 44.2694L55.7498 27.1551Z"
                          fill="#80EEC0"/>
                    <path
                        d="M78.0002 40.3997C80.6668 35.8668 87.3332 35.8668 89.9998 40.3997L119.061 89.801C121.728 94.3339 118.395 100 113.062 100H54.9383C49.6052 100 46.2719 94.3339 48.9385 89.801L78.0002 40.3997Z"
                        fill="#00DC82"/>
                  </svg>
                </NuxtLink>
              </div>
              <div class="-mr-2">
                <PopoverButton
                    class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span class="sr-only">Close menu</span>
                  <XIcon aria-hidden="true" class="h-6 w-6"/>
                </PopoverButton>
              </div>
            </div>
          </div>
          <div class="py-6 px-5 space-y-6">
            <div class="grid grid-cols-2 gap-y-4 gap-x-8">
              <NuxtLink to="/" class="text-base font-medium text-gray-900 hover:text-gray-700">
                Tasks
              </NuxtLink>
              <NuxtLink to="/create" class="text-base font-medium text-gray-900 hover:text-gray-700">
                + Create
              </NuxtLink>

              <div v-if="userStore.user">
                <NuxtLink to="/account" class="text-base font-medium text-gray-900 hover:text-gray-700">
                  {{ userStore.user.fullname }}
                </NuxtLink>
              </div>

            </div>
            <div>

              <div v-if="!userStore.user">
                <NuxtLink to="/register"
                          class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-800 bg-yellow-200 hover:bg-yellow-300">
                  Sign up
                </NuxtLink>

                <p class="mt-6 text-center text-base font-medium text-gray-500">
                  Existing customer?
                  {{ ' ' }}
                  <NuxtLink to="/login" class="text-indigo-600 hover:text-indigo-500">
                    Sign in
                  </NuxtLink>
                </p>
              </div>

            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>

</template>

<script setup>
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/vue'
import {
  BookmarkAltIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorClickIcon,
  MenuIcon,
  PhoneIcon,
  PlayIcon,
  RefreshIcon,
  ShieldCheckIcon,
  SupportIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/vue/outline'
import {ChevronDownIcon} from '@heroicons/vue/solid'

import {useUsersStore} from '../stores'
import {useRouter} from 'vue-router'
// store
const userStore = useUsersStore()

// use router
const router = useRouter()

const isPending = ref(null)
//
//
//
//
//
</script>
