
import { useSession } from "@/lib/auth-client";
import { getUserSession } from "@/lib/core/session";
import {
  
  Briefcase,
  CircleDollar,
  Compass,
  Envelope,
  FileText,
  House,
  Layers,
  LayoutSideContentLeft,

  

  PencilToSquare,

  Person,
} from "@gravity-ui/icons";

import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export async function DashboardSideBar  () {

  const user  = await getUserSession()

 


  const clientNavLinks =  [
    { icon: House, label: "Home", href: "/dashboard/client" },

    { icon: Briefcase, label: "Tasks", href: "/dashboard/client/tasks" },

    { icon: PencilToSquare , label: "Create a Task", href: "/dashboard/client/tasks/new" },

    { icon: Envelope, label: "Messages", href: "#" },

    { icon: Person, label: "My Profile", href: "/dashboard/client/profile" },

  ];

  const freelancerNavLink = [
    { icon: House, label: "Home", href: "/dashboard/freelancer" },

    { icon: Compass, label: "Browse Tasks", href: "/browse-tasks" },

    { icon: FileText, label: "My Proposals", href: "/dashboard/freelancer/proposals" },

    { icon: Layers, label: "Active Projects", href: "/dashboard/freelancer/projects" },

    { icon: CircleDollar, label: "My Earnings", href: "/dashboard/freelancer/earnings" },

    { icon: Envelope, label: "Messages", href: "#" },

    { icon: Person, label: "My Profile", href: "/dashboard/freelancer/profile" },

]

  const navLinksMap = {
    freelancer : freelancerNavLink,
    client : clientNavLinks,
  }
  const navItems = navLinksMap[user?.role || 'freelancer']

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
        href={item.href}
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          type="button"
        >
          <item.icon className="size-5 text-muted" />

          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
        {navContent}
      </aside>

      <Drawer>
        <Button className={"lg:hidden "} variant="secondary">
          <LayoutSideContentLeft />
          Menu
        </Button>

        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />

              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>

              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
