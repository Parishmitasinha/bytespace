"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  ShoppingBag,
  SlidersHorizontal,
  BarChart2,
  Grid,
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ByteSpaceRoute =
  | "/"
  | "/courses"
  | "/course/build-digital-asset"
  | "/signup"
  | "/login";

export interface ByteSpaceCoursesProps {
  className?: string;
  initialSearchQuery?: string;
  onNavigate?: (path: ByteSpaceRoute) => void;
}

interface DiscoveryCourse {
  id: string;
  baseId: string;
  title: string;
  fullTitle: string;
  instructor: string;
  rating: number;
  ratingLabel: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  displayLevel: string;
  price: number;
  lessons: string;
  duration: string;
  comments: string;
  image: string;
  category: string;
  tags: string[];
  createdOrder: number;
}

const CHIP_CATEGORIES: string[] = [
  "Featured",
  "Music",
  "Drawing & Painting",
  "Marketing",
  "Animation",
  "Social Media",
  "UI/UX Design",
  "Creative Marketing",
  "Cooking",
];

const DROPDOWN_CATEGORIES: string[] = [
  "All Categories",
  "Music",
  "Drawing & Painting",
  "Marketing",
  "Animation",
  "Social Media",
  "UI/UX Design",
  "Creative Marketing",
  "Cooking",
];

const SORT_OPTIONS = [
  "Most relevant",
  "Newest",
  "Highest rated",
  "Lowest price",
  "Highest price",
] as const;

type SortOption = (typeof SORT_OPTIONS)[number];

const BASE_SIX_COURSES = [
  {
    baseId: "learn-figma-from-basic",
    title: "Learn Figma from Basic",
    fullTitle: "Learn Figma from Basic",
    instructor: "by purepearl studio",
    rating: 4.5,
    ratingLabel: "4.5 ★",
    displayLevel: "Beginner",
    price: 25,
    lessons: "17 Lessons",
    duration: "2 hours 16 mins",
    comments: "59 Comments",
    image: "/src/assets/images/course_figma_basics_1790632556720.jpg",
    category: "UI/UX Design",
    tags: ["Featured", "UI/UX Design", "Drawing & Painting", "Animation"],
  },
  {
    baseId: "build-digital-asset",
    title: "Build Digital Asset",
    fullTitle: "Build Digital Asset",
    instructor: "by purepearl studio",
    rating: 4.5,
    ratingLabel: "4.5 ★",
    displayLevel: "Beginner",
    price: 25,
    lessons: "17 Lessons",
    duration: "2 hours 16 mins",
    comments: "59 Comments",
    image: "/src/assets/images/course_digital_assets_1790632569383.jpg",
    category: "Drawing & Painting",
    tags: ["Featured", "Drawing & Painting", "Animation", "UI/UX Design"],
  },
  {
    baseId: "the-power-of-big-data",
    title: "the Power of Big Data",
    fullTitle: "the Power of Big Data",
    instructor: "by purepearl studio",
    rating: 4.5,
    ratingLabel: "4.5 ★",
    displayLevel: "Beginner",
    price: 25,
    lessons: "17 Lessons",
    duration: "2 hours 16 mins",
    comments: "59 Comments",
    image: "/src/assets/images/dark_analytics_dashboard_1790658331935.jpg",
    category: "Marketing",
    tags: ["Featured", "Marketing", "Creative Marketing", "Music"],
  },
  {
    baseId: "balancing-productivity",
    title: "Balancing Productivity and...",
    fullTitle: "Balancing Productivity and Creative Flow",
    instructor: "by purepearl studio",
    rating: 4.5,
    ratingLabel: "4.5 ★",
    displayLevel: "Beginner",
    price: 25,
    lessons: "17 Lessons",
    duration: "2 hours 16 mins",
    comments: "59 Comments",
    image: "/src/assets/images/course_productivity_1790632590389.jpg",
    category: "Social Media",
    tags: ["Featured", "Social Media", "Cooking", "Music"],
  },
  {
    baseId: "mastering-money-management",
    title: "Mastering Money Manage...",
    fullTitle: "Mastering Money Management",
    instructor: "by purepearl studio",
    rating: 4.5,
    ratingLabel: "4.5 ★",
    displayLevel: "Beginner",
    price: 25,
    lessons: "17 Lessons",
    duration: "2 hours 16 mins",
    comments: "59 Comments",
    image: "/src/assets/images/course_money_management_1790632602238.jpg",
    category: "Creative Marketing",
    tags: ["Featured", "Creative Marketing", "Marketing", "Cooking"],
  },
  {
    baseId: "from-idea-to-startup-success",
    title: "From Idea to Startup Succ...",
    fullTitle: "From Idea to Startup Success",
    instructor: "by purepearl studio",
    rating: 4.5,
    ratingLabel: "4.5 ★",
    displayLevel: "Beginner",
    price: 25,
    lessons: "17 Lessons",
    duration: "2 hours 16 mins",
    comments: "59 Comments",
    image: "/src/assets/images/course_startup_success_1790632614991.jpg",
    category: "Marketing",
    tags: ["Featured", "Marketing", "Social Media", "Creative Marketing"],
  },
];

