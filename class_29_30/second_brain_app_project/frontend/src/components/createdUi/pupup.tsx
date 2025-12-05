import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";

import { Plus } from "lucide-react";
import { useContentInputStore } from "@/store/content.store";
import { usePopupStore } from "@/store/popup.store";
import { useBackendStore } from "@/store/backend.store"
import { useContentStore } from "@/store/content.store";

export function ApiInputPopover() {
    const { open, setOpen } = usePopupStore();
    const { VITE_BACKEND_URL, VITE_BACKEND_URL_VERSIONS } = useBackendStore();

    const { link, setLink, title, setTitle, type, setType, tagsInput, setTagsInput, reset } = useContentInputStore();

    const handleSubmit = async () => {

        const token = localStorage.getItem("token");
        
        try {

            const tagsArr:string[] = tagsInput.split(",").map(x=>x.trim()).filter(x=>x.length>0);
            
            const res = await fetch(`${VITE_BACKEND_URL}/${VITE_BACKEND_URL_VERSIONS}/content`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    link: link,
                    type: type,
                    title: title,
                    tags: tagsArr
                }),
            });
            
            if (!res.ok) throw new Error("API error");
            const data = await res.json();
            if (!data) throw new Error("Check username or password")
                console.log(data);
            
            console.log(link, title, type, tagsArr);
            useContentStore.getState().addContent(data.content)

            reset();
            alert("content added")
            setOpen(false);
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4" /> Add Content
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-64 p-4">
                <div className="grid gap-4">

                    {/* Link */}
                    <div className="space-y-1">
                        <Label htmlFor="link">Link</Label>
                        <Input
                            id="link"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="https://example.com"
                        />
                    </div>

                    {/* Title */}
                    <div className="space-y-1">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter title"
                        />
                    </div>

                    {/* Type */}
                    <div>
                        <Label>Type:</Label>
                        <RadioGroup value={type} onValueChange={setType} className="flex gap-4 mt-2 flex-col">
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="video" id="video" />
                                <Label htmlFor="video">Video</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="article" id="article" />
                                <Label htmlFor="article">Article</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="image" id="image" />
                                <Label htmlFor="image">Image</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="audio" id="audio" />
                                <Label htmlFor="audio">Audio</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Tags */}
                    <div className="space-y-1">
                        <Label htmlFor="tags">Tags</Label>
                        <Input
                            id="tags"
                            placeholder="js, react, api"
                            value={tagsInput}
                            onChange={(e) => setTagsInput(e.target.value)}
                        />
                    </div>

                    <Button
                        className="gap-2 bg-blue-600 hover:bg-blue-700"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>

                </div>
            </PopoverContent>
        </Popover>
    );
}
