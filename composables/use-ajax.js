export const useAjax = function () {
    const isPending = ref(null);
    const error = ref(null);
    const data = ref(null);

    const controller = new AbortController();
    const signal = controller.signal;
    //
    const timer = setTimeout(() => {
        controller.abort();
    }, 2000);

    const loadData = async function (url, data = {}, responseTime = 0) {
        const promise = usePromise(responseTime);
        try {
            isPending.value = true;
            await promise;
            const response = await fetch(url, data);

            if (signal.aborted) {
                throw new Error('The loading time has been exceeded.');
            }

            // throw error if response is false
            if (response.ok === false) {
                throw new Error(`${response.statusText}. Response code: ${response.status}`);
            }

            // data
            data.value = await response.json();

            isPending.value = false;
            clearTimeout(timer);

            return data.value;
        } catch (err) {
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
