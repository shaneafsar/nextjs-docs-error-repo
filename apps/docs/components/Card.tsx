import { sora } from "app/fonts";
import clsx from "clsx";
import { HTMLAttributes, PropsWithChildren } from "react";

type CardClassName =
  | {
      /**
       * className to override the default styles of the Card.
       * If set, the value will override all classnames of the component
       */
      overrideClassName: string;
      className?: undefined;
    }
  | { overrideClassName?: undefined; className: string }
  | { overrideClassName?: undefined; className?: undefined };

type CardProps = HTMLAttributes<HTMLDivElement> & CardClassName;

export default function Card({
  className,
  overrideClassName,
  ...props
}: PropsWithChildren<CardProps>) {
  return (
    <div
      className={
        overrideClassName ||
        clsx(
          "rounded-md border-[1px] border-solid border-gray-200 bg-white p-8 transition-all hover:border-xenon-600 dark:bg-xenon-900 dark:hover:border-xenon-400",
          sora.className,
          className
        )
      }
      {...props}
    />
  );
}
