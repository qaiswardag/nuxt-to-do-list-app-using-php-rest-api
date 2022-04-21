import {ref} from 'vue';
// open modal
const openModal = ref(false);
// modal content
const typeModal = ref('');
const optionsModal = ref(Number(1));
const gridColumnModal = ref(Number(1));
const titleModal = ref('');
const descriptionModal = ref('');
const firstButtonModal = ref('');
const secondButtonModal = ref(null);
const thirdButtonModal = ref(null);

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
                                           title = 'New message',
                                           description = `Auto generated message. ${title}`,
                                           firstButtonText = 'Close',
                                           secondButtonText,
                                           thirdButtonText
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
        firstButtonModal.value = firstButtonText;
        secondButtonModal.value = secondButtonText;
        thirdButtonModal.value = thirdButtonText;
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
        firstButtonModal,
        secondButtonModal,
        thirdButtonModal,
    };
};

export default useDynamicModal;
