"use client";

import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";

import logoImage from "../../../assets/images/logo/logo.png";
import { useSidebar } from "../sidebar";
import { planets } from "@/data/PlanetsData";
import { discoveries } from "@/data/DiscoveriesData";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobilePlanetsOpen, setMobilePlanetsOpen] = useState(false);
  const [mobileDiscoverOpen, setMobileDiscoverOpen] = useState(false);

  const { toggleSidebar } = useSidebar();

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobilePlanetsOpen(false);
    setMobileDiscoverOpen(false);
  };

  return (
    <nav
  className="
    fixed
    inset-x-0
    top-0
    z-[100]
    w-full
    border-b
    border-white/10
    bg-[#090914]/95
    shadow-lg
    backdrop-blur-2xl
  "
>
      {/* ================= HEADER ================= */}

      <div
        className="
          mx-auto
          flex
          h-17
          w-full
          items-center
          justify-between
          px-4
          sm:px-6
          lg:px-30
        "
      >
        {/* Sidebar Button */}

        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
          className="
            flex
            size-10
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-primary-light/30
            bg-primary/10
            text-primary-light
            shadow-[0_0_15px_var(--glow-purple)]
            transition-all
            duration-300
            hover:bg-primary/20
            hover:shadow-[0_0_20px_var(--glow-purple)]
            lg:hidden
          "
        >
          <Menu size={20} />
        </button>

        {/* Logo */}

        <Link
          href="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-2"
        >
          <Image
            src={logoImage}
            alt="Āfāq"
            width={46}
            height={46}
            priority
            className="size-10 object-contain sm:size-11"
          />

          <span
            className="
              font-display
              text-xl
              font-medium
              tracking-[0.12em]
              text-foreground
              sm:text-2xl
            "
          >
            ĀFĀQ
          </span>
        </Link>

        {/* ================= DESKTOP NAVIGATION ================= */}

        <div className="hidden lg:flex lg:items-center lg:gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              {/* PLANETS */}

              <NavigationMenuItem>
                <NavigationMenuTrigger>Planets</NavigationMenuTrigger>

                <NavigationMenuContent>
                  <div
                    className="
                      w-150
                      max-w-[calc(100vw-32px)]
                      bg-background/90
                      p-6
                      backdrop-blur-xl
                    "
                  >
                    <div className="mb-5">
                      <h2 className="font-display text-xl font-semibold text-foreground">
                        Planets
                      </h2>

                      <p className="mt-1 text-sm text-foreground-secondary">
                        Explore the worlds of our solar system.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {planets.map((planet) => (
                        <NavigationMenuLink
                          key={planet.slug}
                          href={`/solarSystem/planets/${planet.slug}`}
                          className="
                            group
                            rounded-xl
                            border
                            border-white/6
                            bg-white/2
                            p-4
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:border-primary-light/30
                            hover:bg-white/5
                            hover:shadow-[0_0_25px_var(--glow-purple)]
                          "
                        >
                          <div>
                            <div
                              className="
                              mb-3
                              flex size-10
                              items-center justify-center
                              rounded-full
                              bg-primary/10
                              text-primary-light
                              transition-transform duration-300
                              group-hover:scale-110
                            "
                            >
                              ✦
                            </div>

                            <p className="font-display text-sm font-medium text-foreground">
                              {planet.name}
                            </p>

                            <span className="mt-1 block text-xs text-foreground-secondary">
                              Explore →
                            </span>
                          </div>
                        </NavigationMenuLink>
                      ))}
                    </div>

                    <NavigationMenuLink
                      href="/solarSystem/planets"
                      className="
                        mt-5
                        block
                        border-t
                        border-white/6
                        pt-4
                        text-sm
                        font-medium
                        text-primary-light
                        transition-colors
                        hover:text-foreground
                      "
                    >
                      View all planets →
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* DISCOVER */}

              <NavigationMenuItem>
                <NavigationMenuTrigger>Discover</NavigationMenuTrigger>

                <NavigationMenuContent>
                  <div
                    className="
                      w-[min(820px,calc(100vw-32px))]
                      bg-background/95
                      p-5
                      backdrop-blur-xl
                    "
                  >
                    <div className="mb-5">
                      <h2 className="font-display text-lg font-semibold text-foreground">
                        Discover
                      </h2>

                      <p className="mt-1 max-w-xl text-sm leading-5 text-foreground-secondary">
                        Explore the wonders, mysteries, and phenomena of the
                        universe.
                      </p>

                      <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.2em] text-primary-light">
                        Explore the Cosmos
                      </p>
                    </div>

                    <div className="grid grid-cols-4 gap-2.5">
                      {discoveries.map((item) => (
                        <Link
                          key={item.slug}
                          href={item.href ?? `/discover/${item.slug}`}
                          className="
                            group
                            min-w-0
                            rounded-xl
                            border
                            border-white/6
                            bg-white/2
                            p-3
                            transition-all
                            duration-300
                            hover:-translate-y-0.5
                            hover:border-primary-light/30
                            hover:bg-white/5
                            hover:shadow-[0_0_20px_var(--glow-purple)]
                          "
                        >
                          <div
                            className="
                              mb-2.5
                              flex size-8
                              items-center justify-center
                              rounded-full
                              bg-primary/10
                              text-base
                              text-primary-light
                              transition-all duration-300
                              group-hover:scale-110
                              group-hover:bg-primary/20
                            "
                          >
                            {item.icon}
                          </div>

                          <p className="truncate font-display text-xs font-medium text-foreground">
                            {item.name}
                          </p>

                          <span className="mt-1 line-clamp-2 text-[11px] leading-4 text-foreground-secondary">
                            {item.description}
                          </span>
                        </Link>
                      ))}
                    </div>

                    <NavigationMenuLink
                      href="/discover"
                      className="
                        mt-4
                        block
                        border-t
                        border-white/6
                        pt-3
                        text-xs
                        font-medium
                        text-primary-light
                        transition-colors
                        hover:text-foreground
                      "
                    >
                      View all discoveries →
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* ABOUT */}

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/about"
                  className="
                    rounded-xl
                    px-4 py-3
                    text-sm
                    text-foreground
                    transition-colors
                    hover:bg-white/5
                  "
                >
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* EXPLORE */}

          <Link
            href="/explore"
            className="
              rounded-full
              bg-primary
              px-5
              py-2.5
              text-sm
              font-medium
              text-background
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-primary-hover
              hover:shadow-[0_0_25px_var(--glow-primary)]
            "
          >
            Explore →
          </Link>
        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}

        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={mobileMenuOpen}
          className="
            flex
            size-10
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-primary-light/30
            bg-primary/10
            text-primary-light
            shadow-[0_0_15px_var(--glow-purple)]
            transition-all
            duration-300
            hover:bg-primary/20
            hover:shadow-[0_0_20px_var(--glow-purple)]
            lg:hidden
          "
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ================= MOBILE NAVIGATION ================= */}
{mobileMenuOpen && (
  <div
    className="
      absolute
      inset-x-0
      top-full
      z-[110]
      max-h-[calc(100dvh-4.25rem)]
      overflow-y-auto
      overscroll-contain
      border-t
      border-white/10
      bg-[#090914]
      shadow-2xl
      backdrop-blur-2xl
      lg:hidden
    "
  >
          <div
            className="
              mx-auto
              w-full
              max-w-7xl
              px-4
              py-5
              pb-10
              sm:px-6
            "
          >
            <div className="flex flex-col gap-2">
              {/* ================= PLANETS ================= */}

              <div>
                <button
                  type="button"
                  onClick={() => setMobilePlanetsOpen((prev) => !prev)}
                  aria-expanded={mobilePlanetsOpen}
                  className="
                    flex w-full
                    items-center justify-between
                    rounded-xl
                    px-4 py-3
                    text-sm
                    text-foreground
                    transition-colors
                    hover:bg-white/5
                  "
                >
                  <span>Planets</span>

                  <ChevronDown
                    size={17}
                    className={`
                      text-primary-light
                      transition-transform duration-300
                      ${mobilePlanetsOpen ? "rotate-180" : ""}
                    `}
                  />
                </button>

                {mobilePlanetsOpen && (
                  <div
                    className="
                      mt-2
                      rounded-xl
                      border
                      border-white/6
                      bg-white/[0.02]
                      p-3
                    "
                  >
                    <div className="mb-3 px-2">
                      <h3 className="font-display text-base font-semibold text-foreground">
                        Explore the Planets
                      </h3>

                      <p className="mt-1 text-xs text-foreground-secondary">
                        Discover the worlds of our solar system.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {planets.map((planet) => (
                        <Link
                          key={planet.slug}
                          href={`/solarSystem/planets/${planet.slug}`}
                          onClick={closeMobileMenu}
                          className="
                            group
                            min-w-0
                            rounded-lg
                            border
                            border-white/6
                            bg-white/[0.02]
                            p-3
                            transition-all duration-300
                            hover:border-primary-light/30
                            hover:bg-white/5
                          "
                        >
                          <div
                            className="
                            mb-2
                            flex size-8
                            items-center justify-center
                            rounded-full
                            bg-primary/10
                            text-primary-light
                          "
                          >
                            ✦
                          </div>

                          <p className="font-display text-sm font-medium text-foreground">
                            {planet.name}
                          </p>

                          <span className="mt-1 block text-xs text-foreground-secondary">
                            Explore →
                          </span>
                        </Link>
                      ))}
                    </div>

                    <Link
                      href="/solarSystem/planets"
                      onClick={closeMobileMenu}
                      className="
                        mt-3
                        block
                        border-t
                        border-white/6
                        pt-3
                        text-sm
                        font-medium
                        text-primary-light
                        transition-colors
                        hover:text-foreground
                      "
                    >
                      View all planets →
                    </Link>
                  </div>
                )}
              </div>

              {/* ================= DISCOVER ================= */}

              <div>
                <button
                  type="button"
                  onClick={() => setMobileDiscoverOpen((prev) => !prev)}
                  aria-expanded={mobileDiscoverOpen}
                  className="
                    flex w-full
                    items-center justify-between
                    rounded-xl
                    px-4 py-3
                    text-sm
                    text-foreground
                    transition-colors
                    hover:bg-white/5
                  "
                >
                  <span>Discover</span>

                  <ChevronDown
                    size={17}
                    className={`
                      text-primary-light
                      transition-transform duration-300
                      ${mobileDiscoverOpen ? "rotate-180" : ""}
                    `}
                  />
                </button>

                {mobileDiscoverOpen && (
                  <div
                    className="
                      mt-2
                      rounded-xl
                      border
                      border-white/6
                      bg-white/[0.02]
                      p-3
                    "
                  >
                    <div className="mb-4 px-2">
                      <h3 className="font-display text-base font-semibold text-foreground">
                        Discover
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-foreground-secondary">
                        Explore the wonders, mysteries, and phenomena of the
                        universe.
                      </p>

                      <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-primary-light">
                        Explore the Cosmos
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {discoveries.map((item) => (
                        <Link
                          key={item.slug}
                          href={item.href ?? `/discover/${item.slug}`}
                          onClick={closeMobileMenu}
                          className="
                            group
                            min-w-0
                            rounded-lg
                            border
                            border-white/6
                            bg-white/[0.02]
                            p-3
                            transition-all duration-300
                            hover:border-primary-light/30
                            hover:bg-white/5
                          "
                        >
                          <div
                            className="
                            mb-2
                            flex size-8
                            items-center justify-center
                            rounded-full
                            bg-primary/10
                            text-base
                            text-primary-light
                            transition-transform duration-300
                            group-hover:scale-110
                          "
                          >
                            {item.icon}
                          </div>

                          <p className="font-display text-xs font-medium text-foreground">
                            {item.name}
                          </p>

                          <span className="mt-1 block text-[11px] leading-4 text-foreground-secondary">
                            {item.description}
                          </span>
                        </Link>
                      ))}
                    </div>

                    <Link
                      href="/discover"
                      onClick={closeMobileMenu}
                      className="
                        mt-3
                        block
                        border-t
                        border-white/6
                        pt-3
                        text-sm
                        font-medium
                        text-primary-light
                        transition-colors
                        hover:text-foreground
                      "
                    >
                      View all discoveries →
                    </Link>
                  </div>
                )}
              </div>

              {/* ================= ABOUT ================= */}

              <Link
                href="/about"
                onClick={closeMobileMenu}
                className="
                  rounded-xl
                  px-4 py-3
                  text-sm
                  text-foreground
                  transition-colors
                  hover:bg-white/5
                "
              >
                About
              </Link>

              {/* ================= EXPLORE ================= */}

              <Link
                href="/explore"
                onClick={closeMobileMenu}
                className="
                  mt-2
                  rounded-full
                  bg-primary
                  px-5 py-3
                  text-center
                  text-sm
                  font-medium
                  text-background
                  transition-all
                  hover:bg-primary-hover
                "
              >
                Explore →
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
