<template>
  <div>
    <h1 class="sm:text-2xl text-2xl mb-4 font-semibold">
      {{ task.title }}
    </h1>
    <div>
      <div v-if="task.description">
        <p class="mt-2 text-sm text-gray-500">{{ task.description.split(' ').slice(0, 14).join(' ') }}...</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  AcademicCapIcon,
  BadgeCheckIcon,
  CashIcon,
  ClockIcon,
  ReceiptRefundIcon,
} from '@heroicons/vue/outline'

export default {
  props: {
    task: {required: true}
  }
}
</script>
