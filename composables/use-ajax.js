export const useAjax = function (url) {
    const isPending = ref(null)
    const error = ref(null)
    const data = ref(null)
    const promise = usePromise(1000)

    const controller = new AbortController()
    const signal = controller.signal
    //
    setTimeout(() => {
        controller.abort()
    }, 8000)


    const loadData = async function (url) {
        try {
            isPending.value = true
            await promise
            const response = await fetch(url, {method: 'GET'});


            if (signal.aborted) {
                // throw new Error('Timeout error. Failed to load the task.')
                throw new Error('Failed to load the task. The loading time has been exceeded.')
            }

            // throw error if response is false
            if (response.ok == false) {
                throw new Error('Failed to load the task. Wrong task id.')
            }

            data.value = await response.json()
            isPending.value = false
            return data.value
        } catch (err) {
            isPending.value = false
            throw err;

        }

    }


    return {isPending, error, data, loadData}
}
