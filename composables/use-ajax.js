export const useAjax = function () {
    const isPending = ref(null);
    const error = ref(null);
    const data = ref(null);

    const controller = new AbortController();
    const signal = controller.signal;
    //

    const loadData = async function (url, data = {}, responseTime = 0) {
        // timer
        const timer = setTimeout(() => {
            controller.abort();
        }, 8000);


        console.log('let see the data::::', data)


        const promise = usePromise(responseTime);
        try {
            // is pending
            isPending.value = true;
            await promise;
            const response = await fetch(url, data);

            // console.log('response isøøøøøøø::', response)

            if (signal.aborted) {
                throw new Error('The loading time has been exceeded.');
            }

            // throw error if response is false
            if (response.ok === false) {
                throw new Error(`${response.statusText}. Response code: ${response.status}`);
            }

            // data
            data.value = await response.json();

            clearTimeout(timer);
            isPending.value = false;
            // return
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
        loadData
    };
};
