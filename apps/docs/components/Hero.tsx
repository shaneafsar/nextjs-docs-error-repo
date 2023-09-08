import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { paramCase } from "param-case";
import type { PropsWithChildren } from "react";
import Heading from "./Heading";

type Props = {
  title: string;
  image?: string;
  alt?: string;
  ctas: { title: string; url: string }[];
};

const Hero = ({
  image,
  title,
  ctas = [],
  children,
  alt,
}: PropsWithChildren<Props>) => (
  <div className="not-prose mb-16 flex flex-col-reverse items-center justify-between gap-7 md:flex-row">
    <div className="flex-1 dark:text-gray-50">
      <Heading
        tag="h1"
        className="mb-4 text-5xl font-bold tracking-tight"
        id={paramCase(title)}
      >
        {title}
      </Heading>
      {children}
      {ctas.length > 0 && (
        <div className="mt-8 flex items-center gap-5">
          {ctas.map((cta, index) => (
            <Link
              key={index}
              href={cta.url}
              className={clsx(
                "rounded-md px-8 py-3 no-underline transition-colors",
                index === 0 &&
                  "bg-xenon-600 text-white hover:bg-xenon-700 hover:text-white dark:bg-white dark:text-[#151723]",
                index > 0 &&
                  "border border-xenon-600 bg-transparent text-xenon-600 hover:border-xenon-700 hover:bg-transparent hover:text-xenon-700 dark:border-white dark:bg-transparent dark:text-white"
              )}
            >
              {cta.title}
            </Link>
          ))}
        </div>
      )}
    </div>

    {image && (
      <figure className="w-2/3 flex-1">
        <Image
          src={image}
          width="1000"
          height="1000"
          alt={alt ?? ""}
          loading="eager"
          fetchPriority="high"
        />
      </figure>
    )}
  </div>
);

export default Hero;
