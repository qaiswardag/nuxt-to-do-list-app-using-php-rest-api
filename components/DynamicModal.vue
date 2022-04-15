<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <TransitionRoot :show="open" as="template">
    <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="toggleModal">
      <div
          class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0"
                         enter-to="opacity-100" leave="ease-in duration-200"
                         leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span aria-hidden="true"
              class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        <TransitionChild as="template" enter="ease-out duration-300"
                         enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                         enter-to="opacity-100 translate-y-0 sm:scale-100"
                         leave="ease-in duration-200"
                         leave-from="opacity-100 translate-y-0 sm:scale-100"
                         leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div
              class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div>

              <div v-if="type ==='success'"
                   class="text-xl mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <CheckIcon aria-hidden="true" class="h-6 w-6 text-green-600"/>
              </div>

              <div v-if="type ==='warning'"
                   class="text-xl mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                <BellIcon aria-hidden="true" class="h-6 w-6 text-gray-600"/>
              </div>

              <div v-if="type ==='error'"
                   class="text-xl mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <ExclamationIcon aria-hidden="true" class="h-6 w-6 text-red-600"/>
              </div>

              <div class="mt-3 text-center sm:mt-5">
                <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                  {{ title }}
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    {{ description }}
                  </p>
                </div>
              </div>
            </div>

            <div
                :class="{'sm:grid-cols-1': gridColumnAmount === 1, 'sm:grid-cols-2': gridColumnAmount === 2, 'sm:grid-cols-3': gridColumnAmount === 3 }"
                class="mt-5 sm:mt-6 sm:grid sm:gap-3 sm:grid-flow-row-dense">

              <div v-if="cancelButtonText">
                <button ref="cancelButtonRef"
                        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 sm:mt-0 sm:col-start-1 sm:text-sm"
                        type="button"
                        @click="cancelButton">
                  {{ cancelButtonText }}
                </button>
              </div>

              <div v-if="discardButtonText">
                <button
                    class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-100 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 sm:mt-0 sm:col-start-1 sm:text-sm"
                    type="button"
                    @click="discardButton">
                  {{ discardButtonText }}
                </button>
              </div>

              <div v-if="acceptButtonText">
                <div v-if="type ==='success'">
                  <button
                      class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-700 text-base font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 sm:col-start-2 sm:text-sm"
                      type="button"
                      @click="acceptButton">
                    {{ acceptButtonText }}
                  </button>
                </div>

                <div v-if="type ==='warning'">
                  <button
                      class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-200 text-base font-medium text-gray-700 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-200 sm:col-start-2 sm:text-sm"
                      type="button"
                      @click="acceptButton">
                    {{ acceptButtonText }}
                  </button>
                </div>

                <div v-if="type ==='error'">
                  <button
                      class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-200 text-base font-medium text-gray-700 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-200 sm:col-start-2 sm:text-sm"
                      type="button"
                      @click="acceptButton">
                    {{ acceptButtonText }}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { ref } from 'vue';
import { CheckIcon, ExclamationIcon, BellIcon } from '@heroicons/vue/outline';
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue';

export default {
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    CheckIcon,
    ExclamationIcon,
    BellIcon
  },
  props: {
    optionsAmount: {
      type: Number,
      required: true,
    },
    gridColumnAmount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cancelButtonText: {
      type: String,
      required: true,
    },
    discardButtonText: {
      type: String,
    },
    acceptButtonText: {
      type: String,
    },
    open: {
      required: true,
    }
  },

  setup(props, context) {
    // open
    // const open = ref(true);

    // cancel function
    const cancelButton = function () {
      context.emit('cancelModal');
    };

    // discard  function
    const discardButton = function () {
      context.emit('discardModal');
    };

    // accept function
    const acceptButton = function () {
      context.emit('acceptModal');
    };

    // open modal function
    const toggleModal = function () {
      context.emit('toggleModal');
    };
    //
    return {
      cancelButton,
      discardButton,
      acceptButton,
      toggleModal

    };
  },
};
</script>
