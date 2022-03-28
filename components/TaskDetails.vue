<template>
  <div class="border-2 border-black py-10 px-10">
    <h2 class="text-xl font-bold pt-4 pb-6">{{ task.title }}</h2>
    <p class="pb-8">description: {{ task.description }}</p>
    <p>deadline: {{ task.deadline }}</p>
    <p>completed: {{ task.completed }}</p>
    <p>id: {{ task.id }}</p>
  </div>
</template>

<script>
export default {
  props: {
    task: {required: true}
  }
}
</script>
