"use client";
import type { SVGProps } from "react";
import Link from "next/link";

import { telemetry } from "@utils/telemetry";

const LogoMonogram = (props: SVGProps<SVGSVGElement>) => {
  const fillClass = "fill-[#1E59FF] dark:fill-white";

  return (
    <Link
      href="/"
      onClick={() => {
        telemetry.track({
          name: "Left Nav Click",
          properties: {
            componentType: "left_sidebar",
            interactionType: "logo_click",
          },
        });
      }}
    >
      <svg
        viewBox="0 0 500 500.34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        data-testid="logo-monogram"
        {...props}
      >
        <defs></defs>
        <path
          className={fillClass}
          d="M250,0C113.38,0,2,110.16,.03,246.32c-2,138.29,110.19,252.87,248.49,253.67,42.71,.25,83.85-10.2,120.38-30.05,3.56-1.93,4.11-6.83,1.08-9.52l-23.39-20.74c-4.75-4.22-11.52-5.41-17.37-2.92-25.5,10.85-53.21,16.39-81.76,16.04-111.75-1.37-202.04-94.35-200.26-206.1,1.76-110.33,92.06-199.55,202.8-199.55h202.83V407.68l-115.08-102.25c-3.72-3.31-9.43-2.66-12.43,1.31-18.47,24.46-48.56,39.67-81.98,37.36-46.36-3.2-83.92-40.52-87.4-86.86-4.15-55.28,39.65-101.58,94.07-101.58,49.21,0,89.74,37.88,93.97,86.01,.38,4.28,2.31,8.28,5.53,11.13l29.97,26.57c3.4,3.01,8.8,1.17,9.63-3.3,2.16-11.55,2.92-23.6,2.07-35.95-4.83-70.39-61.84-127.01-132.26-131.35-80.73-4.98-148.23,58.18-150.37,137.35-2.09,77.15,61.12,143.66,138.28,145.36,32.21,.71,62.07-9.42,86.2-26.97l150.36,133.29c6.45,5.71,16.62,1.14,16.62-7.48V9.49C500,4.25,495.75,0,490.51,0H250Z"
        />
      </svg>
    </Link>
  );
};

export default LogoMonogram;
