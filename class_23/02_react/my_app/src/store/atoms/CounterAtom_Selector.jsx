import { atom, selector } from "recoil";

export const CounterAtom = atom({
    key: "Counter",
    default: 0
})

export const EvenSelector = selector({
    key: "EvenSelector",
    get: function ({get}) {
        const currentCount = get(CounterAtom)
        const isEven = (currentCount%2===0)
        return isEven
    }
})

// read 03_selector.md