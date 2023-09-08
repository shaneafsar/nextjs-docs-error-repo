import Heading from "@components/Heading";
import MissingPageFeedback from "@components/MissingPageFeedback";
import clsx from "clsx";
import { sora } from "./fonts";

export default function NotFound() {
  return (
    <div className="items-between mb-6 ml-7 flex h-full max-w-2xl flex-col">
      <Heading
        tag="h1"
        className="mb-1 text-5xl font-bold tracking-tight"
        id="page-not-found"
      >
        Page Not Found
      </Heading>
      <p className={clsx("mt-3 text-xl leading-relaxed", sora.className)}>
        This page doesn&apos;t exist
      </p>
      <MissingPageFeedback />
    </div>
  );
}
