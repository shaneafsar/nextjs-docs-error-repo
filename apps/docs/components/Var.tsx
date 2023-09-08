"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {
  type: "link" | "language";

  /* To be used only with variables of type link, this takes a string in the form of
  `/guides/autocomplete/$lang/getting-started` the `$lang` is replaced by the current language */
  link?: {
    /* Sets the text to display in the link */
    text: string;
    url: string;
  };
};

function Var({ type, link }: Props) {
  const lang = useSearchParams().get("language");
  const langPathName = usePathname().split("/").at(-1);

  if (!type) {
    return null;
  }

  if (type === "language") {
    return <span>{lang || langPathName}</span>;
  }

  if (type === "link" && link) {
    // replace the $lang in the link with the language
    link.url = link.url.replace("$lang", lang || "js");

    return (
      <Link
        className="text-xenon-600 underline-offset-4 transition-colors duration-200 ease-in-out hover:text-xenon-300 hover:underline dark:text-xenon-300 dark:hover:text-xenon-200 "
        href={link.url}
      >
        {link.text}
      </Link>
    );
  }

  return null;
}

export default Var;
