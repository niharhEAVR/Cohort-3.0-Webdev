import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Newspaper, Image, Video, AudioLines } from "lucide-react"
import { DeleteConfirmPopover } from "./confirmpopup"
import { SyncConfirmPopover } from "./syncPopup"

interface Tag {
  _id: string;
  title: string;
}

interface ArticleCardProps {
  _id: string;
  title: string;
  link: string;
  type: string;
  tags: Tag[];
  date?: string;
  readOnly?: boolean; // Add this new prop
}

export function ArticleCard({ 
  _id, 
  title, 
  type, 
  tags, 
  link, 
  date,
  readOnly = false // Default to false
}: ArticleCardProps) {
  const renderIcon = () => {
    switch (type) {
      case "article": return <Newspaper className="w-5 h-5 text-gray-600" />;
      case "image": return <Image className="w-5 h-5 text-gray-600" />;
      case "video": return <Video className="w-5 h-5 text-gray-600" />;
      case "audio": return <AudioLines className="w-5 h-5 text-gray-600" />;
      default: return <Newspaper className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <Card className="w-full p-5 rounded-2xl shadow-sm hover:shadow-lg transition bg-white border bottom-1">
      <CardHeader className="p-0">
        {/* TOP ROW → ICON LEFT, ACTIONS RIGHT */}
        <div className="flex justify-between items-center">
          {/* LEFT = ONLY ICON */}
          <div className="shrink-0">
            {renderIcon()}
          </div>

          {/* RIGHT = ONLY BUTTONS */}
          <div className="flex gap-2 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => window.open(link, "_blank")}
            >
              <ArrowUpRight className="w-4 h-4" />
            </Button>
            
            {/* Only show delete button if NOT in read-only mode */}
            {!readOnly && <DeleteConfirmPopover id={_id} />}
            {/* Only show sync button if it is in read-only mode */}
            {readOnly && <SyncConfirmPopover id={_id} />}
          </div>
        </div>

        {/* TITLE */}
        <CardTitle className="text-lg font-semibold line-clamp-2 wrap-break-word">
          {title}
        </CardTitle>
      </CardHeader>

      {/* BOTTOM CONTENT */}
      <CardContent className="p-0 mt-4">
        {/* DESCRIPTION */}
        <CardDescription className="text-sm mt-2 text-gray-500">
          This is an article you saved.
        </CardDescription>

        {/* TAGS */}
        <div className="flex gap-2 flex-wrap mt-4">
          {tags.map((tag) => (
            <Badge
              key={tag._id}
              className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full"
            >
              #{tag.title}
            </Badge>
          ))}
        </div>

        {/* DATE */}
        {date && (
          <p className="text-xs text-gray-500 mt-4">
            Added on {date}
          </p>
        )}
      </CardContent>
    </Card>
  );
}