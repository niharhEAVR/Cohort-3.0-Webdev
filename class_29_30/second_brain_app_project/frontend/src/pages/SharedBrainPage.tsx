import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArticleCard } from "@/components/createdUi/articleCard";
import type { ContentResponse } from "@/types/content.type";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SideBarLayout } from "@/components/createdUi/sideBar";

const handleGetSharedContents = async (shareId: string): Promise<ContentResponse> => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`http://localhost:3000/api/v1/brain/share/${shareId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("API error");

    const data: ContentResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching shared content:", error);
    return { content: [] };
  }
};

export default function SharedBrainPage() {
  const token = localStorage.getItem("token");
  const { shareId } = useParams<{ shareId: string }>();
  
  const [content, setContent] = useState<ContentResponse>({ content: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Redirect if not authenticated
  if (!token) return <Navigate to="/login" replace />;

  // Validate shareId
  if (!shareId) return <Navigate to="/dashboard" replace />;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await handleGetSharedContents(shareId);
        setContent(result);
      } catch (err) {
        setError("Failed to load shared brain");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [shareId]);

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
                Viewing shared collection (Read-only)
              </p>
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