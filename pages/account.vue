<template>
  <div class="container mx-auto px-8 sm:px-6 lg:px-8 mb-48">
    <div v-if="userStore.getUser" class="mt-24">
      <h2 class="text-lg font-medium text-gray-900">Hello, {{ userStore.getUser.fullname }}</h2>
      <h2 class="text-lg font-medium text-gray-900">Username: {{ userStore.getUser.username }}</h2>
      <h2 class="text-lg font-medium text-gray-900">user ID: {{ userStore.getUser.userID }}</h2>
    </div>

    <p class="mt-8 text-sm text-gray-500">If you haven’t created a todo yet. Get started by selecting a template or
      start from an empty project.</p>
    <ul role="list" class="mt-12 border-t border-b border-gray-200 py-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
      <li class="flow-root">
        <div
            class="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-50 focus-within:ring-2 focus-within:ring-yellow-300">
          <div class="bg-green-400 flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-lg">
            <ViewListIcon class="h-6 w-6 text-white"></ViewListIcon>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-900">
              <NuxtLink to="/" class="focus:outline-none">
                <span class="absolute inset-0" aria-hidden="true"/>
                View Todos
              </NuxtLink>
            </h3>
            <p class="mt-1 text-sm text-gray-500">View all of your todos.</p>
          </div>
        </div>
      </li>
      <li class="flow-root">
        <div
            class="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-50 focus-within:ring-2 focus-within:ring-yellow-300">
          <div class="bg-yellow-400 flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-lg">
            <ViewListIcon class="h-6 w-6 text-white"></ViewListIcon>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-900">
              <NuxtLink to="/create" class="focus:outline-none">
                <span class="absolute inset-0" aria-hidden="true"/>
                Create a todo
              </NuxtLink>
            </h3>
            <p class="mt-1 text-sm text-gray-500">If you haven’t created a todo yet. Get started now.</p>
          </div>
        </div>
      </li>

      <li class="flow-root">
        <div
            class="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-50 focus-within:ring-2 focus-within:ring-yellow-300">
          <div class="bg-red-400 flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-lg">
            <ArrowCircleRightIcon class="h-6 w-6 text-white"></ArrowCircleRightIcon>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-900">
              <button @click="logout" class="focus:outline-none">
                <span class="absolute inset-0" aria-hidden="true"/>
                Log out
              </button>
            </h3>
            <p class="mt-1 text-sm text-gray-500">Log out from your account.</p>
          </div>
        </div>
      </li>
    </ul>
    <DynamicModal :type="typeModal" :id="idModal" :gridColumnAmount="gridColumnModal" :title="titleModal"
                  :description="descriptionModal" :firstButtonText="firstButtonModal"
                  :secondButtonText="secondButtonModal" :thirdButtonText="thirdButtonModal" :open="openModal"
                  @firstModalButtonFunction="firstModalButtonFunction"
                  @secondModalButtonFunction="secondModalButtonFunction"
                  @thirdModalButtonFunction="thirdModalButtonFunction" @toggleModal="openModal = !openModal">
    </DynamicModal>
  </div>
</template>


<script setup>
definePageMeta({
  middleware: ['auth'],
  // or middleware: 'auth'
})

// icons
import {ArrowCircleRightIcon, ViewListIcon} from '@heroicons/vue/outline'
import {useUsersStore} from '../stores'

//
// user store
const userStore = computed(() => {
  return useUsersStore()
})
//
// pending
const isPending = ref(null)
//
// use dynamic model
const {
  dynamicModal,
  openModal,
  //
  idModal,
  typeModal,
  gridColumnModal,
  titleModal,
  descriptionModal,
  firstButtonModal,
  secondButtonModal,
  thirdButtonModal,
} = useDynamicModal()

//
// set modal handle functions
const firstModalButtonFunction = ref(null)
const secondModalButtonFunction = ref(null)
const thirdModalButtonFunction = ref(null)

// handle submit form
const loadLogout = async function () {
  // try
  try {
    // pending
    isPending.value = true
    // pending
    isPending.value = false

    // invoke store action logout function
    await userStore.value.setLogout()

    // catch
  } catch (err) {
    // pending
    isPending.value = false
    // modal for error handling
    dynamicModal({
      design: {
        typeOfModal: 'error',
        gridColumnAmount: 2,
      },
      content: {
        title: err.message,
        firstButtonText: 'Close from account',
        thirdButtonText: 'Try again',
      },
    })
    // handle modal click
    firstModalButtonFunction.value = function () {
      openModal.value = false
    }
    // handle modal click
    thirdModalButtonFunction.value = function () {
      openModal.value = false
    }
  }
}

// logout
const logout = function () {
  dynamicModal({
    design: {
      typeOfModal: 'warning',
      gridColumnAmount: 2,
    },
    content: {
      title: 'Are you sure you want to logout',
      firstButtonText: 'Close',
      thirdButtonText: 'Log out',
    },
  })
  // handle modal click
  firstModalButtonFunction.value = function () {
    openModal.value = false
  }
  // handle modal click
  thirdModalButtonFunction.value = function () {
    openModal.value = false
    loadLogout()
  }
}
</script>
