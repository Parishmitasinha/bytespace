"use client";

import React, { useState } from "react";
import {
  ShoppingBag,
  Share2,
  BarChart2,
  Star,
  Users,
  Play,
  FileText,
  Video,
  Award,
  MessageSquare,
  X,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ByteSpaceAppRoute =
  | "/"
  | "/courses"
  | "/creators"
  | "/course/build-digital-asset"
  | "/course/lessons"
  | "/signup"
  | "/login";

export interface ByteSpaceCourseLessonsProps {
  className?: string;
  initialTab?: "About" | "Lesson" | "Reviews";
  onNavigate?: (path: ByteSpaceAppRoute) => void;
}

interface ModuleItem {
  id: string;
  title: string;
  description: string;
}

interface ReviewItem {
  id: string;
  reviewer: string;
  role: string;
  date: string;
  stars: number;
  avatar: string;
  text: string;
}

const SIDEBAR_LESSONS = [
  {
    number: "01",
    title: "Introduction to Digital\nAssets",
    time: "12 mins",
  },
  {
    number: "02",
    title: "Design Principles for\nImpacts",
    time: "21 mins",
  },
  {
    number: "03",
    title: "Advanced Techniques in\nDigital Creation",
    time: "16 mins",
  },
];

const COURSE_MODULES: ModuleItem[] = [
  {
    id: "module-1",
    title: "Module 1: Introduction to Digital Assets",
    description:
      "Lay the groundwork with lessons like 'Understanding Digital Elements' and 'Navigating Design Software Tools.' Dive into the essentials of digital asset creation.",
  },
  {
    id: "module-2",
    title: "Module 2: Design Principles for Impact",
    description:
      "Master the principles that drive impactful designs with lessons such as 'Color Theory in Digital Design' and 'Typography Essentials.' Elevate your visual communication skills.",
  },
  {
    id: "module-4",
    title: "Module 4: User-Centric Design Strategies",
    description:
      "Understand 'Design Thinking in Digital Creation' and delve into 'User Experience (UX) Essentials.' Craft digital assets with a focus on user-centric design.",
  },
  {
    id: "module-5",
    title: "Module 5: Interactive Media and Engagement",
    description:
      "Engage your audience with lessons like 'Creating Interactive Presentations' and 'Integrating Multimedia Elements.' Master the art of creating immersive digital experiences.",
  },
  {
    id: "module-6",
    title: "Module 6: Project Showcase and Critique",
    description:
      "Perfect your presentation skills with 'Effective Presentation Techniques' and embrace collaboration with 'Peer Critique and Collaboration.' Showcase your work with confidence.",
  },
  {
    id: "module-7",
    title: "Module 7: Optimizing Digital Assets for Various Platforms",
    description:
      "Adapt your digital creations for 'Mobile Platforms' and optimize for 'Social Media.' Ensure widespread accessibility and engagement across diverse digital landscapes.",
  },
];

const RATING_BREAKDOWN = [
  { stars: 5, count: 720, fillPercent: 86 },
  { stars: 4, count: 120, fillPercent: 24 },
  { stars: 3, count: 21, fillPercent: 8 },
  { stars: 2, count: 12, fillPercent: 5 },
  { stars: 1, count: 16, fillPercent: 6 },
];

const REVIEW_FILTERS = ["All rating", "★ 5", "★ 4", "★ 3", "★ 2", "★ 1"];

const REVIEWS_DATA: ReviewItem[] = [
  {
    id: "review-1",
    reviewer: "PurePearl Studio",
    role: "UI/UX Designer",
    date: "a year ago",
    stars: 5,
    avatar: "/src/assets/images/creator_female_instructor_1790632544714.jpg",
    text: "The course provided me with a comprehensive understanding of digital asset creation. The lessons were in-depth, practical, and immediately applicable to my work. Highly recommended!",
  },
  {
    id: "review-2",
    reviewer: "Albert Flores",
    role: "UI/UX Designer",
    date: "a year ago",
    stars: 5,
    avatar: "/src/assets/images/growth_student_laptop_1790632531469.jpg",
    text: "This course transformed my approach to digital design. The combination of theory, hands-on exercises, and real-world applications made it a truly enriching experience. Excited to implement what I’ve learned!",
  },
  {
    id: "review-3",
    reviewer: "Cody Fisher",
    role: "UI/UX Designer",
    date: "a year ago",
    stars: 5,
    avatar: "/src/assets/images/hero_student_creator_1790632518202.jpg",
    text: "The project showcase and critique module created a collaborative environment where I could showcase my work, receive valuable feedback, and refine my skills. It added a unique and valuable dimension to the learning process.",
  },
  {
    id: "review-4",
    reviewer: "Brooklyn Simmons",
    role: "UI/UX Designer",
    date: "a year ago",
    stars: 5,
    avatar: "/src/assets/images/course_digital_assets_1790632569383.jpg",
    text: "The lessons on optimizing digital assets for various platforms were particularly insightful. The course adapts to the evolving digital landscape, and the engaging content kept me motivated throughout.",
  },
];

// Internal sub-component: Subtle Technical Grid Pattern
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

// Main exported Course Details / Course Lessons Page component
export default function ByteSpaceCourseLessons({
  className,
  initialTab = "Lesson",
  onNavigate,
}: ByteSpaceCourseLessonsProps) {
  const [activeTab, setActiveTab] = useState<"About" | "Lesson" | "Reviews">(
    initialTab
  );
  const [selectedRatingFilter, setSelectedRatingFilter] =
    useState<string>("All rating");
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);
  const [enrolled, setEnrolled] = useState<boolean>(false);
  const [shareCopied, setShareCopied] = useState<boolean>(false);
  const [creatorProfileOpen, setCreatorProfileOpen] = useState<boolean>(false);
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [newsletterSubscribed, setNewsletterSubscribed] =
    useState<boolean>(false);

  const handleNavigate = (path: ByteSpaceAppRoute) => {
    if (onNavigate) {
      onNavigate(path);
    } else if (typeof window !== "undefined") {
      window.history.pushState({}, "", path);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes("@")) {
      setNewsletterSubscribed(true);
      setNewsletterEmail("");
    }
  };

  const filteredReviews = REVIEWS_DATA.filter((rev) => {
    if (selectedRatingFilter === "All rating") return true;
    const starNum = Number(selectedRatingFilter.replace("★ ", ""));
    return rev.stars === starNum;
  });

  const visibleReviews =
    filteredReviews.length > 0 ? filteredReviews : REVIEWS_DATA;

  return (
    <div
      className={cn(
        "min-h-screen w-full bg-[#FFFFFF] text-[#252525] selection:bg-[#C8FF00] selection:text-[#252525]",
        className
      )}
    >
      {/* =====================================================================
          HEADER & HERO / COURSE HEADER (ELECTRIC BLUE WITH SUBTLE GRID)
      ===================================================================== */}
      <div className="relative bg-[#0B3FE3] text-[#FFFFFF]">
        <ElectricHeroGrid />

        {/* TOP NAVIGATION BAR */}
        <header className="relative z-20 mx-auto flex max-w-[1200px] items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          {/* Top-Left: ByteSpace Logo */}
          <ByteSpaceLogo light onClick={() => handleNavigate("/")} />

          {/* Center Navigation: Home, Courses, Creators */}
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
                handleNavigate("/creators");
              }}
              className="transition-colors hover:text-[#C8FF00] whitespace-nowrap"
            >
              Creators
            </a>
          </nav>

          {/* Right: Sign In, Join Us, Small Bag/Cart Icon */}
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
              onClick={() => setEnrolled(true)}
              aria-label="Shopping Bag"
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#FFFFFF]/25 bg-[#FFFFFF]/10 text-[#FFFFFF] transition-colors hover:bg-[#FFFFFF]/20"
            >
              <ShoppingBag className="h-4 w-4" />
              {enrolled && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#C8FF00] px-1 text-[10px] font-extrabold text-[#252525] tabular-nums">
                  1
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
                className="rounded-lg px-3 py-1.5 hover:bg-[#FFFFFF]/10"
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
                className="rounded-lg bg-[#FFFFFF]/10 px-3 py-1.5 font-bold text-[#C8FF00]"
              >
                Courses
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileNavOpen(false);
                  setCreatorProfileOpen(true);
                }}
                className="rounded-lg px-3 py-1.5 text-left hover:bg-[#FFFFFF]/10"
              >
                Creators
              </button>
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

        {/* HERO / COURSE HEADER + MAIN COURSE MEDIA + COURSE SIDEBAR */}
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 pt-6 pb-12 sm:px-6 lg:px-8">
          {/* Course Heading Area + Share Button */}
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h1 className="text-[28px] leading-[1.15] font-bold tracking-tight text-[#FFFFFF] sm:text-[36px] md:text-[40px]">
                Build Digital Asset: A Comprehensive Guide
              </h1>
              <p className="mt-2 text-[15px] font-normal text-[#FFFFFF]/90 sm:text-[16px]">
                Unlock the Power of Digital Creation with Expert Guidance
              </p>
              <p className="mt-1.5 text-[13px] font-medium text-[#C8FF00]">
                by purepearl studio
              </p>

              {/* Three Information Pills: Intermediate / 4.8 (172 reviews) / 199 Students */}
              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                <div className="inline-flex h-8 items-center gap-1.5 rounded-[8px] bg-[#FFFFFF] px-3 text-[12px] font-semibold text-[#252525] whitespace-nowrap">
                  <BarChart2 className="h-3.5 w-3.5 text-[#0B3FE3]" />
                  <span>Intermediate</span>
                </div>

                <div className="inline-flex h-8 items-center gap-1.5 rounded-[8px] bg-[#FFFFFF] px-3 text-[12px] font-semibold text-[#252525] whitespace-nowrap tabular-nums">
                  <Star className="h-3.5 w-3.5 fill-[#0B3FE3] text-[#0B3FE3]" />
                  <span>4.8 (172 reviews)</span>
                </div>

                <div className="inline-flex h-8 items-center gap-1.5 rounded-[8px] bg-[#FFFFFF] px-3 text-[12px] font-semibold text-[#252525] whitespace-nowrap tabular-nums">
                  <Users className="h-3.5 w-3.5 text-[#0B3FE3]" />
                  <span>199 Students</span>
                </div>
              </div>
            </div>

            {/* Bright Lime-Green Rounded "Share" Button */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex h-10 items-center gap-2 rounded-[8px] bg-[#C8FF00] px-4 text-[13px] font-bold text-[#252525] transition-opacity hover:opacity-90 whitespace-nowrap"
              >
                <Share2 className="h-4 w-4 text-[#252525]" />
                <span>{shareCopied ? "Copied" : "Share"}</span>
              </button>
            </div>
          </div>

          {/* Two-Column Hero Media & Course Sidebar */}
          <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            {/* MAIN COURSE MEDIA (Left 7 Columns) */}
            <div className="lg:col-span-7">
              <div
                onClick={() => setIsPlayingVideo((prev) => !prev)}
                className="group relative h-[320px] w-full cursor-pointer overflow-hidden rounded-[18px] bg-[#E5E5E5] sm:h-[420px] lg:h-[500px]"
              >
                <img
                  src="/src/assets/images/creator_female_instructor_1790632544714.jpg"
                  alt="Female course instructor"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.01]"
                />

                {/* Centered Translucent/Dark Video Play Button */}
                <div className="absolute inset-0 flex items-center justify-center bg-[#252525]/10 transition-colors group-hover:bg-[#252525]/15">
                  <button
                    type="button"
                    aria-label={
                      isPlayingVideo ? "Pause lesson video" : "Play lesson video"
                    }
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-[#252525]/70 text-[#FFFFFF] shadow-md backdrop-blur-[2px] transition-transform duration-150 group-hover:scale-105 sm:h-20 sm:w-20"
                  >
                    {isPlayingVideo ? (
                      <span className="flex items-center gap-1.5">
                        <span className="h-5 w-1.5 rounded-xs bg-[#FFFFFF]" />
                        <span className="h-5 w-1.5 rounded-xs bg-[#FFFFFF]" />
                      </span>
                    ) : (
                      <Play className="ml-1 h-7 w-7 fill-[#FFFFFF] text-[#FFFFFF]" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* COURSE SIDEBAR (Right 5 Columns, overlaps blue hero into white section below) */}
            <div className="lg:col-span-5 lg:-mb-[340px]">
              <aside
                aria-label="Course Information Sidebar"
                className="rounded-[20px] border border-[#E5E5E5] bg-[#FFFFFF] p-6 text-[#252525] shadow-xs sm:p-7"
              >
                {/* Top Lesson Header */}
                <h2 className="text-[18px] font-bold text-[#252525]">
                  112 Lessons (24 hours)
                </h2>

                {/* Visible Lesson List and Timings */}
                <div className="mt-4 space-y-3">
                  {SIDEBAR_LESSONS.map((lesson, idx) => (
                    <div
                      key={lesson.number}
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-[12px] px-3.5 py-3",
                        idx === 0
                          ? "bg-[#E5E5E5]/45"
                          : "border border-[#E5E5E5]/80 bg-[#FFFFFF]"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0B3FE3] text-[11px] font-bold text-[#FFFFFF] tabular-nums">
                          {lesson.number}
                        </span>
                        <p className="text-[13px] leading-snug font-semibold whitespace-pre-line text-[#252525]">
                          {lesson.title}
                        </p>
                      </div>
                      <span className="shrink-0 text-[12px] font-medium text-[#252525]/60 tabular-nums">
                        {lesson.time}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-3 text-[12px] font-medium text-[#252525]/55">
                  99 more videos
                </p>

                {/* Enrollment Callout */}
                <p className="mt-5 text-[13px] leading-relaxed text-[#252525]/75">
                  Ready to Dive In? Enroll Now and Start
                  <br />
                  Building Your Digital Future!
                </p>

                {/* Price: "$25/lifetime" */}
                <div className="mt-4 flex items-baseline gap-1 tabular-nums">
                  <span className="text-[32px] font-extrabold tracking-tight text-[#0B3FE3]">
                    $25
                  </span>
                  <span className="text-[13px] font-normal text-[#252525]/55">
                    /lifetime
                  </span>
                </div>

                {/* Bright Lime-Green Rounded "Enroll Now" Button */}
                <button
                  type="button"
                  onClick={() => setEnrolled(true)}
                  className="mt-4 h-[46px] w-full rounded-[10px] bg-[#C8FF00] text-[14px] font-bold text-[#252525] transition-opacity hover:opacity-90"
                >
                  {enrolled ? "Enrolled in Course" : "Enroll Now"}
                </button>

                {/* "This course include" */}
                <div className="mt-6">
                  <h3 className="text-[14px] font-bold text-[#252525]">
                    This course include
                  </h3>
                  <ul className="mt-3 space-y-2.5 text-[13px] text-[#252525]/80">
                    <li className="flex items-center gap-2.5">
                      <FileText className="h-4 w-4 shrink-0 text-[#0B3FE3]" />
                      <span>Learning Resources</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Video className="h-4 w-4 shrink-0 text-[#0B3FE3]" />
                      <span>Quality Lesson Videos</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Award className="h-4 w-4 shrink-0 text-[#0B3FE3]" />
                      <span>Certificate of Completion</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <MessageSquare className="h-4 w-4 shrink-0 text-[#0B3FE3]" />
                      <span>Private Consultation</span>
                    </li>
                  </ul>
                </div>

                {/* Creator Section: PurePearl Studio */}
                <div className="mt-6 border-t border-[#E5E5E5] pt-5">
                  <div className="flex items-center gap-3">
                    <img
                      src="/src/assets/images/creator_female_instructor_1790632544714.jpg"
                      alt="PurePearl Studio"
                      referrerPolicy="no-referrer"
                      className="h-11 w-11 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-[14px] font-bold text-[#252525]">
                        PurePearl Studio
                      </p>
                      <p className="text-[12px] text-[#252525]/60">
                        Professional Creator
                      </p>
                    </div>
                  </div>

                  <p className="mt-3.5 text-[12px] leading-relaxed text-[#252525]/70">
                    Ready to Dive In? Enroll Now and Start
                    <br />
                    Building Your Digital Future!
                  </p>

                  <button
                    type="button"
                    onClick={() => handleNavigate("/creators")}
                    className="mt-3.5 rounded-[8px] border border-[#E5E5E5] bg-[#FFFFFF] px-4 py-2 text-[12px] font-semibold text-[#252525] transition-colors hover:bg-[#E5E5E5]/30 whitespace-nowrap"
                  >
                    See Full Profile
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          WHITE CONTENT SECTION:
          TABS (About / Lesson [Active] / Reviews) + MODULES + LESSON CONTENT + PROGRESS
      ===================================================================== */}
      <main className="mx-auto max-w-[1200px] px-4 pt-10 pb-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Content Column (7 Columns on Desktop) */}
          <div className="lg:col-span-7">
            {/* Three Pill-Style Tabs: About / Lesson (Active) / Reviews */}
            <div
              role="tablist"
              aria-label="Course Content Tabs"
              className="flex items-center gap-2.5"
            >
              {(["About", "Lesson", "Reviews"] as const).map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={isActive}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "rounded-[8px] px-5 py-2 text-[13px] font-bold transition-colors whitespace-nowrap",
                      isActive
                        ? "bg-[#C8FF00] text-[#252525]"
                        : "border border-[#E5E5E5] bg-[#E5E5E5]/40 text-[#252525] hover:bg-[#E5E5E5]/70"
                    )}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* ===============================================================
                ACTIVE TAB: LESSON (EXACT MODULES, LESSON CONTENT & PROGRESS)
            =============================================================== */}
            {activeTab === "Lesson" && (
              <div className="mt-8">
                {/* Explore the Modules */}
                <div>
                  <h2 className="text-[24px] font-bold tracking-tight text-[#252525] sm:text-[26px]">
                    Explore the Modules
                  </h2>
                  <p className="mt-2.5 max-w-2xl text-[13px] leading-relaxed text-[#252525]/70 sm:text-[14px]">
                    Immerse yourself in the course content as we break down each
                    module into comprehensive lessons, providing practical
                    insights and hands-on experiences.
                  </p>
                </div>

                {/* Lesson List */}
                <div className="mt-8">
                  <h3 className="text-[18px] font-bold text-[#252525]">
                    Lesson List
                  </h3>

                  <div className="mt-5 space-y-6">
                    {COURSE_MODULES.map((mod) => (
                      <div
                        key={mod.id}
                        className="flex items-start gap-4"
                      >
                        {/* Lime-green rounded square video icon on the left */}
                        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#C8FF00] text-[#252525]">
                          <Video className="h-5 w-5 stroke-[2.2]" />
                        </div>

                        {/* Module Title & Description */}
                        <div className="flex-1">
                          <h4 className="text-[15px] font-bold text-[#252525]">
                            {mod.title}
                          </h4>
                          <p className="mt-1.5 text-[13px] leading-relaxed text-[#252525]/70">
                            {mod.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lesson Content */}
                <div className="mt-10">
                  <h3 className="text-[20px] font-bold tracking-tight text-[#252525]">
                    Lesson Content
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-[#252525]/70 sm:text-[14px]">
                    Engage with each lesson through captivating video content,
                    detailed textual explanations, and interactive elements.
                    Download resources, complete assignments, and test your
                    understanding with quizzes.
                  </p>
                </div>

                {/* Lesson Progress Tracking */}
                <div className="mt-10">
                  <h3 className="text-[20px] font-bold tracking-tight text-[#252525]">
                    Lesson Progress Tracking
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-[#252525]/70 sm:text-[14px]">
                    Witness your growth as you complete lessons, with an
                    intuitive progress tracking feature guiding you through your
                    learning journey.
                  </p>

                  {/* Progress Card: "Learning Progress" + "55%" + Horizontal bar filled to 55% */}
                  <div className="mt-5 rounded-[14px] border border-[#E5E5E5] bg-[#FFFFFF] p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-bold text-[#252525]">
                        Learning Progress
                      </span>
                      <span className="text-[14px] font-extrabold text-[#252525] tabular-nums">
                        55%
                      </span>
                    </div>
                    <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-[#E5E5E5]">
                      <div
                        className="h-full rounded-full bg-[#C8FF00]"
                        style={{ width: "55%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===============================================================
                TAB: REVIEWS (PRESERVED FOR SEAMLESS TAB SWITCHING)
            =============================================================== */}
            {activeTab === "Reviews" && (
              <div className="mt-8">
                <div>
                  <h2 className="text-[24px] font-bold tracking-tight text-[#252525] sm:text-[26px]">
                    What Learners Are Saying
                  </h2>
                  <p className="mt-2.5 max-w-2xl text-[13px] leading-relaxed text-[#252525]/70 sm:text-[14px]">
                    Discover what our learners have to say about their
                    experience with Build Digital Assets: A Comprehensive Guide!
                    Read reviews and ratings from individuals who have embarked
                    on the transformative journey of mastering digital asset
                    creation.
                  </p>
                </div>

                <div className="mt-7 rounded-[16px] border border-[#E5E5E5] bg-[#FFFFFF] p-5 sm:p-6">
                  <div className="flex flex-col items-stretch gap-6 sm:flex-row sm:items-center">
                    <div className="flex min-w-[140px] flex-col items-center justify-center rounded-[12px] bg-[#C8FF00] px-6 py-7 text-center text-[#252525]">
                      <span className="text-[13px] font-semibold text-[#252525]">
                        Ratings
                      </span>
                      <span className="mt-1 text-[44px] leading-none font-extrabold tracking-tight text-[#252525] tabular-nums">
                        4.7
                      </span>
                    </div>

                    <div className="flex-1 space-y-2.5">
                      {RATING_BREAKDOWN.map((row) => (
                        <div
                          key={row.stars}
                          className="flex items-center gap-3 text-[12px]"
                        >
                          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#E5E5E5]">
                            <div
                              className="h-full rounded-full bg-[#C8FF00]"
                              style={{ width: `${row.fillPercent}%` }}
                            />
                          </div>

                          <div className="flex w-20 shrink-0 items-center gap-0.5 text-[11px]">
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <span
                                key={idx}
                                className={
                                  idx < row.stars
                                    ? "text-[#C8FF00]"
                                    : "text-[#E5E5E5]"
                                }
                              >
                                ★
                              </span>
                            ))}
                          </div>

                          <span className="w-8 shrink-0 text-right font-semibold text-[#252525]/80 tabular-nums">
                            {row.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-9">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-[16px] font-bold text-[#252525]">
                      Individual Reviews:
                    </h3>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {REVIEW_FILTERS.map((chip) => {
                        const active = selectedRatingFilter === chip;
                        return (
                          <button
                            key={chip}
                            type="button"
                            onClick={() => setSelectedRatingFilter(chip)}
                            className={cn(
                              "rounded-[8px] px-3 py-1.5 text-[12px] font-semibold transition-colors whitespace-nowrap",
                              active
                                ? "bg-[#C8FF00] text-[#252525]"
                                : "border border-[#E5E5E5] bg-[#E5E5E5]/35 text-[#252525]/80 hover:bg-[#E5E5E5]/70"
                            )}
                          >
                            {chip}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    {visibleReviews.map((review) => (
                      <article
                        key={review.id}
                        className="rounded-[16px] border border-[#E5E5E5] bg-[#FFFFFF] p-6"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={review.avatar}
                              alt={review.reviewer}
                              referrerPolicy="no-referrer"
                              className="h-11 w-11 rounded-full object-cover"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-[14px] font-bold text-[#252525]">
                                  {review.reviewer}
                                </h4>
                                <span className="text-[11px] text-[#252525]/45">
                                  • {review.date}
                                </span>
                              </div>
                              <p className="text-[12px] text-[#252525]/60">
                                {review.role}
                              </p>
                            </div>
                          </div>

                          <div
                            aria-label="5 out of 5 stars"
                            className="shrink-0 text-[13px] tracking-wider text-[#C8FF00]"
                          >
                            ★ ★ ★ ★ ★
                          </div>
                        </div>

                        <p className="mt-4 text-[13px] leading-relaxed text-[#252525]/80 sm:text-[14px]">
                          {review.text}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ===============================================================
                TAB: ABOUT (DESCRIPTION, SNEAK PEEK & KEY POINTS)
            =============================================================== */}
            {activeTab === "About" && (
              <div className="mt-8 space-y-10">
                {/* 1. DESCRIPTION SUBSECTION */}
                <div>
                  <h2 className="text-[24px] font-bold tracking-tight text-[#252525] sm:text-[26px]">
                    Description
                  </h2>
                  <div className="mt-4 space-y-4 text-[14px] leading-[1.75] text-[#252525]/80 sm:text-[15px]">
                    <p>
                      Embark on an enlightening exploration into the world of
                      digital creation with our comprehensive course,{" "}
                      <span className="font-semibold text-[#252525]">
                        Build Digital Assets: A Comprehensive Guide
                      </span>
                      . This transformative learning experience invites you to
                      delve deep into the intricacies of crafting impactful
                      digital content. From laying the groundwork with
                      foundational concepts to mastering advanced techniques,
                      this guide is meticulously curated to empower you with the
                      skills essential for navigating the dynamic landscape of
                      digital asset creation.
                    </p>
                    <p>
                      In the initial modules, you&apos;ll establish a solid
                      foundation by immersing yourself in the foundational
                      concepts that form the backbone of digital asset creation.
                      Understand the fundamental elements that constitute
                      compelling digital content and gain proficiency in
                      leveraging these elements to communicate effectively in
                      the digital realm.
                    </p>
                    <p>
                      As you progress through the course, you&apos;ll ascend to
                      higher levels of expertise, delving into the nuances of
                      design principles that drive impactful creations. Uncover
                      the secrets behind effective visual communication,
                      exploring color theory, typography, and layout strategies
                      that elevate your digital assets to new heights. Engage in
                      hands-on exercises that reinforce your understanding,
                      allowing you to apply these principles in practical
                      scenarios.
                    </p>
                  </div>
                </div>

                {/* 2. SNEAK PEEK SUBSECTION (Multiple Little Preview Images) */}
                <div>
                  <h3 className="text-[20px] font-bold tracking-tight text-[#252525] sm:text-[22px]">
                    Sneak Peek
                  </h3>

                  <div className="mt-4 grid grid-cols-2 gap-3.5 sm:grid-cols-4">
                    {[
                      {
                        src: "/src/assets/images/course_digital_assets_1790632569383.jpg",
                        label: "3D Shapes & Assets",
                        duration: "03:45",
                      },
                      {
                        src: "/src/assets/images/course_figma_basics_1790632556720.jpg",
                        label: "UI Kit Systems",
                        duration: "04:18",
                      },
                      {
                        src: "/src/assets/images/course_productivity_1790632590389.jpg",
                        label: "Color & Lighting",
                        duration: "05:12",
                      },
                      {
                        src: "/src/assets/images/course_startup_success_1790632614991.jpg",
                        label: "Portfolio Export",
                        duration: "06:04",
                      },
                    ].map((preview) => (
                      <div
                        key={preview.label}
                        onClick={() => setIsPlayingVideo((prev) => !prev)}
                        className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-[14px] border border-[#E5E5E5] bg-[#252525] shadow-2xs"
                      >
                        <img
                          src={preview.src}
                          alt={preview.label}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#252525]/70 via-[#252525]/15 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C8FF00]/95 text-[#252525] shadow-sm transition-transform duration-200 group-hover:scale-110">
                            <Play className="ml-0.5 h-4 w-4 fill-[#252525] text-[#252525]" />
                          </div>
                        </div>
                        <span className="absolute top-2 right-2 rounded-md bg-[#252525]/75 px-1.5 py-0.5 text-[10px] font-semibold text-[#FFFFFF] tabular-nums">
                          {preview.duration}
                        </span>
                        <span className="absolute right-2.5 bottom-2 left-2.5 truncate text-[11px] font-semibold text-[#FFFFFF]">
                          {preview.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. KEY POINTS SUBSECTION (Tick Mark Inside a Circle + Plain Text Not in a Card) */}
                <div>
                  <h3 className="text-[20px] font-bold tracking-tight text-[#252525] sm:text-[22px]">
                    Key Points
                  </h3>

                  <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3.5 sm:grid-cols-2">
                    {[
                      "Foundational Concepts",
                      "Design Principles Mastery",
                      "Advanced Techniques in Digital Creation",
                      "Project Showcase and Critique",
                      "Optimizing for Various Platforms",
                      "Digital Asset Management Best Practices",
                      "Monetization Strategies",
                      "Capstone Project: Building Your Portfolio",
                    ].map((title) => (
                      <div
                        key={title}
                        className="flex items-center gap-3 py-0.5"
                      >
                        {/* Tick Mark Inside a Circle Icon */}
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C8FF00] text-[#252525]">
                          <svg
                            className="h-3 w-3"
                            viewBox="0 0 14 14"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M3 7.2L5.7 9.9L11 4.2"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span className="text-[14px] font-medium text-[#252525]">
                          {title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right 5 Columns: Open whitespace beneath the overlapping Course Sidebar on desktop */}
          <div className="hidden lg:col-span-5 lg:block" aria-hidden="true" />
        </div>
      </main>

      {/* =====================================================================
          FOOTER
      ===================================================================== */}
      <footer className="border-t border-[#E5E5E5] bg-[#FFFFFF] pt-14 pb-10">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Left: ByteSpace Logo & Newsletter */}
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

            {/* Right: Three Footer Navigation Columns */}
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
                          handleNavigate("/courses");
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
                          handleNavigate("/courses");
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
                          handleNavigate(
                            item === "Become a Creator" ? "/signup" : "/"
                          );
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

          {/* Bottom Divider and Copyright Row */}
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

      {/* PurePearl Studio Profile Modal */}
      {creatorProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#252525]/60 p-4">
          <div className="w-full max-w-md rounded-[20px] border border-[#E5E5E5] bg-[#FFFFFF] p-6 text-[#252525] shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/src/assets/images/creator_female_instructor_1790632544714.jpg"
                  alt="PurePearl Studio"
                  referrerPolicy="no-referrer"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-[16px] font-bold text-[#252525]">
                    PurePearl Studio
                  </h3>
                  <p className="text-[12px] text-[#0B3FE3]">
                    Professional Creator · 18 Courses
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCreatorProfileOpen(false)}
                aria-label="Close profile"
                className="rounded-lg p-1.5 text-[#252525]/60 hover:bg-[#E5E5E5]/40"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-[#252525]/75">
              PurePearl Studio is an independent design and creative technology
              collective teaching over 12,000 students how to build scalable
              digital assets, design systems, and visual products.
            </p>
            <div className="mt-5 flex justify-end gap-2 border-t border-[#E5E5E5] pt-4">
              <button
                type="button"
                onClick={() => setCreatorProfileOpen(false)}
                className="rounded-[8px] bg-[#C8FF00] px-4 py-2 text-[12px] font-bold text-[#252525]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
