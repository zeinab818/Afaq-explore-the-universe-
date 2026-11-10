import { PlanetI } from "@/types/planetsI";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const planetName = searchParams.get("name");

  if (!planetName) {
    return NextResponse.json(
      { error: "Planet name is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/planets?name=${encodeURIComponent(
        planetName
      )}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": process.env.NINJA_API_KEY || "",
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch planet data" },
        { status: response.status }
      );
    }

    const data: PlanetI[] = await response.json();

    if (!data.length) {
      return NextResponse.json(
        { error: "Planet not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Planet API error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}