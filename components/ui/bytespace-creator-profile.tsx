"use client";

import React, { useState, useMemo } from "react";
import {
  ShoppingBag,
  SlidersHorizontal,
  BarChart2,
  Grid,
  Users,
  BookOpen,
  Star,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ByteSpaceBrandLogo from "@/components/ui/bytespace-brand-logo";

export type ByteSpaceCreatorRoute =
  | "/"
  | "/courses"
  | "/creators"
  | "/course/build-digital-asset"
  | "/course/lessons"
  | "/course/reviews"
  | "/signup"
  | "/login"
  | "/404";

export interface ByteSpaceCreatorProfileProps {
  className?: string;
  onNavigate?: (path: ByteSpaceCreatorRoute) => void;
}

interface CreatorCourseItem {
  id: string;
  title: string;
  fullTitle: string;
  instructor: string;
  rating: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  displayLevel: string;
  lessons: string;
  duration: string;
  comments: string;
  price: number;
  image: string;
  category: string;
}

const CREATOR_COURSES: CreatorCourseItem[] = [
  {
    id: "learn-figma-from-basic",
    title: "Learn Figma from Basic",
    fullTitle: "Learn Figma from Basic",
    instructor: "by purepearl studio",
    rating: "4.5",
    level: "Beginner",
    displayLevel: "Beginner",
    lessons: "17 Lessons",
    duration: "2 hours 16 mins",
    comments: "59 Comments",
    price: 25,
    image: "/src/assets/images/course_figma_basics_1790632556720.jpg",
    category: "UI/UX Design",
  },
  {
    id: "build-digital-asset",
    title: "Build Digital Asset",
    fullTitle: "Build Digital Asset",
    instructor: "by purepearl studio",
    rating: "4.5",
    level: "Beginner",
    displayLevel: "Beginner",
    lessons: "17 Lessons",
    duration: "2 hours 16 mins",
    comments: "59 Comments",
    price: 25,
    image: "/src/assets/images/course_digital_assets_1790632569383.jpg",
    category: "Digital Design",
  },
  {
    id: "the-power-of-big-data",
    title: "the Power of Big Data",
    fullTitle: "the Power of Big Data",
    instructor: "by purepearl studio",
    rating: "4.5",
    level: "Beginner",
    displayLevel: "Beginner",
    lessons: "17 Lessons",
    duration: "2 hours 16 mins",
    comments: "59 Comments",
    price: 25,
    image: "/src/assets/images/dark_analytics_dashboard_1790658331935.jpg",
    category: "Data & Analytics",
  },
  {
    id: "balancing-productivity",
    title: "Balancing Productivity an...",
    fullTitle: "Balancing Productivity and Creative Flow",
    instructor: "by purepearl studio",
    rating: "4.5",
    level: "Beginner",
    displayLevel: "Beginner",
    lessons: "17 Lessons",
    duration: "2 hours 16 mins",
    comments: "59 Comments",
    price: 25,
    image: "/src/assets/images/course_productivity_1790632590389.jpg",
    category: "Productivity",
  },
  {
    id: "mastering-money-management",
    title: "Mastering Money Manage...",
    fullTitle: "Mastering Money Management",
    instructor: "by purepearl studio",
    rating: "4.5",
    level: "Beginner",
    displayLevel: "Beginner",
    lessons: "17 Lessons",
    duration: "2 hours 16 mins",
    comments: "59 Comments",
    price: 25,
    image: "/src/assets/images/course_money_management_1790632602238.jpg",
    category: "Finance",
  },
  {
    id: "from-idea-to-startup-success",
    title: "From Idea to Startup Succ...",
    fullTitle: "From Idea to Startup Success",
    instructor: "by purepearl studio",
    rating: "4.5",
    level: "Beginner",
    displayLevel: "Beginner",
    lessons: "17 Lessons",
    duration: "2 hours 16 mins",
    comments: "59 Comments",
    price: 25,
    image: "/src/assets/images/course_startup_success_1790632614991.jpg",
    category: "Business",
  },
];

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

// Internal sub-component: Overlapping Avatar Circles + Neon-Lime "26+" Badge
function StudentAvatarsBadge() {
  const avatars = [
    "/src/assets/images/hero_student_creator_1790632518202.jpg",
    "/src/assets/images/Image(2).png",
    "/src/assets/images/growth_student_lapreator_female_instructor_1790632544714.jpgtop_1790632531469.jpg",
  ];

  return (
    <div className="flex items-center -space-x-1.5">
      {avatars.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt="Student avatar"
          referrerPolicy="no-referrer"
          className="h-5 w-5 rounded-full border border-[#FFFFFF] object-cover"
        />
      ))}
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#FFFFFF] bg-[#C8FF00] text-[8px] font-extrabold text-[#252525] tabular-nums">
        26+
      </span>
    </div>
  );
}

