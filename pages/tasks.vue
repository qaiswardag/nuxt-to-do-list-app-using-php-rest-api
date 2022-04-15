<template>
  <div class="pt-20 sm:px-20 px-8 text-center pb-60 bg-gray-100 min-h-screen">
    <h1 class="sm:text-4xl mb-12 font-semibold">Page {{ currentPage }}</h1>

    <div v-if="error">
      <h2 class="text-xl font-bold pt-4 pb-6">{{ error }}</h2>
    </div>

    <div v-if="isPending">
      <Spinner></Spinner>
    </div>


    <div v-if="tasks">
      <div v-if="!isPending">

        <div style="min-height: 600px"
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
        :acceptButtonText="acceptButtonModal"
        :cancelButtonText="cancelButtonModal"
        :description="descriptionModal"
        :discardButtonText="discardButtonModal"
        :gridColumnAmount="gridColumnModal"
        :open="openModal"
        :optionsAmount="optionsModal"
        :title="titleModal"
        :type="typeModal"
        @acceptModal="acceptModal"
        @cancelModal="cancelModal"
        @discardModal="discardModal"
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
  cancelButtonModal,
  discardButtonModal,
  acceptButtonModal,
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
    console.log('returned data from tasks.vue: ', data.data)
    tasks.value = await data.data;
    // catch
  } catch (err) {

    dynamicModal({
      options: {
        optionsAmount: 2,
      },
      design: {
        typeOfModal: 'warning',
        gridColumnAmount: 2,
      },
      content: {
        title: err.message,
        cancelButtonText: 'Close',
        acceptButtonText: 'Refresh Page',
      }
    });
    console.log('unable to fetch:', err);
  }
}
//
//
// cancel button clicked on modal
const cancelModal = function () {
  openModal.value = false;
  error.value = false;
};

// cancel button clicked on modal
const discardModal = async function () {
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
const acceptModal = async function () {
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
