import { Row, Col } from "@components/ApiRoute";
import type { ReactNode, PropsWithChildren } from "react";

interface PropertyProps extends PropsWithChildren {
  title: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}

interface DescriptionProps extends PropsWithChildren {}
interface CodeProps extends PropsWithChildren {}

export const Description = ({ children }: DescriptionProps) => {
  return <Col>{children}</Col>;
};

export const Code = ({ children }: CodeProps) => {
  return <Col>{children}</Col>;
};

const Property = ({
  title,
  type,
  required = false,
  defaultValue,
  children,
}: PropertyProps) => {
  return (
    <article>
      <div className="mb-2 flex items-center gap-x-1">
        <h4 className="scroll-mt-32 text-sm" id={title}>
          <a
            className="text-gray-800 hover:text-blue-500 dark:text-slate-100"
            href={`#${title}`}
          >
            <pre className="rounded-md border border-slate-300 bg-slate-50 px-2 dark:border-gray-700 dark:bg-gray-900">
              {title}
            </pre>
          </a>
        </h4>
        {type && (
          <span className="mx-1 rounded border border-slate-200 px-1 font-mono text-xs text-zinc-400">
            {type}
          </span>
        )}
        {defaultValue && (
          <span className="mx-1 rounded border border-slate-200 px-1 font-mono text-xs text-zinc-400">
            {defaultValue}
          </span>
        )}
        <span className="mx-1 rounded border border-slate-200 px-1 font-mono text-xs text-zinc-400">
          {required ? "Required" : "Optional"}
        </span>
      </div>

      <Row>{children}</Row>
      <hr className="my-8 border-gray-100 dark:border-gray-500/10" />
    </article>
  );
};

export default Property;
