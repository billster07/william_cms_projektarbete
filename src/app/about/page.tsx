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
      <article className="flex min-h-screen flex-col items-center bg-white">
        <div className="pt-10 flex flex-col gap-10 md:flex-row">
          <section className="flex flex-col gap-6 md:w-1/2">
            <Image
              alt="Profile picture"
              src="/profile-picture.jpeg"
              className="object-cover w-full shadow-xl"
              height="263"
              width="350"
            />
          </section>
          <section className="md:w-1/2 flex flex-col gap-6">
            <h1 className="font-serif font-semibold text-3xl">This is me</h1>
            <article className="w-2/3">
              <p>{content?.presentationText}</p>
            </article>
            <article>
              <h2 className="font-serif font-semibold text-3xl">Education</h2>
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
                        {education.institution}{" "}
                        {formatDate(education.startDate)} -{" "}
                        {education.endDate ? formatDate(education.endDate) : ""}
                      </p>
                      <p>{education.description}</p>
                    </div>
                  </section>
                ))}
              </div>
            </article>
            <article>
              <h2 className="font-serif font-semibold text-3xl">
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
                        {experience.company} {formatDate(experience.startDate)}{" "}
                        -{" "}
                        {experience.endDate
                          ? formatDate(experience.endDate)
                          : ""}
                      </p>
                      <p>{experience.description}</p>
                    </div>
                  </section>
                ))}
              </div>
            </article>
          </section>
        </div>
      </article>
    </main>
  );
}
