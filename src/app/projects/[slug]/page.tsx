import { getProject, getAllProjects } from "../../../../lib/api";
import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import { draftMode } from "next/headers";
import ImageCarousel from "@/app/components/ImageCarousel";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const allProjects = await getAllProjects();

  return (
    allProjects?.map((project) => ({
      slug: project.slug,
    })) ?? []
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  const { isEnabled } = await draftMode();
  const project = await getProject(slug, isEnabled);

  if (!project) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <section className="w-full">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="space-y-8 lg:space-y-10">
            <ImageCarousel project={project} />
            <div className="space-y-4 md:space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <h1 className="text-3xl font-serif font-semibold tracking-tighter sm:text-5xl">
                    {project.title}
                  </h1>
                  <a
                    href={project.projectUrl}
                    className="w-32 bg-white text-center text-black border-2 border-black py-4 rounded-full hover:bg-black hover:text-white transition"
                  >
                    Visit Project
                  </a>
                </div>
                <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
                  {project.summary}
                </p>
              </div>
              <div className="space-y-2">
                <div className="max-w-[900px] text-black md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
                  {documentToReactComponents(
                    project.description.json as unknown as Document
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
