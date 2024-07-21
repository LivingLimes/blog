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
  const [userMessage, setUserMessage] = useState<string>('')
  const [botTextMessage, setBotTextMessage] = useState<string>('')
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
          setBotTextMessage(answer.slice(0, i + 1))
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

  const simulateButtonClick = () => {
    const button = document.querySelector('.button')

    if (!button) {
      return
    }

    button.classList.add('clicked')
    setTimeout(() => {
      button.classList.remove('clicked')
      setUserMessage(text)
      setText('')
      setTimeout(() => {
        setIsBotResponding(true)
      }, 300)
    }, 500)
  }

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

  return (
    <>
      <Layout>
        <h1>My Projects</h1>
        {isTypingComplete && userMessage && (
          <div className="message-container">
            {userMessage && (
              <div className={`message-card user-message-container`}>
                <div className="user-avatar">You</div>
                <p className="message">{userMessage}</p>
              </div>
            )}
            {botTextMessage && (
              <div className="message-card">
                <p className="message bot-message">{botTextMessage}</p>
                <Projects projects={loadedProjects} />
              </div>
            )}
          </div>
        )}
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
        }
        .message-card {
          border-radius: var(--border-radius-8);
          padding: 0.75rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          background-color: var(--bg-secondary);
        }
        .user-message-container {
          position: relative;
          border-left: 4px solid var(--accent-primary);
        }
        .message-card .message {
          margin: 0;
          font-size: 14px;
          line-height: 1.5;
          white-space: pre-wrap;
        }
        .message-card .bot-message {
          margin-bottom: 0.75rem;
        }
        .user-avatar {
          position: absolute;
          top: -9px;
          left: 12px;
          background-color: var(--accent-primary);
          color: var(--btn-text-inverted);
          border-radius: var(--border-radius-round);
          padding: 2px 8px;
          font-size: 0.75rem;
        }
        .input-container {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }
        @media (max-width: var(--media-query)) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }
        .button {
          background-color: var(--accent-primary);
          color: var(--btn-text-inverted);
          border: 1px solid var(--accent-primary);
          border-radius: var(--border-radius-4);
          padding: 10px 16px;
          font-size: 0.8rem;
          cursor: pointer;
        }
        .button:hover:not(:disabled) {
          color: var(--accent-primary);
          background-color: var(--white);
          border: 1px solid var(--accent-primary);
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