// Repeat the 6 courses across 3 rows (18 cards per page) for a full multi-row 3-column discovery grid
const ALL_DISCOVERY_COURSES: DiscoveryCourse[] = Array.from({ length: 18 }).map(
  (_, idx) => {
    const base = BASE_SIX_COURSES[idx % BASE_SIX_COURSES.length];
    const levels: Array<"Beginner" | "Intermediate" | "Advanced"> = [
      "Beginner",
      "Intermediate",
      "Advanced",
    ];
    return {
      ...base,
      id: `${base.baseId}-row-${Math.floor(idx / 6) + 1}-${idx}`,
      level: idx < 6 ? "Beginner" : levels[idx % 3],
      createdOrder: idx + 1,
    };
  }
);

// Internal sub-component: Subtle Technical Grid Background
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

// Internal sub-component: Student Avatars + Neon-Lime "26+" Indicator
function StudentAvatarsNeonBadge() {
  const avatars = [
    "/src/assets/images/hero_student_creator_1790632518202.jpg",
    "/src/assets/images/creator_female_instructor_1790632544714.jpg",
    "/src/assets/images/growth_student_laptop_1790632531469.jpg",
  ];

  return (
    <div className="flex items-center -space-x-2">
      {avatars.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt="Enrolled student"
          referrerPolicy="no-referrer"
          className="h-6 w-6 rounded-full border-2 border-[#FFFFFF] object-cover"
        />
      ))}
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#FFFFFF] bg-[#C8FF00] text-[9px] font-extrabold text-[#252525] tabular-nums">
        26+
      </span>
    </div>
  );
}

