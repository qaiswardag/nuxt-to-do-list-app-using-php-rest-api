import { ref } from 'vue';
// open modal
const openModal = ref(false);
// modal content
const typeModal = ref('');
const idModal = ref(Number(null));
const gridColumnModal = ref(Number(1));
const titleModal = ref('');
const descriptionModal = ref('');
const firstButtonModal = ref('');
const secondButtonModal = ref(null);
const thirdButtonModal = ref(null);

const useDynamicModal = function () {
  const dynamicModal = function ({
    design: { typeOfModal = 'success', gridColumnAmount = 1 },
    content: {
      id = 0,
      title = 'New message',
      description = `${title}`,
      firstButtonText = 'Close',
      secondButtonText,
      thirdButtonText,
    },
  }) {
    // open modal set to true
    openModal.value = true;
    // get content for modal
    console.log();
    idModal.value = id;

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
    idModal,
    typeModal,
    gridColumnModal,
    titleModal,
    descriptionModal,
    firstButtonModal,
    secondButtonModal,
    thirdButtonModal,
  };
};

export default useDynamicModal;
