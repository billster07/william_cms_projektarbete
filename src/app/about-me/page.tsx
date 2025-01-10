import { getAboutPage } from "../../../lib/api";

export default async function AboutMe() {
  const content = await getAboutPage();
  console.log("content", content?.educationsCollection.items);
  return (
    <main>
      <article>
        <h1>Om mig</h1>
        <section>
          <p>{content?.presentationText}</p>
        </section>
        <section>
          <h2>Utbilndningar</h2>
          {content?.educationsCollection.items.map((education) => (
            <section key={education.slug}>
              <h3>{education.titel}</h3>
              <div>
                <p>
                  {education.institution} {education.startDate} -
                  {education.endDate ? education.endDate : ""}
                </p>
                <p>{education.description}</p>
              </div>
            </section>
          ))}
          <h2>Arbetslivserfarenhet</h2>
          {content?.workExperiencesCollection.items.map((experience) => (
            <section key={experience.slug}>
              <h3>{experience.titel}</h3>
              <div>
                <p>
                  {experience.company} {experience.startDate} -
                  {experience.endDate ? experience.endDate : ""}
                </p>
                <p>{experience.description}</p>
              </div>
            </section>
          ))}
        </section>
      </article>
    </main>
  );
}
