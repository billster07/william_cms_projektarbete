"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./navigation";

export default function ClientNavigation() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <div className="bg-white text-black p-4 text-center">
      <Navigation />
    </div>
  );
}
