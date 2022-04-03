<template>
  <div class="mt-20 px-20 text-center pb-60">
    <h2 v-if="error" class="text-xl font-bold pt-4 pb-6">{{ error }}</h2>
    <Spinner v-if="isPending"></Spinner>
    <div v-if="tasks">
      <div v-for="item in tasks" :key="item.id">
        <TaskDetails :task="item"></TaskDetails>
      </div>
    </div>
  </div>
</template>


<script>
import {onMounted, onBeforeMount} from 'vue'


export default {
  setup() {
    const tasks = ref(null)
    // import ajax
    const {isPending, error, loadData} = useAjax();
    //
    onMounted(async () => {
      try {
        // const data = await loadData('http://localhost/v1/controller/task.php?taskid=2')
        const data = await loadData('http://localhost/v1/controller/dbtest.php')
        tasks.value = data.data.tasks;
      } catch (err) {
        error.value = err;
        console.log('unable to fetch:', err);
      }
    })
    //
    return {isPending, error, tasks}
  },
}
</script>
