import React, { useState, useEffect, useRef } from 'react'
import { Project } from '@/types'
import { projects } from '@/data/projects'
import Layout from '@/components/Layout'
import Projects from '@/components/Projects'

const question =
  'What are some interesting projects that Michael has been working on or is working on? Include any information on each project that will help me better understand his work.'

const answer = `As an AI assistant with knowledge up to July 2024, I can only share his work up to that time. Here are some interesting projects from Michael.`

const ProjectsPage: React.FC = () => {
  const MS_PER_CHAR = 10

  const [text, setText] = useState('')

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [messages, setMessages] = useState<
    { type: 'user' | 'bot'; content: string }[]
  >([])
  const [botResponse, setBotResponse] = useState('')
  const [loadedProjects, setLoadedProjects] = useState<Project[]>([])
  const [isBotResponding, setIsBotResponding] = useState(false)
  const [isLimitReached, setIsLimitReached] = useState(false)

  useEffect(() => {
    let charIndex = 0
    const intervalId = setInterval(() => {
      if (charIndex < question.length) {
        setText(question.slice(0, charIndex + 1))
        charIndex++
      } else {
        clearInterval(intervalId)
        setIsTypingComplete(true)
      }
    }, MS_PER_CHAR)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [text])

  const simulateButtonClick = () => {
    const button = document.querySelector('.button')
    if (button) {
      button.classList.add('clicked')
      setTimeout(() => {
        button.classList.remove('clicked')
        setMessages([...messages, { type: 'user', content: text }])
        setText('')
        setTimeout(() => {
          setIsBotResponding(true)
        }, 300)
      }, 500)
    }
  }

  useEffect(() => {
    if (isTypingComplete) {
      setTimeout(simulateButtonClick, 300)
    }
  }, [isTypingComplete])

  useEffect(() => {
    if (isBotResponding) {
      let i = 0
      const intervalId = setInterval(() => {
        if (i < answer.length) {
          setBotResponse(answer.slice(0, i + 1))
          i++
        } else {
          clearInterval(intervalId)
          setIsBotResponding(false)
          loadProjectsSequentially()
        }
      }, MS_PER_CHAR)

      return () => clearInterval(intervalId)
    }
  }, [isBotResponding])

  const loadProjectsSequentially = () => {
    projects.forEach((project, index) => {
      setTimeout(
        () => {
          setLoadedProjects((prev) => [...prev, project])
          if (index === projects.length - 1) {
            setIsLimitReached(true)
          }
        },
        (index + 1) * 400
      )
    })
  }

  const shouldDisplayMessages = isTypingComplete && messages.length > 0

  return (
    <>
      <Layout>
        <h1>My Projects</h1>
        {shouldDisplayMessages ? (
          <div className="message-container">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message-card ${message.type}-message`}
              >
                {message.type === 'user' && (
                  <div className="user-avatar">You</div>
                )}
                <p>{message.content}</p>
              </div>
            ))}
            {botResponse && (
              <div className="message-card bot-message">
                <p>{botResponse}</p>
                <Projects projects={loadedProjects} />
              </div>
            )}
          </div>
        ) : null}
        <div className="input-container">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="textarea"
            rows={1}
            readOnly={true}
            disabled={isLimitReached}
            placeholder={
              isLimitReached
                ? 'You have reached your daily limit of one request on this page.'
                : ''
            }
          />
          <button className="button" disabled={isLimitReached}>
            Ask
          </button>
        </div>
      </Layout>

      <style jsx>{`
        .message-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding-bottom: 1rem;
          background-color: var(--bg-primary);
          border-radius: var(--border-radius-8);
        }
        .message-card {
          border-radius: var(--border-radius-8);
          padding: 0.75rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          background-color: var(--bg-secondary);
          color: var(--text-secondary);
        }
        .user-message {
          position: relative;
          border-left: 4px solid var(--accent-secondary);
        }
        .message-card p {
          margin: 0;
          font-size: 14px;
          line-height: 1.5;
          white-space: pre-wrap;
        }
        .user-avatar {
          position: absolute;
          top: -9px;
          left: 12px;
          background-color: var(--accent-secondary);
          color: var(--bg-secondary);
          border-radius: var(--border-radius-round);
          padding: 2px 8px;
          font-size: 12px;
        }
        .input-container {
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }
        .button {
          background-color: var(--accent-secondary);
          color: var(--bg-secondary);
          border: 1px solid var(--accent-secondary);
          border-radius: var(--border-radius-4);
          padding: 10px 16px;
          font-size: 14px;
          cursor: pointer;
          transition:
            background-color 0.2s,
            transform 0.1s;
          white-space: nowrap;
        }
        .button:hover:not(:disabled) {
          color: var(--accent-secondary);
          background-color: var(--white);
          border: 1px solid var(--accent-secondary);
        }
        .button:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(138, 75, 175, 0.3);
        }
        .button.clicked {
          transform: scale(0.95);
        }
        .button:disabled {
          background-color: var(--text-secondary);
          cursor: not-allowed;
        }
      `}</style>
    </>
  )
}

export default ProjectsPage