// Internal sub-component: Creator Product Card matching Section 6 & 7
function CreatorProductCard({
  course,
  onSelect,
}: {
  course: CreatorCourseItem;
  onSelect: (course: CreatorCourseItem) => void;
}) {
  return (
    <article
      onClick={() => onSelect(course)}
      className="flex cursor-pointer flex-col overflow-hidden rounded-[14px] border border-[#E5E5E5] bg-[#FFFFFF] p-3"
    >
      {/* Course Image + 3 Translucent/Light-Gray Rounded Information Pills at Bottom */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[10px] bg-[#252525]">
        <img
          src={course.image}
          alt={course.fullTitle}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover"
        />
        <div className="absolute right-2 bottom-2 left-2 flex flex-wrap items-center gap-1.5">
          <span className="whitespace-nowrap rounded-full bg-[#252525]/65 px-2.5 py-0.5 text-[10px] font-medium text-[#FFFFFF] backdrop-blur-[2px]">
            {course.lessons}
          </span>
          <span className="whitespace-nowrap rounded-full bg-[#252525]/65 px-2.5 py-0.5 text-[10px] font-medium text-[#FFFFFF] backdrop-blur-[2px]">
            {course.duration}
          </span>
          <span className="whitespace-nowrap rounded-full bg-[#252525]/65 px-2.5 py-0.5 text-[10px] font-medium text-[#FFFFFF] backdrop-blur-[2px]">
            {course.comments}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="mt-3 flex flex-1 flex-col justify-between px-1 pb-0.5">
        <div>
          {/* Title on Left + Rating on Right ("4.5" + star) */}
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate text-[15px] font-bold tracking-tight text-[#252525]">
              {course.title}
            </h3>
            <span className="inline-flex shrink-0 items-center gap-1 text-[12px] font-semibold text-[#252525] tabular-nums">
              <span>{course.rating}</span>
              <Star className="h-3.5 w-3.5 fill-[#C8FF00] text-[#C8FF00]" />
            </span>
          </div>

          {/* Creator Line */}
          <p className="mt-1 text-[11px] font-medium text-[#0B3FE3]">
            {course.instructor}
          </p>

          {/* Metadata Row: "Beginner" + Overlapping Avatar Circles + "26+" */}
          <div className="mt-3 flex items-center gap-2.5">
            <span className="rounded-md bg-[#E5E5E5]/60 px-2.5 py-0.5 text-[10px] font-medium text-[#252525]">
              {course.displayLevel}
            </span>
            <StudentAvatarsBadge />
          </div>
        </div>

        {/* Bottom Price: "$25" "/lifetime" */}
        <div className="mt-3.5 flex items-baseline gap-0.5 tabular-nums">
          <span className="text-[18px] font-extrabold text-[#0B3FE3]">
            ${course.price}
          </span>
          <span className="text-[11px] font-normal text-[#252525]/55">
            /lifetime
          </span>
        </div>
      </div>
    </article>
  );
}

// Main exported Creator Profile / Creator Storefront Page Component
export default function ByteSpaceCreatorProfile({
  className,
  onNavigate,
}: ByteSpaceCreatorProfileProps) {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<
    "filter" | "level" | "category" | "sort" | null
  >(null);
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("Most relevant");
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [newsletterSubscribed, setNewsletterSubscribed] =
    useState<boolean>(false);

  const handleNavigate = (path: ByteSpaceCreatorRoute) => {
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

  const displayedCourses = useMemo(() => {
    const filtered = CREATOR_COURSES.filter((course) => {
      const matchLevel =
        selectedLevel === "All" || course.level === selectedLevel;
      const matchCat =
        selectedCategory === "All" || course.category === selectedCategory;
      return matchLevel && matchCat;
    });

    const list = filtered.length > 0 ? [...filtered] : [...CREATOR_COURSES];
    if (sortBy === "Title A–Z") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [selectedLevel, selectedCategory, sortBy]);

  return (
    <div
      className={cn(
        "min-h-screen w-full bg-[#FFFFFF] text-[#252525] selection:bg-[#C8FF00] selection:text-[#252525]",
        className
      )}
    >
      {/* =====================================================================
          1. HEADER & 2, 3, 4. CREATOR PROFILE HERO (ELECTRIC BLUE GRID)
      ===================================================================== */}
      <div className="relative bg-[#0B3FE3] text-[#FFFFFF]">
        <ElectricHeroGrid />

        {/* 1. HEADER */}
        <header className="relative z-20 mx-auto flex max-w-[1200px] items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          {/* LEFT: ByteSpace Logo */}
          <ByteSpaceBrandLogo light onClick={() => handleNavigate("/")} />

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
              className="whitespace-nowrap text-[#FFFFFF]"
            >
              Home
            </a>
            <a
              href="/courses"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate("/courses");
              }}
              className="whitespace-nowrap text-[#FFFFFF]"
            >
              Courses
            </a>
            <a
              href="/creators"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate("/creators");
              }}
              className="whitespace-nowrap font-bold text-[#C8FF00]"
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
              onClick={() => handleNavigate("/course/build-digital-asset")}
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
                href="/creators"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileNavOpen(false);
                  handleNavigate("/creators");
                }}
                className="rounded-lg bg-[#FFFFFF]/10 px-3 py-1.5 font-bold text-[#C8FF00]"
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

        {/* 2, 3, 4. CREATOR PROFILE HERO SECTION */}
        <section className="relative z-10 mx-auto max-w-[1200px] px-4 pt-6 pb-11 sm:px-6 lg:px-8">
          {/* 2. Creator Identity: Rounded-square profile image + PurePearl Studio + Creator badge + subtitle */}
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <img
              src="/src/assets/images/Image (2).png"
              alt="PurePearl Studio"
              referrerPolicy="no-referrer"
              className="h-16 w-16 shrink-0 rounded-[14px] object-cover sm:h-[72px] sm:w-[72px]"
            />

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-[24px] leading-tight font-bold tracking-tight text-[#FFFFFF] sm:text-[28px]">
                  PurePearl Studio
                </h1>
                <span className="inline-flex items-center rounded-md bg-[#C8FF00] px-2.5 py-0.5 text-[11px] font-bold text-[#252525]">
                  Creator
                </span>
              </div>
              <p className="mt-1 text-[13px] font-normal text-[#FFFFFF]/85 sm:text-[14px]">
                Passionate UI/UX, Web designer
              </p>
            </div>
          </div>

          {/* 3. Creator Description */}
          <div className="mt-6 max-w-3xl space-y-4 text-left text-[13px] leading-relaxed text-[#FFFFFF]/90 sm:text-[14px]">
            <p>
              Welcome to the creative world of [Creator&apos;s Name]. Here,
              you&apos;ll discover the passion, expertise, and inspiration that
              drive my creative journey. Let&apos;s explore and learn together!
            </p>
            <p>
              Dive into my creative portfolio, showcasing a glimpse of my
              artistic endeavors. From digital designs to multimedia projects,
              each piece tells a unique story.
              <br />
              Explore the world of creativity with me.
            </p>
          </div>

          {/* 4. Creator Stats + Follow Button */}
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
            {/* Two White Rounded Statistic Pills on the Left */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-[8px] bg-[#FFFFFF] px-3 text-[12px] font-semibold text-[#252525]">
                <BookOpen className="h-3.5 w-3.5 text-[#0B3FE3]" />
                <span>3 Products</span>
              </div>

              <div className="inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-[8px] bg-[#FFFFFF] px-3 text-[12px] font-semibold text-[#252525] tabular-nums">
                <Users className="h-3.5 w-3.5 text-[#0B3FE3]" />
                <span>{isFollowing ? "13 Followers" : "12 Followers"}</span>
              </div>
            </div>

            {/* Far Right: Bright Lime-Green Rounded "Follow" Button (no arrow) */}
            <button
              type="button"
              onClick={() => setIsFollowing((prev) => !prev)}
              className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-[8px] bg-[#C8FF00] px-6 text-[13px] font-bold text-[#252525]"
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>
        </section>
      </div>

      {/* =====================================================================
          5. PRODUCT AREA & 6. THREE-COLUMN × TWO-ROW PRODUCT GRID (6 CARDS)
      ===================================================================== */}
      <main className="mx-auto max-w-[1200px] px-4 pt-8 pb-20 sm:px-6 lg:px-8">
        {/* 5. Filter Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* LEFT SIDE: Filter, Level, Category Outlined Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Filter */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setOpenMenu((prev) => (prev === "filter" ? null : "filter"))
                }
                className="inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-[8px] border border-[#E5E5E5] bg-[#FFFFFF] px-3.5 text-[13px] font-medium text-[#252525]"
              >
                <SlidersHorizontal className="h-3.5 w-3.5 text-[#252525]/75" />
                <span>Filter</span>
              </button>

              {openMenu === "filter" && (
                <div className="absolute left-0 z-30 mt-2 w-48 rounded-[10px] border border-[#E5E5E5] bg-[#FFFFFF] p-3 shadow-md">
                  <div className="flex items-center justify-between text-[12px] font-bold text-[#252525]">
                    <span>Creator Filter</span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedLevel("All");
                        setSelectedCategory("All");
                        setSortBy("Most relevant");
                        setOpenMenu(null);
                      }}
                      className="text-[11px] font-semibold text-[#0B3FE3]"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Level */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setOpenMenu((prev) => (prev === "level" ? null : "level"))
                }
                className="inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-[8px] border border-[#E5E5E5] bg-[#FFFFFF] px-3.5 text-[13px] font-medium text-[#252525]"
              >
                <BarChart2 className="h-3.5 w-3.5 text-[#252525]/75" />
                <span>{selectedLevel === "All" ? "Level" : selectedLevel}</span>
              </button>

              {openMenu === "level" && (
                <div className="absolute left-0 z-30 mt-2 w-40 rounded-[10px] border border-[#E5E5E5] bg-[#FFFFFF] py-1 shadow-md">
                  {["All", "Beginner", "Intermediate", "Advanced"].map(
                    (lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => {
                          setSelectedLevel(lvl);
                          setOpenMenu(null);
                        }}
                        className={cn(
                          "block w-full px-3.5 py-1.5 text-left text-[12px] hover:bg-[#E5E5E5]/40",
                          selectedLevel === lvl && "font-bold text-[#0B3FE3]"
                        )}
                      >
                        {lvl === "All" ? "All Levels" : lvl}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Category */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setOpenMenu((prev) =>
                    prev === "category" ? null : "category"
                  )
                }
                className="inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-[8px] border border-[#E5E5E5] bg-[#FFFFFF] px-3.5 text-[13px] font-medium text-[#252525]"
              >
                <Grid className="h-3.5 w-3.5 text-[#252525]/75" />
                <span>
                  {selectedCategory === "All" ? "Category" : selectedCategory}
                </span>
              </button>

              {openMenu === "category" && (
                <div className="absolute left-0 z-30 mt-2 w-44 rounded-[10px] border border-[#E5E5E5] bg-[#FFFFFF] py-1 shadow-md">
                  {[
                    "All",
                    "UI/UX Design",
                    "Digital Design",
                    "Data & Analytics",
                    "Productivity",
                    "Finance",
                    "Business",
                  ].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setOpenMenu(null);
                      }}
                      className={cn(
                        "block w-full px-3.5 py-1.5 text-left text-[12px] hover:bg-[#E5E5E5]/40",
                        selectedCategory === cat && "font-bold text-[#0B3FE3]"
                      )}
                    >
                      {cat === "All" ? "All Categories" : cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: Most relevant */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setOpenMenu((prev) => (prev === "sort" ? null : "sort"))
              }
              className="inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-[8px] border border-[#E5E5E5] bg-[#FFFFFF] px-3.5 text-[13px] font-medium text-[#252525]"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#252525]/75" />
              <span>{sortBy}</span>
            </button>

            {openMenu === "sort" && (
              <div className="absolute right-0 z-30 mt-2 w-40 rounded-[10px] border border-[#E5E5E5] bg-[#FFFFFF] py-1 shadow-md">
                {["Most relevant", "Title A–Z"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSortBy(opt);
                      setOpenMenu(null);
                    }}
                    className={cn(
                      "block w-full px-3.5 py-1.5 text-left text-[12px] hover:bg-[#E5E5E5]/40",
                      sortBy === opt && "font-bold text-[#0B3FE3]"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 6. EXACT THREE-COLUMN × TWO-ROW PRODUCT GRID (6 VISIBLE CARDS) */}
        <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedCourses.map((course) => (
            <CreatorProductCard
              key={course.id}
              course={course}
              onSelect={() => handleNavigate("/course/build-digital-asset")}
            />
          ))}
        </div>
      </main>

      {/* =====================================================================
          8 & 9. WHITE FOOTER & FOOTER BOTTOM
      ===================================================================== */}
      <footer className="border-t border-[#E5E5E5] bg-[#FFFFFF] pt-14 pb-10">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* LEFT SIDE: ByteSpace Logo + Newsletter */}
            <div className="lg:col-span-5">
              <ByteSpaceBrandLogo onClick={() => handleNavigate("/")} />
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

          {/* 9. FOOTER BOTTOM */}
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
