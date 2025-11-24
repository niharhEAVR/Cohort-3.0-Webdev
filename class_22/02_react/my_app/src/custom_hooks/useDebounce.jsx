import { useRef } from 'react';

export const useDebounce = (originalFn) => {
    const currentClock = useRef();

    const debouncedValue = () => {
        clearTimeout(currentClock.current);
        currentClock.current = setTimeout(originalFn, 1000)
    }

    return debouncedValue;
};