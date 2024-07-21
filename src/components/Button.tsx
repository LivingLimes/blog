import React from 'react'

const Button = ({ isDisabled, children }) => {
  return (
    <>
      <button className="button" disabled={isDisabled}>
        {children}
      </button>
      <style jsx>{`
        .button {
          background-color: var(--accent-primary);
          color: var(--btn-text-inverted);
          border: 1px solid var(--accent-primary);
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
          color: var(--accent-primary);
          background-color: var(--white);
          border: 1px solid var(--accent-primary);
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

export default Button
