import { allDocs, allApis } from "contentlayer/generated";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const titles = [...allDocs, ...allApis].map((doc) => doc.title);
  return NextResponse.json({ titles });
}
