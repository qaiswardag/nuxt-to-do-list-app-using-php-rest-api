<template>
  <div>
    <button
        :class="{'border-green-500' :  task.completed === 'Y', 'border-yellow-400' : task.completed !== 'Y'}"
        class="mb-4 text-sm text-gray-500 inline-block py-2 px-4 border-4">
      {{ task.completed === 'Y' ? 'Done' : 'Undone' }}
    </button>
    <h1 style="min-height: 60px" class="sm:text-2xl text-2xl mb-4 font-semibold">
      {{ task.title }}
    </h1>
    <div>
      <div v-if="task.description">
        <p class="mt-2 text-sm text-gray-500">{{ task.description.split(' ').slice(0, 14).join(' ') }}...</p>
      </div>
    </div>
    <span class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-yellow-300"
          aria-hidden="true">
        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path
              d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"/>
        </svg>
      </span>
  </div>
</template>

<script>
import {
  AcademicCapIcon,
  BadgeCheckIcon,
  CashIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon,
} from '@heroicons/vue/outline'


export default {
  components: {UsersIcon},
  props: {
    task: {required: true}
  }
}
</script>
