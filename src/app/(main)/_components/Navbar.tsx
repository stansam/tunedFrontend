"use client";

import React, { useState, useEffect } from "react";
import Link, { type LinkProps } from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NavbarProps } from "@/lib/props/index.props";
import type { NavLink } from "@/lib/types/common.type";


const NAV_LINKS: NavLink[] = [
  { label: "Services",     href: "#" },
  { label: "FAQs",         href: "/faqs" },
  { label: "Samples",      href: "/samples" },
  { label: "Blogs",        href: "/blogs" },
  { label: "Testimonials", href: "#" },
];

export function Navbar({ activeRoute }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const [prevRoute, setPrevRoute] = useState(activeRoute);

  if (activeRoute !== prevRoute) {
    setPrevRoute(activeRoute);
    setMobileOpen(false);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-shadow duration-200",
        scrolled ? "shadow-sm bg-white" : "bg-white"
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-slate-800 select-none"
          aria-label="TunedEssays home"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M5 22C8 15 14 8 22 4C20 12 15 19 5 22Z"
              fill="#22c55e"
            />
            <path d="M5 22C7 18 10 14 14 11" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span>
            <span className="text-slate-800">Tuned</span>
            <span className="text-emerald-500">Essays</span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href as LinkProps<string>["href"]}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150",
                  activeRoute === link.href
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="border-slate-300 text-slate-700 hover:bg-slate-50 font-medium px-5"
            asChild
          >
            <Link href="#">Sign in</Link>
          </Button>
          <Button
            size="sm"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-5 shadow-none"
            asChild
          >
            <Link href="#">Order Now</Link>
          </Button>
        </div>

        <button
          className="md:hidden rounded-md p-2 text-slate-600 hover:bg-slate-100 transition-colors"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-slate-100 bg-white px-4 pb-4 pt-2"
        >
          <ul className="flex flex-col gap-1" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href as LinkProps<string>["href"]}
                  className={cn(
                    "block px-4 py-2.5 rounded-md text-sm font-medium transition-colors",
                    activeRoute === link.href
                      ? "text-emerald-600 bg-emerald-50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full border-slate-300 text-slate-700"
              asChild
            >
              <Link href="#">Sign in</Link>
            </Button>
            <Button
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-none"
              asChild
            >
              <Link href="#">Order Now</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
