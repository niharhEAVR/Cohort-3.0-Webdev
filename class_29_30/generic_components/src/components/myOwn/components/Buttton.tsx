import { type ReactElement } from "react";

interface ButtonInterface {
    title: string;
    size: "lg" | "sm" | "md";
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    variant: "primary" | "secondary";
    hover: "hprimary" | "hsecondary";
}

const sizeStyles = {
    "lg": "px-8 py-4 text-xl rounded-xl",
    "md": "px-4 py-2 text-md rounded-md",
    "sm": "px-2 py-1 text-sm rounded-sm",
}

const variantStyles = {
    "primary": "bg-blue-500 text-white",
    "secondary": "bg-blue-200 text-blue-800",
}

const hoverStyles = {
    "hprimary": "hover:bg-blue-400",
    "hsecondary": "hover:bg-blue-200",
}

export const Button = (props: ButtonInterface) => {

    return <button className={sizeStyles[props.size] + " " + variantStyles[props.variant] + " " + hoverStyles[props.hover]}>
        <div className="flex items-center">
            {props.startIcon}
            <div className="pl-1 pr-1">
                {props.title}
            </div>
            {props.endIcon}
        </div>
    </button>
}