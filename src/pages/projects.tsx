import React, { useState, useEffect, useRef } from 'react'
import { Project } from '@/types'
import { ExternalLink } from 'lucide-react'
import Card from '@/components/Card'
import Layout from '@/components/Layout'

const question =
  'What are some interesting projects that Michael has been working on or is working on? Include any information on each project that will help me better understand his work.'

const answer = `As an AI assistant with knowledge up to July 2024, I can only share his work up to that time. Here are some interesting projects from Michael.`

const projects: any[] = [
  {
    title: 'SurrealDB',
    description:
      'My code contributions to an open source distributed multi model database.',
    // "logo": "",
    source: 'https://github.com/surrealdb/surrealdb',
  },
  {
    title: 'm.com',
    description: 'The source of this website.',
    source: 'https://github.com/',
  },
  {
    title: 'Celebration board APIs',
    description:
      "A set of APIs for a forum application that allows users to share moments of joy in their lives. This is unfinished because I'm unsure if people would use it over a forum like Reddit.",
    source: 'https://github.com/',
  },
]

const ProjectsPage: React.FC = () => {
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
    }, 30)

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
        }, 600)
      }, 200)
    }
  }

  useEffect(() => {
    if (isTypingComplete) {
      setTimeout(simulateButtonClick, 1000)
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
      }, 30)

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
        (index + 1) * 2000
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
                <div className="projects-grid">
                  {loadedProjects.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                  ))}
                </div>
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
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-top: 1rem;
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

const ProjectLinks = ({ source, demo }: { source?: string; demo?: string }) => {
  return (
    <>
      <div className="project-links">
        {source && <ProjectLink href={source}>Source</ProjectLink>}
        {demo && <ProjectLink href={demo}>Demo</ProjectLink>}
      </div>
      <style jsx>{`
        .project-links {
          display: flex;
          gap: 1rem;
        }
      `}</style>
    </>
  )
}

const ProjectLink = ({ href, children }) => (
  <>
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="project-link"
    >
      {children} <ExternalLink className="project-link-icon" />
    </a>
    <style jsx>
      {`
        .project-link {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-weight: bold;
          padding: 0.5rem 1rem;
          border-radius: var(--border-radius-4);
          font-size: 0.875rem;
          text-decoration: none;
          background-color: var(--accent-secondary);
          color: var(--bg-primary);
        }
        .project-link:hover {
          opacity: 0.9;
        }

        .project-link-icon {
          margin-left: 0.25rem;
          width: 0.875rem;
          height: 0.875rem;
        }
      `}
    </style>
  </>
)

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const { logo, title, description, source, demo } = project

  return (
    <>
      <Card classes="project-card">
        <div className="project-header">
          {logo && (
            <img src={logo} alt={`${title} logo`} className="project-logo" />
          )}
          <h3 className="project-title">{title}</h3>
        </div>
        <p className="project-description">{description}</p>
        {(source || demo) && <ProjectLinks source={source} demo={demo} />}
      </Card>
      <style jsx>{`
        .project-card {
          margin-top: 1rem;
        }
        .project-header {
          display: flex;
          align-items: center;
        }
        .project-logo {
          width: 2.5rem;
          height: 2.5rem;
          margin-right: 1rem;
          object-fit: contain;
        }
        .project-title {
          font-size: 1.25rem;
          font-weight: bold;
          color: var(--text-secondary);
        }
        .project-description {
          color: var(--text-secondary);
          padding-bottom: 1.5rem;
        }
      `}</style>
    </>
  )
}

export default ProjectsPage
