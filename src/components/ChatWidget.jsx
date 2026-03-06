import { useState, useRef, useEffect } from 'react'
import { useAction } from 'convex/react'
import { api } from '../../convex/_generated/api'

const SUGGESTIONS = [
  'What does a website cost?',
  'How long does it take?',
  'Do you work with any business?',
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const sendMessage = useAction(api.chat.send)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function submit(text) {
    const userMsg = text || input.trim()
    if (!userMsg || loading) return
    setInput('')
    const next = [...messages, { role: 'user', content: userMsg }]
    setMessages(next)
    setLoading(true)
    try {
      const reply = await sendMessage({ messages: next })
      setMessages(m => [...m, { role: 'assistant', content: reply }])
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: "Sorry, something went wrong. Call Johnny directly at (425) 324-6506." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* Chat panel */}
      {open && (
        <div className="w-[360px] max-w-[calc(100vw-3rem)] bg-white rounded-3xl shadow-2xl border border-[#1A1209]/10 flex flex-col overflow-hidden"
          style={{ height: '480px' }}>

          {/* Header */}
          <div className="bg-[#1E3329] px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#E8722A] rounded-full flex items-center justify-center text-white text-xs font-bold font-display">
                OC
              </div>
              <div>
                <div className="text-white text-sm font-semibold">OC Builds Assistant</div>
                <div className="flex items-center gap-1.5 text-white/50 text-xs">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  Online
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/50 hover:text-white transition-colors p-1"
              aria-label="Close chat"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {/* Welcome */}
            {messages.length === 0 && (
              <div className="space-y-3">
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 bg-[#E8722A] rounded-full flex items-center justify-center flex-shrink-0 text-white text-[10px] font-bold mt-0.5">OC</div>
                  <div className="bg-[#F5EDD8] rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-[#1A1209] max-w-[85%]">
                    Hey! I'm the OC Builds assistant. Ask me anything about pricing, services, or how to get started. 👋
                  </div>
                </div>
                <div className="pl-9 flex flex-wrap gap-2">
                  {SUGGESTIONS.map(s => (
                    <button
                      key={s}
                      onClick={() => submit(s)}
                      className="text-xs border border-[#E8722A]/30 text-[#E8722A] hover:bg-[#E8722A] hover:text-white px-3 py-1.5 rounded-full transition-all duration-150"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : ''}`}>
                {m.role === 'assistant' && (
                  <div className="w-7 h-7 bg-[#E8722A] rounded-full flex items-center justify-center flex-shrink-0 text-white text-[10px] font-bold mt-0.5">OC</div>
                )}
                <div className={`px-4 py-3 text-sm max-w-[85%] leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-[#1E3329] text-white rounded-2xl rounded-tr-sm'
                    : 'bg-[#F5EDD8] text-[#1A1209] rounded-2xl rounded-tl-sm'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 bg-[#E8722A] rounded-full flex items-center justify-center flex-shrink-0 text-white text-[10px] font-bold">OC</div>
                <div className="bg-[#F5EDD8] rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-[#1A1209]/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-[#1A1209]/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-[#1A1209]/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-4 pb-4 flex-shrink-0">
            <form
              onSubmit={e => { e.preventDefault(); submit() }}
              className="flex gap-2 bg-[#F5EDD8] rounded-2xl border border-[#1A1209]/10 px-4 py-2.5"
            >
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask anything…"
                className="flex-1 bg-transparent text-sm text-[#1A1209] placeholder-[#1A1209]/35 focus:outline-none"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="text-[#E8722A] disabled:opacity-30 transition-opacity flex-shrink-0"
                aria-label="Send"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-14 h-14 bg-[#E8722A] hover:bg-[#D0611A] text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
        aria-label="Open chat"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
      </button>
    </div>
  )
}
