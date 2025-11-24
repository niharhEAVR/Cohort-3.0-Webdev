import { atom, selector, DefaultValue } from "recoil";

export const tempF = atom({
    key: "tempF",
    default: 32
})

export const tempC = selector({
    key: "tempC",
    get: ({ get }) => (((get(tempF) - 32) * 5) / 9),
    set: ({ set }, newValue) =>
        set(
            tempF,
            newValue instanceof DefaultValue ? newValue : ((newValue * 9) / 5) + 32
        )
})

