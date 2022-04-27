<template>
  <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between">
    <div v-if="isPending">
      <Spinner></Spinner>
    </div>
    <div>
      <h2 class="mb-6 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
        <span class="block">Are you sure you want to logout?</span>
      </h2>
      <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
        <div class="inline-flex rounded-md shadow">
          <button @click="logout" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-yellow-200 hover:bg-yellow-300"> Log out </button>
        </div>
      </div>
    </div>
    <DynamicModal :type="typeModal" :optionsAmount="optionsModal" :gridColumnAmount="gridColumnModal" :title="titleModal" :description="descriptionModal" :firstButtonText="firstButtonModal" :secondButtonText="secondButtonModal" :thirdButtonText="thirdButtonModal" :open="openModal" @firstModalButtonFunction="firstModalButtonFunction" @secondModalButtonFunction="secondModalButtonFunction" @thirdModalButtonFunction="thirdModalButtonFunction" @toggleModal="openModal = !openModal">
    </DynamicModal>
  </div>
</template>


<script setup>
import { useUsersStore } from '../stores'
import { useRouter } from 'vue-router'
// store
const userStore = useUsersStore()
// use router
const router = useRouter()

// set modal handle functions
const firstModalButtonFunction = ref(null)
const secondModalButtonFunction = ref(null)
const thirdModalButtonFunction = ref(null)

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

// pending
const isPending = ref(null)

// handle submit form
const logout = async function () {
  // try
  try {
    // pending
    isPending.value = true
    // invoke store action login function
    await userStore.setLogout()
    // pending
    isPending.value = false

    // modal for success logout
    dynamicModal({
      options: {
        optionsAmount: 2,
      },
      design: {
        typeOfModal: 'success',
        gridColumnAmount: 2,
      },
      content: {
        title: 'You successfully logged out',
        firstButtonText: 'Close',
        thirdButtonText: 'Go to login',
      },
    })
    // handle modal click
    firstModalButtonFunction.value = function () {
      openModal.value = false
    }
    // handle modal click
    thirdModalButtonFunction.value = function () {
      openModal.value = false
      // push to account page
      router.push('/login')
    }

    // catch
  } catch (err) {
    // pending
    isPending.value = false
    // modal for error handling
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

    console.log('logout error: ', err)
  }
}
</script>
