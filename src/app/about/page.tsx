import { getAboutPage } from "../../../lib/api";
import Image from "next/image";

export default async function AboutMe() {
  const content = await getAboutPage();

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
    }).format(date);
  }

  function sortByStartDateDescending<T extends { startDate: string }>(
    items: T[] = []
  ): T[] {
    return items
      .slice()
      .sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      );
  }

  return (
    <main>
      <article className="p-12 flex min-h-screen flex-col items-center bg-white">
        <h1 className="font-serif font-semibold text-3xl">About</h1>
        <div className="md:flex md:gap-10">
          <section className="md:w-1/2">
            <p>{content?.presentationText}</p>
            <Image
              alt="Profile picture"
              src="/profile.jpeg"
              className="object-cover w-full"
              height="263"
              width="350"
            />
          </section>
          <section className="md:w-1/2">
            <h2 className="font-serif font-semibold text-2xl">Education</h2>
            <div className="flex flex-col gap-2">
              {sortByStartDateDescending(
                content?.educationsCollection.items
              ).map((education) => (
                <section key={education.slug}>
                  <h3 className="font-serif font-medium text-xl">
                    {education.titel}
                  </h3>
                  <div>
                    <p>
                      {education.institution} {formatDate(education.startDate)}{" "}
                      - {education.endDate ? formatDate(education.endDate) : ""}
                    </p>
                    <p>{education.description}</p>
                  </div>
                </section>
              ))}
            </div>
            <h2 className="font-serif font-semibold text-2xl">
              Work Experience
            </h2>
            <div className="flex flex-col gap-2">
              {sortByStartDateDescending(
                content?.workExperiencesCollection.items
              ).map((experience) => (
                <section key={experience.slug}>
                  <h3 className="font-serif font-medium text-xl">
                    {experience.title}
                  </h3>
                  <div>
                    <p>
                      {experience.company} {formatDate(experience.startDate)} -{" "}
                      {experience.endDate ? formatDate(experience.endDate) : ""}
                    </p>
                    <p>{experience.description}</p>
                  </div>
                </section>
              ))}
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
