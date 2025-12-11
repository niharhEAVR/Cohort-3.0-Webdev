import { Image, Video, FileText, AudioLines, Brain, UserRoundPen, LogOut, Menu } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";

import { useProfieStore } from "@/store/profile.store";

export function SideBarLayout() {

  const navigate = useNavigate();
  const profile = useProfieStore();

  return (
    <>
      {/* LEFT SIDEBAR — visible on md and above */}
      <Sidebar className="border-r hidden md:flex">
        <SidebarContent className="flex flex-col py-4">

          {/* LOGO */}
          <div className="flex items-center gap-2 px-4 py-3 cursor-pointer" onClick={()=>navigate("/")}>
            <Brain className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-semibold">Second Brain</h1>
          </div>

          {/* NAV SECTION */}
          <SidebarGroup>
            <h2 className="px-4 text-sm font-medium text-muted-foreground tracking-wide uppercase mt-4 mb-2">
              Library
            </h2>

            <SidebarGroupContent>
              <SidebarMenu>

                <SidebarMenuItem>
                  <SidebarMenuButton className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition">
                    <Image className="w-4 h-4" />
                    Images
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition">
                    <Video className="w-4 h-4" />
                    Videos
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition">
                    <FileText className="w-4 h-4" />
                    Articles
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition">
                    <AudioLines className="w-4 h-4" />
                    Audios
                  </SidebarMenuButton>
                </SidebarMenuItem>

              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* PROFILE SECTION */}
          <div className="mt-auto">
            <h2 className="px-4 text-sm font-medium text-muted-foreground tracking-wide uppercase mt-6 mb-2">
              Account
            </h2>

            <div className="px-2">
              <Popover>
                <PopoverTrigger asChild>
                  <SidebarMenuButton
                    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition"
                  >
                    <UserRoundPen className="w-5 h-5 text-blue-600" />
                    Profile
                  </SidebarMenuButton>
                </PopoverTrigger>

                <PopoverContent className="w-56 p-4 flex flex-col gap-3">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Logged in as:</span>
                    <span className="font-semibold text-lg">{profile.username}</span>
                  </div>

                  <Button
                    variant="destructive"
                    className="flex gap-2"
                    onClick={() => {
                      localStorage.removeItem("token");
                      profile.deleteUsername();
                      navigate("/");
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          </div>

        </SidebarContent>
      </Sidebar>


      {/* MOBILE BOTTOM NAV — hidden on md and above */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md flex justify-around items-center py-3 md:hidden z-50">

        <Popover>
          <PopoverTrigger asChild>
            <button className="flex flex-col items-center text-sm hover:text-blue-600">
              <Menu className="w-5 h-5" />
              More
            </button>
          </PopoverTrigger>

          <PopoverContent className="w-48 p-4 flex flex-col gap-4">
            <Button variant={"outline"} className="flex items-center gap-2 text-sm hover:text-blue-600">
              <Image className="w-5 h-5" />
              Images
            </Button>

            <Button variant={"outline"} className="flex items-center gap-2 text-sm hover:text-blue-600">
              <Video className="w-5 h-5" />
              Videos
            </Button>

            <Button variant={"outline"} className="flex items-center gap-2 text-sm hover:text-blue-600">
              <FileText className="w-5 h-5" />
              Docs
            </Button>

            <Button variant={"outline"} className="flex items-center gap-2 text-sm hover:text-blue-600">
              <AudioLines className="w-5 h-5" />
              Audios
            </Button>
          </PopoverContent>
        </Popover>

        {/* ------- PROFILE POPOVER ------- */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex flex-col items-center text-sm hover:text-blue-600">
              <UserRoundPen className="w-5 h-5 text-blue-600" />
              Profile
            </button>
          </PopoverTrigger>

          <PopoverContent className="w-56 p-4 flex flex-col gap-3">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Logged in as:</span>
              <span className="font-semibold text-lg">{profile.username}</span>
            </div>

            <Button
              variant="destructive"
              className="flex gap-2"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
                profile.deleteUsername();
              }}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </PopoverContent>
        </Popover>

      </div>
    </>
  );
}
