
interface PropType {
    placeholder: string;
    size: "big" | "small";
    onChange: any;
}

export function TextInput({
    placeholder,
    size,
    onChange
}: PropType) {

    return <input onChange={onChange} placeholder={placeholder} style={{
        padding: size === "big" ? 20 : 10,
        margin: size === "big" ? 20 : 10,
        borderColor: "white",
        borderWidth: 2,
    }}></input>
}