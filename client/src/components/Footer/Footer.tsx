import { CheckSquare, Mail } from 'lucide-react';
import './Footer.css';

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container app-container">
        <div className="footer-left">
          <div className="footer-brand">
            <CheckSquare size={16} className="footer-logo" />
            <span>TaskForge</span>
          </div>
          <span className="footer-separator">•</span>
          <span className="footer-tagline">Simple. Fast. Productive.</span>
        </div>
        
        <div className="footer-center">
          <div className="social-links">
            <a href="https://github.com/yasaswini2104" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
              <GithubIcon size={18} />
            </a>
            <a href="https://www.linkedin.com/in/yasaswini-gaddam/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <LinkedinIcon size={18} />
            </a>
            <a href="mailto:yasaswini.gaddam21@gmail.com" className="social-link" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="footer-right">
          <span className="footer-text">&copy; 2026 TaskForge</span>
        </div>
      </div>
    </footer>
  );
}
