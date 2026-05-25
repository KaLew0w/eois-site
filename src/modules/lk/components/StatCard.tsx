import React from 'react'

type Props = { title: string, value: React.ReactNode, subtitle?: string }
export default function StatCard({title,value,subtitle}:Props){
  return (
    <div className="bg-[#1A1A1A]/90 border border-white/10 rounded-2xl p-4 card-emboss hover:border-[#00eefd]/30 transition">
      <div className="text-white/60 text-sm">{title}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {subtitle && <div className="mt-2 text-xs text-white/50">{subtitle}</div>}
    </div>
  )
}
