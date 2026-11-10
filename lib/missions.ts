 import type {
  Mission,
  MissionReference,
  MissionsResponse,
} from "@/types/missions";

const MISSIONS_URL =
  "https://osdr.nasa.gov/geode-py/ws/api/missions";

const MISSION_BASE_URL =
  "https://osdr.nasa.gov/geode-py/ws/api/mission";

const NASA_IMAGES_URL =
  "https://images-api.nasa.gov/search";

const EMPTY_IMAGE = {
  imageUrl: null,
  title: null,
  description: null,
};

export interface MissionImage {
  imageUrl: string | null;
  title: string | null;
  description: string | null;
}

/* ---------------- Missions List ---------------- */

export async function getMissions(): Promise<MissionsResponse> {
  const response = await fetch(MISSIONS_URL, {
    next: {
      revalidate: 60 * 60,
    },
  });

  if (!response.ok) {
    throw new Error(
      `NASA Missions API returned ${response.status}`
    );
  }

  const data: unknown = await response.json();

  if (
    typeof data !== "object" ||
    data === null ||
    !("data" in data) ||
    !Array.isArray(data.data)
  ) {
    throw new Error(
      "NASA Missions API returned an unexpected response"
    );
  }

  const missions: MissionReference[] = data.data.filter(
    (item): item is MissionReference =>
      typeof item === "object" &&
      item !== null &&
      "mission" in item &&
      typeof item.mission === "string"
  );

  return {
    data: missions,
  };
}

/* ---------------- Mission Details ---------------- */

export async function getMission(
  missionName: string
): Promise<Mission> {
  const url = `${MISSION_BASE_URL}/${encodeURIComponent(
    missionName
  )}`;

  for (let attempt = 0; attempt < 3; attempt++) {
    const response = await fetch(url, {
      next: {
        revalidate: 60 * 60,
      },
    });

    if (response.ok) {
      return response.json();
    }

    if (![502, 503, 504].includes(response.status)) {
      throw new Error(
        `NASA Mission API returned ${response.status}`
      );
    }

    await new Promise((resolve) =>
      setTimeout(resolve, 500 * (attempt + 1))
    );
  }

  throw new Error(
    "NASA Mission API is temporarily unavailable"
  );
}

/* ---------------- Mission Name ---------------- */

export function getMissionName(url: string): string {
  const encodedName = url.split("/mission/")[1] ?? "";

  return decodeURIComponent(encodedName);
}

/* ---------------- Mission Image ---------------- */

export async function getMissionImage(
  missionName: string
): Promise<MissionImage> {
  try {
    const response = await fetch(
      `${NASA_IMAGES_URL}?q=${encodeURIComponent(
        missionName
      )}&media_type=image&page_size=5`,
      {
        next: {
          revalidate: 60 * 60 * 24,
        },
      }
    );

    if (!response.ok) {
      return EMPTY_IMAGE;
    }

    const data = await response.json();

    const items = data?.collection?.items ?? [];

    if (!items.length) {
      return EMPTY_IMAGE;
    }

    const normalizedMission = missionName.toLowerCase();

    const item =
      items.find((item: any) =>
        item?.data?.[0]?.title
          ?.toLowerCase()
          .includes(normalizedMission)
      ) ?? items[0];

    const metadata = item?.data?.[0];

    const imageUrl =
      item?.links?.find(
        (link: {
          rel?: string;
          href?: string;
        }) => link.rel === "preview"
      )?.href ?? null;

    return {
      imageUrl,
      title: metadata?.title ?? null,
      description: metadata?.description ?? null,
    };
  } catch {
    return EMPTY_IMAGE;
  }
}