export const useAjax = function () {
  const isPending = ref(null);
  const error = ref(null);
  const data = ref(null);

  const controller = new AbortController();
  const signal = controller.signal;
  const abortTimeout = ref(null);
  const additionalTime = ref(null);
  //

  const loadData = async function (
    url,
    data = {},
    options = { pending: true, abortTimeoutTime: 8000, additionalCallTime: 0 }
  ) {
    // is pending
    isPending.value = options.pending;
    abortTimeout.value = options.abortTimeoutTime;
    additionalTime.value = options.additionalCallTime;

    // set is pending to null if not set
    if (isPending.value === undefined) {
      isPending.value = null;
    }
    // set abourt timeout time to 8000 if not set
    if (abortTimeout.value === undefined) {
      abortTimeout.value = 8000;
    }

    // set response timeout to 0 if not set
    if (additionalTime.value === undefined) {
      additionalTime.value = 0;
    }

    //
    // timer
    const timer = setTimeout(() => {
      controller.abort();
    }, abortTimeout.value);

    const promise = usePromise(additionalTime.value);
    try {
      // wait for additional response time
      await promise;

      // response
      const response = await fetch(url, data);

      // if loading time gets exceeded
      if (signal.aborted) {
        throw new Error('The loading time has been exceeded');
      }

      // handle errors
      if (response.status !== 200 && response.status !== 201) {
        // set data value to returned data
        data.value = await response.json();

        // new variable will include errors returned from server
        let errorsReturned = undefined;

        // check if data and error messages is returned
        if (data && data.value?.messages) {
          // log returned data after errors to client
          console.log('returned data with errors: ', data.value);

          // check if returned error messages is an array
          if (Array.isArray(data.value.messages)) {
            // set returned errors to new variable
            errorsReturned = data.value.messages

              // map over messages and prettify them
              .map((message, index) => {
                // prettify erros message. do not add punctuation if single message
                if (index < 1 && data.value.messages.length === 1) {
                  return message;
                }
                // prettify erros messages. add punctuation to first array item
                if (
                  index < 1 &&
                  data.value.messages.length > 1 &&
                  !message.slice(-1).includes('.')
                ) {
                  return message + '.';
                }
                // prettify erros messages. add punctuation if length of array is greater than 1
                if (
                  index >= 1 &&
                  !message.slice(-1).includes('.') &&
                  index < data.value.messages.length - 1
                ) {
                  return message + '.';
                  // else return array item
                } else {
                  return message;
                }

                //
              })
              .join(' ');
          } else {
            // if returned erros is not an array, then set equal to errors returned
            errorsReturned = data.value.messages;
          }
        }

        // throw new error with returned error messages
        throw new Error(
          `${response.statusText}. ${errorsReturned ? errorsReturned : ''}`
        );
      }

      // data
      data.value = await response.json();

      // clear timeout
      clearTimeout(timer);
      isPending.value = false;

      // return data
      return data.value;
    } catch (err) {
      clearTimeout(timer);
      isPending.value = false;
      error.value = err.message;
      throw err;
    }
  };

  return {
    isPending,
    error,
    data,
    loadData,
  };
};
