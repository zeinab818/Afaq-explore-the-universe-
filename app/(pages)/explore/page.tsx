"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import {
  Canvas,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import {
  Stars,
  Text,
} from "@react-three/drei";
import { useRouter } from "next/navigation";
import earthTexture from "@/assets/images/earth3.jpeg";
import moonTexture from "@/assets/images/moon.jpg";
import sunTexture from "@/assets/images/sun.jpeg";
import mercuryTextureImage from "@/assets/images/mercury.jpeg";
import venusTextureImage from "@/assets/images/venus.jpeg";
import marsTextureImage from "@/assets/images/mars.jpeg";
import jupiterTextureImage from "@/assets/images/jupiter.jpeg";
import saturnTextureImage from "@/assets/images/saturn.jpeg";
import uranusTextureImage from "@/assets/images/uranus.jpeg";
import neptuneTextureImage from "@/assets/images/neptune.jpeg";

/* =========================================================
   SIMULATION
========================================================= */

const SIMULATION_DAYS_PER_SECOND = 8;

const MOVEMENT_SPEED = 5;

const AU_SCALE = 45;

function visualDistanceFromAU(distanceAU: number) {
  return distanceAU * AU_SCALE;
}

const EARTH_RADIUS = 1.35;
const RADIUS_COMPRESSION = 0.80;

function visualPlanetRadius(radiusEarths: number) {
  return EARTH_RADIUS * Math.pow(radiusEarths, RADIUS_COMPRESSION);
}

const SUN_VISUAL_RADIUS = 10;

// Moon
const MOON_VISUAL_DISTANCE = 7;

/*
  سرعة دوران الكوكب حول نفسه.
*/
const ROTATION_SPEED_MULTIPLIER = 0.15;

/* =========================================================
   TYPES
========================================================= */

type PlanetData = {
  name: string;
  distanceAU: number;
  radiusEarths: number;
  orbitalPeriodDays: number;
  rotationPeriodHours: number;
  eccentricity: number;
  orbitalInclination: number;
  axialTilt: number;
  initialMeanAnomaly: number;
  texture: string;
};

/* =========================================================
   PLANET DATA
========================================================= */

const PLANETS: Record<string, PlanetData> = {
  mercury: {
    name: "Mercury",
    distanceAU: 0.387098,
    radiusEarths: 0.383,
    orbitalPeriodDays: 87.969,
    rotationPeriodHours: 1407.6,
    eccentricity: 0.2056,
    orbitalInclination: 7.005,
    axialTilt: 0.034,
    initialMeanAnomaly: THREE.MathUtils.degToRad(174.8),
    texture: mercuryTextureImage.src,
  },

  venus: {
    name: "Venus",
    distanceAU: 0.723332,
    radiusEarths: 0.949,
    orbitalPeriodDays: 224.701,
    rotationPeriodHours: -5832.5,
    eccentricity: 0.0068,
    orbitalInclination: 3.3947,
    axialTilt: 177.36,
    initialMeanAnomaly: THREE.MathUtils.degToRad(50.1),
    texture: venusTextureImage.src,
  },

  earth: {
    name: "earth",
    distanceAU: 1,
    radiusEarths: 1,
    orbitalPeriodDays: 365.256,
    rotationPeriodHours: 23.9345,
    eccentricity: 0.0167,
    orbitalInclination: 0,
    axialTilt: 23.439,
    initialMeanAnomaly: THREE.MathUtils.degToRad(100.5),
    texture: earthTexture.src,
  },

  mars: {
    name: "Mars",
    distanceAU: 1.523679,
    radiusEarths: 0.532,
    orbitalPeriodDays: 686.98,
    rotationPeriodHours: 24.6229,
    eccentricity: 0.0935,
    orbitalInclination: 1.85,
    axialTilt: 25.19,
    initialMeanAnomaly: THREE.MathUtils.degToRad(19.4),
    texture: marsTextureImage.src,
  },

  jupiter: {
    name: "Jupiter",
    distanceAU: 5.2044,
    radiusEarths: 11.21,
    orbitalPeriodDays: 4332.589,
    rotationPeriodHours: 9.925,
    eccentricity: 0.0489,
    orbitalInclination: 1.304,
    axialTilt: 3.13,
    initialMeanAnomaly: THREE.MathUtils.degToRad(19.7),
    texture: jupiterTextureImage.src,
  },

  saturn: {
    name: "Saturn",
    distanceAU: 9.573,
    radiusEarths: 9.45,
    orbitalPeriodDays: 10759.22,
    rotationPeriodHours: 10.656,
    eccentricity: 0.0565,
    orbitalInclination: 2.485,
    axialTilt: 26.73,
    initialMeanAnomaly: THREE.MathUtils.degToRad(317.0),
    texture: saturnTextureImage.src,
  },

  uranus: {
    name: "Uranus",
    distanceAU: 19.191,
    radiusEarths: 4.01,
    orbitalPeriodDays: 30688.5,
    rotationPeriodHours: -17.24,
    eccentricity: 0.0463,
    orbitalInclination: 0.773,
    axialTilt: 97.77,
    initialMeanAnomaly: THREE.MathUtils.degToRad(142.2),
    texture: uranusTextureImage.src,
  },

  neptune: {
    name: "Neptune",
    distanceAU: 30.07,
    radiusEarths: 3.88,
    orbitalPeriodDays: 60182,
    rotationPeriodHours: 16.11,
    eccentricity: 0.0086,
    orbitalInclination: 1.77,
    axialTilt: 28.32,
    initialMeanAnomaly: THREE.MathUtils.degToRad(259.9),
    texture: neptuneTextureImage.src,
  },
};

