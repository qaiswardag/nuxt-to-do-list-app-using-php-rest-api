<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
        <input name="remember" type="hidden" value="true"/>
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label class="sr-only" for="fullname">Full name</label>
            <input id="fullname" v-model="fullname" autocomplete="off"
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   name="fullname" placeholder="Full name"
                   required=""
                   type="text"/>
          </div>

          <div>
            <label class="sr-only" for="username">Username</label>
            <input id="username" v-model="username" autocomplete="off"
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   name="username" placeholder="Username"
                   required=""
                   type="text"/>
          </div>


          <div>
            <label class="sr-only" for="password">Password</label>
            <input id="password" v-model="password" autocomplete="current-password"
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   name="password" placeholder="Password"
                   required=""
                   type="password"/>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me"
                   class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                   name="remember-me"
                   type="checkbox"/>
            <label class="ml-2 block text-sm text-gray-900" for="remember-me"> Remember me </label>
          </div>

          <div class="text-sm">
            <a class="font-medium text-gray-800 hover:text-yellow-600" href="#"> Forgot your
              password? </a>
          </div>
        </div>

        <!--  login -->
        <div v-if="!isPending">
          <button
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-800 bg-yellow-200 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300"
              type="submit">
            Submit
          </button>
        </div>
        <!-- loading-->
        <div v-if="isPending">
          <button
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-not-allowed"
              disabled
              type="submit">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                 fill="none"
                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                      stroke-width="4"></circle>
              <path class="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    fill="currentColor"></path>
            </svg>
            Loading...
          </button>
        </div>

        <div>
          <div class="rounded-md bg-red-50 p-4">
            <div class="flex py-2 gap-2">
              <div class="flex-shrink-0">
                <XCircleIcon aria-hidden="true" class="h-5 w-5 text-red-400"/>
              </div>
              <div>
                <h3 class="text-sm font-medium text-red-800">email error ....</h3>
              </div>
            </div>
            <div class="flex py-2 gap-2">
              <div class="flex-shrink-0">
                <XCircleIcon aria-hidden="true" class="h-5 w-5 text-red-400"/>
              </div>
              <div>
                <h3 class="text-sm font-medium text-red-800">password error .....</h3>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="rounded-md bg-red-50 p-4">
            <div class="flex py-2 gap-2">
              <div class="flex-shrink-0">
                <XCircleIcon aria-hidden="true" class="h-5 w-5 text-red-400"/>
              </div>
              <div>
                <h3 class="text-sm font-medium text-red-800">Your email and password do not match.
                  Please try again.</h3>
              </div>
            </div>
            <!-- create new account if none user -->
            <div class="flex py-2 gap-2">
              <div class="flex-shrink-0">
                <XCircleIcon aria-hidden="true" class="h-5 w-5 text-red-400"/>
              </div>
              <div>
                <h3 class="text-sm font-medium text-red-800">If you don't have an account, please
                  sign up
                  <NuxtLink to="/register" class="text-gray-800">here!</NuxtLink>
                </h3>
              </div>
            </div>

          </div>
        </div>
      </form>
    </div>
    <DynamicModal :type="typeModal" :optionsAmount="optionsModal" :gridColumnAmount="gridColumnModal"
                  :title="titleModal" :description="descriptionModal" :firstButtonText="firstButtonModal"
                  :secondButtonText="secondButtonModal" :thirdButtonText="thirdButtonModal" :open="openModal"
                  @firstModalButtonFunction="firstModalButtonFunction"
                  @secondModalButtonFunction="secondModalButtonFunction"
                  @thirdModalButtonFunction="thirdModalButtonFunction" @toggleModal="openModal = !openModal">
    </DynamicModal>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue';
import {useRouter} from 'vue-router';
import {XCircleIcon} from '@heroicons/vue/solid';


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

// import ajax
const {isPending, error, loadData} = useAjax()


//
// user details
const fullname = ref(null);
const username = ref(null);
const password = ref(null);


// handle submit form
const submit = function () {
  console.log('fullname given as: ', fullname.value)
  console.log('username given as: ', username.value)
  console.log('password given as: ', password.value)
}
</script>
