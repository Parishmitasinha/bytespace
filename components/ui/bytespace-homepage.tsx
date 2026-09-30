"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  Star,
  Clock,
  BookOpen,
  PenTool,
  Code2,
  Cpu,
  Briefcase,
  Megaphone,
  Camera,
  Check,
  TrendingUp,
  Users,
  Award,
  X,
  Menu,
  CheckCircle2,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ByteSpaceBrandLogo from "@/components/ui/bytespace-brand-logo";

export type ByteSpaceHomeRoute =
  | "/"
  | "/courses"
  | "/creators"
  | "/course/build-digital-asset"
  | "/signup"
  | "/login";

export interface ByteSpaceHomepageProps {
  className?: string;
  onNavigate?: (path: ByteSpaceHomeRoute) => void;
}

interface CourseItem {
  id: string;
  title: string;
  category: string;
  tags: string[];
  instructor: string;
  instructorRole: string;
  rating: string;
  reviews: number;
  studentsCount: string;
  price: number;
  lessons: number;
  duration: string;
  image: string;
  avatarColors: string[];
}

const CATEGORIES: string[] = [
  "Featured",
  "Music",
  "Drawing & Painting",
  "Marketing",
  "Animation",
  "Social Media",
  "UI/UX Design",
  "Creative Marketing",
  "Digital Illustration",
  "Film & Video",
  "Crafts",
  "Freelance & Entrepreneurship",
  "Graphic Design",
  "Photography",
  "Productivity",
  "Web Development",
  "Data Science",
  "Cooking",
  "More",
];

const COURSES: CourseItem[] = [
  {
    id: "figma-basics",
    title: "Learn Figma from Basics",
    category: "UX/UI Design",
    tags: ["Featured", "UX/UI Design", "Graphic Design", "Web Development"],
    instructor: "Marcus Vance",
    instructorRole: "Lead Product Designer",
    rating: "4.9",
    reviews: 428,
    studentsCount: "3.4k",
    price: 49,
    lessons: 24,
    duration: "6h 40m",
    image: "/src/assets/images/course_figma_basics_1790632556720.jpg",
    avatarColors: ["#1D44F9", "#0B1021", "#10B981"],
  },
  {
    id: "digital-assets",
    title: "Build Digital Assets",
    category: "Digital Illustration",
    tags: ["Featured", "Art", "Drawing & Painting", "Digital Illustration", "Graphic Design", "Crafts"],
    instructor: "Elena Rostova",
    instructorRole: "3D & Brand Illustrator",
    rating: "4.8",
    reviews: 312,
    studentsCount: "2.1k",
    price: 59,
    lessons: 19,
    duration: "5h 15m",
    image: "/src/assets/images/course_digital_assets_1790632569383.jpg",
    avatarColors: ["#6366F1", "#EC4899", "#0B1021"],
  },
  {
    id: "big-data",
    title: "The Power of Big Data",
    category: "Data Science",
    tags: ["Featured", "Data Science", "Simulation", "Coding", "Web Development"],
    instructor: "Dr. Aris Thorne",
    instructorRole: "Principal Data Architect",
    rating: "4.9",
    reviews: 519,
    studentsCount: "4.8k",
    price: 69,
    lessons: 32,
    duration: "9h 20m",
    image: "/src/assets/images/course_big_data_1790632580143.jpg",
    avatarColors: ["#0EA5E9", "#1D44F9", "#334155"],
  },
  {
    id: "boosting-productivity",
    title: "Boosting Productivity",
    category: "Productivity",
    tags: ["Featured", "Productivity", "Creative Writing", "Photography", "Film & Video"],
    instructor: "Claire Sterling",
    instructorRole: "Operations Director",
    rating: "4.7",
    reviews: 276,
    studentsCount: "1.9k",
    price: 39,
    lessons: 16,
    duration: "4h 10m",
    image: "/src/assets/images/course_productivity_1790632590389.jpg",
    avatarColors: ["#10B981", "#1D44F9", "#475569"],
  },
  {
    id: "money-management",
    title: "Mastering Money Management",
    category: "Finance & Entrepreneurship",
    tags: ["Featured", "Finance & Entrepreneurship", "Marketing"],
    instructor: "Devon Brooks",
    instructorRole: "Venture Strategist",
    rating: "4.9",
    reviews: 384,
    studentsCount: "2.9k",
    price: 54,
    lessons: 21,
    duration: "6h 05m",
    image: "/src/assets/images/course_money_management_1790632602238.jpg",
    avatarColors: ["#0B1021", "#1D44F9", "#059669"],
  },
  {
    id: "startup-success",
    title: "From Idea to Startup Success",
    category: "Finance & Entrepreneurship",
    tags: ["Featured", "Finance & Entrepreneurship", "Marketing", "Social Media"],
    instructor: "Liam & Maya Chen",
    instructorRole: "Y-Combinator Alumni",
    rating: "5.0",
    reviews: 610,
    studentsCount: "5.2k",
    price: 79,
    lessons: 28,
    duration: "8h 45m",
    image: "/src/assets/images/course_startup_success_1790632614991.jpg",
    avatarColors: ["#1D44F9", "#7C3AED", "#0B1021"],
  },
];

const LEARNING_PATHS = [
  {
    id: "Design",
    name: "Design",
    courses: "140+ Courses",
    filterMatch: "UX/UI Design",
    icon: PenTool,
  },
  {
    id: "Development",
    name: "Development",
    courses: "185+ Courses",
    filterMatch: "Web Development",
    icon: Code2,
  },
  {
    id: "IT & Software",
    name: "IT & Software",
    courses: "120+ Courses",
    filterMatch: "Data Science",
    icon: Cpu,
  },
  {
    id: "Business",
    name: "Business",
    courses: "95+ Courses",
    filterMatch: "Finance & Entrepreneurship",
    icon: Briefcase,
  },
  {
    id: "Marketing",
    name: "Marketing",
    courses: "80+ Courses",
    filterMatch: "Marketing",
    icon: Megaphone,
  },
  {
    id: "Photography",
    name: "Photography",
    courses: "65+ Courses",
    filterMatch: "Photography",
    icon: Camera,
  },
];

const TESTIMONIALS = [
  {
    id: "sarah",
    name: "Sarah M.",
    role: "Product Designer",
    quote:
      "ByteSpace has transformed my approach to learning. The diverse range of courses and the quality of content provided by creators have exceeded my expectations. The platform truly fosters a sense of community and lifelong learning.",
    initials: "SM",
    avatarBg: "#DBEAFE",
    avatarText: "#1D44F9",
    image: "/src/assets/images/creator_female_instructor_1790632544714.jpg",
  },
  {
    id: "james",
    name: "James L.",
    role: "Marketing Manager",
    quote:
      "I've tried several online learning platforms, and ByteSpace stands out for its vibrant community and the variety of courses available. The easy navigation and engaging content make it a go-to platform for continuous skill development.",
    initials: "JL",
    avatarBg: "#E0E7FF",
    avatarText: "#1E40AF",
    image: "/src/assets/images/growth_student_laptop_1790632531469.jpg",
  },
  {
    id: "alex",
    name: "Alex B.",
    role: "Content Creator",
    quote:
      "As a creator, ByteSpace has been a game-changer for me. The Course Editor is user-friendly, and the support from the community is incredible. It's fulfilling to see my courses making a positive impact on learners globally.",
    initials: "AB",
    avatarBg: "#ECFCCB",
    avatarText: "#365314",
    image: "/src/assets/images/hero_student_creator_1790632518202.jpg",
  },
];

