import { draftMode } from "next/headers";
import { getAllProjects } from "../../../lib/api";
import Image from "next/image";
import Link from "next/link";

export default async function Projects() {
  const { isEnabled } = await draftMode();
  const projects = await getAllProjects(5, isEnabled);

  return (
    <main>
      <section className="w-full p-5 flex flex-col gap-24  lg:gap-0 md:p-12">
        {projects?.map((project) => (
          <article
            key={project.sys.id}
            className="flex flex-col md:flex-row lg:p-10"
          >
            {/* fix alt text for better readability */}
            <Image
              alt="placeholder"
              src={project.thumbnail.url}
              className="aspect-[4/3] object-cover w-full md:w-1/2"
              height="263"
              width="350"
            />
            <div className="flex gap-6 flex-col mt-20 md:p-16:mt-10 md:ml-20 lg:ml-32">
              <h2 className="text-3xl font-serif font-semibold text-black md:text-4xl">
                {project.title}
              </h2>
              <p className="text-black">{project.summary}</p>
              <Link
                href={`/projects/${project.slug}`}
                className="w-30 bg-white text-center text-black border-2 border-black py-4 rounded-full hover:bg-black hover:text-white transition"
              >
                Till projektet
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
