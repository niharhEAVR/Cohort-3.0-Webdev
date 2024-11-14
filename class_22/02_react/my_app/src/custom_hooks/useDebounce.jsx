import { useRef } from 'react';
import { useState, useEffect } from 'react';

export const useDebounce = (originalFn) => {
    const currentClock = useRef();

    const debouncedValue = ()=>{
        clearTimeout(currentClock.current);
        currentClock.current = setTimeout(originalFn,200)
    }

    return debouncedValue;
};




// if you do not understand what is deBounce then read 02_Debounce.md
// to understand the code read 03_notes.md