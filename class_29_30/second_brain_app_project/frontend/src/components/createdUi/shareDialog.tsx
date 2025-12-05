import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Share2, Copy } from 'lucide-react';
import { useContentStore } from '@/store/content.store';
import { useDialogStore } from '@/store/dialog.store';
import { useBackendStore } from "@/store/backend.store"


export default function SecondBrainDialog() {
    const { open, setOpen } = useDialogStore();
    const itemCount = useContentStore.getState().content.length;

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(`http://localhost:5173/brain/share/${text}`);
            alert("Share link Copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    const handleShare = async () => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`${useBackendStore.getState().VITE_BACKEND_URL}/${useBackendStore.getState().VITE_BACKEND_URL_VERSIONS}/brain/share`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    share: true,
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                alert(data.message);
                throw new Error("API error")
            };
            
            handleCopy(data.shareId)

            setOpen(false);
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={'outline'} className="">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Brain
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        Share Your Second Brain
                    </DialogTitle>
                    <DialogDescription className="text-base pt-2">
                        Share your entire collection of videos, documents, audios, and notes with others. They'll be able to import your content into their own Second Brain, Only Visible not editable.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    <Button
                        onClick={handleShare}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                        <Copy className="mr-2 h-4 w-4" />
                        Share Brain
                    </Button>

                    <p className="text-sm text-center text-muted-foreground mt-3">
                        {itemCount} items will be shared
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}