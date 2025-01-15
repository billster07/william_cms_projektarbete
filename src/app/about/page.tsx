import { getAboutPage } from "../../../lib/api";

export default async function AboutMe() {
  const content = await getAboutPage();
  // const sortedContent = content?.educationsCollection.items
  //   .sort((a, b) => {
  //     const dateA = new Date(a.startDate).getTime();
  //     const dateB = new Date(b.startDate).getTime();
  //     return dateB - dateA;
  //   })

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  }

  console.log(content);
  return (
    <main>
      <article className="p-12 flex min-h-screen flex-col items-center bg-white">
        <h1 className="font-serif font-semibold text-3xl">About</h1>
        <div className="flex gap-10">
          <section className="w-1/2">
            <p>{content?.presentationText}</p>
          </section>
          <section className="w-1/2">
            <h2 className="font-serif font-semibold text-2xl">Utbilndningar</h2>
            {content?.educationsCollection.items.map((education) => (
              <section key={education.slug}>
                <h3 className="font-serif font-medium text-xl">
                  {education.titel}
                </h3>
                <div>
                  <p>
                    {education.institution} {formatDate(education.startDate)} -
                    {education.endDate ? formatDate(education.endDate) : ""}
                  </p>
                  <p>{education.description}</p>
                </div>
              </section>
            ))}
            <h2 className="font-serif font-semibold text-2xl">
              Arbetslivserfarenhet
            </h2>
            {content?.workExperiencesCollection.items
              .sort((a, b) => {
                const dateA = new Date(a.startDate).getTime();
                const dateB = new Date(b.startDate).getTime();
                return dateB - dateA;
              })
              .map((experience) => (
                <section key={experience.slug}>
                  <h3 className="font-serif font-medium text-xl">
                    {experience.title}
                  </h3>
                  <div>
                    <p>
                      {experience.company} {formatDate(experience.startDate)} -
                      {experience.endDate ? formatDate(experience.endDate) : ""}
                    </p>
                    <p>{experience.description}</p>
                  </div>
                </section>
              ))}
          </section>
        </div>
      </article>
    </main>
  );
}
