import { allDocs } from "contentlayer/generated";
import Link from "next/link";

interface FilteredContentProps {
  pathMatch: string;
}

export default function FilteredContent({ pathMatch }: FilteredContentProps) {
  return (
    <div className="flex flex-col gap-4">
      {allDocs
        .filter((doc) => doc.slug?.includes(pathMatch))
        .map((doc) => {
          return (
            <Link key={doc._id} href={doc.slug}>
              <span className="text-xenon-600 underline-offset-4 transition-colors duration-200 ease-in-out hover:text-xenon-300 hover:underline dark:text-xenon-300 dark:hover:text-xenon-200">
                {doc.title}
              </span>{" "}
              - {doc.description}
            </Link>
          );
        })}
    </div>
  );
}
