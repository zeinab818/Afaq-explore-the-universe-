import React from 'react'

export default function StarsBackground() {
  return <>
  
  
    {/* Ambient glow */}
        
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[5%] top-[15%] h-80 w-80 rounded-full bg-primary/10 blur-[130px]" />

          <div className="absolute right-[5%] top-[30%] h-md w-md rounded-full bg-violet-500/8 blur-[140px]" />

          <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/[0.07] blur-[120px]" />
        </div>

        {/* Stars */}
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute left-[8%] top-[18%] h-1 w-1 rounded-full bg-white shadow-[0_0_12px_3px_rgba(255,255,255,0.6)]" />

          <div className="absolute left-[20%] top-[42%] h-0.5 w-0.5 rounded-full bg-white" />

          <div className="absolute left-[35%] top-[12%] h-1 w-1 rounded-full bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.5)]" />

          <div className="absolute left-[55%] top-[22%] h-0.5 w-0.5 rounded-full bg-white" />

          <div className="absolute right-[18%] top-[16%] h-1 w-1 rounded-full bg-white shadow-[0_0_12px_3px_rgba(255,255,255,0.6)]" />

          <div className="absolute right-[8%] top-[48%] h-0.5 w-0.5 rounded-full bg-white" />

          <div className="absolute bottom-[28%] left-[14%] h-0.5 w-0.5 rounded-full bg-white" />

          <div className="absolute bottom-[18%] right-[20%] h-1 w-1 rounded-full bg-white shadow-[0_0_12px_3px_rgba(255,255,255,0.5)]" />

          <div className="absolute bottom-[35%] left-[48%] h-0.5 w-0.5 rounded-full bg-white" />
        </div>
  
  </>
}
