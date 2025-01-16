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
    <div>
      <section className="w-full flex flex-col gap-16">
        <div className="flex gap-2">
          <button
            className={`border-2 rounded-full border-black text-sm px-4 py-2 ${
              !categoryValue ? "bg-black text-white" : "bg-white"
            }`}
            onClick={() => handleButtonClick(undefined)}
          >
            Show All
          </button>
          {categories?.map((category) => (
            <button
              key={category}
              className={`border-2 rounded-full border-black text-sm px-4 py-2 ${
                categoryValue === category ? "bg-black text-white" : "bg-white"
              }`}
              onClick={() => handleButtonClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
        {filteredProjects?.map((project) => (
          <article key={project.sys.id} className="flex flex-col md:flex-row">
            <Image
              alt={project.title}
              src={project.thumbnail.url}
              className="object-cover w-full md:w-1/2"
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
                className="w-32 bg-white text-center text-black border-2 border-black py-4 rounded-full hover:bg-black hover:text-white transition"
              >
                View Project
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
