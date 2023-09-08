import clsx from "clsx";
import type { HTMLAttributes } from "react";

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  cols: number;
  spacing: number;
}

const Grid = ({ cols, spacing, children, className, ...props }: GridProps) => {
  return (
    <div
      className={clsx(`grid grid-cols-${cols} gap-${spacing}`, className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Grid;
