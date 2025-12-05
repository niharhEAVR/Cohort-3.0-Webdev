import { Navigate } from "react-router-dom";

import { useEffect } from "react";
import { ArticleCard } from "@/components/createdUi/articleCard";
import type { ContentResponse } from "@/types/content.type";
import { useContentStore } from "@/store/content.store";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SideBarLayout } from "@/components/createdUi/sideBar";
import { ApiInputPopover } from "@/components/createdUi/pupup";
import SecondBrainDialog from "@/components/createdUi/shareDialog";


const handleGetContents = async (): Promise<ContentResponse> => {
  const token = localStorage.getItem("token");

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




export default function DashboardPage() {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;


  const content = useContentStore()

  useEffect(() => {
    const fetchData = async () => {
      const result = await handleGetContents();
      console.log(result.content, typeof result.content);
      useContentStore.getState().setContent(result.content);
    };
    fetchData();
  }, []);




  return (
    <SidebarProvider >
      <div className="w-full min-h-screen flex bg-gray-50 pb-24">
        <SideBarLayout />


        {/* Main Content */}
        <main className="flex-1 p-10 pb-24">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-semibold">All Notes</h2>

            <div className="flex gap-4 md:flex-row flex-col">
              <SecondBrainDialog />
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



