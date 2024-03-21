"use client "
const { useState, useEffect } = require("react")

const useDebounceSearch = (value, delay=500) => {

    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        },delay);

        return () => clearTimeout(timeout);
    },[value, delay])

    return debouncedValue

}

export default useDebounceSearch;