/* =========================================================
   MOON
========================================================= */

const MOON_DATA = {
  radiusEarths: 0.2727,
  distanceEarths: 60.27,
  orbitalPeriodDays: 27.321661,
  eccentricity: 0.0549,
  inclination: 5.145,
  rotationPeriodDays: 27.321661,
};

/* =========================================================
   KEPLER
========================================================= */

function solveKepler(
  meanAnomaly: number,
  eccentricity: number,
) {
  let eccentricAnomaly = meanAnomaly;

  for (let i = 0; i < 8; i++) {
    const correction =
      eccentricAnomaly -
      eccentricity * Math.sin(eccentricAnomaly) -
      meanAnomaly;

    const derivative =
      1 -
      eccentricity * Math.cos(eccentricAnomaly);

    eccentricAnomaly -= correction / derivative;
  }

  return eccentricAnomaly;
}

function getOrbitPosition({
  distance,
  eccentricity,
  orbitalPeriod,
  simulationDays,
  initialMeanAnomaly,
}: {
  distance: number;
  eccentricity: number;
  orbitalPeriod: number;
  simulationDays: number;
  initialMeanAnomaly: number;
}) {
  const meanMotion =
    (Math.PI * 2) / orbitalPeriod;

  const meanAnomaly =
    initialMeanAnomaly +
    meanMotion * simulationDays;

  const normalizedMeanAnomaly =
    THREE.MathUtils.euclideanModulo(
      meanAnomaly,
      Math.PI * 2,
    );

  const eccentricAnomaly =
    solveKepler(
      normalizedMeanAnomaly,
      eccentricity,
    );

  const x =
    distance *
    (Math.cos(eccentricAnomaly) - eccentricity);

  const z =
    distance *
    Math.sqrt(1 - eccentricity * eccentricity) *
    Math.sin(eccentricAnomaly);

  return { x, z };
}

/* =========================================================
   SIMULATION CLOCK
========================================================= */

function useSimulationClock() {
  const clock = useRef({
    days: 0,
  });

  useFrame((_, delta) => {
    clock.current.days +=
      delta * SIMULATION_DAYS_PER_SECOND;
  });

  return clock;
}

/* =========================================================
   PLANET MATERIAL
========================================================= */

function usePlanetMaterial(
  texturePath: string,
) {
  const texture = useLoader(
    THREE.TextureLoader,
    texturePath,
  );

  const preparedTexture = useMemo(() => {
    const clonedTexture = texture.clone();

    clonedTexture.colorSpace =
      THREE.SRGBColorSpace;

    clonedTexture.anisotropy = 8;
    clonedTexture.needsUpdate = true;

    return clonedTexture;
  }, [texture]);

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: preparedTexture,

      emissive: new THREE.Color("#000000"),
      emissiveIntensity: 0,

      roughness: 1,
      metalness: 0,
    });
  }, [preparedTexture]);

  return material;
}

/* =========================================================
   SUN
========================================================= */

function Sun() {
  const meshRef =
    useRef<THREE.Mesh>(null);

  const texture = useLoader(
    THREE.TextureLoader,
    sunTexture.src,
  );

  const preparedTexture = useMemo(() => {
    const clonedTexture = texture.clone();

    clonedTexture.colorSpace =
      THREE.SRGBColorSpace;

    clonedTexture.anisotropy = 8;
    clonedTexture.needsUpdate = true;

    return clonedTexture;
  }, [texture]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y +=
      delta * 0.02;
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry
          args={[
            SUN_VISUAL_RADIUS,
            96,
            96,
          ]}
        />

        <meshBasicMaterial
          map={preparedTexture}
          color="#ffffff"
        />
      </mesh>

      <mesh scale={1.12}>
        <sphereGeometry
          args={[
            SUN_VISUAL_RADIUS,
            64,
            64,
          ]}
        />

        <meshBasicMaterial
          color="#ffcc66"
          transparent
          opacity={0.035}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <pointLight
        color="#fff3d1"
        intensity={15}
        distance={0}
        decay={0}
        castShadow
      />
    </group>
  );
}

/* =========================================================
   ORBIT LINE
========================================================= */

