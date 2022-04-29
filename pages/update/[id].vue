<template>
  <div class="pt-20 sm:px-20 px-8 text-center pb-60 min-h-screen">
    <div v-if="isPending">
      <Spinner></Spinner>
    </div>
    <h1 class="sm:text-4xl mb-12 font-semibold">Update task</h1>
    <div class="space-y-6">
      <div class=" shadow px-4 py-5 sm:rounded-lg sm:py-16 sm:px-12">
        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="md:col-span-1 text-left">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Update your task</h3>
            <p class="mt-1 text-sm text-gray-500">This information will be displayed on tasks list.</p>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <div v-if="task">
              <form @submit.prevent="submitForm" class="space-y-6">
                <div class="col-span-6">
                  <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                  <input v-model="titleTask" type="text" name="title" id="title" autocomplete="title" :placeholder="task.title" class="mt-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div>
                  <label for="about" class="block text-sm font-medium text-gray-700"> Description </label>
                  <div class="mt-1">
                    <textarea v-model="descriptionTask" id="about" name="about" rows="3" class="shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 block w-full sm:text-sm border border-gray-300 rounded-md" :placeholder="task.description" />
                  </div>
                  <p class="mt-2 text-sm text-gray-500">Brief description for your task.</p>
                </div>

                <div class="col-span-6">
                  <label for="title" class="block text-sm font-medium text-gray-700">Completed</label>
                  <Switch v-model="task.completed" :class="[task.completed ? 'bg-green-600' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 mt-2']">
                    <span class="sr-only">Use setting</span>
                    <span :class="[task.completed ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']">
                      <span :class="[task.completed ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200', 'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity']" aria-hidden="true">
                        <svg class="h-3 w-3 text-gray-800" fill="none" viewBox="0 0 12 12">
                          <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </span>
                      <span :class="[task.completed ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100', 'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity']" aria-hidden="true">
                        <svg class="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                        </svg>
                      </span>
                    </span>
                  </Switch>
                </div>

                <div class="col-span-6">
                  <label for="deadline" class="block text-sm font-medium text-gray-700 mt-12">Deadline. Current value:
                    {{ task.deadline ? task.deadline : 'Not set' }}</label>
                  <input v-model="deadlineTask" type="datetime-local" name="deadline" id="deadline" autocomplete="title" class="mt-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div class="flex justify-start mt-10">
                  <button type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300">
                    Cancel
                  </button>
                  <button type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-800 bg-yellow-200 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300">
                    Update
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>

    <DynamicModal :type="typeModal" :optionsAmount="optionsModal" :gridColumnAmount="gridColumnModal" :title="titleModal" :description="descriptionModal" :firstButtonText="firstButtonModal" :secondButtonText="secondButtonModal" :thirdButtonText="thirdButtonModal" :open="openModal" @firstModalButtonFunction="firstModalButtonFunction" @secondModalButtonFunction="secondModalButtonFunction" @thirdModalButtonFunction="thirdModalButtonFunction" @toggleModal="openModal = !openModal">
    </DynamicModal>

  </div>

</template>


<script setup>
import { onMounted } from 'vue'
import { Switch } from '@headlessui/vue'
import { TrashIcon } from '@heroicons/vue/solid'
import { useUsersStore } from '../../stores'

// variables for form
const titleTask = ref(null)
const descriptionTask = ref(null)
const deadlineTask = ref(null)

// store

// store
const userStore = computed(() => {
  return useUsersStore()
})

// use router
const route = useRoute()
const router = useRouter()

// use dynamic model
const {
  dynamicModal,
  openModal,
  //s
  typeModal,
  optionsModal,
  gridColumnModal,
  titleModal,
  descriptionModal,
  firstButtonModal,
  secondButtonModal,
  thirdButtonModal,
} = useDynamicModal()
// set modal handle functions
const firstModalButtonFunction = ref(null)
const secondModalButtonFunction = ref(null)
const thirdModalButtonFunction = ref(null)

// tasks
// import ajax
const { isPending, error, loadData } = useAjax()
//
//
//
// task
const task = ref(null)
// task object for collecting relevant data from api and renamming
const taskObj = ref({})
//
//
// async function
const loadTasks = async function (taskID) {
  // set tasks object to empty on each load
  taskObj.value = {}
  try {
    // try
    const data = await loadData(`http://localhost/v1/tasks/${taskID}`, {
      headers: {
        Authorization: `${userStore.value.getUser?.accessToken}`,
      },
      cache: 'no-cache',
    })

    // task data
    taskObj.value = {
      id: data.data.tasks[0].id,
      title: data.data.tasks[0].title,
      description: data.data.tasks[0].description,
      deadline: data.data.tasks[0].deadline,
      completed: data.data.tasks[0].completed === 'Y' ? true : false,
    }

    // update task with data from api
    task.value = taskObj.value
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
      },
    })
    // handle modal click
    firstModalButtonFunction.value = function () {
      error.value = false
      openModal.value = false
    }
    // handle modal click
    thirdModalButtonFunction.value = function () {
      error.value = false
      openModal.value = false
      location.reload(true)
    }
    console.log('unable to fetch:', err)
  }
}
//
// on mounted load tasks
onMounted(() => {
  // load tasks
  loadTasks(route.params.id)
})
//
//
// async function
const updateTask = async function (taskObj) {
  try {
    // try
    const taskData = await loadData(
      `http://localhost/v1/tasks/${route.params.id}`,
      {
        method: 'PATCH',
        // cache: 'no-cache',
        body: JSON.stringify(taskObj),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${userStore.value.getUser?.accessToken}`,
        },
      },
      {}
    )

    // handle error in returned data
    if (taskData.statusCode === 400) {
      let messageError = []

      // foreach on message
      taskData.messages.forEach((message) => {
        messageError.push(message)
      })

      throw new Error(messageError.toString())
    }

    // router push
    router.push('/')

    // catch
  } catch (err) {
    // handle errors with modal
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
      },
    })

    // handle modal click
    firstModalButtonFunction.value = function () {
      error.value = false
      openModal.value = false
    }
    // handle modal click
    thirdModalButtonFunction.value = function () {
      error.value = false
      openModal.value = false
      location.reload(true)
    }
  }
}
//
//
//
// submit form
const submitForm = async function () {
  try {
    // date function
    const taskDeadline = new Date(deadlineTask.value)
    const taskDate = taskDeadline.getDate()
    let taskMonth = taskDeadline.getMonth() + 1

    if (taskMonth.toString().length === 1) {
      taskMonth = '0' + taskMonth
    }

    const taskYear = taskDeadline.getFullYear()
    let taskHour = taskDeadline.getHours()

    if (taskHour.toString().length === 1) {
      taskHour = '0' + taskHour
    }

    let taskMinutes = taskDeadline.getMinutes()

    if (taskMinutes.toString().length === 1) {
      taskMinutes = '0' + taskMinutes
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
      completed: task.value.completed === true ? 'Y' : 'N',
    }

    // create task
    updateTask(taskObj)
  } catch (err) {
    // handle errors with modal
    dynamicModal({
      options: {
        optionsAmount: 2,
      },
      design: {
        typeOfModal: 'error',
        gridColumnAmount: 2,
      },
      content: {
        title: err,
        firstButtonText: 'Close',
        thirdButtonText: 'Reload Page',
      },
    })

    // handle modal click
    firstModalButtonFunction.value = function () {
      error.value = false
      openModal.value = false
    }
    // handle modal click
    thirdModalButtonFunction.value = function () {
      error.value = false
      openModal.value = false
      location.reload(true)
    }
  }
}
</script>
