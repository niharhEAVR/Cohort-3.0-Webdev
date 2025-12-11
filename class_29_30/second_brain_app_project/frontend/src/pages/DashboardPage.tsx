import { Navigate } from "react-router-dom";

import { useEffect } from "react";
import { ArticleCard } from "@/components/createdUi/articleCard";
import type { ContentResponse } from "@/types/content.type";
import { useContentStore } from "@/store/content.store";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SideBarLayout } from "@/components/createdUi/sideBar";
import { ApiInputPopover } from "@/components/createdUi/pupup";
import SecondBrainDialog from "@/components/createdUi/shareDialog";
import { type ShareItems, useShareStore } from "@/store/share.store";

const handleGetContents = async (token: string): Promise<ContentResponse> => {

  try {
    const res = await fetch(`http://localhost:3000/api/v1/content`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("API error");

    const data: ContentResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching content:", error);
    return { content: [] };
  }
};

const handleCheckShare = async (token: string): Promise<ShareItems> => {

  try {
    const res = await fetch(`http://localhost:3000/api/v1/brain/checkshare`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("API error");

    const data: ShareItems = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching content:", error);
    return { message: "", linkSharing: false, link: "" };
  }
};



export default function DashboardPage() {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/" replace />;


  const content = useContentStore();
  const shareCheck = useShareStore();

  useEffect(() => {
    const fetchData = async () => {
      const result = await handleGetContents(token!);
      console.log(result.content, typeof result.content);
      useContentStore.getState().setContent(result.content);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const shareResult: ShareItems = await handleCheckShare(token!);
      console.log(shareResult, typeof shareResult);
      useShareStore.getState().setShare(shareResult);
    }
    fetchData();
  }, [])

  return (
    <SidebarProvider >
      <div className="w-full min-h-screen flex bg-gray-50 pb-24">
        <SideBarLayout />


        {/* Main Content */}
        <main className="flex-1 p-10 pb-24">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-semibold">All Notes</h2>

            <div className="flex gap-4 md:flex-row flex-col">
              {shareCheck.share.linkSharing === true ? <SecondBrainDialog share={shareCheck.share} /> : <SecondBrainDialog/>}
              <ApiInputPopover />
            </div>
          </div>

          {/* Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {!content?.content?.length ? (
              <div>No content added yet by your side</div>
            ) : (
              content.content.map((item) => (
                <ArticleCard
                  key={item._id}
                  _id={item._id}
                  link={item.link}
                  type={item.type}
                  title={item.title}
                  tags={item.tags}
                  date="08/03/2024"
                />
              ))
            )}
          </div>

        </main>
      </div >
    </SidebarProvider>
  );
}



