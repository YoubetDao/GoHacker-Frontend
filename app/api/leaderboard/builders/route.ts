// app/api/leaderboard/builders/route.ts
export const runtime = "edge"; // ✅ 告诉 Next.js 这是 Edge Function

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const backendUrl = `https://api.hunknownz.xyz:2096/leaderboard/builders?${searchParams.toString()}`;

  const response = await fetch(backendUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // 如果后端需要 token，可加上：
      // 'Authorization': `Bearer ${process.env.YOUR_TOKEN}`,
    },
    cache: "no-store", // 防止 CDN 缓存数据
  });

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
    status: response.status,
  });
}
