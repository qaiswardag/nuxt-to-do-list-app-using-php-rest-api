<template>
  <Popover class="relative bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div
          class="flex justify-between items-center py-6 md:justify-start md:space-x-10">
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <NuxtLink to="/tasks">
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

          <NuxtLink to="/tasks"
                    class="text-base font-medium text-gray-500 hover:text-gray-900">Tasks
          </NuxtLink>

          <NuxtLink to="/create"
                    class="text-base font-medium text-gray-500 hover:text-gray-900">
            + Create
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
                <NuxtLink to="/tasks">
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
              <NuxtLink to="/tasks" class="text-base font-medium text-gray-900 hover:text-gray-700">
                Tasks
              </NuxtLink>
              <NuxtLink to="/create" class="text-base font-medium text-gray-900 hover:text-gray-700">
                + Create
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
