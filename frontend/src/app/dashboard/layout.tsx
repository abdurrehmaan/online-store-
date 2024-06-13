import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

//components
// import navbar
import Navbar from "@/containers/headers/dashboard-header";
import SidebarNav from "@/containers/headers/sidebar-nav";
import Welcome from "@/containers/welcome";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-8xl sm:px-6 lg:px-8 flex justify-center flex-col">
        <div className="hidden space-y-6 p-10 pb-16 md:block">
          <Welcome />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 ">
            <aside className="lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1  md:max-w-full">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  // {
  //   title: "Registrations",
  //   href: "/dashboard/registrations",
  // },
];
