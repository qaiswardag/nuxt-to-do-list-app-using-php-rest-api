<template>
  <div class="pt-20 sm:px-20 px-8 text-center pb-60 bg-gray-100 min-h-screen">
    <div v-if="isPending">
      <Spinner></Spinner>
    </div>

    <div v-if="tasks">
      <div v-if="!isPending">
        <div class="sm:grid sm:grid-cols-2 sm:gap-6 grid grid-cols-1 gap-8">
          <div v-for="(task) in tasks" :key="task.id" class="grid-cols-1 border border-gray-100 p-4 rounded-md bg-white gap-4">
            <div class="flex justify-center items-center gap-2 pb-4">
              <Switch v-model="task.completed" @click="toggleCompleted(task.id, task.completed)" :class="[task.completed ? 'bg-green-600' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300']">
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
              <NuxtLink :to="'/update/' + task.id" type="button" class="inline-flex items-center p-0.5 border border-transparent rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600">
                <PencilIcon class="h-4 w-4" aria-hidden="true" />
              </NuxtLink>
              <button @click="deleteTask(task.id)" type="button" class="inline-flex items-center p-0.5 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600">
                <TrashIcon class="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <p class="text-xs bg-yellow-100 px-2 py-1 text-gray-800 rounded-md ml-2 flex justify-center items-center">
              Deadline:
              {{
                task.deadline ? task.deadline : 'None'
              }}
            </p>

            <div class="w-full inline-block  group focus-within:ring-2 focus-within:ring-inset focus-within:ring-yellow-300 rounded-md py-16 px-8">
              <TaskDetails :task="task"></TaskDetails>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div v-if="tasks">
      <div v-if="!isPending">
        <nav aria-label="Pagination" class="bg-white px-4 py-3 flex items-center justify-between sm:px-6 mt-4 rounded-md">
          <div class="hidden sm:block">
            <p class="text-gray-800">
              Page
              {{ ' ' }}
              <span class="font-medium">{{
                  currentPage
                }}</span>
              {{ ' ' }}
              of
              {{ ' ' }}
              <span class="font-medium">{{
                  pagesRowsDataFromApi.totalPages
                }} | </span>
              {{ ' ' }}
              Total results {{ pagesRowsDataFromApi.totalRows }}
            </p>
          </div>
          <div class="flex-1 flex justify-between sm:justify-end gap-2">
            <input type="button" :class="{'opacity-20 cursor-not-allowed': !pagesRowsDataFromApi.hasPreviousPage}" class="cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-yellow-200 hover:bg-yellow-300" href="#" @click="loadTasks(currentPage = currentPage - 1)" value="Previous" :disabled="!pagesRowsDataFromApi.hasPreviousPage">

            <input type="button" :class="{'opacity-20 cursor-not-allowed': !pagesRowsDataFromApi.hasNextPage}" class="cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-yellow-200 hover:bg-yellow-300" href="#" @click="loadTasks(currentPage = currentPage + 1)" value="Next" :disabled="!pagesRowsDataFromApi.hasNextPage">
          </div>
        </nav>
      </div>
    </div>

    <DynamicModal :type="typeModal" :optionsAmount="optionsModal" :gridColumnAmount="gridColumnModal" :title="titleModal" :description="descriptionModal" :firstButtonText="firstButtonModal" :secondButtonText="secondButtonModal" :thirdButtonText="thirdButtonModal" :open="openModal" @firstModalButtonFunction="firstModalButtonFunction" @secondModalButtonFunction="secondModalButtonFunction" @thirdModalButtonFunction="thirdModalButtonFunction" @toggleModal="openModal = !openModal">
    </DynamicModal>

  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Switch } from '@headlessui/vue'
import { TrashIcon, PencilIcon, CalendarIcon } from '@heroicons/vue/solid'
import { useUsersStore } from '../stores'

// use router
const router = useRouter()
// use dynamic model

const userStore = computed(() => {
  return useUsersStore()
})

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
const tasks = ref([])
// tasks object for collecting relevant data from api and renamming
const tasksObj = ref({})
// page, row, page etc. for each call
const pagesRowsDataFromApi = ref({})
// import ajax
const { isPending, error, loadData } = useAjax()
// current page
const currentPage = ref(1)
//
console.log('er:::', userStore.value.getUser.accessToken)
//
// async function
const loadTasks = async function (pageNumber) {
  // set tasks object to empty on each load
  tasksObj.value = {}
  // set tasks array to empty on each load
  tasks.value = []
  try {
    // try
    const data = await loadData(
      `http://localhost/v1/tasks/page/${pageNumber}`,
      {
        headers: {
          Authorization: `${userStore.value.getUser.accessToken}`,
        },
        cache: 'no-cache',
      },
      {}
    )
    //
    //
    data.data.tasks.forEach((task) => {
      //
      tasksObj.value = {
        id: task.id,
        title: task.title,
        description: task.description,
        deadline: task.deadline,
        completed: task.completed === 'Y' ? true : false,
      }
      // update tasks
      tasks.value.push(tasksObj.value)
    })
    // pages rows amount related data from api
    pagesRowsDataFromApi.value = {
      hasNextPage: data.data.has_next_page,
      hasPreviousPage: data.data.has_previous_page,
      rowsReturned: data.data.rows_returned,
      totalPages: data.data.total_pages,
      totalRows: data.data.total_rows,
    }
    //
    //
    // catch
  } catch (err) {
    // modal for error handling
    dynamicModal({
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

      location.reload()
    }
    // log erros
    console.log('unable to fetch:', err)
  }
}
//
//
//
const toggleCompleted = async function (id, completedTask) {
  // update task completed
  try {
    // try
    const data = await loadData(
      `http://localhost/v1/tasks/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ completed: completedTask === true ? 'Y' : 'N' }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
      {}
    )

    // handle error in returned data
    if (data.statusCode === 400) {
      let messageError = []

      // foreach on message
      data.messages.forEach((message) => {
        messageError.push(message)
      })

      throw new Error(messageError.toString())
    }

    // catch
  } catch (err) {
    // error messages
    dynamicModal({
      design: {
        typeOfModal: 'error',
        gridColumnAmount: 1,
      },
      content: {
        title: err.message,
        firstButtonText: 'Refresh Page',
      },
    })
    //
    // handle modal click
    firstModalButtonFunction.value = function () {
      error.value = false
      openModal.value = false
      location.reload()
    }
    console.log('unable to fetch:', err)
  }
}

//
//
const deleteTask = function (id) {
  // accept deletion of task modal
  dynamicModal({
    design: {
      typeOfModal: 'warning',
      gridColumnAmount: 2,
    },
    content: {
      title: 'Are you sure you want to delete this task?',
      firstButtonText: 'Close',
      thirdButtonText: 'Delete task',
    },
  })
  // handle modal click button
  firstModalButtonFunction.value = function () {
    openModal.value = false
  }

  // handle modal click button for deletion
  thirdModalButtonFunction.value = async function () {
    openModal.value = false

    // try delete task
    try {
      const data = await loadData(
        `http://localhost/v1/tasks/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
        {}
      )

      // load tasks after deletion of unique task
      loadTasks(currentPage.value)

      //  catch
    } catch (err) {
      dynamicModal({
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
      // handle modal click button
      firstModalButtonFunction.value = function () {
        openModal.value = false
      }
      // handle modal click button
      firstModalButtonFunction.value = function () {
        openModal.value = false
        location.reload()
      }
      console.log('unable to fetch:', err)
    }
  }
}
//
//
// on mounted load tasks
onMounted(() => {
  loadTasks(currentPage.value)
})
//

//
</script>
