import { useRef, useState } from "react";

export const Otp = () => {
    const refs = [useRef(), useRef(), useRef(), useRef()];

    return (
        <div className="flex justify-center items-center font-bold">
            {refs.map((ref, index) => (
                <SubOtpBox
                    key={index}
                    reference={ref}
                    onDone={() => {
                        if (index < refs.length - 1) {
                            refs[index + 1].current.focus();
                        }
                    }}
                    onBack={() => {
                        if (index > 0) {
                            refs[index - 1].current.focus();
                        }
                    }}
                />
            ))}
        </div>
    );
};

function SubOtpBox({ reference, onDone, onBack }) {
    const [value, setValue] = useState("");

    return (
        <input
            ref={reference}
            value={value}
            maxLength={1}
            onKeyUp={(e) => {
                if (e.key === "Backspace" && value === "") {
                    onBack();
                }
            }}
            onChange={(e) => {
                const val = e.target.value;

                if (/^[0-9]$/.test(val)) {
                    setValue(val);
                    onDone();
                } else {
                    setValue(""); // block alphabets, symbols
                }
            }}
            className="m-1 w-[40px] h-[50px] rounded-xl bg-slate-400 outline-none text-center text-lg text-black"
            type="text"
        />
    );
}
