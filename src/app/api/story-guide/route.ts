export async function GET() {
  return Response.json({
    service: "StoryBridge Legacy Story Guide",
    status: "scaffold-ready",
    mode: "deterministic-fallback",
    note: "The full server-side OpenAI integration is not implemented in this scaffold stage.",
  });
}

export async function POST() {
  return Response.json(
    {
      error: "Story guidance is not implemented in the scaffold stage.",
      mode: "deterministic-fallback",
    },
    { status: 501 },
  );
}
