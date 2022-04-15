<template>
  <Popover class="relative bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div
          class="flex justify-between items-center py-6 md:justify-start md:space-x-10">
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <NuxtLink to="/">
            <span class="sr-only">Workflow</span>
            <svg class="logo text-center" viewBox="0 0 128 128" width="30" height="30" data-v-5f26462c="">
              <path fill="#42b883" d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110C128,10,78.8,10,78.8,10z"
                    data-v-5f26462c=""></path>
              <path fill="#35495e" d="M78.8,10L64,35.4L49.2,10H25.6L64,76l38.4-66H78.8z" data-v-5f26462c=""></path>
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
          <Popover v-slot="{ open }" class="relative">
            <PopoverButton
                :class="[open ? 'text-gray-900' : 'text-gray-500', 'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300']">
              <span>Solutions</span>
              <ChevronDownIcon
                  :class="[open ? 'text-gray-800' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500']"
                  aria-hidden="true"/>
            </PopoverButton>

            <transition enter-active-class="transition ease-out duration-200"
                        enter-from-class="opacity-0 translate-y-1"
                        enter-to-class="opacity-100 translate-y-0"
                        leave-active-class="transition ease-in duration-150"
                        leave-from-class="opacity-100 translate-y-0"
                        leave-to-class="opacity-0 translate-y-1">
              <PopoverPanel
                  class="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                    <a v-for="item in solutions" :key="item.name" :href="item.href"
                       class="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                      <component :is="item.icon" aria-hidden="true"
                                 class="flex-shrink-0 h-6 w-6 text-yellow-400"/>
                      <div class="ml-4">
                        <p class="text-base font-medium text-gray-900">
                          {{ item.name }}
                        </p>
                        <p class="mt-1 text-sm text-gray-500">
                          {{ item.description }}
                        </p>
                      </div>
                    </a>
                  </div>
                  <div
                      class="px-5 py-5 bg-gray-50 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                    <div v-for="item in callsToAction" :key="item.name" class="flow-root">
                      <a :href="item.href"
                         class="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">
                        <component :is="item.icon" aria-hidden="true"
                                   class="flex-shrink-0 h-6 w-6 text-gray-400"/>
                        <span class="ml-3">{{ item.name }}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>


          <NuxtLink to="/"
                    class="text-base font-medium text-gray-500 hover:text-gray-900">Home
          </NuxtLink>
          <NuxtLink to="/task"
                    class="text-base font-medium text-gray-500 hover:text-gray-900">Task
          </NuxtLink>
          <NuxtLink to="/tasks"
                    class="text-base font-medium text-gray-500 hover:text-gray-900">Tasks
          </NuxtLink>

          <NuxtLink to="/account"
                    class="text-base font-medium text-gray-500 hover:text-gray-900">Account
          </NuxtLink>

        </PopoverGroup>
        <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">

          <NuxtLink to="/login"
                    class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"> Sign
            in
          </NuxtLink>
          <NuxtLink to="/register"
                    class="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-800 bg-yellow-200 hover:bg-yellow-300">
            Sign up
          </NuxtLink>
        </div>
      </div>
    </div>

    <transition enter-active-class="duration-200 ease-out" enter-from-class="opacity-0 scale-95"
                enter-to-class="opacity-100 scale-100" leave-active-class="duration-100 ease-in"
                leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
      <PopoverPanel
          class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-10"
          focus>
        <div
            class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
          <div class="pt-5 pb-6 px-5">
            <div class="flex items-center justify-between">
              <div>
                <NuxtLink to="/">
                  <svg class="logo text-center" viewBox="0 0 128 128" width="30" height="30" data-v-5f26462c="">
                    <path fill="#42b883" d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110C128,10,78.8,10,78.8,10z"
                          data-v-5f26462c=""></path>
                    <path fill="#35495e" d="M78.8,10L64,35.4L49.2,10H25.6L64,76l38.4-66H78.8z"
                          data-v-5f26462c=""></path>
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
            <div class="mt-6">
              <nav class="grid gap-y-8">
                <a v-for="item in solutions" :key="item.name" :href="item.href"
                   class="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                  <component :is="item.icon" aria-hidden="true"
                             class="flex-shrink-0 h-6 w-6 text-indigo-600"/>
                  <span class="ml-3 text-base font-medium text-gray-900">
                    {{ item.name }}
                  </span>
                </a>
              </nav>
            </div>
          </div>
          <div class="py-6 px-5 space-y-6">
            <div class="grid grid-cols-2 gap-y-4 gap-x-8">
              <NuxtLink to="/" class="text-base font-medium text-gray-900 hover:text-gray-700">
                Home
              </NuxtLink>
              <NuxtLink to="/task" class="text-base font-medium text-gray-900 hover:text-gray-700">
                Task
              </NuxtLink>
              <NuxtLink to="/tasks" class="text-base font-medium text-gray-900 hover:text-gray-700">
                Tasks
              </NuxtLink>
              <NuxtLink to="/account" class="text-base font-medium text-gray-900 hover:text-gray-700">
                Account
              </NuxtLink>
            </div>
            <div>
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
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script>
import {Popover, PopoverButton, PopoverGroup, PopoverPanel} from '@headlessui/vue';
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
} from '@heroicons/vue/outline';
import {ChevronDownIcon} from '@heroicons/vue/solid';

const solutions = [
  {
    name: 'Analytics',
    description: 'Get a better understanding of where your traffic is coming from.',
    href: '#',
    icon: ChartBarIcon,
  },
  {
    name: 'Help Center',
    description: 'Get all of your questions answered in our forums or contact support.',
    href: '#',
    icon: SupportIcon,
  },
  {
    name: 'Security',
    description: 'Your customers\' data will be safe and secure.',
    href: '#',
    icon: ShieldCheckIcon
  },
  {
    name: 'Integrations',
    description: 'Connect with third-party tools that you\'re already using.',
    href: '#',
    icon: ViewGridIcon,
  },
  {
    name: 'Automations',
    description: 'Build strategic funnels that will drive your customers to convert',
    href: '#',
    icon: RefreshIcon,
  },
];
const callsToAction = [
  {
    name: 'Watch Demo',
    href: '#',
    icon: PlayIcon
  },
  {
    name: 'Contact Sales',
    href: '#',
    icon: PhoneIcon
  },
];

export default {
  components: {
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    ChevronDownIcon,
    MenuIcon,
    XIcon,
  },
  setup() {
    return {
      solutions,
      callsToAction,
    };
  },
};
</script>
