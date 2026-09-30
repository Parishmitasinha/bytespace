"use client";

import React, { useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ByteSpaceNotFoundRoute =
  | "/"
  | "/courses"
  | "/creators"
  | "/course/build-digital-asset"
  | "/course/lessons"
  | "/course/reviews"
  | "/signup"
  | "/login"
  | "/404";

export interface ByteSpaceNotFoundProps {
  className?: string;
  onNavigate?: (path: ByteSpaceNotFoundRoute) => void;
}

// Internal sub-component: Subtle Thin Square Grid Pattern
function ElectricHeroGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255, 255, 255, 0.11) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.11) 1px, transparent 1px)",
        backgroundSize: "54px 54px",
      }}
      aria-hidden="true"
    />
  );
}

// Internal sub-component: ByteSpace Logo
function ByteSpaceLogo({
  light = false,
  onClick,
}: {
  light?: boolean;
  onClick?: () => void;
}) {
  return (
    <a
      href="/"
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className="inline-flex items-center gap-2.5 focus-visible:outline-none"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#C8FF00]">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 6.5C4 5.11929 5.11929 4 6.5 4H13.5C16.5376 4 19 6.46243 19 9.5C19 11.2356 18.1972 12.7834 16.9453 13.7891C18.7457 14.6962 20 16.5656 20 18.75C20 20.5449 18.5449 22 16.75 22H6.5C5.11929 22 4 20.8807 4 19.5V6.5Z"
            fill="#252525"
          />
          <circle cx="11.5" cy="9.5" r="2.2" fill="#C8FF00" />
          <circle cx="12.5" cy="16.5" r="2.2" fill="#C8FF00" />
        </svg>
      </span>
      <span
        className={cn(
          "text-[18px] font-bold tracking-tight",
          light ? "text-[#FFFFFF]" : "text-[#252525]"
        )}
      >
        ByteSpace
      </span>
    </a>
  );
}

