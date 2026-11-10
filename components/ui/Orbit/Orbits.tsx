import React from 'react'

export default function Orbits() {
  return <>
      {/* Orbital rings */}
                <div className="absolute inset-[6%] rounded-full border border-white/5" />

                <div className="absolute inset-[15%] rounded-full border border-white/4" />

                <div className="absolute inset-[25%] rounded-full border border-white/3.5" />

                <div className="absolute inset-[35%] rounded-full border border-white/2.5" />

                {/* Floating stars */}
                <div className="absolute left-[10%] top-[30%] h-2 w-2 rounded-full bg-white shadow-[0_0_20px_5px_rgba(255,255,255,0.55)]" />

                <div className="absolute right-[10%] top-[25%] h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_16px_4px_rgba(255,255,255,0.5)]" />

                <div className="absolute bottom-[20%] left-[15%] h-1 w-1 rounded-full bg-white shadow-[0_0_15px_3px_rgba(255,255,255,0.4)]" />

                <div className="absolute bottom-[30%] right-[13%] h-1 w-1 rounded-full bg-white" />

  
  </>
}
