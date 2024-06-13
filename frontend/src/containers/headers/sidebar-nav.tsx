"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
// import { buttonVariants } from "@/registry/new-york/ui/button";
// interface SidebarItems {
//   items: any[],

// }
interface items {
  href: string;
  title: string;
}

interface IPROPS {
  items: items[];
}

const SidebarNav: React.FC<IPROPS> = ({ items, ...props }) => {
  const pathname = usePathname();
  const router = useRouter();
  // const { id } = router.query;

  return (
    <nav
      className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1")}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
};

export default SidebarNav;