// Internal sub-component: Subtle Hero & CTA Grid Pattern matching Hero_Frame.png
function ElectricGridPattern() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255, 255, 255, 0.13) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.13) 1px, transparent 1px)",
        backgroundSize: "104px 104px",
      }}
      aria-hidden="true"
    />
  );
}

// Reusable Sub-Component 1: HeroNavbar
export function HeroNavbar({
  bagCount,
  mobileMenuOpen,
  onToggleMobileMenu,
  onOpenBag,
  onNavigate,
}: {
  bagCount: number;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onOpenBag: () => void;
  onNavigate: (path: ByteSpaceHomeRoute) => void;
}) {
  return (
    <>
      <header className="relative z-30 mx-auto flex max-w-[1200px] items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        {/* Left: ByteSpace Logo */}
        <ByteSpaceBrandLogo light />

        {/* Center Navigation Links: Home, Courses, Creators */}
        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-10 text-[14px] text-[#FFFFFF] md:flex"
        >
          <a
            href="#top"
            className="whitespace-nowrap font-semibold text-[#FFFFFF] transition-opacity hover:opacity-90"
          >
            Home
          </a>
          <a
            href="/courses"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/courses");
            }}
            className="whitespace-nowrap font-normal text-[#FFFFFF]/85 transition-colors hover:text-[#FFFFFF]"
          >
            Courses
          </a>
          <a
            href="/creators"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/creators");
            }}
            className="whitespace-nowrap font-normal text-[#FFFFFF]/85 transition-colors hover:text-[#FFFFFF]"
          >
            Creators
          </a>
        </nav>

        {/* Right Navigation: Sign In, Join Us, and Small Shopping Bag Icon */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate("/login")}
            className="hidden whitespace-nowrap rounded-full px-4 py-2 text-[14px] font-medium text-[#FFFFFF]/90 transition-colors hover:bg-[#FFFFFF]/10 hover:text-[#FFFFFF] sm:inline-flex"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => onNavigate("/signup")}
            className=" whitespace-nowrap rounded-full px-4 py-2 text-[14px] font-medium text-[#FFFFFF]/90 transition-colors hover:bg-[#FFFFFF]/10 hover:text-[#FFFFFF]"
          >
            Join Us
          </button>
          <button
            type="button"
            onClick={onOpenBag}
            aria-label="Open course bag"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#FFFFFF] transition-colors hover:bg-[#FFFFFF]/10"
          >
            <ShoppingBag className="h-5 w-5 stroke-[1.75]" />
            {bagCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#C6FF00] px-1 text-[10px] font-extrabold text-[#0B1021] tabular-nums">
                {bagCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={onToggleMobileMenu}
            aria-label="Toggle Menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#FFFFFF]/20 bg-[#FFFFFF]/10 text-[#FFFFFF] md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="relative z-30 mx-4 mb-4 rounded-xl border border-[#FFFFFF]/15 bg-[#0D33D6] p-4 md:hidden"
          >
            <div className="flex flex-col space-y-2.5 text-sm font-medium text-[#FFFFFF]">
              <a
                href="#top"
                onClick={onToggleMobileMenu}
                className="rounded-lg px-3 py-2 hover:bg-[#FFFFFF]/10"
              >
                Home
              </a>
              <a
                href="/courses"
                onClick={(e) => {
                  e.preventDefault();
                  onToggleMobileMenu();
                  onNavigate("/courses");
                }}
                className="rounded-lg px-3 py-2 hover:bg-[#FFFFFF]/10"
              >
                Courses
              </a>
              <a
                href="/creators"
                onClick={(e) => {
                  e.preventDefault();
                  onToggleMobileMenu();
                  onNavigate("/creators");
                }}
                className="rounded-lg px-3 py-2 hover:bg-[#FFFFFF]/10"
              >
                Creators
              </a>
              <button
                type="button"
                onClick={() => {
                  onToggleMobileMenu();
                  onNavigate("/login");
                }}
                className="rounded-lg bg-[#FFFFFF]/10 px-3 py-2 text-left font-semibold text-[#FFFFFF]"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  onToggleMobileMenu();
                  onNavigate("/signup");
                }}
                className="rounded-lg bg-[#C6FF00] px-3 py-2 text-left font-bold text-[#0B1021]"
              >
                Join Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Reusable Sub-Component 2: HeroSearchBar
export function HeroSearchBar({
  searchQuery,
  onSearchChange,
  onClear,
  onSubmit,
}: {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onClear: () => void;
  onSubmit: (e?: React.FormEvent | React.MouseEvent) => void;
}) {
  return (
    <div className="mx-auto mt-8 flex max-w-[500px] flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
      <form
        id="hero-search-form"
        onSubmit={onSubmit}
        className="flex h-[48px] flex-1 items-center gap-3 rounded-full bg-[#FFFFFF] px-5 shadow-[0_12px_30px_rgba(6,22,110,0.18)]"
      >
        <Search className="h-4 w-4 shrink-0 text-[#94A3B8]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Course, topic, creator"
          aria-label="Course, topic, creator"
          className="w-full bg-transparent text-[14px] text-[#0B1021] placeholder-[#94A3B8] focus:outline-none"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search"
            className="text-[#94A3B8] hover:text-[#0B1021]"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>
      <button
        type="submit"
        form="hero-search-form"
        onClick={onSubmit}
        className="h-[48px] whitespace-nowrap rounded-full bg-[#C6FF00] px-7 text-[14px] font-medium text-[#0B1021] shadow-[0_12px_30px_rgba(6,22,110,0.18)] transition-colors hover:bg-[#d4ff33]"
      >
        Search
      </button>
    </div>
  );
}

// Reusable Sub-Component 3: HeroDecorative3DShapes matching Hero_Frame.png
export function HeroDecorative3DShapes() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Far-Left Lime-Green 3D Coiled Squiggle / Ribbon */}
      <svg
        className="absolute top-[135px] -left-9 hidden h-[240px] w-[195px] drop-shadow-[0_18px_28px_rgba(5,20,105,0.32)] md:block"
        viewBox="0 0 200 250"
        fill="none"
      >
        <defs>
          <linearGradient id="limeCoilGrad" x1="0" y1="0" x2="200" y2="230" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ECFF78" />
            <stop offset="45%" stopColor="#C6FF00" />
            <stop offset="100%" stopColor="#8FD400" />
          </linearGradient>
        </defs>
        <path
          d="M18 35 C75 18, 155 32, 148 56 C140 78, 22 72, 20 96 C18 122, 138 116, 132 142 C126 166, 16 158, 14 182 C12 204, 88 202, 72 224"
          stroke="url(#limeCoilGrad)"
          strokeWidth="34"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* 2. Far-Right Lime-Green 3D Tilted Cylinder */}
      <svg
        className="absolute top-[115px] -right-12 hidden h-[270px] w-[220px] drop-shadow-[0_22px_34px_rgba(5,20,105,0.34)] md:block"
        viewBox="0 0 220 270"
        fill="none"
      >
        <defs>
          <linearGradient id="limeCylBody" x1="40" y1="60" x2="195" y2="210" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A6E800" />
            <stop offset="45%" stopColor="#C6FF00" />
            <stop offset="100%" stopColor="#E4FF66" />
          </linearGradient>
          <linearGradient id="limeCylTop" x1="35" y1="25" x2="165" y2="115" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E9FF80" />
            <stop offset="100%" stopColor="#BDF800" />
          </linearGradient>
        </defs>
        <g transform="rotate(-26 115 135)">
          <rect
            x="48"
            y="52"
            width="126"
            height="170"
            rx="28"
            fill="url(#limeCylBody)"
          />
          <ellipse
            cx="111"
            cy="64"
            rx="63"
            ry="24"
            fill="url(#limeCylTop)"
          />
          <ellipse
            cx="111"
            cy="206"
            rx="63"
            ry="22"
            fill="url(#limeCylBody)"
          />
        </g>
      </svg>

      {/* 3. Mid-Left White 3D Scribble / Coiled Squiggle */}
      <svg
        className="absolute top-[330px] left-[11%] hidden h-[115px] w-[115px] drop-shadow-[0_16px_24px_rgba(5,20,105,0.26)] lg:block xl:left-[14%]"
        viewBox="0 0 120 120"
        fill="none"
      >
        <defs>
          <linearGradient id="whiteSquiggleLeft" x1="15" y1="10" x2="100" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="65%" stopColor="#EEF2FF" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
        </defs>
        <path
          d="M28 28 C52 16, 78 16, 74 28 C70 40, 26 48, 30 60 C34 72, 88 52, 86 66 C84 80, 38 86, 42 98 C45 106, 92 88, 95 96"
          stroke="url(#whiteSquiggleLeft)"
          strokeWidth="17"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* 4. Mid-Right White 3D Triangular Pyramid / Cone */}
      <svg
        className="absolute top-[315px] right-[12%] hidden h-[125px] w-[125px] drop-shadow-[0_18px_28px_rgba(5,20,105,0.28)] lg:block xl:right-[15%]"
        viewBox="0 0 130 130"
        fill="none"
      >
        <defs>
          <linearGradient id="pyrLeftFace" x1="65" y1="16" x2="22" y2="98" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
          <linearGradient id="pyrRightFace" x1="65" y1="16" x2="106" y2="108" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F1F5F9" />
          </linearGradient>
          <linearGradient id="pyrBottomFace" x1="20" y1="92" x2="105" y2="114" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
        </defs>
        {/* Left shaded face */}
        <path d="M72 16 L18 92 L62 112 Z" fill="url(#pyrLeftFace)" />
        {/* Right sunlit face */}
        <path d="M72 16 L62 112 L106 102 Z" fill="url(#pyrRightFace)" />
        {/* Soft base bevel */}
        <path
          d="M18 92 Q60 116 106 102"
          stroke="url(#pyrBottomFace)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      {/* 5. Bottom-Left White 3D Circular Ring (Torus) */}
      <svg
        className="absolute bottom-[115px] left-[2%] hidden h-[195px] w-[215px] drop-shadow-[0_22px_32px_rgba(5,20,105,0.24)] md:block lg:left-[4%]"
        viewBox="0 0 220 200"
        fill="none"
      >
        <defs>
          <linearGradient id="torusBodyGrad" x1="25" y1="25" x2="195" y2="175" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="58%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
        </defs>
        <g transform="rotate(-28 110 100)">
          <ellipse
            cx="110"
            cy="100"
            rx="72"
            ry="54"
            stroke="url(#torusBodyGrad)"
            strokeWidth="34"
          />
          <ellipse
            cx="108"
            cy="96"
            rx="72"
            ry="54"
            stroke="#FFFFFF"
            strokeOpacity="0.65"
            strokeWidth="6"
          />
        </g>
      </svg>

      {/* 6. Bottom-Right White 3D Scribble / Coiled Squiggle */}
      <svg
        className="absolute right-[1%] bottom-[80px] hidden h-[200px] w-[195px] drop-shadow-[0_20px_30px_rgba(5,20,105,0.25)] md:block lg:right-[3%]"
        viewBox="0 0 200 200"
        fill="none"
      >
        <defs>
          <linearGradient id="whiteSquiggleRight" x1="20" y1="15" x2="180" y2="185" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
        </defs>
        <path
          d="M78 26 C112 16, 134 18, 128 34 C120 52, 26 70, 32 88 C38 104, 166 64, 164 84 C162 104, 42 124, 48 142 C54 158, 156 126, 154 144 C152 162, 74 176, 92 184"
          stroke="url(#whiteSquiggleRight)"
          strokeWidth="26"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// Reusable Sub-Component 4: HeroFloatingCards matching Hero_Frame.png
