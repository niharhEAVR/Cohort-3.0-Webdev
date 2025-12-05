import {Image, Video, FileText, AudioLines, Brain } from "lucide-react";


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function SideBarLayout() {
  return (
    <>
      {/* LEFT SIDEBAR — visible on md and above */}
      <Sidebar className="border-r hidden md:flex">
        <SidebarContent>
          <div className="flex items-center gap-2 px-4 py-4">
            <Brain className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-semibold">Second Brain</h1>
          </div>

          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>

                <SidebarMenuItem className="p-2 hover:border-2 hover:rounded-2xl hover:border-blue-200 transition-all duration-100">
                  <SidebarMenuButton>
                    <Image className="w-4 h-4" />
                    Images
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem className="p-2 hover:border-2 hover:rounded-2xl hover:border-blue-200 transition-all duration-100">
                  <SidebarMenuButton>
                    <Video className="w-4 h-4" />
                    Videos
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem className="p-2 hover:border-2 hover:rounded-2xl hover:border-blue-200 transition-all duration-100">
                  <SidebarMenuButton>
                    <FileText className="w-4 h-4" />
                    Articles
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem className="p-2 hover:border-2 hover:rounded-2xl hover:border-blue-200 transition-all duration-100">
                  <SidebarMenuButton>
                    <AudioLines className="w-4 h-4" />
                    Audios
                  </SidebarMenuButton>
                </SidebarMenuItem>

              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* MOBILE BOTTOM NAV — hidden on md and above */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md flex justify-around items-center py-3 md:hidden z-50">

        <button className="flex flex-col items-center text-sm hover:text-blue-600">
          <Image className="w-5 h-5 " />
          Image
        </button>

        <button className="flex flex-col items-center text-sm hover:text-blue-600">
          <Video className="w-5 h-5 " />
          Videos
        </button>

        <button className="flex flex-col items-center text-sm hover:text-blue-600">
          <FileText className="w-5 h-5 " />
          Docs
        </button>

        <button className="flex flex-col items-center text-sm hover:text-blue-600">
          <AudioLines className="w-5 h-5 " />
          Audios
        </button>

      </div>
    </>
  );
}
