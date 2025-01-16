import { draftMode } from "next/headers";
import { getAllProjects } from "../../../lib/api";
import ProjectsContent from "../components/ProjectsContent";

export default async function Projects() {
  const { isEnabled } = await draftMode();
  const projects = await getAllProjects(5, isEnabled);

  const categories = Array.from(
    new Set(projects?.map((project) => project.category))
  );

  return (
    <main>
      <ProjectsContent projects={projects} categories={categories} />
    </main>
  );
}