export function HeroFloatingCards({
  onSelectCategory,
  onNavigate,
}: {
  onSelectCategory: (cat: string) => void;
  onNavigate: (path: ByteSpaceHomeRoute) => void;
}) {
  const studentAvatars = [
    "/src/assets/images/hero_student_creator_1790632518202.jpg",
    "/src/assets/images/creator_female_instructor_1790632544714.jpg",
    "/src/assets/images/growth_student_laptop_1790632531469.jpg",
    "/src/assets/images/course_figma_basics_1790632556720.jpg",
    "/src/assets/images/course_productivity_1790632590389.jpg",
    "/src/assets/images/course_startup_success_1790632614991.jpg",
  ];

  return (
    <div className="relative z-30 mt-6 grid grid-cols-1 gap-3.5 px-4 sm:pointer-events-none sm:absolute sm:inset-0 sm:mt-0 sm:block sm:px-0">
      {/* 1. Left Upper Card: "UI/UX Design" / "200 Courses • 1000+ Students" */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        onClick={() => {
          onSelectCategory("UX/UI Design");
          const el = document.getElementById("courses-section");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        className="pointer-events-auto relative z-30 cursor-pointer rounded-[16px] bg-[#FFFFFF] px-5 py-3.5 text-left shadow-[0_14px_34px_rgba(8,25,110,0.16)] transition-transform duration-200 hover:-translate-y-0.5 sm:absolute sm:top-[82px] sm:left-[10%] sm:w-[196px] md:left-[19%]"
      >
        <p className="text-[13px] font-semibold tracking-tight text-[#1E293B]">
          UI/UX Design
        </p>
        <p className="mt-1 whitespace-nowrap text-[10.5px] font-normal text-[#94A3B8]">
          200 Courses &bull; 1000+ Students
        </p>
      </motion.div>

      {/* 2. Right Upper Card: "Learning Progress" / "55%" / Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.06 }}
        onClick={() => onNavigate("/course/build-digital-asset")}
        className="pointer-events-auto relative z-30 cursor-pointer rounded-[18px] bg-[#FFFFFF] px-5 py-4 text-left shadow-[0_14px_34px_rgba(8,25,110,0.16)] transition-transform duration-200 hover:-translate-y-0.5 sm:absolute sm:top-[94px] sm:right-[10%] sm:w-[205px] md:right-[18%]"
      >
        <p className="text-[12px] font-medium text-[#1E293B]">
          Learning Progress
        </p>
        <p className="mt-1.5 text-[34px] leading-none font-bold tracking-tight text-[#1E293B] tabular-nums">
          55%
        </p>
        <div className="mt-3.5 h-[7px] w-full overflow-hidden rounded-full bg-[#F1F5F9]">
          <div
            className="h-full rounded-full bg-[#B8F500]"
            style={{ width: "55%" }}
          />
        </div>
      </motion.div>

      {/* 3. Bottom Left Card: "Happy Students" / "4.5 (240) ★" / Avatars + "2K+" */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.12 }}
        onClick={() => onNavigate("/courses")}
        className="pointer-events-auto relative z-30 cursor-pointer rounded-[18px] bg-[#FFFFFF] px-5 py-4 text-left shadow-[0_14px_34px_rgba(8,25,110,0.16)] transition-transform duration-200 hover:-translate-y-0.5 sm:absolute sm:bottom-[42px] sm:left-[12%] sm:w-[228px] md:left-[20%]"
      >
        <p className="text-[13px] font-semibold tracking-tight text-[#1E293B]">
          Happy Students
        </p>
        <div className="mt-0.5 flex items-center gap-1 text-[11px] tabular-nums">
          <span className="font-semibold text-[#1E293B]">4.5</span>
          <span className="text-[#94A3B8]">(240)</span>
          <span className="text-[12px] leading-none text-[#B8F500]">★</span>
        </div>
        <div className="mt-2.5 flex items-center -space-x-2">
          {studentAvatars.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt="Happy student"
              referrerPolicy="no-referrer"
              className="h-8 w-8 rounded-full border-2 border-[#FFFFFF] object-cover"
            />
          ))}
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#FFFFFF] bg-[#C6FF00] text-[10px] font-bold text-[#0B1021] tabular-nums">
            2K+
          </span>
        </div>
      </motion.div>
    </div>
  );
}

