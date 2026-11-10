import { ApodResponse } from "@/types/pics";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const date = searchParams.get("date");

    const url = new URL(
      "https://science.nasa.gov/wp-json/wp/v2/apod-basic"
    );

    url.searchParams.set("api_key", "DEMO_KEY");

    if (date) {
      url.searchParams.set("start_date", date);
      url.searchParams.set("end_date", date);
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      cache: "no-store",
    });

    const data = await response.json();

    console.log("Requested date:", date);
    console.log("NASA response:", data);

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Failed to fetch APOD data",
          details: data,
        },
        {
          status: response.status,
        }
      );
    }

    const apod: ApodResponse = Array.isArray(data)
      ? data[0]
      : data;

    if (!apod) {
      return NextResponse.json(
        {
          error: `No APOD available for ${date}`,
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(apod);
  } catch (error) {
    console.error("NASA APOD API error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong while fetching APOD",
      },
      {
        status: 500,
      }
    );
  }
}