"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logoImage from "../../../assets/images/logo/logo.png";

import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {

  Compass,
 Bookmark,
  Radio,
  Rocket,
  Newspaper,

  ImageIcon,
   CalendarDays,
   FlaskConical,
   BookOpenIcon
} from "lucide-react";


const mainNavigation = [
  {
    title: "Universe",
    href: "/",
    icon: Compass,
  },
  {
    title: "Space Missions",
    href: "/missions",
    icon: Rocket,
  },
  {
    title: "Live Space",
    href: "/live",
    icon: Radio,
  },
];

const additionalNavigation = [
  {
    title: "Picture of the Day",
    href: "/picOfDay",
    icon: ImageIcon,
  },
  {
    title: "Space Events",
    href: "/events",
    icon: CalendarDays,
  },
  {
    title: "Space News",
    href: "/news",
    icon: Newspaper,
  },
  {
    title: "Research",
    href: "/research",
    icon: FlaskConical,
  },
  {
    title: "Qur'an & Space",
    href: "/quran",
    icon: BookOpenIcon,
  },
];

export default function AppSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <ShadcnSidebar
      collapsible="icon"
      variant="floating"

      className="
       left-0
       top-0
    
        z-[999]
        border-white/6
        bg-background/80
        backdrop-blur-none
        w-(--sidebar-width)
        group-data-[collapsible=icon]:w-20
        group-data-[collapsible=icon]:border-r
        group-data-[collapsible=icon]:border-white/6


        transition-all
        duration-300
      "
    >
      {/* ================= HEADER ================= */}

      <SidebarHeader className="p-3">
        <div className="relative flex w-full items-center">

          {/* OPEN */}

          <div
            className="
              flex
              w-full
              items-center
              justify-between
              group-data-[collapsible=icon]:hidden
            "
          >
            <Link
              href="/"
              className="flex items-center gap-2 rounded-xl px-2 py-2"
            >
              <div
                className="
                  flex
                  size-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-primary/10
                "
              >
                <Image
                  src={logoImage}
                  alt="Āfāq"
                  width={42}
                  height={42}
                  priority
                  className="object-contain"
                />
              </div>

              <div>
                <p className="font-display text-lg tracking-[0.12em] text-foreground">
                  ĀFĀQ
                </p>

                <p className="whitespace-nowrap text-[9px] uppercase tracking-[0.18em] text-foreground-muted">
                  Explore the universe
                </p>
              </div>
            </Link>

         <SidebarTrigger
            className="
              size-9
              shrink-0
              rounded-full
              p-0

            
         

              transition-all
              duration-300

             border-primary-light/30
             bg-primary/10
             backdrop-blur-md
             text-primary-light
             shadow-[0_0_15px_var(--glow-purple)]

              active:scale-95

              group-data-[collapsible=icon]:hidden
            "
          />
          </div>

          {/* COLLAPSED */}

          <SidebarTrigger
            className="
              hidden
              size-10
              items-center
              justify-center
              rounded-full
              p-0
              hover:bg-white/6

              group-data-[collapsible=icon]:flex
            "
          >
            <Image
              src={logoImage}
              alt="Āfāq"
              width={38}
              height={38}
              priority
              className="
                size-9
                object-contain
                transition-transform
                duration-300
                hover:scale-105
              "
            />
          </SidebarTrigger>
        </div>
      </SidebarHeader>

      {/* ================= CONTENT ================= */}

      <SidebarContent className="px-2">

        {/* ================= EXPLORE ================= */}

        <SidebarGroup>
          <SidebarGroupLabel
            className="
              px-3
              text-[10px]
              uppercase
              tracking-[0.2em]
              text-foreground-muted
              group-data-[collapsible=icon]:hidden
            "
          >
            Explore
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={active}
                      tooltip={item.title}
                      render={<Link href={item.href} />}
                      className="
                        relative
                        h-11
                        w-full
                    

                        text-foreground-secondary

                        transition-all
                        duration-300

                        hover:bg-white/6
                        hover:text-foreground
                        rounded-none
                        data-active:bg-linear-to-l
                        data-active:from-white/10
                        data-active:to-transparent

                        data-active:text-primary

                        data-active:after:absolute
                        data-active:after:right-0
                        data-active:after:top-0
                        data-active:after:h-full
                        data-active:after:w-0.5

                        data-active:after:bg-white

                        data-active:after:shadow-[0_0_8px_rgba(255,255,255,0.9),0_0_20px_rgba(184,161,255,0.7)]

                        group-data-[collapsible=icon]:justify-center
                        group-data-[collapsible=icon]:px-0
                      "
                    >
                      <Icon
                        size={18}
                        className="shrink-0"
                      />

                      <span className="group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* ================= MORE ================= */}

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel
            className="
              px-3
              text-[10px]
              uppercase
              tracking-[0.2em]
              text-foreground-muted
              group-data-[collapsible=icon]:hidden
            "
          >
            Discover More
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {additionalNavigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={active}
                      tooltip={item.title}
                      render={<Link href={item.href} />}
                      className="
                        relative
                        h-11
                        w-full
                        rounded-xl

                        text-foreground-secondary

                        transition-all
                        duration-300

                        hover:bg-white/6
                        hover:text-foreground

                        data-active:bg-linear-to-l
                        data-active:from-white/10
                        data-active:to-transparent

                        data-active:text-primary

                        data-active:after:absolute
                        data-active:after:right-0
                        data-active:after:top-0
                        data-active:after:h-full
                        data-active:after:w-0.5

                        data-active:after:bg-white

                        data-active:after:shadow-[0_0_8px_rgba(255,255,255,0.9),0_0_20px_rgba(184,161,255,0.7)]
                      rounded-none
                        group-data-[collapsible=icon]:justify-center
                        group-data-[collapsible=icon]:px-0
                      "
                    >
                      <Icon
                        size={18}
                        className="shrink-0"
                      />

                      <span className="group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* ================= MY SPACE ================= */}

<SidebarGroup className="mt-4">
  <SidebarGroupLabel
    className="
      px-3
      text-[10px]
      uppercase
      tracking-[0.2em]
      text-foreground-muted
      group-data-[collapsible=icon]:hidden
    "
  >
    My Space
  </SidebarGroupLabel>

  <SidebarGroupContent>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          isActive={isActive("/my-exploration")}
          tooltip="My Exploration"
          render={<Link href="/my-exploration" />}
          className="
            relative
            h-11
            w-full
            rounded-none
            text-foreground-secondary
            transition-all
            duration-300
            hover:bg-white/6
            hover:text-foreground
            data-active:bg-linear-to-l
            data-active:from-white/10
            data-active:to-transparent
            data-active:text-primary
            data-active:after:absolute
            data-active:after:right-0
            data-active:after:top-0
            data-active:after:h-full
            data-active:after:w-0.5
            data-active:after:bg-white
            data-active:after:shadow-[0_0_8px_rgba(255,255,255,0.9),0_0_20px_rgba(184,161,255,0.7)]
            group-data-[collapsible=icon]:justify-center
            group-data-[collapsible=icon]:px-0
          "
        >
          <Bookmark size={18} className="shrink-0" />

          <span className="group-data-[collapsible=icon]:hidden">
            My Exploration
          </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroupContent>
</SidebarGroup>

      </SidebarContent>

      {/* ================= FOOTER ================= */}

      <SidebarFooter
        className="
          border-t
          border-white/6
          p-3
          group-data-[collapsible=icon]:hidden
        "
      >
        <p
          className="
            text-center
            text-[10px]
            tracking-wide
            text-foreground-muted
          "
        >
          A journey beyond the known.
        </p>
      </SidebarFooter>
    </ShadcnSidebar>
  );
}