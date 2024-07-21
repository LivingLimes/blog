import React from 'react'
import { ExternalLink } from 'lucide-react'
import Card from './Card'

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
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          padding: 0;
        }

        .projects-grid li {
          list-style: none;
        }
      `}</style>
    </>
  )
}

const ProjectCard = ({ project }) => {
  const { title, description, source, demo } = project

  return (
    <>
      <Card classes="project-content">
        <header>
          <h3 className="project-title">{title}</h3>
        </header>
        <p className="project-description">{description}</p>
        {(source || demo) && (
          <footer>
            <ProjectLinks source={source} demo={demo} />
          </footer>
        )}
      </Card>
      <style jsx>{`
        .article {
          display: flex;
        }

        :global(.project-content) {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .project-title {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 0;
        }
        .project-description {
          margin: 0;
          flex-grow: 1;
        }
      `}</style>
    </>
  )
}

const ProjectLinks = ({ source, demo }) => {
  return (
    <div className="project-links">
      {source && <ProjectLink href={source}>Source</ProjectLink>}
      {demo && <ProjectLink href={demo}>Demo</ProjectLink>}
      <style jsx>{`
        .project-links {
          display: flex;
          gap: 1rem;
          margin-top: auto;
        }
      `}</style>
    </div>
  )
}

const ProjectLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="project-link"
  >
    {children} <ExternalLink aria-hidden size={14} />
    <style jsx>{`
      .project-link {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        font-weight: bold;
        padding: 0.5rem 1rem;
        border-radius: var(--border-radius-4);
        font-size: 0.875rem;
        text-decoration: none;
        background-color: var(--accent-primary);
        color: var(--project-link);
      }
      .project-link:hover {
        opacity: 0.9;
      }
    `}</style>
  </a>
)

export default Projects
