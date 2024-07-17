import React from 'react'
import Card from './Card'
import Image from 'next/image'
import { Project } from '@/types'
import { ExternalLink } from 'lucide-react'

const Projects = ({ projects }) => {
  return (
    <>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
      <style jsx>{`
        .projects-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin-top: 1rem;
        }
        @media (min-width: 768px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
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
            <Image src={logo} alt={`${title} logo`} className="project-logo" />
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

export default Projects
