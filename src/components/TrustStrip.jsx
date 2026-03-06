const facts = [
  { icon: '💰', text: 'Flat rate pricing' },
  { icon: '🤝', text: 'No contracts or retainers' },
  { icon: '📍', text: 'Local to Ellensburg' },
  { icon: '☎️', text: 'You deal directly with Johnny' },
  { icon: '⚡', text: 'Response within 24 hours' },
]

export default function TrustStrip() {
  return (
    <div className="bg-[#1E3329] py-5 border-y border-white/[0.06]">
      <div className="container-xl">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {facts.map(f => (
            <div key={f.text} className="flex items-center gap-2 text-white/70 text-sm">
              <span>{f.icon}</span>
              <span className="font-medium">{f.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
