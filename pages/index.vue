<template>
  <div class="pt-20 sm:px-20 px-8 text-center pb-60 bg-gray-100 min-h-screen">
    <h1 class="sm:text-4xl mb-12 font-semibold">Page {{ currentPage }}</h1>

    <div v-if="isPending">
      <Spinner></Spinner>
    </div>

    <div v-if="tasks">
      <div v-if="!isPending">
        <div
            class="sm:grid sm:grid-cols-2 sm:gap-6">
          <div v-for="(task, taskIdx) in tasks.tasks" :key="task.id" class="bg-white grid-cols-1">
            <NuxtLink style="min-height: 350px" :to="'/task/' + task.id"
                      class="w-full inline-block  group focus-within:ring-2 focus-within:ring-inset focus-within:ring-yellow-300 rounded-md py-16 px-8">
              <TaskDetails :task="task"></TaskDetails>
            </NuxtLink>


            <Switch v-model="enabled"
                    @click="toggleCompleted(task.id, task.completed)"
                    :class="[enabled ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500']">
              <span class="sr-only">Use setting</span>
              <span
                  :class="[enabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']">
      <span
          :class="[enabled ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200', 'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity']"
          aria-hidden="true">
        <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
          <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round"/>
        </svg>
      </span>
      <span
          :class="[enabled ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100', 'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity']"
          aria-hidden="true">
        <svg class="h-3 w-3 text-indigo-600" fill="currentColor" viewBox="0 0 12 12">
          <path
              d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"/>
        </svg>
      </span>
    </span>
            </Switch>


            <fieldset class="py-4 bg-yellow-200 flex justify-start align-center pl-4">
              <legend class="sr-only cursor-pointer">Checksbox variants</legend>
              <div class="flex items-center justify-start">
                <input
                    @change="toggleCompleted(task.id, task.completed)"
                    :id="'checkbox-' + task.id" type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label :id="'checkbox-' + task.id"
                       class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  {{ task.completed === 'Y' ? 'Completed' : 'Not completed' }}
                </label>
              </div>
            </fieldset>
          </div>
        </div>

        <nav aria-label="Pagination"
             class="bg-white px-4 py-3 flex items-center justify-between sm:px-6 mt-4 rounded-md">
          <div class="hidden sm:block">
            <p class="text-gray-800">
              Showing
              {{ ' ' }}
              <span
                  class="font-medium">{{ (tasks.rows_returned * currentPage) - tasks.rows_returned + 1 }}</span>
              {{ ' ' }}
              to
              {{ ' ' }}
              <span class="font-medium">{{ tasks.rows_returned * currentPage }}</span>
              {{ ' ' }}
              of
              {{ ' ' }}
              <span class="font-medium">{{ tasks.total_rows }}</span>
              {{ ' ' }}
              results
            </p>
          </div>
          <div class="flex-1 flex justify-between sm:justify-end gap-2">
            <button :class="{'opacity-20 cursor-not-allowed': !tasks.has_previous_page}"
                    class="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-yellow-200 hover:bg-yellow-300"
                    href="#"
                    @click="loadTasks(currentPage = currentPage - 1)">
              Previous
            </button>

            <button :class="{'opacity-20 cursor-not-allowed': !tasks.has_next_page}"
                    class="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-yellow-200 hover:bg-yellow-300"
                    href="#"
                    @click="loadTasks(currentPage = currentPage + 1)">
              Next
            </button>
          </div>
        </nav>
      </div>
    </div>

    <DynamicModal
        :type="typeModal"
        :optionsAmount="optionsModal"
        :gridColumnAmount="gridColumnModal"
        :title="titleModal"
        :description="descriptionModal"
        :firstButtonText="firstButtonModal"
        :secondButtonText="secondButtonModal"
        :thirdButtonText="thirdButtonModal"
        :open="openModal"
        @firstModalButtonFunction="firstModalButtonFunction"
        @secondModalButtonFunction="secondModalButtonFunction"
        @thirdModalButtonFunction="thirdModalButtonFunction"
        @toggleModal="openModal = !openModal">
    </DynamicModal>


  </div>
</template>

<script setup>
import {onMounted} from 'vue'
import {Switch} from '@headlessui/vue'


const {
  dynamicModal,
  openModal,
  //
  typeModal,
  optionsModal,
  gridColumnModal,
  titleModal,
  descriptionModal,
  firstButtonModal,
  secondButtonModal,
  thirdButtonModal,
} = useDynamicModal();
// set modal handle functions
const firstModalButtonFunction = ref(null);
const secondModalButtonFunction = ref(null);
const thirdModalButtonFunction = ref(null);

// tasks
const tasks = ref(null)
// completed
// import ajax
const {isPending, error, loadData} = useAjax();
// current page
const currentPage = ref(1);
//
const enabled = ref(false)
//
//
// async function
const loadTasks = async function (pageNumber) {
  try {
    // try
    const data = await loadData(`http://localhost/v1/tasks/page/${pageNumber}`, {}, 200)

    tasks.value = await data.data;
    //
    // catch
  } catch (err) {

    dynamicModal({
      options: {
        optionsAmount: 2,
      },
      design: {
        typeOfModal: 'error',
        gridColumnAmount: 2,
      },
      content: {
        title: err.message,
        firstButtonText: 'Close',
        thirdButtonText: 'Refresh Page',
      }
    });
    console.log('unable to fetch:', err);
  }
}
//
//
//
const toggleCompleted = async function (id, completedTask) {

  let completed = null;

  if (completedTask === 'Y') {
    completed = 'N'
  }

  if (completedTask === 'N') {
    completed = 'Y'
  }
  //

  // update task completed
  try {
    // try
    const taskData = await loadData(`http://localhost/v1/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({completed: completed}),
      headers: {
        'Content-Type': 'application/json'
      },
    }, 200,)


    // handle error in returned data
    if (taskData.statusCode === 400) {

      let messageError = [];

      // foreach on message
      taskData.messages.forEach(message => {
        messageError.push(message);
      })

      throw new Error(messageError.toString());
    }

    // console.log('ålå: ', await taskData.data.tasks[0].id)


    tasks.value.tasks = await taskData.data.tasks.filter(task => {
      if (task.id === taskData.data.tasks[0].id) {
        return taskData.data.tasks[0];
      }
      return tasks.value.tasks
    })

    console.log('hørrr::: ', tasks.value)

    // update task
    // tasks.value = await taskData.data;


    // catch
  } catch (err) {

    dynamicModal({
      options: {
        optionsAmount: 2,
      },
      design: {
        typeOfModal: 'error',
        gridColumnAmount: 2,
      },
      content: {
        title: err.message,
        firstButtonText: 'Close',
        thirdButtonText: 'Refresh Page',
      }
    });
    //
    // // handle modal click
    firstModalButtonFunction.value = function () {
      error.value = false;
      openModal.value = false;
    }
    // // handle modal click
    thirdModalButtonFunction.value = function () {
      error.value = false;
      openModal.value = false;
    }
    console.log('unable to fetch:', err);
  }
}

//
//
//
//
//
// on mounted load tasks
onMounted(() => {
  loadTasks(currentPage.value)
})
//

//
</script>
