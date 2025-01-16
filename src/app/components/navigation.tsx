"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navigation = () => {
  const pathname = usePathname();
  return (
    <nav>
      <Link
        href="/"
        className={
          pathname === "/"
            ? "text-lg font-bold font-serif mr-4 underline"
            : "text-lg font-bold font-serif mr-4"
        }
      >
        Home
      </Link>
      <Link
        href="/projects"
        className={
          pathname.startsWith("/projects")
            ? "text-lg font-bold font-serif mr-4 underline"
            : "text-lg font-bold font-serif mr-4"
        }
      >
        Projects
      </Link>
      <Link
        href="/about"
        className={
          pathname === "/about"
            ? "text-lg font-bold font-serif mr-4 underline"
            : "text-lg font-bold font-serif mr-4"
        }
      >
        About
      </Link>
      <Link
        href="/contact"
        className={
          pathname === "/contact"
            ? "text-lg font-bold font-serif mr-4 underline"
            : "text-lg font-bold font-serif mr-4"
        }
      >
        Contact
      </Link>
    </nav>
  );
};
