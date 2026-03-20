export default function Footer() {
  return (
    <div className="flex justify-center gap-6 py-8 mt-10">
      <a
        href="https://www.linkedin.com/in/nithin-seshadri-b5703766/"
        target="_blank"
        rel="noopener noreferrer"
        title="LinkedIn"
        className="footer-icon inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 hover:-translate-y-0.5"
        style={{
          background: 'var(--color-icon-bg)',
          color: 'var(--color-text-muted)',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
        </svg>
      </a>

      <a
        href="https://github.com/sesh11"
        target="_blank"
        rel="noopener noreferrer"
        title="GitHub"
        className="footer-icon inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 hover:-translate-y-0.5"
        style={{
          background: 'var(--color-icon-bg)',
          color: 'var(--color-text-muted)',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.271.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.202 2.397.1 2.65.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.164 22 16.417 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      </a>

      <a
        href="https://x.com/seshadrinithin"
        target="_blank"
        rel="noopener noreferrer"
        title="X / Twitter"
        className="footer-icon inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 hover:-translate-y-0.5"
        style={{
          background: 'var(--color-icon-bg)',
          color: 'var(--color-text-muted)',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      <a
        href="https://substack.com/@nithinseshadri"
        target="_blank"
        rel="noopener noreferrer"
        title="Substack"
        className="footer-icon inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 hover:-translate-y-0.5"
        style={{
          background: 'var(--color-icon-bg)',
          color: 'var(--color-text-muted)',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24l9.56-5.26L20.539 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
        </svg>
      </a>
    </div>
  )
}
