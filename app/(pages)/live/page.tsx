import React from 'react'
import SolarWind from './../../../components/ui/Live/SolarWind';
import ISSTracker from '@/components/ui/Live/ISSTracker';
import SpaceWeather from '@/components/ui/Live/SpaceWeather';

export default function Live() {
  return <>
  
  <SolarWind />
  <ISSTracker/>
  <SpaceWeather/>
  </>
}
