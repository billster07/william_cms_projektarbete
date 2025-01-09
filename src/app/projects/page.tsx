import { draftMode } from "next/headers";
import { getAllProjects } from "../../../lib/api";
import Image from "next/image";
import Link from "next/link";

export default async function Projects() {
  const { isEnabled } = await draftMode();
  const projects = await getAllProjects(5, isEnabled);

  return (
    <main>
      <section className="w-full p-5 flex flex-col gap-24 md:p-12">
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
            <div className="flex gap-6 flex-col mt-20 md:p-16 md:ml-auto">
              <h2 className="text-3xl font-serif font-semibold text-black md:text-4xl">
                {project.title}
              </h2>
              <p className="text-black">{project.summary}</p>
              <Link
                href={`/projects/${project.slug}`}
                className="w-2/5 bg-white text-center text-black border-2 border-black py-4 rounded-full hover:bg-black hover:text-white transition"
              >
                Till projektet
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
    // <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
    //   <section className="w-full pt-12">
    //     <div className="mx-auto container space-y-12 px-4 md:px-6">
    //       <div className="space-y-12">
    //         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
    //           {projects?.map((project) => (
    //             <article
    //               key={project.sys.id}
    //               className="h-full flex flex-col rounded-lg shadow-lg overflow-hidden"
    //             >
    //               <Image
    //                 alt="placeholder"
    //                 className="aspect-[4/3] object-cover w-full"
    //                 height="263"
    //                 src={project.thumbnail.url}
    //                 width="350"
    //               />
    //               <div className="flex-1 p-6">
    //                 <Link href={`/projects/${project.slug}`}>
    //                   <h3 className="text-2xl font-bold leading-tight text-zinc-900 dark:text-zinc-50  py-4">
    //                     {project.title}
    //                   </h3>
    //                 </Link>
    //                 <div className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-sm font-semibold text-zinc-800">
    //                   {project.category.title}
    //                 </div>
    //                 <p className="max-w-none text-zinc-500 mt-4 mb-2 text-sm dark:text-zinc-400">
    //                   {project.summary}
    //                 </p>
    //                 {/* <p className="max-w-none text-zinc-600 mt-2 mb-2 text-sm font-bold dark:text-zinc-400">
    //                   Written by: {project.authorName}
    //                 </p> */}
    //                 <div className="flex justify-end">
    //                   <Link
    //                     className="inline-flex h-10 items-center justify-center text-sm font-medium"
    //                     href={`/projects/${project.slug}`}
    //                   >
    //                     Read More →
    //                   </Link>
    //                 </div>
    //               </div>
    //             </article>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </main>
  );
}