function OrbitLine({
  distance,
  eccentricity,
  inclination,
}: {
  distance: number;
  eccentricity: number;
  inclination: number;
}) {
  const points = useMemo(() => {
    const result: THREE.Vector3[] = [];

    for (let i = 0; i <= 256; i++) {
      const theta =
        (i / 256) *
        Math.PI *
        2;

      const radius =
        (distance *
          (1 - eccentricity * eccentricity)) /
        (1 + eccentricity * Math.cos(theta));

      result.push(
        new THREE.Vector3(
          radius * Math.cos(theta),
          0,
          radius * Math.sin(theta),
        ),
      );
    }

    return result;
  }, [distance, eccentricity]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(
      points,
    );
  }, [points]);

  useEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  return (
    <lineLoop
      geometry={geometry}
      rotation={[
        THREE.MathUtils.degToRad(inclination),
        0,
        0,
      ]}
    >
      <lineBasicMaterial
        color="#e7c98b"
        transparent
        opacity={0.055}
        depthWrite={false}
      />
    </lineLoop>
  );
}

/* =========================================================
   SATURN RINGS
========================================================= */

function SaturnRings({
  radius,
}: {
  radius: number;
}) {
  return (
    <mesh
      rotation={[
        Math.PI / 2,
        0,
        0,
      ]}
    >
      <ringGeometry
        args={[
          radius * 1.35,
          radius * 2.25,
          96,
        ]}
      />

      <meshStandardMaterial
        color="#d7c6a0"
        transparent
        opacity={0.7}
        side={THREE.DoubleSide}
        roughness={1}
        metalness={0}
        emissive="#000000"
        emissiveIntensity={0}
      />
    </mesh>
  );
}

/* =========================================================
   PLANET
========================================================= */

function PlanetOrbit({
  planet,
  simulationDays,
  frozenPlanet,
  frozenPositions,
}: {
  planet: PlanetData;
  simulationDays: React.MutableRefObject<{
    days: number;
  }>;
  frozenPlanet: string | null;
  frozenPositions: React.MutableRefObject<
    Record<string, { x: number; z: number }>
  >;
}) {
  const systemRef =
    useRef<THREE.Group>(null);

  const planetAxisRef =
    useRef<THREE.Group>(null);

  const planetMeshRef =
    useRef<THREE.Mesh>(null);

  const material =
    usePlanetMaterial(
      planet.texture,
    );

  const visualDistance =
    visualDistanceFromAU(
      planet.distanceAU,
    );

  const visualRadius =
    visualPlanetRadius(
      planet.radiusEarths,
    );

  useFrame((_, delta) => {
    if (!systemRef.current) return;

    const planetKey =
      planet.name.toLowerCase();

    if (
      frozenPlanet === planetKey &&
      frozenPositions.current[planetKey]
    ) {
      const frozen =
        frozenPositions.current[planetKey];

      systemRef.current.position.set(
        frozen.x,
        0,
        frozen.z,
      );
    } else {
      const position =
        getOrbitPosition({
          distance: visualDistance,
          eccentricity:
            planet.eccentricity,
          orbitalPeriod:
            planet.orbitalPeriodDays,
          simulationDays:
            simulationDays.current.days,
          initialMeanAnomaly:
            planet.initialMeanAnomaly,
        });

      systemRef.current.position.set(
        position.x,
        0,
        position.z,
      );
    }

    if (planetAxisRef.current) {
      planetAxisRef.current.rotation.z =
        THREE.MathUtils.degToRad(
          planet.axialTilt,
        );
    }

    if (planetMeshRef.current) {
      const rotationPerDay =
        (Math.PI * 2 * 24) /
        planet.rotationPeriodHours;

      planetMeshRef.current.rotation.y +=
        rotationPerDay *
        delta *
        ROTATION_SPEED_MULTIPLIER;
    }
  });

  return (
    <>
      <OrbitLine
        distance={visualDistance}
        eccentricity={planet.eccentricity}
        inclination={planet.orbitalInclination}
      />

      <group
        ref={systemRef}
        rotation={[
          THREE.MathUtils.degToRad(
            planet.orbitalInclination,
          ),
          0,
          0,
        ]}
      >
        <group ref={planetAxisRef}>
          <mesh
            ref={planetMeshRef}
            castShadow
            receiveShadow
            material={material}
            userData={{
              planetName:
                planet.name.toLowerCase(),
            }}
          >
            <sphereGeometry
              args={[
                visualRadius,
                64,
                64,
              ]}
            />
          </mesh>

          {planet.name === "Saturn" && (
            <SaturnRings
              radius={visualRadius}
            />
          )}

          <Text
            position={[
              0,
              visualRadius * 1.35,
              0,
            ]}
            fontSize={Math.max(
              0.45,
              visualRadius * 0.25,
            )}
            color="#e7c98b"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#070a12"
          >
            {planet.name}
          </Text>
        </group>
      </group>
    </>
  );
}

/* =========================================================
   EARTH + MOON
========================================================= */

