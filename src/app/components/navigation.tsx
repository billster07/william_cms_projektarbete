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
          pathname === "/" ? "font-bold mr-4 underline" : "font-bold mr-4"
        }
      >
        Home
      </Link>
      <Link
        href="/projects"
        className={
          pathname.startsWith("/projects")
            ? "font-bold mr-4 underline"
            : "font-bold mr-4"
        }
      >
        Projects
      </Link>
      <Link
        href="/about"
        className={
          pathname === "/about"
            ? "font-bold font-serif mr-4 underline"
            : "font-bold font-serif mr-4"
        }
      >
        About
      </Link>
      <Link
        href="/contact"
        className={
          pathname === "/contact"
            ? "font-bold mr-4 underline"
            : "font-bold mr-4"
        }
      >
        Contact
      </Link>
      {/* <Link
        href="/products/1"
        className={
          pathname.startsWith("/products/1")
            ? "font-bold mr-4"
            : "mr-4 text-blue-500"
        }
      >
        Product 1
      </Link> */}
    </nav>
  );
};
