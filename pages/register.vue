<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div v-if="isPending">
      <Spinner></Spinner>
    </div>
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Register for free</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          {{ ' ' }}
          sign in to existing
          <NuxtLink to="/login" class="text-yellow-600">account!</NuxtLink>
        </p>
      </div>
      <form action="#" class="mt-8 space-y-6" method="POST" @submit.prevent="submit">
        <input name="remember" type="hidden" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label class="sr-only" for="username">Full name</label>
            <input id="fullname" v-model="user.fullname" autocomplete="off" class="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" name="fullname" placeholder="Full name" required="" type="text" />
          </div>

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
    <DynamicModal :type="typeModal" :id="idModal" :gridColumnAmount="gridColumnModal" :title="titleModal" :description="descriptionModal" :firstButtonText="firstButtonModal" :secondButtonText="secondButtonModal" :thirdButtonText="thirdButtonModal" :open="openModal" @firstModalButtonFunction="firstModalButtonFunction" @secondModalButtonFunction="secondModalButtonFunction" @thirdModalButtonFunction="thirdModalButtonFunction" @toggleModal="openModal = !openModal">
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

// set modal handle functions
const firstModalButtonFunction = ref(null)
const secondModalButtonFunction = ref(null)
const thirdModalButtonFunction = ref(null)

// pending
const isPending = ref(null)

// user details
const user = ref({ fullname: '', username: '', password: '' })

// handle submit form
const submit = async function () {
  try {
    // pending
    isPending.value = true
    // invoke store action register function
    const data = await userStore.setRegister(user.value)
    // pending
    isPending.value = false

    // modal successfully login
    dynamicModal({
      design: {
        typeOfModal: 'success',
        gridColumnAmount: 2,
      },
      content: {
        title: 'Successfully created your account',
        description: `<p>Full name: ${data.data.fullname}, Username: ${data.data.username}, User ID: ${data.data.user_id}</p>`,
        firstButtonText: 'Close',
        thirdButtonText: 'Go to login page',
      },
    })

    // handle modal click
    firstModalButtonFunction.value = function () {
      openModal.value = false
      // router push
      router.push('/login')
    }
    // handle modal click
    thirdModalButtonFunction.value = function () {
      openModal.value = false
      // router push
      router.push('/login')
    }
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

    console.log('registration error: ', err)
  }
}
</script>