function EarthSystem({
  simulationDays,
  frozenPlanet,
  frozenPositions,
}: {
  simulationDays: React.MutableRefObject<{
    days: number;
  }>;
  frozenPlanet: string | null;
  frozenPositions: React.MutableRefObject<
    Record<string, { x: number; z: number }>
  >;
}) {
  const earthSystemRef =
    useRef<THREE.Group>(null);

  const earthMeshRef =
    useRef<THREE.Mesh>(null);

  const moonSystemRef =
    useRef<THREE.Group>(null);

  const moonMeshRef =
    useRef<THREE.Mesh>(null);

  const earthMaterial =
    usePlanetMaterial(
      earthTexture.src,
    );

  const moonMaterial =
    usePlanetMaterial(
      moonTexture.src,
    );

  const earthVisualDistance =
    visualDistanceFromAU(1);

  const earthVisualRadius =
    visualPlanetRadius(1);

  /*
    نخلي القمر قريب بصريًا من الأرض
    ويظل child داخل EarthSystem.
  */
  const moonVisualDistance =
    earthVisualRadius * 3.5;

  const moonVisualRadius =
    visualPlanetRadius(0.2727);

  useFrame((_, delta) => {
    if (
      !earthSystemRef.current ||
      !moonSystemRef.current
    ) {
      return;
    }

    const earthIsFrozen =
      frozenPlanet === "earth";

    // 🌍 Earth position
    if (earthIsFrozen) {
      const frozen =
        frozenPositions.current.earth;

      if (frozen) {
        earthSystemRef.current.position.set(
          frozen.x,
          0,
          frozen.z,
        );
      }
    } else {
      const earthPosition =
        getOrbitPosition({
          distance: earthVisualDistance,
          eccentricity: 0.0167,
          orbitalPeriod: 365.256,
          simulationDays:
            simulationDays.current.days,
          initialMeanAnomaly:
            THREE.MathUtils.degToRad(100.5),
        });

      earthSystemRef.current.position.set(
        earthPosition.x,
        0,
        earthPosition.z,
      );
    }

    // 🌍 Earth rotation
    if (
      earthMeshRef.current &&
      !earthIsFrozen
    ) {
      const earthRotationPerDay =
        (Math.PI * 2 * 24) /
        23.9345;

      earthMeshRef.current.rotation.y +=
        earthRotationPerDay *
        delta *
        ROTATION_SPEED_MULTIPLIER;
    }

    // 🌙 Moon ALWAYS orbits Earth
    const moonAngle =
      (simulationDays.current.days /
        MOON_DATA.orbitalPeriodDays) *
      Math.PI *
      2;

    const moonX =
      Math.cos(moonAngle) *
      moonVisualDistance;

    const moonZ =
      Math.sin(moonAngle) *
      moonVisualDistance;

    moonSystemRef.current.position.set(
      moonX,
      0,
      moonZ,
    );

    // 🌙 Moon rotation
    if (moonMeshRef.current) {
      const moonRotationPerDay =
        (Math.PI * 2) /
        MOON_DATA.rotationPeriodDays;

      moonMeshRef.current.rotation.y +=
        moonRotationPerDay *
        delta *
        ROTATION_SPEED_MULTIPLIER;
    }
  });

  return (
    <group ref={earthSystemRef}>
      <mesh
        ref={earthMeshRef}
        castShadow
        receiveShadow
        material={earthMaterial}
        userData={{
          planetName: "earth",
        }}
      >
        <sphereGeometry
          args={[
            earthVisualRadius,
            64,
            64,
          ]}
        />
      </mesh>

      <Text
        position={[
          0,
          earthVisualRadius * 1.35,
          0,
        ]}
        fontSize={Math.max(
          0.45,
          earthVisualRadius * 0.25,
        )}
        color="#e7c98b"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#070a12"
      >
        Earth
      </Text>

      <group ref={moonSystemRef}>
        <mesh
          ref={moonMeshRef}
          castShadow
          receiveShadow
          material={moonMaterial}
          userData={{
            planetName: "moon",
          }}
        >
          <sphereGeometry
            args={[
              moonVisualRadius,
              48,
              48,
            ]}
          />
        </mesh>

        <Text
          position={[
            0,
            moonVisualRadius * 2,
            0,
          ]}
          fontSize={0.35}
          color="#e7c98b"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#070a12"
        >
          Moon
        </Text>
      </group>
    </group>
  );
}

/* =========================================================
   CROSSHAIR TARGETING
========================================================= */

