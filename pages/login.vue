<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div v-if="isPending">
      <Spinner></Spinner>
    </div>
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          {{ ' ' }}
          sign up
          <NuxtLink to="/register" class="text-yellow-600">today!</NuxtLink>
        </p>
      </div>
      <form action="#" class="mt-8 space-y-6" method="POST" @submit.prevent="submit">
        <input name="remember" type="hidden" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label class="sr-only" for="username">Username</label>
            <input id="username" v-model="user.username" autocomplete="off" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" name="username" placeholder="Username" required="" type="text" />
          </div>

          <div>
            <label class="sr-only" for="password">Password</label>
            <input id="password" v-model="user.password" autocomplete="current-password" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" name="password" placeholder="Password" required="" type="password" />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" name="remember-me" type="checkbox" />
            <label class="ml-2 block text-sm text-gray-900" for="remember-me"> Remember me </label>
          </div>

          <div class="text-sm">
            <a class="font-medium text-gray-800 hover:text-yellow-600" href="#"> Forgot your
              password? </a>
          </div>
        </div>

        <!--  submit button -->
        <div>
          <button class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-800 bg-yellow-200 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
    <DynamicModal :type="typeModal" :optionsAmount="optionsModal" :gridColumnAmount="gridColumnModal" :title="titleModal" :description="descriptionModal" :firstButtonText="firstButtonModal" :secondButtonText="secondButtonModal" :thirdButtonText="thirdButtonModal" :open="openModal" @firstModalButtonFunction="firstModalButtonFunction" @secondModalButtonFunction="secondModalButtonFunction" @thirdModalButtonFunction="thirdModalButtonFunction" @toggleModal="openModal = !openModal">
    </DynamicModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUsersStore } from '../stores'

// store
const userStore = useUsersStore()

// use router
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

// pending
const isPending = ref(null)

//
// user details
const user = ref({ username: '', password: '' })

// handle submit form
const submit = async function () {
  // try
  try {
    // pending
    isPending.value = true
    // invoke store action login function
    await userStore.setLogin(user.value)
    // pending
    isPending.value = false
    // push to account page
    router.push('/account')

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

    console.log('login error: ', err)
  }
}
</script>
