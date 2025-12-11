import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { FolderSync } from "lucide-react";
import { useState, useEffect } from "react";

import { useBackendStore } from "@/store/backend.store"

import { handleGetSharedContents } from "@/pages/SharedBrainPage";
import type { ContentResponse } from "@/types/content.type";
import { useParams } from "react-router-dom";

type CleanContentItem = {
    title: string;
    link: string;
    type: string;
    tags: string[];
};

async function handleDelete(id: string, content: ContentResponse) {
    const token = localStorage.getItem("token");
    try {

        const origContent = content.content.find(x => id === x._id)

        const cleanData: CleanContentItem = {
            title: origContent!.title,
            link: origContent!.link,
            type: origContent!.type,
            tags: origContent!.tags.map((t) => t.title),
        };
        console.log(cleanData);

        const res = await fetch(`${useBackendStore.getState().VITE_BACKEND_URL}/${useBackendStore.getState().VITE_BACKEND_URL_VERSIONS}/content`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cleanData),
        });

        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        console.log(data);

        alert(data.message)
    } catch (error) {
        console.error("Error logging in:", error);
    }
}

export function SyncConfirmPopover(props: { id: string }) {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState<ContentResponse>({ content: [] });
    const { shareId } = useParams<{ shareId: string }>();

    useEffect(() => {
        async function fetch() {
            const result = await handleGetSharedContents(shareId!);
            setContent({ content: result.content });
            console.log(result);
        }
        fetch();
    }, [shareId])

    console.log(content);



    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <FolderSync className="w-4 h-4 text-blue-500" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-56 p-4 space-y-4">
                <p className="text-sm font-medium text-blue-600">
                    Are you sure you want to Sync this content?
                </p>

                <div className="flex justify-end gap-2">
                    <Button variant="outline" className="px-3" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>

                    <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3"
                        onClick={async () => {
                            await handleDelete(props.id, content);
                            setOpen(false);
                        }}
                    >
                        Sync
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}