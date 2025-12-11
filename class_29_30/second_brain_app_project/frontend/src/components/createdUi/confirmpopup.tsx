import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";

import { useBackendStore } from "@/store/backend.store"
import { useContentStore } from "@/store/content.store"

async function handleDelete(id: string) {
    const token = localStorage.getItem("token");
    try {
        const res = await fetch(`${useBackendStore.getState().VITE_BACKEND_URL}/${useBackendStore.getState().VITE_BACKEND_URL_VERSIONS}/content`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contentId: id
            }),
        });

        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        if (!data) throw new Error("Check username or password")
        console.log(data);

        useContentStore.getState().deleteContent(id)
        console.log(useContentStore.getState().content);
        

        alert(data.message)
    } catch (error) {
        console.error("Error logging in:", error);
    }
}

export function DeleteConfirmPopover(props: { id: string }) {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-56 p-4 space-y-4">
                <p className="text-sm font-medium text-red-600">
                    Are you sure you want to delete?
                </p>

                <div className="flex justify-end gap-2">
                    <Button variant="outline" className="px-3" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>

                    <Button
                        className="bg-red-600 hover:bg-red-700 text-white px-3"
                        onClick={async () => {
                            await handleDelete(props.id);
                            setOpen(false);
                        }}
                    >
                        Delete
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}