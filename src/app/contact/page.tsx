import { draftMode } from "next/headers";
import { getContact } from "../../../lib/api";
import Image from "next/image";
export default async function Contact() {
  const { isEnabled } = await draftMode();
  const contactPage = await getContact(1, isEnabled);
  return (
    <main>
      <article className="flex flex-col gap-4 sm:flex-row sm:gap-0 items-center bg-white">
        {contactPage?.image.url && (
          <Image
            alt="contact image"
            src={contactPage?.image.url}
            width={650}
            height={365}
            className="w-full sm:w-1/2"
          />
        )}
        <div className="sm:pl-10 sm:w-1/2">
          <h1 className="font-serif font-semibold text-3xl">
            {contactPage?.title}
          </h1>
          <p>{contactPage?.description}</p>
          <p>E-mail: {contactPage?.eMail}</p>
          <div className="flex gap-2 mt-2">
            <a
              className="border-2 rounded-full border-black text-sm px-4 py-2"
              href={contactPage?.linkedin}
            >
              LinkedIn
            </a>
            <a
              className="border-2 rounded-full border-black text-sm px-4 py-2"
              href={contactPage?.github}
            >
              GitHub
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