// Internal sub-component: Individual Course Card matching Section 11, 12, 14
function DiscoveryCourseCard({
  course,
  onSelectCourse,
}: {
  course: DiscoveryCourse;
  onSelectCourse: (course: DiscoveryCourse) => void;
}) {
  return (
    <article
      onClick={() => onSelectCourse(course)}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-[14px] border border-[#E5E5E5] bg-[#FFFFFF] p-3 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-xs"
    >
      {/* 1. Course Image + 2. Image Metadata Overlays */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[10px] bg-[#252525]">
        <img
          src={course.image}
          alt={course.fullTitle}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
        />
        {/* Three compact dark/translucent metadata pills overlaid on image */}
        <div className="absolute right-2 bottom-2 left-2 flex flex-wrap items-center gap-1.5">
          <span className="rounded-full bg-[#252525]/75 px-2.5 py-0.5 text-[10px] font-medium text-[#FFFFFF] backdrop-blur-[2px] whitespace-nowrap">
            {course.lessons}
          </span>
          <span className="rounded-full bg-[#252525]/75 px-2.5 py-0.5 text-[10px] font-medium text-[#FFFFFF] backdrop-blur-[2px] whitespace-nowrap">
            {course.duration}
          </span>
          <span className="rounded-full bg-[#252525]/75 px-2.5 py-0.5 text-[10px] font-medium text-[#FFFFFF] backdrop-blur-[2px] whitespace-nowrap">
            {course.comments}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="mt-3 flex flex-1 flex-col justify-between px-1 pb-1">
        <div>
          {/* Row: 3. Course Title + 5. Right-aligned Rating */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 text-[15px] font-bold tracking-tight text-[#252525] group-hover:text-[#0B3FE3]">
              {course.title}
            </h3>
            <span className="shrink-0 text-[12px] font-semibold text-[#252525]/80 tabular-nums">
              4.5 <span className="text-[#C8FF00]">★</span>
            </span>
          </div>

          {/* Row: 4. Instructor (Small Blue Accent) + 6. Level Pill */}
          <div className="mt-1 flex items-center justify-between gap-2">
            <p className="text-[11px] font-medium text-[#0B3FE3]">
              {course.instructor}
            </p>
            <span className="rounded-full border border-[#E5E5E5] bg-[#E5E5E5]/40 px-2.5 py-0.5 text-[10px] font-medium text-[#252525]">
              {course.displayLevel}
            </span>
          </div>
        </div>

        {/* Bottom Row: 7. Student Avatars + 8. Price */}
        <div className="mt-3.5 flex items-center justify-between border-t border-[#E5E5E5]/70 pt-3">
          <StudentAvatarsNeonBadge />
          <div className="text-right tabular-nums">
            <span className="text-[15px] font-bold text-[#0B3FE3]">
              ${course.price}
            </span>
            <span className="text-[11px] font-normal text-[#252525]/55">
              /lifetime
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

// Main exported Search / Course Discovery Page Component
export default function ByteSpaceCourses({
  className,
  initialSearchQuery = "",
  onNavigate,
}: ByteSpaceCoursesProps) {
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [searchScope, setSearchScope] = useState<string>("Courses");
  const [scopeDropdownOpen, setScopeDropdownOpen] = useState<boolean>(false);

  const [selectedChip, setSelectedChip] = useState<string>("Featured");
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [selectedCategoryControl, setSelectedCategoryControl] =
    useState<string>("All Categories");
  const [selectedPriceFilter, setSelectedPriceFilter] = useState<string>("All");
  const [selectedRatingFilter, setSelectedRatingFilter] =
    useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("Most relevant");

  const [openControlMenu, setOpenControlMenu] = useState<
    "filter" | "level" | "category" | "sort" | null
  >(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const [selectedCourseDetail, setSelectedCourseDetail] =
    useState<DiscoveryCourse | null>(null);
  const [bagCount, setBagCount] = useState<number>(0);
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [newsletterSubscribed, setNewsletterSubscribed] =
    useState<boolean>(false);

  const handleNavigate = (path: ByteSpaceRoute) => {
    if (onNavigate) {
      onNavigate(path);
    } else if (typeof window !== "undefined") {
      window.history.pushState({}, "", path);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  };

  // Functional Search, Category Chip, Filter, and Sort Pipeline
  const filteredAndSortedCourses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = ALL_DISCOVERY_COURSES.filter((course) => {
      // Search input match
      const matchesQuery =
        !query ||
        course.title.toLowerCase().includes(query) ||
        course.fullTitle.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query) ||
        course.tags.some((t) => t.toLowerCase().includes(query));

      // Category chip match
      const matchesChip =
        selectedChip === "Featured" ||
        course.category === selectedChip ||
        course.tags.includes(selectedChip);

      // Category dropdown control match
      const matchesCategoryDropdown =
        selectedCategoryControl === "All Categories" ||
        course.category === selectedCategoryControl ||
        course.tags.includes(selectedCategoryControl);

      // Level control match
      const matchesLevel =
        selectedLevel === "All" || course.level === selectedLevel;

      // Price filter match
      const matchesPrice =
        selectedPriceFilter === "All" ||
        (selectedPriceFilter === "Under $30" && course.price <= 30) ||
        (selectedPriceFilter === "$25 Lifetime" && course.price === 25);

      // Rating filter match
      const matchesRating =
        selectedRatingFilter === "All" ||
        (selectedRatingFilter === "4.5 & up" && course.rating >= 4.5);

      return (
        matchesQuery &&
        matchesChip &&
        matchesCategoryDropdown &&
        matchesLevel &&
        matchesPrice &&
        matchesRating
      );
    });

    const sorted = [...filtered];
    if (sortBy === "Newest") {
      sorted.sort((a, b) => b.createdOrder - a.createdOrder);
    } else if (sortBy === "Highest rated") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "Lowest price") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Highest price") {
      sorted.sort((a, b) => b.price - a.price);
    }

    return sorted;
  }, [
    searchQuery,
    selectedChip,
    selectedCategoryControl,
    selectedLevel,
    selectedPriceFilter,
    selectedRatingFilter,
    sortBy,
  ]);

  // Ensure 3-column multiple rows (up to 9 cards per page so 3 rows of 3 columns are always cleanly displayed)
  const visibleCourses = useMemo(() => {
    if (filteredAndSortedCourses.length === 0) return [];
    const perPage = 9;
    const start = ((currentPage - 1) * 3) % filteredAndSortedCourses.length;
    const rotated = [
      ...filteredAndSortedCourses.slice(start),
      ...filteredAndSortedCourses.slice(0, start),
    ];
    return rotated.slice(0, Math.min(perPage, rotated.length));
  }, [filteredAndSortedCourses, currentPage]);

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
          1. BYTESPACE NAVIGATION & 2. BLUE SEARCH HERO
      ===================================================================== */}
      <div className="relative bg-[#0B3FE3] text-[#FFFFFF]">
        <ElectricHeroGrid />

        {/* 3. NAVIGATION BAR */}
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
              className="transition-colors hover:text-[#C8FF00] whitespace-nowrap"
            >
              Home
            </a>
            <a
              href="/courses"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate("/courses");
              }}
              className="font-bold text-[#C8FF00] whitespace-nowrap"
            >
              Courses
            </a>
            <a
              href="/creators"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate("/creators" as ByteSpaceRoute);
              }}
              className="transition-colors hover:text-[#C8FF00] whitespace-nowrap"
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
              onClick={() => setBagCount((c) => c)}
              aria-label="Course Bag"
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#FFFFFF]/25 bg-[#FFFFFF]/10 text-[#FFFFFF] transition-colors hover:bg-[#FFFFFF]/20"
            >
              <ShoppingBag className="h-4 w-4" />
              {bagCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#C8FF00] px-1 text-[10px] font-extrabold text-[#252525] tabular-nums">
                  {bagCount}
                </span>
              )}
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

        {/* Mobile Menu */}
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
                className="rounded-lg px-3 py-1.5 hover:bg-[#FFFFFF]/10"
              >
                Home
              </a>
              <a
                href="/courses"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileNavOpen(false);
                }}
                className="rounded-lg bg-[#FFFFFF]/10 px-3 py-1.5 font-bold text-[#C8FF00]"
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
                className="rounded-lg px-3 py-1.5 hover:bg-[#FFFFFF]/10"
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

        {/* 4, 5, 6. COMPACT SEARCH HERO: HEADING + SEARCH INPUT & COURSES SELECTOR */}
        <section className="relative z-10 mx-auto max-w-[1200px] px-4 pt-6 pb-12 text-center sm:px-6 md:pt-8 md:pb-14 lg:px-8">
          <h1 className="text-[28px] font-bold tracking-tight text-[#FFFFFF] sm:text-[32px]">
            Find Your Next Course
          </h1>

          {/* Centered Search Interface: Search Input + Neon-Lime Courses Dropdown */}
          <div className="mx-auto mt-6 flex max-w-[530px] flex-col items-stretch justify-center gap-2.5 sm:flex-row sm:items-center">
            {/* Large Search Input (~380-400px desktop width, ~46px height) */}
            <div className="relative flex h-[46px] w-full items-center rounded-[10px] bg-[#FFFFFF] px-3.5 text-[#252525] shadow-2xs sm:w-[390px]">
              <Search className="mr-2.5 h-4 w-4 shrink-0 text-[#252525]/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search"
                aria-label="Search courses"
                className="h-full w-full bg-transparent text-[14px] text-[#252525] placeholder-[#252525]/45 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="ml-1 text-[#252525]/40 hover:text-[#252525]"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Category Dropdown ("Courses" + small downward chevron, #C8FF00 background) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setScopeDropdownOpen((prev) => !prev)}
                className="flex h-[46px] w-full items-center justify-between gap-2 rounded-[10px] bg-[#C8FF00] px-4 text-[14px] font-bold text-[#252525] transition-opacity hover:opacity-95 sm:w-[118px] whitespace-nowrap"
              >
                <span>{searchScope}</span>
                <ChevronDown className="h-4 w-4 shrink-0 text-[#252525]" />
              </button>

              {scopeDropdownOpen && (
                <div className="absolute right-0 z-30 mt-1.5 w-40 rounded-[10px] border border-[#E5E5E5] bg-[#FFFFFF] py-1 text-left text-[13px] text-[#252525] shadow-md">
                  {["Courses", "Workshops", "Tracks"].map((scope) => (
                    <button
                      key={scope}
                      type="button"
                      onClick={() => {
                        setSearchScope(scope);
                        setScopeDropdownOpen(false);
                      }}
                      className={cn(
                        "block w-full px-3.5 py-2 text-left transition-colors hover:bg-[#E5E5E5]/40",
                        searchScope === scope && "font-bold text-[#0B3FE3]"
                      )}
                    >
                      {scope}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* =====================================================================
          MAIN WHITE CONTENT AREA (SECTIONS 8 - 19)
      ===================================================================== */}
      <main className="mx-auto max-w-[1200px] px-4 pt-8 pb-16 sm:px-6 lg:px-8">
        {/* 8. FILTER / SORT AREA */}
        <div className="relative flex flex-wrap items-center justify-between gap-3">
          {/* LEFT: Filter, Level, Category Outlined Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Filter Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setOpenControlMenu((prev) =>
                    prev === "filter" ? null : "filter"
                  )
                }
                className={cn(
                  "inline-flex h-9 items-center gap-2 rounded-[8px] border px-3.5 text-[13px] font-medium transition-colors whitespace-nowrap",
                  openControlMenu === "filter" ||
                    selectedPriceFilter !== "All" ||
                    selectedRatingFilter !== "All"
                    ? "border-[#252525] bg-[#C8FF00] text-[#252525]"
                    : "border-[#E5E5E5] bg-[#FFFFFF] text-[#252525] hover:border-[#252525]/40"
                )}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>Filter</span>
              </button>

              {openControlMenu === "filter" && (
                <div className="absolute left-0 z-30 mt-2 w-64 rounded-[12px] border border-[#E5E5E5] bg-[#FFFFFF] p-4 shadow-md">
                  <div className="flex items-center justify-between pb-2">
                    <span className="text-[13px] font-bold text-[#252525]">
                      Filter Courses
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedLevel("All");
                        setSelectedCategoryControl("All Categories");
                        setSelectedPriceFilter("All");
                        setSelectedRatingFilter("All");
                        setSelectedChip("Featured");
                      }}
                      className="text-[11px] font-semibold text-[#0B3FE3] hover:underline"
                    >
                      Reset all
                    </button>
                  </div>

                  <div className="mt-2 border-t border-[#E5E5E5] pt-3">
                    <p className="mb-1.5 text-[11px] font-semibold text-[#252525]/70">
                      Price
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {["All", "$25 Lifetime", "Under $30"].map((priceOpt) => (
                        <button
                          key={priceOpt}
                          type="button"
                          onClick={() => setSelectedPriceFilter(priceOpt)}
                          className={cn(
                            "rounded-md border px-2.5 py-1 text-[11px] font-medium",
                            selectedPriceFilter === priceOpt
                              ? "border-[#252525] bg-[#C8FF00] text-[#252525]"
                              : "border-[#E5E5E5] bg-[#FFFFFF] text-[#252525]"
                          )}
                        >
                          {priceOpt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 border-t border-[#E5E5E5] pt-3">
                    <p className="mb-1.5 text-[11px] font-semibold text-[#252525]/70">
                      Rating
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {["All", "4.5 & up"].map((ratingOpt) => (
                        <button
                          key={ratingOpt}
                          type="button"
                          onClick={() => setSelectedRatingFilter(ratingOpt)}
                          className={cn(
                            "rounded-md border px-2.5 py-1 text-[11px] font-medium",
                            selectedRatingFilter === ratingOpt
                              ? "border-[#252525] bg-[#C8FF00] text-[#252525]"
                              : "border-[#E5E5E5] bg-[#FFFFFF] text-[#252525]"
                          )}
                        >
                          {ratingOpt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Level Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setOpenControlMenu((prev) =>
                    prev === "level" ? null : "level"
                  )
                }
                className={cn(
                  "inline-flex h-9 items-center gap-2 rounded-[8px] border px-3.5 text-[13px] font-medium transition-colors whitespace-nowrap",
                  selectedLevel !== "All"
                    ? "border-[#252525] bg-[#C8FF00] text-[#252525]"
                    : "border-[#E5E5E5] bg-[#FFFFFF] text-[#252525] hover:border-[#252525]/40"
                )}
              >
                <BarChart2 className="h-3.5 w-3.5" />
                <span>
                  {selectedLevel === "All" ? "Level" : selectedLevel}
                </span>
              </button>

              {openControlMenu === "level" && (
                <div className="absolute left-0 z-30 mt-2 w-44 rounded-[10px] border border-[#E5E5E5] bg-[#FFFFFF] py-1 shadow-md">
                  {["All", "Beginner", "Intermediate", "Advanced"].map(
                    (lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => {
                          setSelectedLevel(lvl);
                          setOpenControlMenu(null);
                        }}
                        className={cn(
                          "block w-full px-3.5 py-2 text-left text-[13px] transition-colors hover:bg-[#E5E5E5]/40",
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

            {/* Category Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setOpenControlMenu((prev) =>
                    prev === "category" ? null : "category"
                  )
                }
                className={cn(
                  "inline-flex h-9 items-center gap-2 rounded-[8px] border px-3.5 text-[13px] font-medium transition-colors whitespace-nowrap",
                  selectedCategoryControl !== "All Categories"
                    ? "border-[#252525] bg-[#C8FF00] text-[#252525]"
                    : "border-[#E5E5E5] bg-[#FFFFFF] text-[#252525] hover:border-[#252525]/40"
                )}
              >
                <Grid className="h-3.5 w-3.5" />
                <span>
                  {selectedCategoryControl === "All Categories"
                    ? "Category"
                    : selectedCategoryControl}
                </span>
              </button>

              {openControlMenu === "category" && (
                <div className="absolute left-0 z-30 mt-2 w-52 rounded-[10px] border border-[#E5E5E5] bg-[#FFFFFF] py-1 shadow-md">
                  {DROPDOWN_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSelectedCategoryControl(cat);
                        if (cat !== "All Categories") {
                          setSelectedChip(cat);
                        } else {
                          setSelectedChip("Featured");
                        }
                        setOpenControlMenu(null);
                      }}
                      className={cn(
                        "block w-full px-3.5 py-2 text-left text-[13px] transition-colors hover:bg-[#E5E5E5]/40",
                        selectedCategoryControl === cat &&
                          "font-bold text-[#0B3FE3]"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Sort Dropdown ("Most relevant") */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setOpenControlMenu((prev) => (prev === "sort" ? null : "sort"))
              }
              className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-[#E5E5E5] bg-[#FFFFFF] px-3.5 text-[13px] font-medium text-[#252525] transition-colors hover:border-[#252525]/40 whitespace-nowrap"
            >
              <ArrowUpDown className="h-3.5 w-3.5 text-[#252525]/70" />
              <span>{sortBy}</span>
              <ChevronDown className="h-3.5 w-3.5 text-[#252525]/70" />
            </button>

            {openControlMenu === "sort" && (
              <div className="absolute right-0 z-30 mt-2 w-44 rounded-[10px] border border-[#E5E5E5] bg-[#FFFFFF] py-1 shadow-md">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setSortBy(option);
                      setOpenControlMenu(null);
                    }}
                    className={cn(
                      "block w-full px-3.5 py-2 text-left text-[13px] transition-colors hover:bg-[#E5E5E5]/40",
                      sortBy === option && "font-bold text-[#0B3FE3]"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 9. CATEGORY CHIPS */}
        <div
          role="tablist"
          aria-label="Course Category Chips"
          className="mt-5 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar"
        >
          {CHIP_CATEGORIES.map((chip) => {
            const isActive = selectedChip === chip;
            return (
              <button
                key={chip}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => {
                  setSelectedChip(chip);
                  setSelectedCategoryControl(
                    chip === "Featured" ? "All Categories" : chip
                  );
                  setCurrentPage(1);
                }}
                className={cn(
                  "rounded-[8px] px-3.5 py-1.5 text-[12px] font-semibold transition-colors whitespace-nowrap shrink-0",
                  isActive
                    ? "bg-[#C8FF00] text-[#252525]"
                    : "bg-[#E5E5E5]/60 text-[#252525]/80 hover:bg-[#E5E5E5]"
                )}
              >
                {chip}
              </button>
            );
          })}
        </div>

        {/* 10, 11, 12, 13. THREE-COLUMN COURSE GRID WITH MULTIPLE ROWS */}
        {visibleCourses.length === 0 ? (
          <div className="my-12 rounded-[14px] border border-[#E5E5E5] bg-[#FFFFFF] p-12 text-center">
            <p className="text-[16px] font-bold text-[#252525]">
              No matching courses found for &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="mt-1 text-[13px] text-[#252525]/60">
              Try clearing your search or resetting the active category filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedChip("Featured");
                setSelectedLevel("All");
                setSelectedCategoryControl("All Categories");
                setSelectedPriceFilter("All");
                setSelectedRatingFilter("All");
              }}
              className="mt-4 rounded-[8px] bg-[#C8FF00] px-4 py-2 text-[13px] font-bold text-[#252525]"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleCourses.map((course) => (
              <DiscoveryCourseCard
                key={course.id}
                course={course}
                onSelectCourse={(c) => {
                  if (c.baseId === "build-digital-asset") {
                    handleNavigate("/course/build-digital-asset");
                  } else {
                    setSelectedCourseDetail(c);
                  }
                }}
              />
            ))}
          </div>
        )}

        {/* 19. PAGINATION */}
        <nav
          aria-label="Course Pagination"
          className="mt-12 flex items-center justify-center gap-2"
        >
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            aria-label="Previous page"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E5E5] bg-[#FFFFFF] text-[#252525] transition-colors hover:bg-[#E5E5E5]/40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {[1, 2, 3, 4, 5].map((page) => {
            const active = currentPage === page;
            return (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold transition-colors tabular-nums",
                  active
                    ? "bg-[#C8FF00] text-[#252525]"
                    : "border border-[#E5E5E5] bg-[#FFFFFF] text-[#252525]/75 hover:bg-[#E5E5E5]/40"
                )}
              >
                {page}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
            aria-label="Next page"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E5E5] bg-[#FFFFFF] text-[#252525] transition-colors hover:bg-[#E5E5E5]/40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      </main>

      {/* =====================================================================
          20, 21, 22, 23. CLEAN FULL-WIDTH WHITE FOOTER
      ===================================================================== */}
      <footer className="border-t border-[#E5E5E5] bg-[#FFFFFF] pt-14 pb-10">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* 21. FOOTER BRANDING & NEWSLETTER */}
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

            {/* 22. THREE FOOTER LINK COLUMNS */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
              {/* COLUMN 1 */}
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
                          setSelectedChip("Featured");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="transition-colors hover:text-[#0B3FE3]"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* COLUMN 2 */}
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
                          if (item === "Marketing") {
                            setSelectedChip("Marketing");
                          }
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="transition-colors hover:text-[#0B3FE3]"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* COLUMN 3 */}
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
                          if (item === "Become a Creator") {
                            handleNavigate("/signup");
                          } else {
                            handleNavigate("/");
                          }
                        }}
                        className="transition-colors hover:text-[#0B3FE3]"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 23. FOOTER BOTTOM */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#E5E5E5] pt-6 text-[12px] text-[#252525]/60 sm:flex-row">
            <p>© 2023 ByteSpace. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a
                href="/courses"
                onClick={(e) => e.preventDefault()}
                className="hover:text-[#252525]"
              >
                Privacy Policy
              </a>
              <a
                href="/courses"
                onClick={(e) => e.preventDefault()}
                className="hover:text-[#252525]"
              >
                Terms of Service
              </a>
              <a
                href="/courses"
                onClick={(e) => e.preventDefault()}
                className="hover:text-[#252525]"
              >
                Cookies Settings
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          15. COURSE DETAIL & REVIEWS OVERLAY VIEW WHEN A CARD IS CLICKED
      ===================================================================== */}
      {selectedCourseDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#252525]/60 p-4">
          <div className="w-full max-w-lg overflow-hidden rounded-[18px] border border-[#E5E5E5] bg-[#FFFFFF] shadow-xl">
            <div className="relative aspect-[16/9] w-full bg-[#252525]">
              <img
                src={selectedCourseDetail.image}
                alt={selectedCourseDetail.fullTitle}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedCourseDetail(null)}
                aria-label="Close course detail"
                className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#252525]/80 text-[#FFFFFF] hover:bg-[#252525]"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-1.5">
                <span className="rounded-full bg-[#252525]/80 px-2.5 py-0.5 text-[11px] font-medium text-[#FFFFFF]">
                  {selectedCourseDetail.lessons}
                </span>
                <span className="rounded-full bg-[#252525]/80 px-2.5 py-0.5 text-[11px] font-medium text-[#FFFFFF]">
                  {selectedCourseDetail.duration}
                </span>
                <span className="rounded-full bg-[#252525]/80 px-2.5 py-0.5 text-[11px] font-medium text-[#FFFFFF]">
                  {selectedCourseDetail.comments}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="rounded-full border border-[#E5E5E5] bg-[#E5E5E5]/40 px-2.5 py-0.5 text-[11px] font-medium text-[#252525]">
                    {selectedCourseDetail.displayLevel}
                  </span>
                  <h2 className="mt-2 text-[20px] font-bold text-[#252525]">
                    {selectedCourseDetail.fullTitle}
                  </h2>
                  <p className="mt-0.5 text-[12px] font-medium text-[#0B3FE3]">
                    {selectedCourseDetail.instructor}
                  </p>
                </div>
                <span className="text-[14px] font-bold text-[#252525] tabular-nums">
                  {selectedCourseDetail.ratingLabel}
                </span>
              </div>

              <p className="mt-3 text-[13px] leading-relaxed text-[#252525]/75">
                Hands-on ByteSpace curriculum featuring 17 structured video
                lessons, studio project files, and verified community feedback.
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-[#E5E5E5] pt-4">
                <div className="flex items-center gap-3">
                  <StudentAvatarsNeonBadge />
                  <div className="tabular-nums">
                    <span className="text-[18px] font-bold text-[#0B3FE3]">
                      ${selectedCourseDetail.price}
                    </span>
                    <span className="text-[12px] text-[#252525]/55">
                      /lifetime
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCourseDetail(null)}
                    className="rounded-[8px] border border-[#E5E5E5] px-4 py-2 text-[13px] font-semibold text-[#252525] hover:bg-[#E5E5E5]/40"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setBagCount((c) => c + 1);
                      setSelectedCourseDetail(null);
                    }}
                    className="rounded-[8px] bg-[#C8FF00] px-5 py-2 text-[13px] font-bold text-[#252525] hover:opacity-90"
                  >
                    Enroll Course
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
