<template>
  <div class="pt-20 sm:px-20 px-8 text-center pb-60 bg-gray-100 min-h-screen">
    <div v-if="isPending">
      <Spinner></Spinner>
    </div>
    <h1 class="sm:text-4xl mb-12 font-semibold">Create a Task</h1>
    <div class="space-y-6">
      <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:py-16 sm:px-12">
        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="md:col-span-1 text-left">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Create a unique task</h3>
            <p class="mt-1 text-sm text-gray-500">This information will be displayed on tasks list.</p>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <form @submit.prevent="submitForm" class="space-y-6">


              <div class="col-span-6">
                <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                <input v-model="titleTask" type="text" name="title" id="title" autocomplete="title" placeholder="Title"
                       class="mt-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div>
                <label for="about" class="block text-sm font-medium text-gray-700"> Description </label>
                <div class="mt-1">
                <textarea v-model="descriptionTask" id="about" name="about" rows="3"
                          class="shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="Descript your task"/>
                </div>
                <p class="mt-2 text-sm text-gray-500">Brief description for your task.</p>
              </div>

              <div class="col-span-6">
                <label for="deadline" class="block text-sm font-medium text-gray-700">Deadline</label>
                <input v-model="deadlineTask" type="date" name="deadline" id="deadline" autocomplete="title"
                       placeholder="Deadline"
                       class="mt-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>
              <div class="flex justify-start mt-10">
                <button type="button"
                        class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300">
                  Cancel
                </button>
                <button type="submit"
                        class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-800 bg-yellow-200 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300">
                  Create
                </button>
              </div>
            </form>

          </div>
        </div>
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


import {ref} from "vue";

const titleTask = ref(null);
const descriptionTask = ref(null);
const deadlineTask = ref(null);


//
//
//
//
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
// import ajax
const {isPending, error, loadData} = useAjax();
// current page
//
//
// async function
const createTask = async function (taskObj) {
  try {
    // try
    const response = await loadData('http://localhost/v1/tasks', {
      method: 'POST',
      mode: 'no-cors', // no-cors, *cors, same-origin,
      body: JSON.stringify(taskObj),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-wwlsw-form-urlencoded',
      },
    }, 0,)
    console.log('returned response: ', response)
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
//
//
//
//
const submitForm = async function () {
  const taskObj = {
    title: titleTask.value,
    description: descriptionTask.value,
    deadline: deadlineTask.value,
    completed: 'N',
  }

  // create task
  createTask(taskObj)
}

</script>
