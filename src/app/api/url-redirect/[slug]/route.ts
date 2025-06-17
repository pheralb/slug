import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { urlFromServer } from "@/server/middleware/redirect";

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const result = await urlFromServer(params.slug);

  if (result.error) {
    return NextResponse.json(result, { status: 500 });
  }

  return NextResponse.json(result);
}
