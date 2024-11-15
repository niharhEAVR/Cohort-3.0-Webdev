import { atom, selector } from "recoil";

export const counterAtom = atom({
    key: "Counter",
    default: 0
})

export const evenSelector = selector({
    key: "EvenSelector",
    get: function ({get}) {
        const currentCount = get(counterAtom)
        const isEven = (currentCount%2===0)
        return isEven
    }
})

// read 03_selector.md