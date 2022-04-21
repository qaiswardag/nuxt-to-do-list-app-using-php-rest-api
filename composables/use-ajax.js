export const useAjax = function () {
    const isPending = ref(null);
    const error = ref(null);
    const data = ref(null);

    const controller = new AbortController();
    const signal = controller.signal;
    //

    const loadData = async function (url, data = {}, responseTime = 300) {
        // timer
        const timer = setTimeout(() => {
            controller.abort();
        }, 2000);

        const promise = usePromise(responseTime);
        try {
            // is pending
            isPending.value = true;
            await promise;

            // response
            const response = await fetch(url, data);

            // if loading time gets exceeded
            if (signal.aborted) {
                throw new Error('The loading time has been exceeded.');
            }

            // throw error if response is 404
            if (response.status === 404) {
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
