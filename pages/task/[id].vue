<template>
  <div class="pt-20 sm:px-20 px-8 text-center pb-60 bg-gray-100 min-h-screen">
    <div v-if="error">
      <h2 class="text-xl font-bold pt-4 pb-6">{{ error }}</h2>
    </div>

    <div v-if="isPending">
      <Spinner></Spinner>
    </div>


    <div v-if="task"
         class="w-full inline-block relative group bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-yellow-300 rounded-md py-16 px-8 h-full">
      <h1 class="sm:text-4xl text-2xl mb-12 font-semibold">
        {{ task.title }}
      </h1>
      <div>
        <button
            :class="{'bg-green-600 text-white' :  task.completed === 'Y'}"
            class="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-yellow-200 mb-8">
          {{ task.completed === 'Y' ? 'Done' : 'Undone' }}
        </button>
        <p class="mt-2 text-sm text-gray-500">{{ task.description }}</p>
      </div>
    </div>

    <DynamicModal
        :type="typeModal"
        :optionsAmount="optionsModal"
        :gridColumnAmount="gridColumnModal"
        :title="titleModal"
        :description="descriptionModal"
        :cancelButtonText="cancelButtonModal"
        :discardButtonText="discardButtonModal"
        :acceptButtonText="acceptButtonModal"
        :open="openModal"
        @cancelModal="cancelModal"
        @discardModal="discardModal"
        @acceptModal="acceptModal"
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

const task = ref(null)
// import ajax
const {isPending, error, loadData} = useAjax();
//
//
const route = useRoute()
// onMounted(async () => {
//   await productStore.loadProduct(parseInt(route.params.id));
//
//
//
//
//
//
//
// async function
const loadTasks = async function (taskID) {
  try {
    // try
    const data = await loadData(`http://localhost/v1/tasks/${taskID}`, {}, 300)
    task.value = data.data.tasks[0];
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
  loadTasks(route.params.id)
})
//
</script>
