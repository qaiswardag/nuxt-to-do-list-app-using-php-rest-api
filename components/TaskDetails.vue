<template>
  <div class="border-2 border-black py-10 px-10">
    <NuxtLink to="/" class="text-xl font-bold pt-4 pb-6 inline-block">{{ task.title }}</NuxtLink>
    <p class="pb-8">description: {{ task.description }}</p>
    <p>deadline: {{ task.deadline }}</p>
    <p>completed: {{ task.completed }}</p>
    <p>id: {{ task.id }}</p>

    <NuxtLink to="/" class="pt-8 inline-block text-orange-900">Go to task</NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    task: {required: true}
  }
}
</script>
