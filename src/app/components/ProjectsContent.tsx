"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "../../../lib/api";

type Props = {
  projects?: Project[];
  categories?: string[];
};

export default function ProjectsContent({ projects, categories }: Props) {
  const [categoryValue, setCategoryValue] = useState<string | undefined>();

  const filteredProjects = categoryValue
    ? projects?.filter((project) => project.category === categoryValue)
    : projects;

  const handleButtonClick = (category: string | undefined) => {
    setCategoryValue(category === categoryValue ? undefined : category);
  };

  return (
    <main>
      <section className="w-full p-5 flex flex-col gap-24 lg:gap-0 md:p-12">
        <div className="flex gap-2">
          <button
            className={`border px-4 py-2 ${
              !categoryValue ? "bg-black text-white" : "bg-white"
            }`}
            onClick={() => handleButtonClick(undefined)}
          >
            Show All
          </button>
          {categories?.map((category) => (
            <button
              key={category}
              className={`border px-4 py-2 ${
                categoryValue === category ? "bg-black text-white" : "bg-white"
              }`}
              onClick={() => handleButtonClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
        {filteredProjects?.map((project) => (
          <article
            key={project.sys.id}
            className="flex flex-col md:flex-row lg:p-10"
          >
            <Image
              alt={project.title}
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
