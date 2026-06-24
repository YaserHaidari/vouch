'use client'

import { useEffect, useState } from 'react'
import { DefaultChatTransport } from 'ai'
import { useChat } from '@ai-sdk/react'

const styles: Record<string, React.CSSProperties> = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    maxWidth: '720px',
    margin: '0 auto',
    fontFamily: 'system-ui, sans-serif',
    backgroundColor: '#f9f9f9',
  },
  messages: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputArea: {
    borderTop: '1px solid #e5e5e5',
    padding: '12px 16px',
    display: 'flex',
    gap: '8px',
    backgroundColor: '#ffffff',
  },
  textarea: {
    flex: 1,
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '15px',
    resize: 'none',
    outline: 'none',
    fontFamily: 'inherit',
    lineHeight: 1.5,
  },
  button: {
    padding: '0 20px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#0070f3',
    color: '#fff',
    fontWeight: 600,
    fontSize: '15px',
    cursor: 'pointer',
    minWidth: '64px',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
  heading: {
    fontSize: '17px',
    fontWeight: 700,
    margin: '4px 0',
  },
  linkCard: {
    display: 'inline-block',
    marginTop: '8px',
    padding: '8px 12px',
    backgroundColor: '#f0f7ff',
    border: '1px solid #cce0ff',
    borderRadius: '8px',
    color: '#0070f3',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 500,
    wordBreak: 'break-all',
  },
}

const bubbleStyle = (role: string): React.CSSProperties => ({
  maxWidth: '80%',
  alignSelf: role === 'user' ? 'flex-end' : 'flex-start',
  backgroundColor: role === 'user' ? '#0070f3' : '#ffffff',
  color: role === 'user' ? '#ffffff' : '#111',
  padding: '10px 14px',
  borderRadius: role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  lineHeight: 1.6,
  fontSize: '15px',
})

const roleLabelStyle = (role: string): React.CSSProperties => ({
  fontSize: '11px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: '4px',
  color: role === 'user' ? '#0070f3' : '#888',
  alignSelf: role === 'user' ? 'flex-end' : 'flex-start',
})

// Renders text with support for ## headings, **bold**, and clickable URL cards
function RenderText({ text, isUser }: { text: string; isUser: boolean }) {
  const urlRegex = /(https?:\/\/[^\s]+)/g

  return (
    <>
      {text.split('\n').map((line, i) => {
        // ## Heading
        if (line.startsWith('## ')) {
          return <div key={i} style={styles.heading}>{line.slice(3)}</div>
        }

        // Split line by URLs
        const parts = line.split(urlRegex)
        const rendered = parts.map((part, j) => {
          if (urlRegex.test(part)) {
            return isUser ? (
              <a key={j} href={part} target="_blank" rel="noopener noreferrer"
                style={{ color: '#cce0ff' }}>{part}</a>
            ) : (
              <a key={j} href={part} target="_blank" rel="noopener noreferrer"
                style={styles.linkCard}>🔗 {part}</a>
            )
          }
          // **bold**
          return part.split(/\*\*(.*?)\*\*/g).map((bp, k) =>
            k % 2 === 1 ? <strong key={k}>{bp}</strong> : bp
          )
        })

        return <div key={i}>{rendered}</div>
      })}
    </>
  )
}

function Chat() {
  const [input, setInput] = useState('')

  const { messages, setMessages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch('/api/chat')
      const data = await res.json()
      setMessages(data)
    }
    fetchMessages()
  }, [setMessages])

  const handleSubmit = () => {
    if (!input.trim()) return
    sendMessage({ text: input })
    setInput('')
  }

  const isReady = status === 'ready'

  return (
    <div style={styles.page}>
      <div style={styles.messages}>
        {messages.map(message =>
          message.parts?.map((part, i) => {
            if (part.type !== 'text') return null
            const isUser = message.role === 'user'
            return (
              <div key={`${message.id}-${i}`} style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={roleLabelStyle(message.role)}>
                  {isUser ? 'You' : 'Assistant'}
                </span>
                <div style={bubbleStyle(message.role)}>
                  <RenderText text={part.text} isUser={isUser} />
                </div>
              </div>
            )
          })
        )}
        {status === 'streaming' && (
          <div style={{ alignSelf: 'flex-start', color: '#aaa', fontSize: '13px' }}>
            Typing...
          </div>
        )}
      </div>

      <div style={styles.inputArea}>
        <textarea
          style={styles.textarea}
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={!isReady}
          placeholder="Type a message..."
          rows={2}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSubmit()
            }
          }}
        />
        <button
          style={{ ...styles.button, ...(!isReady ? styles.buttonDisabled : {}) }}
          onClick={handleSubmit}
          disabled={!isReady}
        >
          {isReady ? 'Send' : '...'}
        </button>
      </div>
    </div>
  )
}

export default Chat