function CrosshairTargeting({
  onTargetPlanet,
}: {
  onTargetPlanet: (
    planet: string | null,
  ) => void;
}) {
  const { camera, scene } =
    useThree();

  const raycaster = useMemo(
    () => new THREE.Raycaster(),
    [],
  );

  const center = useMemo(
    () => new THREE.Vector2(0, 0),
    [],
  );

  const lastTarget =
    useRef<string | null>(
      null,
    );

  useFrame(() => {
    raycaster.setFromCamera(
      center,
      camera,
    );

    const intersections =
      raycaster.intersectObjects(
        scene.children,
        true,
      );

    let foundPlanet:
      | string
      | null = null;

    // ---------------------------------------------
    // 1. Exact ray hit
    // ---------------------------------------------

    for (const intersection of intersections) {
      let object:
        | THREE.Object3D
        | null = intersection.object;

      while (object) {
        if (
          object.userData?.planetName
        ) {
          foundPlanet =
            object.userData.planetName;

          break;
        }

        object = object.parent;
      }

      if (foundPlanet) break;
    }

    // ---------------------------------------------
    // 2. Near center fallback
    // ---------------------------------------------

    if (!foundPlanet) {
      const targetObjects: THREE.Object3D[] =
        [];

      scene.traverse((object) => {
        if (
          object.userData?.planetName
        ) {
          targetObjects.push(object);
        }
      });

      let closestPlanet:
        | string
        | null = null;

      let closestDistance =
        Infinity;

      for (const object of targetObjects) {
        const worldPosition =
          new THREE.Vector3();

        object.getWorldPosition(
          worldPosition,
        );

        const projected =
          worldPosition
            .clone()
            .project(camera);

        if (projected.z > 1) continue;

        const screenDistance =
          Math.sqrt(
            projected.x *
              projected.x +
              projected.y *
                projected.y,
          );

        const detectionRadius =
          0.10;

        if (
          screenDistance <
            detectionRadius &&
          screenDistance <
            closestDistance
        ) {
          closestDistance =
            screenDistance;

          closestPlanet =
            object.userData.planetName;
        }
      }

      foundPlanet =
        closestPlanet;
    }

    if (
      lastTarget.current !==
      foundPlanet
    ) {
      lastTarget.current =
        foundPlanet;

      onTargetPlanet(
        foundPlanet,
      );
    }
  });

  return null;
}

/* =========================================================
   MOUSE LOOK
========================================================= */

function ExplorerMouseLook({
  disabled,
}: {
  disabled: boolean;
}) {
  const { camera, gl } = useThree();

  const yaw = useRef(camera.rotation.y);
  const pitch = useRef(camera.rotation.x);

  const sensitivity = 0.0025;

  useEffect(() => {
    camera.rotation.order = "YXZ";
  }, [camera]);

  useEffect(() => {
    const canvas = gl.domElement;

    const handlePointerDown = (
      event: PointerEvent,
    ) => {
      if (disabled) return;

      /*
        Lock the mouse only after
        an actual user click.
      */
      if (
        document.pointerLockElement !==
        canvas
      ) {
        canvas.requestPointerLock();
      }

      yaw.current = camera.rotation.y;
      pitch.current = camera.rotation.x;
    };

    const handlePointerMove = (
      event: PointerEvent,
    ) => {
      if (disabled) return;

      if (
        document.pointerLockElement !==
        canvas
      ) {
        return;
      }

      yaw.current -=
        event.movementX *
        sensitivity;

      pitch.current -=
        event.movementY *
        sensitivity;

      pitch.current =
        THREE.MathUtils.clamp(
          pitch.current,
          -Math.PI / 2 + 0.05,
          Math.PI / 2 - 0.05,
        );

      camera.rotation.set(
        pitch.current,
        yaw.current,
        0,
      );
    };

    const handlePointerLockChange =
      () => {
        if (
          document.pointerLockElement ===
          canvas
        ) {
          yaw.current =
            camera.rotation.y;

          pitch.current =
            camera.rotation.x;
        }
      };

    canvas.addEventListener(
      "pointerdown",
      handlePointerDown,
    );

    document.addEventListener(
      "pointermove",
      handlePointerMove,
    );

    document.addEventListener(
      "pointerlockchange",
      handlePointerLockChange,
    );

    return () => {
      canvas.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );

      document.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      document.removeEventListener(
        "pointerlockchange",
        handlePointerLockChange,
      );
    };
  }, [
    camera,
    gl,
    disabled,
  ]);

  /*
    If search becomes active,
    release mouse lock.
  */
  useEffect(() => {
    if (
      disabled &&
      document.pointerLockElement ===
        gl.domElement
    ) {
      document.exitPointerLock();
    }
  }, [disabled, gl]);

  return null;
}
/* =========================================================
   SEARCH CONTROLLER
========================================================= */

