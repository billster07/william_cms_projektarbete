import Link from "next/link";
import AnimatedText from "./components/AnimatedText";

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-between bg-white">
      <section className="w-full pt-12">
        <div className="flex flex-col justify-center space-y-4">
          <div>
            <AnimatedText text="This is my portfolio" className="text-5xl" />
            <AnimatedText
              text="William Hermanrud"
              className="text-2xl pl-2 mt-2 sm:mt-0"
            />
          </div>
          <Link href="/projects" className="w-16 pl-2 hover:pl-4">
            <AnimatedText text="Projects" />
          </Link>
          <Link href="/about" className="w-16 pl-2 hover:pl-4">
            <AnimatedText text="About" />
          </Link>
          <Link href="/contact" className="w-16 pl-2 hover:pl-4">
            <AnimatedText text="Contact" />
          </Link>
        </div>
      </section>
    </main>
  );
}
