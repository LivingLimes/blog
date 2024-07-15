import React from "react"

const Card = ({ children, classes = "" }) => {
  return (
    <>
      <div className={`card${classes !== "" ? ` ${classes}` : ""}`}>
        {children}
      </div>
      <style jsx>{`
        .card {
          background-color: var(--bg-secondary);
          border-radius: var(--border-radius-4);
          box-shadow: var(--box-shadow);
          padding: 1rem;
        }
      `}</style>
    </>
  )
}

export default Card