// Internal sub-component: Trust Strip Partner Logos
function PartnerTrustStrip() {
  const partners = [
    {
      name: "Logosium",
      svg: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zm0 7.5l-6-3 6-3 6 3-6 3zm0 2.5l-10-5v10l10 5 10-5V7l-10 5z" />
        </svg>
      ),
    },
    {
      name: "Learnova",
      svg: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path d="M12 7v5l3.5 3.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: "Skillbase",
      svg: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="3" width="8" height="8" rx="2" />
          <rect x="13" y="3" width="8" height="8" rx="2" opacity="0.6" />
          <rect x="3" y="13" width="8" height="8" rx="2" opacity="0.6" />
          <rect x="13" y="13" width="8" height="8" rx="2" />
        </svg>
      ),
    },
    {
      name: "EduCore",
      svg: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3L4 9v12h16V9l-8-6zm0 4.2L16.5 11v7h-9v-7L12 7.2z" />
        </svg>
      ),
    },
    {
      name: "NexaLearn",
      svg: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12 2 19 21 12 17 5 21 12 2" />
        </svg>
      ),
    },
  ];

  return (
    <section
      aria-label="Trusted learning partners"
      className="border-b border-[#E2E8F0] bg-[#F8FAFC] py-8"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 items-center justify-items-center gap-6 sm:grid-cols-3 md:grid-cols-5">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center gap-2.5 text-[#94A3B8] transition-colors hover:text-[#64748B]"
            >
              {partner.svg}
              <span className="text-lg font-bold tracking-tight">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Internal sub-component: Course Card
function CourseCard({
  course,
  inBag,
  onToggleBag,
  onSelectCourse,
}: {
  course: CourseItem;
  inBag: boolean;
  onToggleBag: (id: string) => void;
  onSelectCourse: (course: CourseItem) => void;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="group flex flex-col overflow-hidden rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] transition-shadow duration-200 hover:shadow-md"
    >
      {/* Course Thumbnail */}
      <div
        onClick={() => onSelectCourse(course)}
        className="relative aspect-[4/3] w-full cursor-pointer overflow-hidden bg-[#F1F5F9]"
      >
        <img
          src={course.image}
          alt={course.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 rounded-md bg-[#FFFFFF]/95 px-2.5 py-1 text-[11px] font-semibold text-[#0B1021] shadow-2xs">
          {course.category}
        </div>
        <div className="absolute right-3 bottom-3 flex items-center gap-1 rounded-md bg-[#0B1021]/85 px-2 py-1 text-[11px] font-semibold text-[#FFFFFF] tabular-nums">
          <Star className="h-3 w-3 fill-[#C6FF00] text-[#C6FF00]" />
          <span>{course.rating}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          {/* Metadata row */}
          <div className="mb-2 flex items-center gap-2 text-xs text-[#64748B] tabular-nums">
            <span className="inline-flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5 text-[#1D44F9]" />
              {course.lessons} Lessons
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-[#1D44F9]" />
              {course.duration}
            </span>
          </div>

          {/* Course Title */}
          <h3
            onClick={() => onSelectCourse(course)}
            className="mb-1.5 cursor-pointer text-lg font-bold tracking-tight text-[#0B1021] transition-colors group-hover:text-[#1D44F9]"
          >
            {course.title}
          </h3>

          {/* Instructor Info */}
          <p className="mb-4 text-xs text-[#64748B]">
            By <span className="font-medium text-[#334155]">{course.instructor}</span> ·{" "}
            <span>{course.instructorRole}</span>
          </p>
        </div>

        {/* Bottom Bar: Student Avatars + Price & Button */}
        <div className="flex items-center justify-between border-t border-[#F1F5F9] pt-3.5">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5 overflow-hidden">
              {course.avatarColors.map((bg, idx) => (
                <span
                  key={idx}
                  style={{ backgroundColor: bg }}
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#FFFFFF] text-[9px] font-bold text-[#FFFFFF]"
                >
                  {course.instructor.charAt(idx) || "S"}
                </span>
              ))}
            </div>
            <span className="text-xs font-medium text-[#64748B] tabular-nums">
              +{course.studentsCount} students
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-base font-extrabold text-[#0B1021] tabular-nums">
              ${course.price}
            </span>
            <button
              type="button"
              onClick={() => onToggleBag(course.id)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors",
                inBag
                  ? "bg-[#C6FF00] text-[#0B1021]"
                  : "bg-[#F1F5F9] text-[#0B1021] hover:bg-[#1D44F9] hover:text-[#FFFFFF]"
              )}
            >
              {inBag ? "Saved" : "Enroll"}
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// Main exported component
export default function ByteSpaceHomepage({
  className,
  onNavigate,
}: ByteSpaceHomepageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Featured");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [bagIds, setBagIds] = useState<string[]>([]);
  const [isBagOpen, setIsBagOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeCourseModal, setActiveCourseModal] = useState<CourseItem | null>(null);
  const [emailInput, setEmailInput] = useState<string>("");
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const navigateToPage = (path: ByteSpaceHomeRoute) => {
    if (onNavigate) {
      onNavigate(path);
    } else if (typeof window !== "undefined") {
      window.history.pushState({}, "", path);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  };

  const filteredCourses = useMemo(() => {
    return COURSES.filter((course) => {
      const matchesCategory =
        selectedCategory === "Featured" ||
        course.category.toLowerCase() === selectedCategory.toLowerCase() ||
        course.tags.some((t) => t.toLowerCase() === selectedCategory.toLowerCase());

      const matchesSearch =
        !searchQuery.trim() ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const displayedCourses = filteredCourses.length > 0 ? filteredCourses : COURSES;

  const toggleBagItem = (id: string) => {
    setBagIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleHeroSearch = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    const el = document.getElementById("courses-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim() && emailInput.includes("@")) {
      setSubscribed(true);
      setEmailInput("");
    }
  };

  const bagCourses = COURSES.filter((c) => bagIds.includes(c.id));

  return (
    <div
      id="top"
      className={cn(
        "min-h-screen w-full bg-[#FFFFFF] text-[#0B1021] selection:bg-[#C6FF00] selection:text-[#0B1021]",
        className
      )}
    >
      {/* =====================================================================
          1. TOP NAVIGATION & 2. HERO SECTION (ELECTRIC BLUE — EXACT MATCH TO Hero_Frame.png)
      ===================================================================== */}
      <div className="relative overflow-hidden bg-[#0A36E8] text-[#FFFFFF]">
        {/* Full-Width Subtle Electric Blue Square Grid Overlay */}
        <ElectricGridPattern />

        {/* Decorative 3D Floating Shapes (Left/Right Lime Blobs, White Scribbles, Torus Ring, Triangle Pyramid) */}
        <HeroDecorative3DShapes />

        {/* 1. TOP NAVIGATION BAR */}
        <HeroNavbar
          bagCount={bagIds.length}
          mobileMenuOpen={mobileMenuOpen}
          onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
          onOpenBag={() => setIsBagOpen(true)}
          onNavigate={navigateToPage}
        />

        {/* 2. HERO CONTENT & BOTTOM CENTER VISUAL */}
        <section className="relative z-20 mx-auto max-w-[1200px] px-4 pt-10 pb-0 sm:px-6 md:pt-14 lg:px-8">
          {/* Centered Headline, Subtitle, and Search Bar */}
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mx-auto text-4xl leading-[1.15] font-bold tracking-tight text-[#FFFFFF] sm:text-5xl md:text-[62px]">
              Get Access to Hundreds
              <br />
              Courses Available
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-[14px] leading-relaxed font-normal text-[#FFFFFF]/85 sm:text-[15px]">
              Unlock your creativity, gain valuable knowledge, and grow your
              business with our wide range of courses.
            </p>

            {/* Centered Search Bar */}
            <HeroSearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onClear={() => setSearchQuery("")}
              onSubmit={handleHeroSearch}
            />
          </div>

          {/* Bottom-Center Hero Illustration: Large Neon-Lime Dome + Student + 3 Floating Cards */}
          <div className="relative mx-auto mt-10 min-h-[380px] max-w-[1000px] pb-6 sm:mt-12 sm:h-[430px] sm:pb-0">
            {/* Large Neon Lime-Green Semicircle / Organic Dome Shape Behind Student */}
            <div
              data-name="Circle"
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-1/2 h-[290px] w-[520px] -translate-x-1/2 rounded-t-full bg-[#C6FF00] sm:h-[365px] sm:w-[760px] md:h-[395px] md:w-[880px]"
            />

            {/* Center Student Wearing Headphones Holding a Laptop */}
            <div
              data-name="Mask group"
              className="relative z-10 mx-auto flex justify-center sm:absolute sm:inset-x-0 sm:bottom-0"
            >
              <div className="relative flex h-[340px] w-[290px] items-end justify-center overflow-hidden rounded-t-full sm:h-[430px] sm:w-[350px]">
                <img
                  src="/src/assets/images/Image.png"
                  alt="Student wearing headphones holding a laptop"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>

            {/* Three Floating White UI Cards Around the Student */}
            <HeroFloatingCards
              onSelectCategory={setSelectedCategory}
              onNavigate={navigateToPage}
            />
          </div>
        </section>
      </div>

      {/* =====================================================================
          3. LOGO / TRUST STRIP
      ===================================================================== */}
      <PartnerTrustStrip />

      {/* =====================================================================
          4. COURSE DISCOVERY SECTION & 5. FEATURED COURSE GRID
      ===================================================================== */}
      <section
        id="courses-section"
        className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 md:py-20 lg:px-8"
      >
        {/* Heading & Supporting Paragraph */}
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="text-3xl leading-tight font-extrabold tracking-tight text-[#0B1021] sm:text-4xl"
            style={{ textWrap: "balance" }}
          >
            Discover Your Passion,
            <br />
            Build Your Skills
          </h2>
          <p className="mt-3.5 text-sm leading-relaxed text-[#64748B] sm:text-base">
            At Bytespace Courses, we bring you closer to life-changing
            knowledge. Explore a variety of courses across different fields,
            from technology to the arts, and make a difference in your career
            and life.
          </p>
        </div>

        {/* Horizontal Category / Filter Chip System */}
        <div
          role="tablist"
          aria-label="Course categories"
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "rounded-lg border px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap",
                  isActive
                    ? "border-[#0B1021] bg-[#C6FF00] text-[#0B1021] shadow-2xs"
                    : "border-[#E2E8F0] bg-[#FFFFFF] text-[#334155] hover:border-[#CBD5E1] hover:bg-[#F8FAFC]"
                )}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Active Filter Indicator if filtered */}
        {(selectedCategory !== "Featured" || searchQuery.trim() !== "") && (
          <div className="mt-6 flex items-center justify-between rounded-lg bg-[#F8FAFC] px-4 py-2.5 text-xs text-[#475569]">
            <span>
              Showing{" "}
              <strong className="font-semibold text-[#0B1021]">
                {displayedCourses.length}
              </strong>{" "}
              courses for{" "}
              <strong className="font-semibold text-[#1D44F9]">
                {searchQuery ? `"${searchQuery}"` : selectedCategory}
              </strong>
            </span>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("Featured");
                setSearchQuery("");
              }}
              className="font-semibold text-[#1D44F9] hover:underline"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* 5. 3-COLUMN FEATURED COURSE GRID (6 CARDS IN 2 ROWS) */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              inBag={bagIds.includes(course.id)}
              onToggleBag={toggleBagItem}
              onSelectCourse={(c) => {
                if (c.id === "digital-assets") {
                  navigateToPage("/course/build-digital-asset");
                } else {
                  setActiveCourseModal(c);
                }
              }}
            />
          ))}
        </div>
      </section>

      {/* =====================================================================
          6. LEARNING PATHS SECTION
      ===================================================================== */}
      <section className="border-t border-[#F1F5F9] bg-[#FFFFFF] py-14 md:py-18">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              className="text-2xl font-extrabold tracking-tight text-[#0B1021] sm:text-3xl"
              style={{ textWrap: "balance" }}
            >
              Explore Diverse Learning Paths at ByteSpace
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#64748B] sm:text-base">
              At Bytespace, we believe in empowering individuals through
              knowledge. Our diverse range of courses spans various fields,
              ensuring there&apos;s something for everyone. Unleash your
              potential and explore our carefully curated categories.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {LEARNING_PATHS.map((path) => {
              const IconComponent = path.icon;
              const isSelected = selectedCategory === path.filterMatch;
              return (
                <button
                  key={path.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(path.filterMatch);
                    const el = document.getElementById("courses-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={cn(
                    "group flex flex-col items-center rounded-xl border p-5 text-center transition-all",
                    isSelected
                      ? "border-[#1D44F9] bg-[#F0F4FF]"
                      : "border-[#E2E8F0] bg-[#FFFFFF] hover:border-[#1D44F9] hover:shadow-xs"
                  )}
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#C6FF00] text-[#0B1021] transition-transform duration-200 group-hover:scale-105">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-bold text-[#0B1021]">
                    {path.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. PROFESSIONAL GROWTH & 8. COURSE CREATOR SECTIONS
          (SOFT BLUE/LAVENDER ATMOSPHERIC BACKGROUND WITH SUBTLE LIME GLOW)
      ===================================================================== */}
      <div
        id="features-section"
        className="relative overflow-hidden bg-[#F2F5FF] py-16 md:py-24"
      >
        {/* Subtle Lime & Blue Atmospheric Glows */}
        <div
          className="pointer-events-none absolute top-20 right-12 h-72 w-72 rounded-full bg-[#C6FF00] opacity-20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-24 left-12 h-80 w-80 rounded-full bg-[#1D44F9] opacity-10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-[1200px] space-y-24 px-4 sm:px-6 lg:px-8">
          {/* 7. PROFESSIONAL GROWTH FEATURE SECTION (SPLIT LAYOUT) */}
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Left Column: Copy + 3 Statistics */}
            <div className="lg:col-span-6">
              <h2
                className="text-3xl leading-tight font-extrabold tracking-tight text-[#0B1021] sm:text-4xl"
                style={{ textWrap: "balance" }}
              >
                Your Path to Professional
                <br />
                Growth Starts Here!
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#475569] sm:text-base">
                Explore our curated selection of courses tailored to enhance
                your capabilities and accelerate your career journey. Whether
                you are looking to sharpen specific skills, gain industry
                expertise, or embark on a new career path entirely, we have the
                resources you need.
              </p>

              {/* Three Statistics */}
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[#DCE3F8] pt-7 sm:max-w-md">
                <div>
                  <p className="text-2xl font-extrabold text-[#1D44F9] sm:text-3xl tabular-nums">
                    12K+
                  </p>
                  <p className="mt-1 text-xs font-medium text-[#64748B]">
                    Students
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-[#1D44F9] sm:text-3xl tabular-nums">
                    700+
                  </p>
                  <p className="mt-1 text-xs font-medium text-[#64748B]">
                    Courses
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-[#1D44F9] sm:text-3xl tabular-nums">
                    16
                  </p>
                  <p className="mt-1 text-xs font-medium text-[#64748B]">
                    Categories
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Student Image + Course Card Behind Image + Neon Lime Shape */}
            <div className="relative lg:col-span-6">
              {/* Neon Lime Decorative Abstract Shape Behind Image */}
              <div
                className="pointer-events-none absolute -top-5 -right-3 z-0 h-48 w-48 rotate-12 rounded-3xl bg-[#C6FF00] sm:h-64 sm:w-64"
                aria-hidden="true"
              />

              {/* Main Student Portrait Image (In Front) */}
              <div className="relative z-10 mx-auto max-w-md overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] shadow-md">
                <img
                  src="/src/assets/images/Image.png"
                  alt="Student building practical skills on a laptop"
                  referrerPolicy="no-referrer"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>

              {/* Course Progress Card ("55%") Placed Behind Image */}
              <div className="relative z-0 -mt-6 ml-2 max-w-[280px] rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-4 shadow-lg sm:absolute sm:-bottom-8 sm:-left-2 sm:mt-0">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-[#F0F4FF] px-2 py-0.5 text-[11px] font-semibold text-[#1D44F9]">
                    UX/UI Design
                  </span>
                  <span className="text-xs font-extrabold text-[#0B1021] tabular-nums">
                    55%
                  </span>
                </div>
                <p className="mt-2 text-sm font-bold text-[#0B1021]">
                  Learn Figma from Basics
                </p>
                <p className="mt-0.5 text-xs text-[#64748B]">
                  Current module: Component Variants
                </p>
                {/* Progress Bar */}
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#F1F5F9]">
                  <div
                    className="h-full rounded-full bg-[#C6FF00]"
                    style={{ width: "55%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 8. COURSE CREATOR SECTION (ALTERNATING SPLIT LAYOUT) */}
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Left Column: Female Instructor Image + Floating Creator Statistics */}
            <div className="relative order-2 lg:order-1 lg:col-span-6">
              {/* Decorative Blue/Lime Shape */}
              <div
                className="pointer-events-none absolute -bottom-5 -left-3 h-48 w-48 -rotate-6 rounded-3xl bg-[#1D44F9] opacity-15 sm:h-60 sm:w-60"
                aria-hidden="true"
              />

              {/* Main Instructor Image */}
              <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] shadow-md">
                <img
                  src="/src/assets/images/creator.png"
                  alt="Female course creator holding a digital tablet"
                  referrerPolicy="no-referrer"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>

              {/* Floating Stat Card 1: Total Revenue / July 1-23 / Progress Bar / $120.29 */}
              <div className="relative z-20 mt-4 ml-4 flex w-44 flex-col gap-1.5 rounded-xl bg-[#1D44F9] p-4 text-[#FFFFFF] shadow-lg sm:absolute sm:top-6 sm:left-2 sm:mt-0">
                <p className="text-[12px] font-semibold text-[#FFFFFF]">
                  Total Revenue
                </p>
                <p className="text-[11px] font-medium text-[#FFFFFF]/75">
                  July 1-23
                </p>
                <div className="my-1 h-1.5 w-full overflow-hidden rounded-full bg-[#FFFFFF]/25">
                  <div className="h-full w-1/2 rounded-full bg-[#C6FF00]" />
                </div>
                <p className="text-[16px] font-extrabold text-[#FFFFFF] tabular-nums">
                  $120.29
                </p>
              </div>

              {/* Floating Stat Card 2: Square Blue Card (Year to date / 223 / $1238.38 / +12$) */}
              <div className="relative z-20 mt-3 ml-4 flex h-36 w-36 flex-col justify-between rounded-[16px] bg-[#1D44F9] p-4 text-[#FFFFFF] shadow-lg sm:absolute sm:right-2 sm:-bottom-6 sm:mt-0">
                <p className="text-[11px] font-medium text-[#FFFFFF]/85">
                  Year to date
                </p>
                <p className="text-[13px] font-semibold text-[#FFFFFF]/95 tabular-nums">
                  223
                </p>
                <p className="text-[17px] leading-tight font-extrabold text-[#FFFFFF] tabular-nums">
                  $1238.38
                </p>
                <span className="inline-flex w-fit items-center justify-center rounded-full bg-[#C6FF00] px-2.5 py-0.5 text-[11px] font-extrabold text-[#0B1021] tabular-nums">
                  +12$
                </span>
              </div>
            </div>

            {/* Right Column: Copy + Checklist */}
            <div className="order-1 lg:order-2 lg:col-span-6">
              <h2
                className="text-3xl leading-tight font-extrabold tracking-tight text-[#0B1021] sm:text-4xl"
                style={{ textWrap: "balance" }}
              >
                Create &amp; Manage
                <br />
                Courses Easily.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#475569] sm:text-base">
                ByteSpace supports individuals or entities in the creation,
                publication, and administration of educational courses.
              </p>

              {/* Checklist */}
              <div className="mt-7 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {[
                  "Show Your Expertise",
                  "Manage Your Passion",
                  "Flexibility and Autonomy",
                  "Build a Community",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1D44F9] text-[#FFFFFF]">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </span>
                    <span className="text-sm font-semibold text-[#0B1021]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          9. BLUE CTA SECTION
      ===================================================================== */}
      <section className="relative overflow-hidden bg-[#1D44F9] py-20 text-[#FFFFFF]">
        <ElectricGridPattern />

        {/* Decorative Abstract Shapes: Neon Lime Organic Shapes, White Triangles, Lime Circles */}
        <div
          className="pointer-events-none absolute -top-12 -left-12 h-44 w-44 rounded-full bg-[#C6FF00] opacity-90"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-12 bottom-8 h-10 w-10 rounded-full bg-[#C6FF00]"
          aria-hidden="true"
        />
        <svg
          className="pointer-events-none absolute top-10 right-16 hidden h-14 w-14 text-[#FFFFFF]/80 sm:block"
          viewBox="0 0 56 56"
          fill="none"
          aria-hidden="true"
        >
          <polygon
            points="28,6 50,46 6,46"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          className="pointer-events-none absolute bottom-10 left-20 hidden h-12 w-12 text-[#FFFFFF]/70 sm:block"
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="8"
            y="8"
            width="32"
            height="32"
            rx="6"
            stroke="currentColor"
            strokeWidth="4"
            transform="rotate(15 24 24)"
          />
        </svg>

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="text-3xl leading-tight font-extrabold tracking-tight text-[#FFFFFF] sm:text-4xl md:text-[42px]"
            style={{ textWrap: "balance" }}
          >
            Unlock Your Potential as a
            <br className="hidden sm:inline" /> Creator with ByteSpace
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#E2E8F0] sm:text-base">
            Experience the collaboration of numerous creators and an expanding
            selection of courses. Register now and become a part of a community
            comprising over 10,000 local and international creators. Utilize our
            Course Editor, and showcase your expertise by publishing your finest
            course on the ByteSpace Course Library.
          </p>
          <div className="mt-8">
            <button
              type="button"
              onClick={() => navigateToPage("/signup")}
              className="rounded-lg bg-[#C6FF00] px-7 py-3.5 text-sm font-bold text-[#0B1021] shadow-md transition-colors hover:bg-[#d4ff33] whitespace-nowrap"
            >
              Join as Creator
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          10. TESTIMONIAL / COMMUNITY SECTION
      ===================================================================== */}
      <section className="relative overflow-hidden bg-[#F4F6FF] py-16 md:py-22">
        {/* Subtle Lime Atmospheric Glow */}
        <div
          className="pointer-events-none absolute -bottom-16 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-[#C6FF00] opacity-15 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <h2
              className="text-3xl leading-tight font-extrabold tracking-tight text-[#0B1021] sm:text-4xl md:max-w-sm"
              style={{ textWrap: "balance" }}
            >
              Discover What Our
              <br />
              Community Is Saying
            </h2>
            <p className="text-sm leading-relaxed text-[#64748B] sm:text-base md:max-w-xl">
              At ByteSpace, our vibrant community of learners and creators is at
              the heart of what we do. Hear directly from those who have
              experienced the transformative journey of learning and creating on
              our platform. Explore testimonials that reflect the diverse
              perspectives of enthusiastic learners and accomplished creators.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((item) => (
              <div
                key={item.id}
                className="flex flex-col rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-6 shadow-2xs"
              >
                <div className="flex items-center gap-3 pb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold text-[#0B1021]">
                      {item.name}
                    </p>
                    <p className="text-xs text-[#64748B]">{item.role}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-[#334155]">
                  “{item.quote}”
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          11. FOOTER
      ===================================================================== */}
      <footer className="border-t border-[#E2E8F0] bg-[#FFFFFF] pt-16 pb-10">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Left Side: Logo, Description, Email Subscription */}
            <div className="lg:col-span-5">
              <ByteSpaceBrandLogo />
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#64748B]">
                Stay Up to date with our latest features and releases by joining
                our newsletter.
              </p>

              <form
                onSubmit={handleSubscribe}
                className="mt-6 flex max-w-sm flex-col gap-2 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email"
                  aria-label="Enter your email"
                  className="flex-1 rounded-full border border-[#CBD5E1] bg-[#FFFFFF] px-4 py-2.5 text-sm text-[#0B1021] placeholder-[#94A3B8] focus:border-[#1D44F9] focus:outline-none"
                />
                <button
                  type="submit"
                  className="whitespace-nowrap rounded-full bg-[#C6FF00] px-6 py-2.5 text-sm font-bold text-[#0B1021] transition-colors hover:bg-[#d4ff33]"
                >
                  Subscribe
                </button>
              </form>
              <p className="mt-3 max-w-sm text-xs leading-relaxed text-[#64748B]">
                By subscribing, you agree to our Privacy Policy and consent to
                receive updates from our company.
              </p>
              {subscribed && (
                <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#16A34A]">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Subscribed! Check your inbox for weekly course drops.
                </p>
              )}
            </div>

            {/* Right Side: Compact Columns */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
              <div>
                <h3 className="text-sm font-bold text-[#0B1021]">Learning</h3>
                <ul className="mt-3.5 space-y-2.5 text-sm text-[#64748B]">
                  <li>
                    <a
                      href="#courses-section"
                      onClick={() => setSelectedCategory("Featured")}
                      className="transition-colors hover:text-[#1D44F9]"
                    >
                      All Courses
                    </a>
                  </li>
                  <li>
                    <a
                      href="#courses-section"
                      className="transition-colors hover:text-[#1D44F9]"
                    >
                      Learning Paths
                    </a>
                  </li>
                  <li>
                    <a
                      href="#courses-section"
                      className="transition-colors hover:text-[#1D44F9]"
                    >
                      Categories
                    </a>
                  </li>
                  <li>
                    <a
                      href="#features-section"
                      className="transition-colors hover:text-[#1D44F9]"
                    >
                      For Students
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#0B1021]">Creators</h3>
                <ul className="mt-3.5 space-y-2.5 text-sm text-[#64748B]">
                  <li>
                    <button
                      type="button"
                      onClick={() => navigateToPage("/signup")}
                      className="transition-colors hover:text-[#1D44F9]"
                    >
                      Become a Creator
                    </button>
                  </li>
                  <li>
                    <a
                      href="#features-section"
                      className="transition-colors hover:text-[#1D44F9]"
                    >
                      Creator Resources
                    </a>
                  </li>
                  <li>
                    <a
                      href="#features-section"
                      className="transition-colors hover:text-[#1D44F9]"
                    >
                      Teaching Guide
                    </a>
                  </li>
                  <li>
                    <a
                      href="#features-section"
                      className="transition-colors hover:text-[#1D44F9]"
                    >
                      Community
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#0B1021]">Company</h3>
                <ul className="mt-3.5 space-y-2.5 text-sm text-[#64748B]">
                  <li>
                    <a
                      href="#features-section"
                      className="transition-colors hover:text-[#1D44F9]"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#top"
                      className="transition-colors hover:text-[#1D44F9]"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="#top"
                      className="transition-colors hover:text-[#1D44F9]"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      href="#top"
                      className="transition-colors hover:text-[#1D44F9]"
                    >
                      Help Center
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Legal Row */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#F1F5F9] pt-6 text-xs text-[#64748B] sm:flex-row">
            <p>© 2026 ByteSpace Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#top" className="hover:text-[#0B1021]">
                Privacy Policy
              </a>
              <a href="#top" className="hover:text-[#0B1021]">
                Terms
              </a>
              <a href="#top" className="hover:text-[#0B1021]">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          INTERACTIVE COURSE DETAIL MODAL
      ===================================================================== */}
      <AnimatePresence>
        {activeCourseModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1021]/60 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] shadow-2xl"
            >
              <div className="relative aspect-[16/9] w-full bg-[#F1F5F9]">
                <img
                  src={activeCourseModal.image}
                  alt={activeCourseModal.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setActiveCourseModal(null)}
                  aria-label="Close modal"
                  className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#0B1021]/75 text-[#FFFFFF] hover:bg-[#0B1021]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between text-xs text-[#64748B]">
                  <span className="font-semibold text-[#1D44F9]">
                    {activeCourseModal.category}
                  </span>
                  <span className="tabular-nums">
                    {activeCourseModal.lessons} Lessons · {activeCourseModal.duration}
                  </span>
                </div>
                <h3 className="mt-1.5 text-xl font-extrabold text-[#0B1021]">
                  {activeCourseModal.title}
                </h3>
                <p className="mt-1 text-xs text-[#64748B]">
                  Instructor: {activeCourseModal.instructor} ({activeCourseModal.instructorRole})
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                  Master hands-on workflows, downloadable studio files, and guided
                  critiques tailored for real-world creative production.
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-[#F1F5F9] pt-4">
                  <span className="text-2xl font-extrabold text-[#0B1021] tabular-nums">
                    ${activeCourseModal.price}
                  </span>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setActiveCourseModal(null)}
                      className="rounded-lg border border-[#E2E8F0] px-4 py-2 text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC]"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        toggleBagItem(activeCourseModal.id);
                        setActiveCourseModal(null);
                        setIsBagOpen(true);
                      }}
                      className="rounded-lg bg-[#C6FF00] px-5 py-2 text-xs font-bold text-[#0B1021] hover:bg-[#d4ff33]"
                    >
                      {bagIds.includes(activeCourseModal.id)
                        ? "View in Bag"
                        : "Enroll Now"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          INTERACTIVE COURSE BAG DRAWER
      ===================================================================== */}
      <AnimatePresence>
        {isBagOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-[#0B1021]/50">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.2 }}
              className="flex h-full w-full max-w-md flex-col justify-between bg-[#FFFFFF] p-6 shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                  <h3 className="text-lg font-extrabold text-[#0B1021]">
                    Your Course Bag ({bagCourses.length})
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsBagOpen(false)}
                    aria-label="Close bag"
                    className="rounded-lg p-1.5 text-[#64748B] hover:bg-[#F1F5F9]"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {bagCourses.length === 0 ? (
                  <div className="py-16 text-center">
                    <p className="text-sm text-[#64748B]">
                      No courses selected yet. Explore our catalog to add courses.
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 space-y-3">
                    {bagCourses.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-xl border border-[#E2E8F0] p-3"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.title}
                            referrerPolicy="no-referrer"
                            className="h-12 w-16 rounded-lg object-cover"
                          />
                          <div>
                            <p className="text-sm font-bold text-[#0B1021]">
                              {item.title}
                            </p>
                            <p className="text-xs text-[#64748B] tabular-nums">
                              ${item.price}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleBagItem(item.id)}
                          className="text-xs font-semibold text-[#EF4444] hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {bagCourses.length > 0 && (
                <div className="border-t border-[#E2E8F0] pt-4">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-[#64748B]">
                      Total
                    </span>
                    <span className="text-xl font-extrabold text-[#0B1021] tabular-nums">
                      $
                      {bagCourses.reduce((acc, item) => acc + item.price, 0)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsBagOpen(false);
                      navigateToPage("/signup");
                    }}
                    className="w-full rounded-lg bg-[#1D44F9] py-3 text-sm font-bold text-[#FFFFFF] hover:bg-[#1536D6]"
                  >
                    Proceed to Enrollment
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
