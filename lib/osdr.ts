import type { OSDRResponse } from "@/types/osdr";

const OSDR_URL =
  "https://osdr.nasa.gov/osdr/data/osd/files/137.1,86-87";

export async function getResearch(): Promise<OSDRResponse> {
  const response = await fetch(OSDR_URL, {
    next: {
      revalidate: 60 * 60,
    },
  });

  if (!response.ok) {
    throw new Error(`OSDR API returned ${response.status}`);
  }

  const data: OSDRResponse = await response.json();

  if (!data.success) {
    throw new Error("NASA OSDR returned an unsuccessful response");
  }

  return data;
}