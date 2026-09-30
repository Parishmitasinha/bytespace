"use client";

import React, { useState, useEffect } from "react";
import ByteSpaceHomepage from "@/components/ui/bytespace-homepage";
import ByteSpaceSignup from "@/components/ui/bytespace-signup";
import ByteSpaceLogin from "@/components/ui/bytespace-login";
import ByteSpaceCourses from "@/components/ui/bytespace-courses";
import ByteSpaceCourseLessons from "@/components/ui/bytespace-course-lessons";
import ByteSpaceCourseDetail from "@/components/ui/bytespace-course-detail";
import ByteSpaceCreatorProfile from "@/components/ui/bytespace-creator-profile";
import ByteSpaceNotFound from "@/components/ui/bytespace-not-found";

export type RoutePath =
  | "/"
  | "/courses"
  | "/creators"
  | "/course/build-digital-asset"
  | "/course/lessons"
  | "/course/reviews"
  | "/signup"
  | "/login"
  | "/404";

function normalizePath(pathname: string): RoutePath {
  if (pathname === "/" || pathname === "" || pathname === "/index.html") {
    return "/";
  }
  if (pathname === "/creators" || pathname === "/creator/purepearl-studio") {
    return "/creators";
  }
  if (pathname === "/course/build-digital-asset") {
    return "/course/build-digital-asset";
  }
  if (pathname === "/course/lessons") {
    return "/course/lessons";
  }
  if (pathname === "/course/reviews") {
    return "/course/reviews";
  }
  if (pathname === "/courses") return "/courses";
  if (pathname === "/signup") return "/signup";
  if (pathname === "/login") return "/login";
  return "/404";
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<RoutePath>(() =>
    typeof window !== "undefined"
      ? normalizePath(window.location.pathname)
      : "/"
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path: string) => {
    const targetRoute = normalizePath(path);
    if (typeof window !== "undefined" && window.location.pathname !== path) {
      window.history.pushState({}, "", path);
    }
    setCurrentPath(targetRoute);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  };

  if (currentPath === "/creators") {
    return <ByteSpaceCreatorProfile onNavigate={navigate} />;
  }

  if (
    currentPath === "/course/build-digital-asset" ||
    currentPath === "/course/lessons"
  ) {
    return <ByteSpaceCourseLessons initialTab="Lesson" onNavigate={navigate} />;
  }

  if (currentPath === "/course/reviews") {
    return <ByteSpaceCourseDetail onNavigate={navigate} />;
  }

  if (currentPath === "/courses") {
    return <ByteSpaceCourses onNavigate={navigate} />;
  }

  if (currentPath === "/signup") {
    return <ByteSpaceSignup onNavigate={navigate} />;
  }

  if (currentPath === "/login") {
    return <ByteSpaceLogin onNavigate={navigate} />;
  }

  if (currentPath === "/404") {
    return <ByteSpaceNotFound onNavigate={navigate} />;
  }

  return <ByteSpaceHomepage onNavigate={navigate} />;
}
