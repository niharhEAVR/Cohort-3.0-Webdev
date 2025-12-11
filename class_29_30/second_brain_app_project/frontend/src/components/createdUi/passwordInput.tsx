import { Input } from "../ui/input";

import { useEyeStore } from "@/store/eye.store"
import { Eye, EyeOff } from "lucide-react"
import { forwardRef } from "react";

const PassWordComponent = forwardRef<HTMLInputElement>((props, ref) => {
    const eye = useEyeStore();
    return (<>

        {/* Password Input Wrapper */}
        <div className="relative" >
            <Input
                id="password"
                type={eye.showPassword ? "text" : "password"}
                required
                placeholder="Cooldude@200"
                ref={ref}
                className="pr-10"
            />

            {/* Eye Button */}
            <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                onClick={eye.togglePassword}
            >
                {eye.showPassword ? (
                    <EyeOff className="h-5 w-5" />
                ) : (
                    <Eye className="h-5 w-5" />
                )}
            </button>
        </div >
    </>)
});

export default PassWordComponent;