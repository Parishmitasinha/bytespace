"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface ByteSpaceSignupProps {
  className?: string;
  onNavigate?: (
    path: "/" | "/courses" | "/course/build-digital-asset" | "/signup" | "/login"
  ) => void;
}

// Internal sub-component: Subtle Technical Grid Background
function TechnicalGridBackground() {
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

// Internal sub-component: Small Understated ByteSpace Logo
function ByteSpaceBrandMark({
  onClick,
}: {
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
      className="inline-flex items-center gap-2 focus-visible:outline-none"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#C8FF00]">
        <svg
          width="14"
          height="14"
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
      <span className="text-[17px] font-bold tracking-tight text-[#FFFFFF]">
        ByteSpace
      </span>
    </a>
  );
}

// Internal sub-component: Student Avatar Stack with Dark Circular Badge
function AvatarGroupWithBadge({
  badgeText,
  size = "sm",
}: {
  badgeText: string;
  size?: "sm" | "xs";
}) {
  const dim = size === "sm" ? "h-7 w-7" : "h-6 w-6";
  const avatars = [
    "/src/assets/images/hero_student_creator_1790632518202.jpg",
    "/src/assets/images/creator_female_instructor_1790632544714.jpg",
    "/src/assets/images/growth_student_laptop_1790632531469.jpg",
  ];

  return (
    <div className="flex items-center -space-x-2">
      {avatars.map((src, index) => (
        <img
          key={index}
          src={src}
          alt="Student avatar"
          referrerPolicy="no-referrer"
          className={cn(
            dim,
            "rounded-full border-2 border-[#FFFFFF] object-cover"
          )}
        />
      ))}
      <span
        className={cn(
          dim,
          "inline-flex items-center justify-center rounded-full border-2 border-[#FFFFFF] bg-[#252525] text-[10px] font-bold text-[#FFFFFF] tabular-nums"
        )}
      >
        {badgeText}
      </span>
    </div>
  );
}

// Internal sub-component: Left-Side Course Card Collage & Decorative Abstract Shapes
function CourseCardCollage() {
  return (
    <div className="relative mx-auto mt-8 h-[420px] w-full max-w-[500px] select-none sm:h-[450px] lg:mx-0">
      {/* --------------------------------------------------
          DECORATIVE ELEMENT 1: NEON LIME RING (Upper-left)
      -------------------------------------------------- */}
      <svg
        className="pointer-events-none absolute -top-6 left-2 z-10 h-28 w-28 -rotate-12 sm:h-32 sm:w-32"
        viewBox="0 0 140 140"
        fill="none"
        aria-hidden="true"
      >
        <ellipse
          cx="70"
          cy="70"
          rx="52"
          ry="40"
          transform="rotate(-18 70 70)"
          stroke="#C8FF00"
          strokeWidth="18"
          strokeLinecap="round"
        />
        <ellipse
          cx="68"
          cy="68"
          rx="52"
          ry="40"
          transform="rotate(-18 68 68)"
          stroke="#FFFFFF"
          strokeOpacity="0.28"
          strokeWidth="3"
        />
      </svg>

      {/* --------------------------------------------------
          DECORATIVE ELEMENT 2: NEON LIME 3D TRIANGLE (Lower-left)
      -------------------------------------------------- */}
      <svg
        className="pointer-events-none absolute bottom-4 -left-5 z-20 h-24 w-24 -rotate-12 sm:h-28 sm:w-28"
        viewBox="0 0 120 120"
        fill="none"
        aria-hidden="true"
      >
        {/* 3D extruded depth side */}
        <path
          d="M60 16L104 94H16L60 16Z"
          fill="#99C200"
          transform="translate(-4, 6)"
        />
        {/* Main Neon Lime Face */}
        <path
          d="M60 16L104 94H16L60 16Z"
          fill="#C8FF00"
          stroke="#C8FF00"
          strokeWidth="8"
          strokeLinejoin="round"
        />
        {/* Subtle inner cutout/highlight for 3D look */}
        <path
          d="M60 36L86 82H34L60 36Z"
          fill="#0B3FE3"
        />
      </svg>

      {/* --------------------------------------------------
          BACKGROUND COURSE CARD ("Build Digital Assets")
          Partially visible behind the foreground card
      -------------------------------------------------- */}
      <div className="absolute top-12 left-4 z-10 w-[250px] -rotate-3 rounded-[18px] border border-[#E5E5E5] bg-[#FFFFFF] p-3.5 text-[#252525] shadow-md sm:w-[265px]">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[12px] bg-[#252525]">
          <img
            src="/src/assets/images/course_digital_assets_1790632569383.jpg"
            alt="Build Digital Assets"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="mt-3">
          <h3 className="text-[15px] font-bold tracking-tight text-[#252525]">
            Build Digital Assets
          </h3>
          <p className="mt-0.5 text-[11px] text-[#252525]/60">
            by purepearl studio
          </p>
          <div className="mt-2 flex items-center gap-2 text-[11px] text-[#252525]/70">
            <span>17 Lessons</span>
            <span>·</span>
            <span className="font-semibold text-[#0B3FE3]">Beginner</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-[#E5E5E5] pt-2.5">
            <AvatarGroupWithBadge badgeText="26+" size="xs" />
            <span className="text-[12px] font-bold text-[#252525] tabular-nums">
              $25/lifetime
            </span>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------
          FOREGROUND PRIMARY COURSE CARD ("The Power of Big Data")
          Positioned slightly higher & more toward center, overlapping background card
      -------------------------------------------------- */}
      <div className="absolute top-2 left-24 z-20 w-[275px] rounded-[18px] border border-[#E5E5E5] bg-[#FFFFFF] p-4 text-[#252525] shadow-lg sm:left-32 sm:w-[300px]">
        {/* Sophisticated Dark Data-Analytics Dashboard Thumbnail */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[12px] bg-[#252525]">
          <img
            src="/src/assets/images/dark_analytics_dashboard_1790658331935.jpg"
            alt="The Power of Big Data analytics dashboard"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
          {/* Rating Badge Overlay */}
          <div className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-md bg-[#252525]/85 px-2 py-0.5 text-[11px] font-bold text-[#FFFFFF] tabular-nums">
            <span>4.5</span>
            <span className="text-[#C8FF00]">★</span>
          </div>
        </div>

        {/* Title & Instructor */}
        <div className="mt-3.5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-[16px] font-bold tracking-tight text-[#252525]">
                The Power of Big Data
              </h3>
              <p className="mt-0.5 text-[11px] text-[#252525]/60">
                by purepearl studio
              </p>
            </div>
            <span className="rounded-md bg-[#0B3FE3]/10 px-2 py-0.5 text-[10px] font-semibold text-[#0B3FE3]">
              Beginner
            </span>
          </div>

          {/* Metadata Row */}
          <div className="mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] text-[#252525]/70 tabular-nums">
            <span>17 Lessons</span>
            <span>·</span>
            <span>2 hours 16 mins</span>
            <span>·</span>
            <span>59 Comments</span>
          </div>

          {/* Bottom Row: Avatars + 26+ indicator & Price */}
          <div className="mt-3.5 flex items-center justify-between border-t border-[#E5E5E5] pt-3">
            <AvatarGroupWithBadge badgeText="26+" size="sm" />
            <span className="text-[13px] font-extrabold text-[#252525] tabular-nums">
              $25/lifetime
            </span>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------
          DECORATIVE ELEMENT 3: WHITE 3D TUBULAR SQUIGGLE (Lower-right)
      -------------------------------------------------- */}
      <svg
        className="pointer-events-none absolute right-2 bottom-20 z-20 h-24 w-28 sm:-right-4"
        viewBox="0 0 140 110"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M16 84C22 44 48 44 56 68C64 92 90 88 96 50C100 24 118 22 126 36"
          stroke="#E5E5E5"
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(0, 4)"
        />
        <path
          d="M16 84C22 44 48 44 56 68C64 92 90 88 96 50C100 24 118 22 126 36"
          stroke="#FFFFFF"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* --------------------------------------------------
          DECORATIVE ELEMENT 4: HAPPY STUDENTS WIDGET (Lower-right overlapping)
      -------------------------------------------------- */}
      <div className="absolute right-4 bottom-2 z-30 w-[195px] rounded-[16px] bg-[#C8FF00] p-3.5 text-[#252525] shadow-md sm:right-2">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-extrabold tracking-tight text-[#252525]">
            Happy Students
          </p>
        </div>
        <p className="mt-0.5 text-[11px] font-bold text-[#252525] tabular-nums">
          4.5 (240) <span className="text-[#252525]">★</span>
        </p>
        <div className="mt-2.5">
          <AvatarGroupWithBadge badgeText="2K+" size="xs" />
        </div>
      </div>
    </div>
  );
}

// Main exported Sign Up page component
export default function ByteSpaceSignup({
  className,
  onNavigate,
}: ByteSpaceSignupProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNavigate = (
    path: "/" | "/courses" | "/course/build-digital-asset" | "/signup" | "/login"
  ) => {
    if (onNavigate) {
      onNavigate(path);
    } else if (typeof window !== "undefined") {
      window.history.pushState({}, "", path);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName.trim() && email.trim() && password.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        handleNavigate("/course/build-digital-asset");
      }, 600);
    }
  };

  return (
    <main
      className={cn(
        "relative min-h-screen w-full overflow-x-hidden bg-[#0B3FE3] text-[#FFFFFF] selection:bg-[#C8FF00] selection:text-[#252525]",
        className
      )}
    >
      {/* 3. FULL BACKGROUND TECHNICAL GRID */}
      <TechnicalGridBackground />

      {/* 1. OVERALL PAGE COMPOSITION (50/50 Visual Split on Desktop) */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] flex-col justify-between px-5 py-8 sm:px-8 lg:flex-row lg:items-center lg:px-0 lg:py-0">
        {/* ==================================================
            LEFT SIDE: PROMOTIONAL VISUAL COMPOSITION
        ================================================== */}
        <div className="flex flex-col justify-between lg:min-h-screen lg:w-[54%] lg:pt-[35px] lg:pb-10 lg:pl-[120px] lg:pr-8">
          <div>
            {/* 4. BYTE SPACE LOGO */}
            <div>
              <ByteSpaceBrandMark onClick={() => handleNavigate("/")} />
            </div>

            {/* 5. LEFT INTRODUCTION */}
            <div className="mt-8 lg:mt-10">
              <h1 className="text-left text-[23px] leading-snug font-bold text-[#FFFFFF]">
                Sign up and come in
              </h1>
              <p className="mt-2.5 max-w-[470px] text-left text-[16px] leading-[1.6] font-normal text-[#FFFFFF]/95">
                The registration process is straightforward, uncomplicated, and
                efficient, allowing users to sign up quickly, easily, and at no
                cost.
              </p>
            </div>
          </div>

          {/* 6 & 7. LEFT COURSE CARD COMPOSITION + DECORATIVE ELEMENTS */}
          <div className="my-auto pt-4 lg:pt-2">
            <CourseCardCollage />
          </div>
        </div>

        {/* ==================================================
            8. RIGHT SIDE: LARGE WHITE REGISTRATION CARD
            Occupies ~40% viewport width & ~82-85% viewport height on desktop
        ================================================== */}
        <div className="mt-8 flex w-full items-center justify-center lg:mt-0 lg:w-[46%] lg:justify-end lg:pr-[60px] xl:pr-[80px]">
          <section
            aria-label="Create an Account"
            className="flex w-full flex-col justify-between rounded-[28px] bg-[#FFFFFF] px-7 py-10 text-[#252525] shadow-sm sm:px-12 sm:py-12 lg:min-h-[84vh] lg:w-[40vw] lg:min-w-[440px] lg:max-w-[540px] lg:px-14 lg:py-14"
          >
            <div>
              {/* 9. FORM HEADER */}
              <div>
                <p className="text-[17px] font-medium text-[#0B3FE3]">
                  Create an account
                </p>
                <h2 className="mt-2 text-[42px] leading-[1.08] font-bold tracking-tight text-[#252525] sm:text-[46px]">
                  Welcome to
                  <br />
                  ByteSpace
                </h2>
              </div>

              {/* 10. FORM (EXACTLY THREE FIELDS) */}
              <form onSubmit={handleSubmit} className="mt-9 space-y-5">
                {/* FIELD 1: Full name */}
                <div>
                  <label
                    htmlFor="signup-fullname"
                    className="mb-2 block text-[14px] font-medium text-[#252525]"
                  >
                    Full name
                  </label>
                  <input
                    id="signup-fullname"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jamie Davis"
                    className="h-[52px] w-full rounded-[12px] border border-[#E5E5E5] bg-[#FFFFFF] px-4 text-[15px] text-[#252525] placeholder-[#252525]/35 transition-colors focus:border-[#0B3FE3] focus:outline-none"
                  />
                </div>

                {/* FIELD 2: Email */}
                <div>
                  <label
                    htmlFor="signup-email"
                    className="mb-2 block text-[14px] font-medium text-[#252525]"
                  >
                    Email
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="designer@example.com"
                    className="h-[52px] w-full rounded-[12px] border border-[#E5E5E5] bg-[#FFFFFF] px-4 text-[15px] text-[#252525] placeholder-[#252525]/35 transition-colors focus:border-[#0B3FE3] focus:outline-none"
                  />
                </div>

                {/* FIELD 3: Password */}
                <div>
                  <label
                    htmlFor="signup-password"
                    className="mb-2 block text-[14px] font-medium text-[#252525]"
                  >
                    Password
                  </label>
                  <input
                    id="signup-password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                    className="h-[52px] w-full rounded-[12px] border border-[#E5E5E5] bg-[#FFFFFF] px-4 text-[15px] text-[#252525] placeholder-[#252525]/35 transition-colors focus:border-[#0B3FE3] focus:outline-none"
                  />
                </div>

                {/* 11. CONTINUE BUTTON (Right aligned, 122px x 46px, Neon Lime #C8FF00, no icon/arrow) */}
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="h-[46px] w-[122px] rounded-[10px] bg-[#C8FF00] text-[15px] font-bold text-[#252525] transition-opacity hover:opacity-90 focus-visible:outline-none"
                  >
                    {submitted ? "Welcome" : "Continue"}
                  </button>
                </div>
              </form>
            </div>

            {/* 12. LOGIN TEXT NEAR BOTTOM OF CARD */}
            <div className="pt-8 text-center">
              <p className="text-[14px] text-[#252525]/60">
                Already have an account?{" "}
                <a
                  href="/login"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate("/login");
                  }}
                  className="font-semibold text-[#0B3FE3] hover:underline"
                >
                  Login
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
