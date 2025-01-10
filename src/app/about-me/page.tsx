import { getAboutPage } from "../../../lib/api";

export default async function AboutMe() {
  const content = await getAboutPage();
  console.log(content);
  return <div>{content?.presentationText}</div>;
}
