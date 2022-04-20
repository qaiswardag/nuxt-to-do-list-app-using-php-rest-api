<template>
  <div class="pt-20 sm:px-20 px-8 text-center pb-60 bg-gray-100 min-h-screen">
    <div v-if="error">
      <h2 class="text-xl font-bold pt-4 pb-6">{{ error }}</h2>
    </div>

    <div v-if="isPending">
      <Spinner></Spinner>
    </div>


    <div v-if="task"
         class="w-full inline-block relative group bg-white rounded-md py-16 px-8 h-full">
      <h1 class="sm:text-4xl text-2xl mb-12 font-semibold">
        {{ task.title }}
      </h1>
      <div>
        <button
            :class="{'border-green-500' :  task.completed === 'Y', 'border-yellow-400' : task.completed !== 'Y'}"
            class="mb-4 text-sm text-gray-500 inline-block py-2 px-4 border-4">
          {{ task.completed === 'Y' ? 'Done' : 'Undone' }}
        </button>
        <p class="my-y text-sm text-yellow-500">{{ task.deadline }}</p>
        <p class="mt-2 text-sm text-gray-500">{{ task.description }}</p>


        <NuxtLink :to="'/update/' + task.id"
                  class="inline-block items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-yellow-200 mt-12">
          Update task
        </NuxtLink>


        <br>

        <button @click="deleteTask" type="button"
                class="inline-block mt-24 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
          Delete task
        </button>


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

const task = ref(null)
// import ajax
const {isPending, error, loadData} = useAjax();
//
//
const router = useRoute()
const router2 = useRouter()
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
// cancel button clicked on modal
const firstModalButtonFunction = function () {
  console.log('first button was clicked')
  openModal.value = false;
  error.value = false;
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
  loadTasks(router.params.id)
})
//
//
//
const deleteTask = async function (taskID) {

  try {

    const response = await loadData(`http://localhost/v1/tasks/${router.params.id}`, {

      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    }, 200,)

    console.log('delete response is: ', response)


    dynamicModal({
      options: {
        optionsAmount: 2,
      },
      design: {
        typeOfModal: 'success',
        gridColumnAmount: 1,
      },
      content: {
        title: 'Task have been deleted',
        firstButtonText: 'Go to tasks',
      }
    });

    // push to tasks
    // router2.push('/tasks');
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
//
//
</script>