// Main exported 404 Not Found Page component
export default function ByteSpaceNotFound({
  className,
  onNavigate,
}: ByteSpaceNotFoundProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [newsletterSubscribed, setNewsletterSubscribed] =
    useState<boolean>(false);

  const handleNavigate = (path: ByteSpaceNotFoundRoute) => {
    if (onNavigate) {
      onNavigate(path);
    } else if (typeof window !== "undefined") {
      window.history.pushState({}, "", path);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes("@")) {
      setNewsletterSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen w-full bg-[#FFFFFF] text-[#252525] selection:bg-[#C8FF00] selection:text-[#252525]",
        className
      )}
    >
      {/* =====================================================================
          BLUE 404 SECTION (HEADER + CENTERED 404 HERO CONTENT WITH GRID)
      ===================================================================== */}
      <div className="relative bg-[#0B3FE3] text-[#FFFFFF]">
        <ElectricHeroGrid />

        {/* HEADER */}
        <header className="relative z-20 mx-auto flex max-w-[1200px] items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          {/* LEFT: ByteSpace Logo */}
          <ByteSpaceLogo light onClick={() => handleNavigate("/")} />

          {/* CENTER: Home, Courses, Creators */}
          <nav
            aria-label="Primary Navigation"
            className="hidden items-center gap-8 text-[14px] font-medium text-[#FFFFFF] md:flex"
          >
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate("/");
              }}
              className="whitespace-nowrap text-[#FFFFFF] transition-opacity hover:opacity-90"
            >
              Home
            </a>
            <a
              href="/courses"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate("/courses");
              }}
              className="whitespace-nowrap text-[#FFFFFF] transition-opacity hover:opacity-90"
            >
              Courses
            </a>
            <a
              href="/creators"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate("/creators");
              }}
              className="whitespace-nowrap text-[#FFFFFF] transition-opacity hover:opacity-90"
            >
              Creators
            </a>
          </nav>

          {/* RIGHT: Sign In, Join Us, Small Shopping/Bag Icon */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleNavigate("/login")}
              className="hidden whitespace-nowrap rounded-full px-4 py-2 text-[14px] font-medium text-[#FFFFFF] transition-colors hover:bg-[#FFFFFF]/10 sm:inline-flex"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => handleNavigate("/signup")}
              className="whitespace-nowrap rounded-full px-4 py-2 text-[14px] font-medium text-[#FFFFFF] transition-colors hover:bg-[#FFFFFF]/10"
            >
              Join Us
            </button>
            <button
              type="button"
              onClick={() => handleNavigate("/courses")}
              aria-label="Shopping Bag"
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#FFFFFF]/25 bg-[#FFFFFF]/10 text-[#FFFFFF] transition-colors hover:bg-[#FFFFFF]/20"
            >
              <ShoppingBag className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              aria-label="Toggle Menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#FFFFFF]/25 bg-[#FFFFFF]/10 text-[#FFFFFF] md:hidden"
            >
              {mobileNavOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </header>

        {/* Mobile Navigation */}
        {mobileNavOpen && (
          <div className="relative z-20 mx-4 mb-3 rounded-xl border border-[#FFFFFF]/20 bg-[#0B3FE3] p-4 md:hidden">
            <div className="flex flex-col space-y-2.5 text-sm font-medium text-[#FFFFFF]">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileNavOpen(false);
                  handleNavigate("/");
                }}
                className="rounded-lg px-3 py-1.5"
              >
                Home
              </a>
              <a
                href="/courses"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileNavOpen(false);
                  handleNavigate("/courses");
                }}
                className="rounded-lg px-3 py-1.5"
              >
                Courses
              </a>
              <a
                href="/signup"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileNavOpen(false);
                  handleNavigate("/signup");
                }}
                className="rounded-lg px-3 py-1.5"
              >
                Creators
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileNavOpen(false);
                  handleNavigate("/login");
                }}
                className="rounded-lg bg-[#FFFFFF]/10 px-3 py-1.5 text-left font-semibold text-[#FFFFFF]"
              >
                Sign In
              </button>
            </div>
          </div>
        )}

        {/* MAIN 404 CONTENT */}
        <section
          aria-labelledby="not-found-heading"
          className="relative z-10 mx-auto flex min-h-[500px] max-w-[1200px] flex-col items-center justify-center px-4 pt-10 pb-24 text-center sm:min-h-[560px] sm:px-6 md:min-h-[610px] lg:px-8"
        >
          {/* Large Oversized "404" Behind/Above Main Message */}
          <div className="relative flex flex-col items-center justify-center">
            <div
              aria-hidden="true"
              className="pointer-events-none select-none text-[136px] leading-[0.82] font-extrabold tracking-tight sm:text-[200px] md:text-[250px] lg:text-[288px]"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, #C8FF00 0%, #9FD826 42%, rgba(134, 167, 136, 0.42) 82%, rgba(11, 63, 227, 0.08) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              404
            </div>

            {/* MAIN MESSAGE Directly Over Lower Portion of 404 Number */}
            <h1
              id="not-found-heading"
              className="relative z-10 -mt-9 text-[28px] leading-[1.15] font-bold tracking-tight text-[#FFFFFF] sm:-mt-14 sm:text-[38px] md:-mt-18 md:text-[44px] lg:-mt-22 lg:text-[48px]"
            >
              The page you are looking
              <br />
              for doesn’t exist
            </h1>
          </div>

          {/* SUPPORTING TEXT */}
          <p className="mt-4 max-w-md text-[13px] font-normal text-[#FFFFFF]/85 sm:text-[14px]">
            Try to use a correct url or go back to homepage to start again
          </p>

          {/* BACK BUTTON (No arrow inside button) */}
          <button
            type="button"
            onClick={() => handleNavigate("/")}
            className="mt-7 inline-flex h-[44px] items-center justify-center whitespace-nowrap rounded-full bg-[#C8FF00] px-7 text-[13px] font-bold text-[#252525] transition-opacity hover:opacity-90"
          >
            Back to Home
          </button>
        </section>
      </div>

      {/* =====================================================================
          FOOTER
      ===================================================================== */}
      <footer className="border-t border-[#E5E5E5] bg-[#FFFFFF] pt-14 pb-10">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* LEFT SIDE: ByteSpace Logo + Newsletter */}
            <div className="lg:col-span-5">
              <ByteSpaceLogo onClick={() => handleNavigate("/")} />
              <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-[#252525]/70">
                Stay Up to date with our latest features and releases by joining
                our newsletter.
              </p>

              <form
                onSubmit={handleNewsletterSubmit}
                className="mt-4 flex max-w-sm items-center gap-2"
              >
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  aria-label="Enter your email"
                  className="h-10 flex-1 rounded-full border border-[#E5E5E5] bg-[#FFFFFF] px-4 text-[13px] text-[#252525] placeholder-[#252525]/40 focus:border-[#0B3FE3] focus:outline-none"
                />
                <button
                  type="submit"
                  className="h-10 whitespace-nowrap rounded-full bg-[#C8FF00] px-6 text-[13px] font-bold text-[#252525] transition-opacity hover:opacity-90"
                >
                  Search
                </button>
              </form>

              {newsletterSubscribed ? (
                <p className="mt-2 text-[11px] font-semibold text-[#0B3FE3]">
                  Thank you for subscribing to ByteSpace updates.
                </p>
              ) : (
                <p className="mt-2.5 max-w-sm text-[11px] leading-normal text-[#252525]/50">
                  By subscribing, you agree to our Privacy Policy and consent to
                  receive updates from our company.
                </p>
              )}
            </div>

            {/* RIGHT SIDE: Three Footer Navigation Columns */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
              {/* Column 1 */}
              <div>
                <ul className="space-y-2.5 text-[13px] text-[#252525]/75">
                  {[
                    "Featured Courses",
                    "Featured Categories",
                    "Business",
                    "IT",
                    "Design",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="/courses"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigate("/courses");
                        }}
                        className="hover:text-[#0B3FE3]"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2 */}
              <div>
                <ul className="space-y-2.5 text-[13px] text-[#252525]/75">
                  {[
                    "Development",
                    "Marketing",
                    "Photography",
                    "Finance",
                    "Sport",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="/courses"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigate("/courses");
                        }}
                        className="hover:text-[#0B3FE3]"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3 */}
              <div>
                <ul className="space-y-2.5 text-[13px] text-[#252525]/75">
                  {[
                    "Become a Creator",
                    "Affiliate Program",
                    "Contact",
                    "Help",
                    "About",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href={item === "Become a Creator" ? "/signup" : "/"}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigate(
                            item === "Become a Creator" ? "/signup" : "/"
                          );
                        }}
                        className="hover:text-[#0B3FE3]"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* FOOTER BOTTOM */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#E5E5E5] pt-6 text-[12px] text-[#252525]/60 sm:flex-row">
            <p>© 2023 ByteSpace. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a
                href="#privacy"
                onClick={(e) => e.preventDefault()}
                className="hover:text-[#252525]"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                onClick={(e) => e.preventDefault()}
                className="hover:text-[#252525]"
              >
                Terms of Service
              </a>
              <a
                href="#cookies"
                onClick={(e) => e.preventDefault()}
                className="hover:text-[#252525]"
              >
                Cookies Settings
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
