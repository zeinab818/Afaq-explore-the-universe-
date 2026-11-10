
const RAD = Math.PI / 180;
const DEG = 180 / Math.PI;
const DAY_MS = 86_400_000;

function normalizeDegrees(value: number): number {
  return ((value % 360) + 360) % 360;
}

function solarCoordinates(date: Date) {
  const jd = date.getTime() / DAY_MS + 2440587.5;
  const t = (jd - 2451545) / 36525;

  const L = normalizeDegrees(
    280.46646 + t * (36000.76983 + 0.0003032 * t)
  );

  const M =
    (357.52911 + t * (35999.05029 - 0.0001537 * t)) *
    RAD;

  const e =
    0.016708634 -
    t * (0.000042037 + 0.0000001267 * t);

  const C =
    Math.sin(M) *
      (1.914602 - t * (0.004817 + 0.000014 * t)) +
    Math.sin(2 * M) * (0.019993 - 0.000101 * t) +
    Math.sin(3 * M) * 0.000289;

  const omega = (125.04 - 1934.136 * t) * RAD;

  const lambda =
    (L + C - 0.00569 - 0.00478 * Math.sin(omega)) * RAD;

  const epsilon0 =
    23 +
    (26 +
      (21.448 -
        t * (46.815 + t * (0.00059 - t * 0.001813))) /
        60) /
      60;

  const epsilon =
    (epsilon0 + 0.00256 * Math.cos(omega)) * RAD;

  const declination = Math.asin(
    Math.sin(epsilon) * Math.sin(lambda)
  );

  const y = Math.tan(epsilon / 2) ** 2;
  const l0 = L * RAD;

  const equationOfTime =
    4 *
    DEG *
    (
      y * Math.sin(2 * l0) -
      2 * e * Math.sin(M) +
      4 * e * y * Math.sin(M) * Math.cos(2 * l0) -
      0.5 * y * y * Math.sin(4 * l0) -
      1.25 * e * e * Math.sin(2 * M)
    );

  const distanceAU =
    (1.000001018 * (1 - e * e)) /
    (1 + e * Math.cos(M + C * RAD));

  const rightAscension = normalizeDegrees(
    Math.atan2(
      Math.cos(epsilon) * Math.sin(lambda),
      Math.cos(lambda)
    ) * DEG
  );

  return {
    declination,
    equationOfTime,
    distanceAU,
    rightAscension,
  };
}

export function calculateSunPosition(
  latitude: number,
  longitude: number,
  date = new Date()
) {
  const {
    declination,
    equationOfTime,
    distanceAU,
    rightAscension,
  } = solarCoordinates(date);

  const utcMinutes =
    date.getUTCHours() * 60 +
    date.getUTCMinutes() +
    date.getUTCSeconds() / 60 +
    date.getUTCMilliseconds() / 60_000;

  const trueSolarMinutes =
    ((utcMinutes + equationOfTime + 4 * longitude) % 1440 +
      1440) %
    1440;

  const hourAngle =
    (trueSolarMinutes / 4 - 180) * RAD;

  const lat = latitude * RAD;

  const sinElevation =
    Math.sin(lat) * Math.sin(declination) +
    Math.cos(lat) *
      Math.cos(declination) *
      Math.cos(hourAngle);

  const altitude =
    Math.asin(
      Math.max(-1, Math.min(1, sinElevation))
    ) * DEG;

  const azimuth = normalizeDegrees(
    Math.atan2(
      Math.sin(hourAngle),
      Math.cos(hourAngle) * Math.sin(lat) -
        Math.tan(declination) * Math.cos(lat)
    ) *
      DEG +
      180
  );

  return {
    altitude,
    azimuth,
    altitudeDegrees: altitude,
    azimuthDegrees: azimuth,
    compassBearing: azimuth,
    isDaylight: altitude > -0.833,
    equationOfTime,
    declination: declination * DEG,
    rightAscension,
    hourAngle: hourAngle * DEG,
    distance: distanceAU * 149_597_870.7,
  };
}

function elevationAt(
  date: Date,
  latitude: number,
  longitude: number
): number {
  return calculateSunPosition(
    latitude,
    longitude,
    date
  ).altitude;
}

function solarEvent(
  date: Date,
  latitude: number,
  longitude: number,
  target: number,
  rising: boolean
): Date | null {
  const start = new Date(date);
  start.setUTCHours(0, 0, 0, 0);

  const end = start.getTime() + DAY_MS;
  const step = 5 * 60_000;

  let previousTime = start.getTime();

  let previous =
    elevationAt(
      new Date(previousTime),
      latitude,
      longitude
    ) - target;

  for (
    let currentTime = previousTime + step;
    currentTime <= end;
    currentTime += step
  ) {
    const current =
      elevationAt(
        new Date(currentTime),
        latitude,
        longitude
      ) - target;

    const crossed = rising
      ? previous <= 0 && current >= 0
      : previous >= 0 && current <= 0;

    if (crossed) {
      let low = previousTime;
      let high = currentTime;

      for (let i = 0; i < 25; i++) {
        const middle = (low + high) / 2;

        const value =
          elevationAt(
            new Date(middle),
            latitude,
            longitude
          ) - target;

        if ((value >= 0) === rising) {
          high = middle;
        } else {
          low = middle;
        }
      }

      return new Date((low + high) / 2);
    }

    previousTime = currentTime;
    previous = current;
  }

  return null;
}

function formatTime(date: Date | null): string | null {
  if (!date) return null;

  // Return an unambiguous UTC timestamp.
  // Convert it to the desired timezone when displaying it.
  return date.toISOString();
}

export function calculateSunTimes(
  latitude: number,
  longitude: number,
  date = new Date(),
  timezone = "UTC"
) {
  // Keep timezone in the public function signature for compatibility.
  // Event timestamps are returned in UTC, not as local-time strings.
  void timezone;

  const sunrise = solarEvent(
    date,
    latitude,
    longitude,
    -0.833,
    true
  );

  const sunset = solarEvent(
    date,
    latitude,
    longitude,
    -0.833,
    false
  );

  const dawn = solarEvent(
    date,
    latitude,
    longitude,
    -6,
    true
  );

  const dusk = solarEvent(
    date,
    latitude,
    longitude,
    -6,
    false
  );

const { equationOfTime } = solarCoordinates(date);

const noon = new Date(date);
noon.setUTCHours(0, 0, 0, 0);

noon.setTime(
  noon.getTime() +
    (720 - 4 * longitude - equationOfTime) * 60_000
);

  return {
    sunrise: formatTime(sunrise),
    sunset: formatTime(sunset),
    dawn: formatTime(dawn),
    dusk: formatTime(dusk),
    solarNoon: formatTime(noon),
  };
}