function PlanetSearchController({
  planet,
  onTargetPlanet,
  onStopMovement,
  onFreezePlanet,
  frozenPositions,
}: {
  planet: string | null;
  onTargetPlanet: (
    planet: string | null,
  ) => void;
  onStopMovement: (
    stop: boolean,
  ) => void;
  onFreezePlanet: (
    planet: string | null,
  ) => void;
  frozenPositions: React.MutableRefObject<
    Record<string, { x: number; z: number }>
  >;
}) {
  const { camera, scene } =
    useThree();

  useEffect(() => {
    if (!planet) return;

    const targetObjects:
      THREE.Object3D[] = [];

    scene.traverse((object) => {
      if (
        object.userData?.planetName ===
        planet
      ) {
        targetObjects.push(object);
      }
    });

    const targetObject = targetObjects[0];

    if (!targetObject) return;

    const worldPosition =
      new THREE.Vector3();

    targetObject.getWorldPosition(
      worldPosition,
    );

    /*
      احفظ مكان الكوكب لحظة الوصول.
    */

    frozenPositions.current[
      planet
    ] = {
      x: worldPosition.x,
      z: worldPosition.z,
    };

    onFreezePlanet(planet);

    /*
      🚀 انقل الكاميرا للكوكب
    */

    const direction = new THREE.Vector3()
      .subVectors(camera.position, worldPosition);

    if (direction.lengthSq() < 1e-6) {
      direction.set(0, 0, 1);
    } else {
      direction.normalize();
    }

    camera.position.copy(
      worldPosition
        .clone()
        .add(
          direction.multiplyScalar(
            15,
          ),
        ),
    );

    /*
      خلي الكاميرا تبص على الكوكب
    */

    camera.lookAt(
      worldPosition,
    );

    /*
      وقف السفينة بعد الوصول
    */

    onStopMovement(true);

    onTargetPlanet(planet);
  }, [
    planet,
    camera,
    scene,
    onTargetPlanet,
    onStopMovement,
    onFreezePlanet,
    frozenPositions,
  ]);

  return null;
}

/* =========================================================
   SPACESHIP CONTROLS
========================================================= */

function SpaceshipControls({
  searchActive,
  stopMovement,
}: {
  searchActive: boolean;
  stopMovement: boolean;
}) {
  const { camera } =
    useThree();

  const keys = useRef({
    KeyW: false,
    KeyS: false,
    KeyA: false,
    KeyD: false,
    Space: false,
    ShiftLeft: false,
  });

  const velocity =
    useRef(
      new THREE.Vector3(),
    );

  useEffect(() => {
    const down = (
      event: KeyboardEvent,
    ) => {
      const target =
        event.target as HTMLElement;

      if (
        target.tagName ===
          "INPUT" ||
        target.tagName ===
          "TEXTAREA"
      ) {
        return;
      }

      if (
        event.code in
        keys.current
      ) {
        keys.current[
          event.code as keyof typeof keys.current
        ] = true;
      }
    };

    const up = (
      event: KeyboardEvent,
    ) => {
      if (
        event.code in
        keys.current
      ) {
        keys.current[
          event.code as keyof typeof keys.current
        ] = false;
      }
    };

    window.addEventListener(
      "keydown",
      down,
    );

    window.addEventListener(
      "keyup",
      up,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        down,
      );

      window.removeEventListener(
        "keyup",
        up,
      );
    };
  }, []);

  useFrame((_, delta) => {
    if (
      searchActive ||
      stopMovement
    ) {
      velocity.current.set(
        0,
        0,
        0,
      );

      return;
    }

    const direction =
      new THREE.Vector3();

    const right =
      new THREE.Vector3();

    camera.getWorldDirection(
      direction,
    );

    right
      .crossVectors(
        direction,
        camera.up,
      )
      .normalize();

    const movement =
      new THREE.Vector3();

    if (keys.current.KeyW) {
      movement.add(
        direction,
      );
    }

    if (keys.current.KeyS) {
      movement.sub(
        direction,
      );
    }

    if (keys.current.KeyD) {
      movement.add(right);
    }

    if (keys.current.KeyA) {
      movement.sub(right);
    }

    if (keys.current.Space) {
      movement.y += 1;
    }

    if (keys.current.ShiftLeft) {
      movement.y -= 1;
    }

    if (
      movement.lengthSq() > 0
    ) {
      movement.normalize();

      const targetSpeed =
        keys.current.ShiftLeft
          ? MOVEMENT_SPEED * 3
          : MOVEMENT_SPEED;

      const targetVelocity =
        movement.multiplyScalar(
          targetSpeed,
        );

      velocity.current.lerp(
        targetVelocity,
        1 -
          Math.exp(
            -6 * delta,
          ),
      );
    } else {
      velocity.current.lerp(
        new THREE.Vector3(
          0,
          0,
          0,
        ),
        1 -
          Math.exp(
            -4 * delta,
          ),
      );
    }

    camera.position.addScaledVector(
      velocity.current,
      delta,
    );
  });

  return null;
}

/* =========================================================
   PLANET SEARCH
========================================================= */

