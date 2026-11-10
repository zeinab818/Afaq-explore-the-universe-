import { NextResponse } from "next/server";
import { SpaceNewsResponse } from "@/types/news";

export async function GET() {
  try {
    const url = new URL(
      "https://api.spaceflightnewsapi.net/v4/articles/"
    );

    url.searchParams.set("limit", "9");
    url.searchParams.set("ordering", "-published_at");

    const response = await fetch(url.toString(), {
      cache: "no-store",
    });

    const data: SpaceNewsResponse = await response.json();

    if (!response.ok) {
      console.error("Space News API error:", data);

      return NextResponse.json(
        {
          error: "Failed to fetch space news",
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Space News fetch error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong while fetching space news",
      },
      {
        status: 500,
      }
    );
  }
}