
import type { Metadata } from "next";
import SpaceStationTracker from "./SpaceStationTracker";


export const metadata: Metadata = {
  title: "Space Station Tracker | Āfāq",
  description:
    "Explore Earth's orbital objects with live ISS telemetry and calculated satellite positions.",
};

export default function SpaceStationPage() {
  return <>
  <div className="pt-5">
    <SpaceStationTracker />
  
   </div> 
  </>;
}