function PlanetSearch({
  onSearch,
  onActiveChange,
}: {
  onSearch: (
    planet: string,
  ) => void;
  onActiveChange: (
    active: boolean,
  ) => void;
}) {
  const [search, setSearch] =
    useState("");

  const [
    selectedIndex,
    setSelectedIndex,
  ] = useState(0);

  const results =
    Object.values(
      PLANETS,
    ).filter((planet) =>
      planet.name
        .toLowerCase()
        .includes(
          search.toLowerCase(),
        ),
    );

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  const handleSelect = (
    planet: PlanetData,
  ) => {
    setSearch(planet.name);

    onSearch(
      planet.name.toLowerCase(),
    );

    onActiveChange(false);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    event.stopPropagation();

    if (!results.length)
      return;

    if (
      event.key ===
      "ArrowDown"
    ) {
      event.preventDefault();

      setSelectedIndex(
        (current) =>
          current <
          results.length - 1
            ? current + 1
            : 0,
      );
    }

    if (
      event.key ===
      "ArrowUp"
    ) {
      event.preventDefault();

      setSelectedIndex(
        (current) =>
          current > 0
            ? current - 1
            : results.length - 1,
      );
    }

    if (
      event.key ===
      "Enter"
    ) {
      event.preventDefault();

      handleSelect(
        results[
          selectedIndex
        ],
      );
    }
  };

  return (
    <div
      data-planet-search
      className="pointer-events-auto fixed left-1/2 top-24 z-30 w-[280px] -translate-x-1/2"
    >
      <div className="rounded-2xl border border-white/10 bg-[#0d111c]/80 p-2 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2 px-3">
          <span className="text-[#e7c98b]">
            🔎
          </span>

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value,
              )
            }
            onFocus={() => {
              onActiveChange(
                true,
              );
            }}
            onKeyDown={
              handleKeyDown
            }
            onPointerDown={(
              event,
            ) => {
              event.stopPropagation();
            }}
            placeholder="Search planet..."
            className="w-full bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/30"
          />
        </div>

        {search && (
          <div className="mt-1 border-t border-white/5 pt-1">
            {results.length >
            0 ? (
              results.map(
                (
                  planet,
                  index,
                ) => (
                  <button
                    key={
                      planet.name
                    }
                    type="button"
                    onPointerDown={(
                      event,
                    ) => {
                      event.stopPropagation();
                    }}
                    onClick={(
                      event,
                    ) => {
                      event.stopPropagation();

                      handleSelect(
                        planet,
                      );
                    }}
                    className={`w-full rounded-xl px-3 py-2 text-left text-sm uppercase transition ${
                      index ===
                      selectedIndex
                        ? "bg-white/10 text-[#e7c98b]"
                        : "text-white/70 hover:bg-white/5 hover:text-[#e7c98b]"
                    }`}
                  >
                    {
                      planet.name
                    }
                  </button>
                ),
              )
            ) : (
              <p className="px-3 py-2 text-xs text-white/30">
                No planet found
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   SCENE
========================================================= */

function ExplorerScene({
  onTargetPlanet,
  searchPlanet,
  searchActive,
}: {
  onTargetPlanet: (
    planet: string | null,
  ) => void;
  searchPlanet: string | null;
  searchActive: boolean;
}) {
  const [
    stopMovement,
    setStopMovement,
  ] = useState(false);

  const [
    frozenPlanet,
    setFrozenPlanet,
  ] = useState<string | null>(
    null,
  );

  const frozenPositions =
    useRef<
      Record<
        string,
        {
          x: number;
          z: number;
        }
      >
    >({});

  const simulationDays =
    useSimulationClock();

  return (
    <>
      <color
        attach="background"
        args={["#02030a"]}
      />

      <CrosshairTargeting
        onTargetPlanet={
          onTargetPlanet
        }
      />

      <PlanetSearchController
        planet={searchPlanet}
        onTargetPlanet={
          onTargetPlanet
        }
        onStopMovement={
          setStopMovement
        }
        onFreezePlanet={
          setFrozenPlanet
        }
        frozenPositions={
          frozenPositions
        }
      />

      <Stars
        radius={1800}
        depth={1000}
        count={18000}
        factor={4.5}
        saturation={0}
        fade={false}
        speed={0.15}
      />

      <Sun />

      {Object.entries(
        PLANETS,
      ).map(
        ([key, planet]) => {
          if (
            key === "earth"
          ) {
            return null;
          }

          return (
            <PlanetOrbit
              key={key}
              planet={planet}
              simulationDays={
                simulationDays
              }
              frozenPlanet={
                frozenPlanet
              }
              frozenPositions={
                frozenPositions
              }
            />
          );
        },
      )}

      <EarthSystem
        simulationDays={
          simulationDays
        }
        frozenPlanet={
          frozenPlanet
        }
        frozenPositions={
          frozenPositions
        }
      />

      <ambientLight
        intensity={0.035}
        color="#8fa3d6"
      />

      <SpaceshipControls
        searchActive={
          searchActive
        }
        stopMovement={
          stopMovement
        }
      />

      <ExplorerMouseLook
        disabled={
          searchActive
        }
      />
    </>
  );
}

/* =========================================================
   HUD
========================================================= */

function ExplorerHUD({
  targetedPlanet,
}: {
  targetedPlanet: string | null;
}) {
  return (
    <>
      {/* Top left */}

      <div className="pointer-events-none fixed left-20 top-24 z-20">
        <div className="rounded-2xl border border-white/10 bg-[#0d111c]/75 px-4 py-3 backdrop-blur-xl">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#e7c98b]">
            Āfāq Explorer
          </p>

          <p className="mt-1 text-sm text-white/70">
            Deep Space
          </p>
        </div>
      </div>



      {targetedPlanet && (
        <div className="pointer-events-none fixed left-1/2 top-[calc(50%+32px)] z-20 -translate-x-1/2">
          <div className="rounded-full border border-[#e7c98b]/30 bg-[#0d111c]/80 px-4 py-2 text-center backdrop-blur-xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#e7c98b]">
              {
                targetedPlanet
              }
            </p>

            <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/40">
              Click to explore
            </p>
          </div>
        </div>
      )}

      {/* Crosshair */}

      <div className="pointer-events-none fixed left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <div
          className={`relative h-8 w-8 transition-all duration-200 ${
            targetedPlanet
              ? "scale-110"
              : "scale-100"
          }`}
        >
          <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-white/50" />

          <span className="absolute bottom-0 left-1/2 h-3 w-px -translate-x-1/2 bg-white/50" />

          <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-white/50" />

          <span className="absolute right-0 top-1/2 h-px w-3 -translate-y-1/2 bg-white/50" />

          <span
            className={`absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ${
              targetedPlanet
                ? "bg-[#e7c98b] shadow-[0_0_12px_#e7c98b]"
                : "bg-[#e7c98b]"
            }`}
          />
        </div>
      </div>

      {/* Bottom Left */}

      <div className="absolute bottom-6 left-6 rounded-xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-sm">
        <div className="flex gap-4 text-[10px] uppercase tracking-[0.18em] text-white/50">
          <span>
            <b className="text-white/80">
              W A S D
            </b>{" "}
            Move
          </span>

          <span>
            <b className="text-white/80">
              Mouse
            </b>{" "}
            Look
          </span>

          <span>
            <b className="text-white/80">
              ESC
            </b>{" "}
            Exit
          </span>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   PLANET CLICK HANDLER
========================================================= */

function PlanetClickHandler({
  targetedPlanet,
  onExplore,
}: {
  targetedPlanet: string | null;
  onExplore: (
    planet: string,
  ) => void;
}) {
  const targetedPlanetRef =
    useRef<string | null>(
      targetedPlanet,
    );

  useEffect(() => {
    targetedPlanetRef.current =
      targetedPlanet;
  }, [targetedPlanet]);

  useEffect(() => {
    const handlePointerDown = (
      event: PointerEvent,
    ) => {
      const target =
        event.target as HTMLElement | null;

      if (
        target?.closest(
          "[data-planet-search]",
        )
      ) {
        return;
      }

      const planet =
        targetedPlanetRef.current;

      if (!planet) return;

      onExplore(
        planet.toLowerCase(),
      );
    };

    window.addEventListener(
      "pointerdown",
      handlePointerDown,
      true,
    );

    return () => {
      window.removeEventListener(
        "pointerdown",
        handlePointerDown,
        true,
      );
    };
  }, [onExplore]);

  return null;
}

/* =========================================================
   PAGE
========================================================= */

export default function ExplorerPage() {
  const [mousePosition, setMousePosition] = useState({
  x: 0,
  y: 0,
});
useEffect(() => {
  const handleMouseMove = (event: MouseEvent) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  window.addEventListener("mousemove", handleMouseMove);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
  };
}, []);
  const router =
    useRouter();

  const [
    mounted,
    setMounted,
  ] = useState(false);

  const handleExplore = (
    planet: string,
  ) => {
    router.push(
      `/solarSystem/planets/${planet}`,
    );
  };

  const [
    targetedPlanet,
    setTargetedPlanet,
  ] = useState<
    string | null
  >(null);

  const [
    searchPlanet,
    setSearchPlanet,
  ] = useState<
    string | null
  >(null);

  const [
    searchActive,
    setSearchActive,
  ] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#02030a]" />
    );
  }

  return (
  <main className="relative h-screen w-full overflow-hidden bg-[#02030a] cursor-none">
      <PlanetSearch
        onSearch={(planet) => {
          setSearchPlanet(
            planet,
          );
        }}
        onActiveChange={
          setSearchActive
        }
      />

      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{
          position: [
            0,
            5,
            38,
          ],
          fov: 60,
          near: 0.1,
          far: 5000,
        }}
      >
        <ExplorerScene
          onTargetPlanet={
            setTargetedPlanet
          }
          searchPlanet={
            searchPlanet
          }
          searchActive={
            searchActive
          }
        />

        <PlanetClickHandler
          targetedPlanet={
            targetedPlanet
          }
          onExplore={
            handleExplore
          }
        />
      </Canvas>

      <ExplorerHUD
        targetedPlanet={
          targetedPlanet
        }
      />
    </main>
  );
}