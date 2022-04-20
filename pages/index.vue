<template>
  <div class="pt-20 sm:px-20 px-8 text-center pb-60 bg-gray-100 min-h-screen">
    <h1 class="sm:text-4xl mb-12 font-semibold">Page {{ currentPage }}</h1>

    <button @click="test"
            class="whitespace-nowrap px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-800 bg-yellow-200 hover:bg-yellow-300">
      Click me
    </button>

    <div v-if="isPending">
      <Spinner></Spinner>
    </div>


    <div v-if="tasks">
      <div v-if="!isPending">

        <div style="min-height: 650px"
             class="overflow-hidden divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
          <div v-for="(task, taskIdx) in tasks.tasks" :key="task.id">
            <NuxtLink :to="'/task/' + task.id"
                      class="w-full inline-block relative group bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-yellow-300 rounded-md py-16 px-8 h-full">
              <TaskDetails :task="task"></TaskDetails>
            </NuxtLink>
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

// tasks
const tasks = ref(null)
// import ajax
const {isPending, error, loadData} = useAjax();
// current page
const currentPage = ref(1);
//
//
// async function
const loadTasks = async function (pageNumber) {
  try {
    // try
    const data = await loadData(`http://localhost/v1/tasks/page/${pageNumber}`, {}, 200)
    tasks.value = await data.data;
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
const test = function () {
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
//
//
//
//
//
//
//
// cancel button clicked on modal
const firstModalButtonFunction = function (callback) {
  console.log('first button was clicked')
  openModal.value = false;
  error.value = false;

//
//
//
  callback
};

// cancel button clicked on modal
const secondModalButtonFunction = async function () {
  console.log('second button was clicked')
  openModal.value = false;
  error.value = false;
// log user out
// log user out
// log user out
  isPending.value = true;
  await usePromise(400);
  isPending.value = false;
  //
};

// accept button clicked on modal
const thirdModalButtonFunction = async function () {
  console.log('third button was clicked')
  openModal.value = false;
  error.value = false;
//
//
  isPending.value = true;
  await usePromise(400);
  isPending.value = false;
//
};
//
//
// on mounted load tasks
onMounted(() => {
  loadTasks(currentPage.value)
})
//

//
</script>
