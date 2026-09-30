"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ByteSpaceBrandLogoProps {
  light?: boolean;
  onClick?: () => void;
}

export default function ByteSpaceBrandLogo({
  light = false,
  onClick,
}: ByteSpaceBrandLogoProps) {
  return (
    <a
      href="/"
      onClick={(event) => {
        if (onClick) {
          event.preventDefault();
          onClick();
        }
      }}
      className="inline-flex items-center gap-2 focus-visible:outline-none"
    >
      <svg
        width="30"
        height="26"
        viewBox="0 0 30 26"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect x="1" y="1" width="6.5" height="22" rx="3.25" fill="#C6FF00" />
        <circle cx="17.5" cy="14.5" r="9.5" fill="#C6FF00" />
        <path
          d="M15.2 10.8L21.2 14.5L15.2 18.2V10.8Z"
          fill={light ? "#0A36E8" : "#0B1021"}
        />
      </svg>
      <span
        className={cn(
          "text-[20px] font-extrabold tracking-tight",
          light ? "text-[#FFFFFF]" : "text-[#0B1021]"
        )}
      >
        ByteSpace
      </span>
    </a>
  );
}
