import { NextResponse } from "next/server";

const ISS_API =
  "https://api.wheretheiss.at/v1/satellites/25544";

export async function GET() {
  try {
    const response = await fetch(ISS_API, {
      next: {
        revalidate: 30,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Failed to fetch ISS data.",
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("ISS API Error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch ISS data.",
      },
      { status: 500 }
    );
  }
}