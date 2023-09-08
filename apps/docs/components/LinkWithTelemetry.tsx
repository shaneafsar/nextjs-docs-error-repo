"use client";
import Link from "next/link";
import { telemetry } from "@utils/telemetry";

export function LinkWithTelemetry(props) {
  return (
    <Link
      {...props}
      onClick={() => {
        // empty for error repro case
      }}
    />
  );
}
