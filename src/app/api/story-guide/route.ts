import { createFallbackGuidance, getStoryGuideStatus } from "@/lib/story-guide-route";

export async function GET() {
  return Response.json(getStoryGuideStatus(process.env));
}

export async function POST(request: Request) {
  try {
    return Response.json(createFallbackGuidance(await request.json()));
  } catch {
    return Response.json({ error: "Request body must be valid JSON.", mode: "deterministic-fallback" }, { status: 400 });
  }
}
