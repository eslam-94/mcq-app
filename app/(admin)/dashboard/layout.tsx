import { Metadata } from "next";
import Footer from "@/components/footer";
import PathName from "@/components/pathname";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@radix-ui/react-separator";
import { 
  SidebarInset, 
  SidebarProvider, 
  SidebarTrigger 
} from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Generated by create next app",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b">
        <div className="flex items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <PathName />
        </div>
      </header>
      <div className="flex grow">
        {children}
      </div>
      <Footer/>
    </SidebarInset>
  </SidebarProvider>
  ) 
}