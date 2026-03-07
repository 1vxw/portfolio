import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const redis =
  redisUrl && redisToken
    ? new Redis({
        url: redisUrl,
        token: redisToken,
      })
    : null;

export async function GET() {
  const cookieStore = await cookies();
  const viewed = cookieStore.get("viewed");

  if (!redis) {
    return NextResponse.json({ views: 0 });
  }

  try {
    if (!viewed) {
      await redis.incr("portfolio:views");
    }

    const views = (await redis.get<number>("portfolio:views")) ?? 0;
    const response = NextResponse.json({ views });

    if (!viewed) {
      response.cookies.set("viewed", "true", {
        httpOnly: true,
        maxAge: 86400,
        path: "/",
        sameSite: "lax",
      });
    }

    return response;
  } catch {
    return NextResponse.json({ views: 0 });
  }
}
