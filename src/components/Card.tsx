import React from 'react'

const Card = ({ children, classes = '' }) => {
  return (
    <>
      <div className={`card${classes !== '' ? ` ${classes}` : ''}`}>
        {children}
      </div>
      <style jsx>{`
        .card {
          border: 1px solid vaR(--text-secondary);
          border-radius: var(--border-radius-8);
          padding: 1rem;
        }
      `}</style>
    </>
  )
}

export default Card
