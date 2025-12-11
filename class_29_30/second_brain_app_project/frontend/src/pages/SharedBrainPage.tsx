import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArticleCard } from "@/components/createdUi/articleCard";
import type { ContentResponse } from "@/types/content.type";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SideBarLayout } from "@/components/createdUi/sideBar";
import { Button } from "@/components/ui/button";
import { useProfieStore } from "@/store/profile.store";
import { FolderSync } from "lucide-react";
import { useBackendStore } from "@/store/backend.store";
import { useContentStore } from "@/store/content.store";

type CleanContentItem = {
  title: string;
  link: string;
  type: string;
  tags: string[];
};


export const handleGetSharedContents = async (shareId: string): Promise<ContentResponse & { userName: string }> => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`http://localhost:3000/api/v1/brain/share/${shareId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("API error");

    const data: ContentResponse & { userName: string } = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching shared content:", error);
    return { content: [], userName: "" };
  }
};

const handleSyncContentsAll = async (content: ContentResponse) => {
  const token = localStorage.getItem("token");

  const { VITE_BACKEND_URL, VITE_BACKEND_URL_VERSIONS } = useBackendStore.getState();

  console.log(useContentStore.getState().content)
  for (const x of content.content) {
    try {
      // avoid duplicates
      const exists = useContentStore.getState().content.some(c => c.link === x.link);
      if (exists) {
        console.log(exists)
        continue;
      }

      const { _id, userId, __v, tags: originalTags, ...rest } = x;

      const cleanData: CleanContentItem = {
        ...rest,
        tags: originalTags.map((t) => t.title),
      };



      const res = await fetch(
        `${VITE_BACKEND_URL}/${VITE_BACKEND_URL_VERSIONS}/content`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cleanData),
        }
      );

      if (!res.ok) throw new Error("API error");

      const data = await res.json();

      useContentStore.getState().addContent(data.content);
    } catch (error) {
      console.error("Sync error:", error);
    }
  }
  alert("Sync Done go back to dashboard");
};


export default function SharedBrainPage() {
  const token = localStorage.getItem("token");
  // Redirect if not authenticated
  if (!token) return <Navigate to="/" replace />;

  const { shareId } = useParams<{ shareId: string }>();
  // Validate shareId
  if (!shareId) return <Navigate to="/dashboard" replace />;

  const [content, setContent] = useState<ContentResponse>({ content: [] });
  const [username, setusername] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [shouldRedirect, setShouldRedirect] = useState(false);




  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await handleGetSharedContents(shareId);
        setContent({ content: result.content });
        setusername(result.userName);
        console.log(result);
        if (result.userName === useProfieStore.getState().username) {
          setShouldRedirect(true);
          return;
        }
      } catch (err) {
        setError("Failed to load shared brain");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [shareId]);

  if (shouldRedirect) return <Navigate to="/dashboard" replace />;
  console.log(content);



  return (
    <SidebarProvider>
      <div className="w-full min-h-screen flex bg-gray-50 pb-24">
        <SideBarLayout />

        {/* Main Content */}
        <main className="flex-1 p-10 pb-24">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-semibold">Shared Brain</h2>
              <p className="text-sm text-gray-500 mt-1">
                Viewing shared collection of {username} (Read-only)
              </p>
            </div>
            <div className="flex gap-4 md:flex-row flex-col">
              <Button variant={"outline"} onClick={() => handleSyncContentsAll(content)}>
                <FolderSync className="mr-1 h-4 w-4" />Sync All Contents</Button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center h-64">
              <div className="text-gray-500">Loading shared content...</div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex items-center justify-center h-64">
              <div className="text-red-500">{error}</div>
            </div>
          )}

          {/* Notes Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {!content?.content?.length ? (
                <div className="col-span-full text-center py-12 text-gray-500">
                  This shared brain has no content yet
                </div>
              ) : (
                content.content.map((item) => (
                  <ArticleCard
                    key={item._id}
                    _id={item._id}
                    link={item.link}
                    type={item.type}
                    title={item.title}
                    tags={item.tags}
                    date="75408250"
                    readOnly={true} // Pass readOnly prop to hide delete button
                  />
                ))
              )}
            </div>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
}