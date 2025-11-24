import { useEffect, useRef } from "react"

export function usePrev(value) {
    const ref = useRef()
    console.log("re-render happened with new value: " + value);

    useEffect(() => {
        console.log("updated value: " + value);
        ref.current = value
    }, [value])

    console.log("returned value: " + ref.current);
    return ref.current
}

// it returns first then the effect gets called later