import { sora } from "app/fonts";
import clsx from "clsx";

import Card from "@components/Card";
import "./index.css";

const CARD_CLASSNAME = {
  blue: "product-card-blue",
  red: "product-card-red",
  glow: "product-card-glow",
};

interface ProductCardProps {
  type?: "blue" | "red" | "glow";
  title?: string;
  description?: string;
  bottom?: string;
}

function ProductCard({
  type = "blue",
  title,
  description,
  bottom,
}: ProductCardProps) {
  const cardProps =
    type === "glow"
      ? {
          overrideClassName: clsx(
            CARD_CLASSNAME[type],
            "group grid h-full gap-4 rounded-md border-[1px] border-solid border-gray-200 bg-white p-8 transition-all dark:bg-xenon-800"
          ),
        }
      : {
          className: clsx(CARD_CLASSNAME[type], "group grid h-full gap-4"),
        };

  return (
    <Card {...cardProps}>
      <div className="pointer-events-none flex items-center">
        <h3
          className={clsx(
            sora.className,
            "m-0 text-lg font-medium leading-4 text-xenon-900 dark:text-white"
          )}
        >
          {title}
        </h3>
      </div>
      <p
        className={clsx(
          sora.className,
          "pointer-events-none my-0 text-sm font-normal leading-5 text-gray-600 dark:text-gray-300"
        )}
      >
        {description}
      </p>
      <span
        className={clsx(
          "underline-none css-tap3o6 pointer-events-none m-0 inline-flex items-center p-0 transition-transform duration-300 group-hover:translate-x-3",
          {
            "text-xenon-600 dark:text-xenon-400":
              type === "blue" || type === "glow",
          },
          { "text-color-recommend": type === "red" },
          { "product-card-glow-text-container ": type === "glow" }
        )}
      >
        <span
          className={clsx(
            sora.className,
            "shrink text-2xs font-semibold uppercase tracking-wide",
            { "product-card-glow-text-fill ": type === "glow" }
          )}
        >
          {bottom}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="8"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          name="triangle-right"
          className="relative ml-2 flex-shrink-0"
        >
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      </span>
    </Card>
  );
}

export default ProductCard;
