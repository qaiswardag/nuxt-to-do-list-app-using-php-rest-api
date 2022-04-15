import {ref} from 'vue';
// open modal
const openModal = ref(false);
// modal content
const typeModal = ref('');
const optionsModal = ref(Number(1));
const gridColumnModal = ref(Number(1));
const titleModal = ref('');
const descriptionModal = ref('');
const cancelButtonModal = ref('');
const discardButtonModal = ref(null);
const acceptButtonModal = ref(null);

const useDynamicModal = function () {

    const dynamicModal = function ({
                                       options: {
                                           optionsAmount = 1,
                                       },
                                       design: {
                                           typeOfModal = 'success',
                                           gridColumnAmount = 1,
                                       },
                                       content: {
                                           title = 'Simple error message',
                                           description = 'Something went wrong. Please try again.',
                                           cancelButtonText = 'Cancel',
                                           discardButtonText,
                                           acceptButtonText
                                       }
                                   }) {
        // open modal set to true
        openModal.value = true;
        // get content for modal
        optionsModal.value = optionsAmount;
        gridColumnModal.value = gridColumnAmount;
        typeModal.value = typeOfModal;
        titleModal.value = title;
        descriptionModal.value = description;
        cancelButtonModal.value = cancelButtonText;
        discardButtonModal.value = discardButtonText;
        acceptButtonModal.value = acceptButtonText;
    };

    return {
        dynamicModal,
        openModal,
        //
        typeModal,
        optionsModal,
        gridColumnModal,
        titleModal,
        descriptionModal,
        cancelButtonModal,
        discardButtonModal,
        acceptButtonModal,
    };
};

export default useDynamicModal;
