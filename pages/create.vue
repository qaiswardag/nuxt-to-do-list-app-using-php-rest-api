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
                <input v-model="deadlineTask" type="datetime-local" name="deadline" id="deadline" autocomplete="title"
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
import {ref} from "vue";
// import {useRouter} from 'vue-router'
const titleTask = ref(null);
const descriptionTask = ref(null);
const deadlineTask = ref(null);

//
// use dynamic modal
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

// router
const router = useRouter();
// tasks
// import ajax
const {isPending, error, loadData} = useAjax();
// current page
//
//
// async function
const createTask = async function (taskObj) {
  // try
  try {
    const taskData = await loadData('http://localhost/v1/tasks', {
      method: 'POST',
      body: JSON.stringify(taskObj),
      headers: {
        'Content-Type': 'application/json'
      },
    }, {})

    // handle error in returned data
    if (taskData.statusCode === 400) {

      let messageError = [];

      // foreach on message
      taskData.messages.forEach(message => {
        messageError.push(message);
      })

      throw new Error(messageError.toString());
    }

    // push to tasks
    router.push('/');
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
        thirdButtonText: 'Reload Page',
      }
    });

    // handle modal click
    firstModalButtonFunction.value = function () {
      error.value = false;
      openModal.value = false;
    }
    // handle modal click
    thirdModalButtonFunction.value = function () {
      error.value = false;
      openModal.value = false;
      location.reload(true);
    }

    // log erros
    console.log('unable to fetch:', err);
  }
}
//
//
//
const submitForm = async function (event) {
  // date function
  const taskDeadline = new Date(deadlineTask.value);
  const taskDate = taskDeadline.getDate();
  let taskMonth = taskDeadline.getMonth() + 1;

  if (taskMonth.toString().length === 1) {
    taskMonth = "0" + taskMonth;
  }


  const taskYear = taskDeadline.getFullYear();
  let taskHour = taskDeadline.getHours();

  if (taskHour.toString().length === 1) {
    taskHour = "0" + taskHour;
  }


  let taskMinutes = taskDeadline.getMinutes();

  if (taskMinutes.toString().length === 1) {
    taskMinutes = "0" + taskMinutes;
  }


  let taskDatelineStr = `${taskDate}/${taskMonth}/${taskYear} ${taskHour}:${taskMinutes}`

  if (taskDatelineStr === '1/01/1970 01:00') {
    taskDatelineStr = null
  }

  // task obj
  const taskObj = {
    title: titleTask.value,
    description: descriptionTask.value,
    deadline: taskDatelineStr,
    completed: 'N',
  }
  // create task
  createTask(taskObj)
}

</script>
