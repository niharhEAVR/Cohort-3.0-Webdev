import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Share2, Copy, Ban } from 'lucide-react';
import { useContentStore } from '@/store/content.store';
import { useDialogStore } from '@/store/dialog.store';
import { useBackendStore } from "@/store/backend.store"
import { type ShareItems, useShareStore } from '@/store/share.store';


export default function SecondBrainDialog({ share }: { share?: ShareItems }) {
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

            useShareStore.getState().setShare({
                message: data.message,
                linkSharing: true,
                link: data.shareId,
            });
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    const handleStopShaing = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`${useBackendStore.getState().VITE_BACKEND_URL}/${useBackendStore.getState().VITE_BACKEND_URL_VERSIONS}/brain/stopsharing`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "share": false,
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                alert(data.message);
                throw new Error("API error")
            };

            useShareStore.getState().stopShare();
        } catch (error) {
            console.error("Error logging in:", error);
        }
    }

    console.log(share?.message);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={'outline'}>
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
                        {share?.linkSharing
                            ? "Your Brain is already being shared."
                            : "Share your entire second brain. Others can import your content."
                        }
                    </DialogDescription>
                </DialogHeader>

                {/* ALREADY SHARING UI */}
                {share?.linkSharing ? (
                    <div className="py-4 space-y-3">

                        <input
                            type="text"
                            value={`http://localhost:5173/brain/share/${share.link}`}
                            readOnly
                            className="w-full border rounded px-3 py-2 text-sm"
                        />

                        <div className='w-full flex gap-2'>
                            <Button
                                onClick={() => handleCopy(share.link)}
                                className=" bg-blue-600 hover:bg-indigo-700 flex-1"
                            >
                                <Copy className="mr-2 h-4 w-4" />
                                Copy Share Link
                            </Button>
                            <Button
                                onClick={() => handleStopShaing()}
                                className=" bg-blue-600 hover:bg-indigo-700 flex-1"
                            >
                                <Ban className=" h-4 w-4" />
                                Stop Sharing
                            </Button>
                        </div>
                    </div>
                ) : (
                    /* DEFAULT (Not shared) UI */
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
                )}

            </DialogContent>
        </Dialog>
    );
}