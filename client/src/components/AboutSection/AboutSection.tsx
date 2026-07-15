import { CheckCircle, Zap, Shield } from 'lucide-react';
import './AboutSection.css';

export function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-header">
        <h2>Elevate Your Workflow</h2>
        <p>TaskForge is a premium task management solution designed for modern professionals. Experience lightning-fast interactions and a clutter-free interface that puts your productivity first.</p>
      </div>
      
      <div className="about-features">
        <div className="feature-card">
          <div className="feature-icon">
            <Zap size={24} />
          </div>
          <h3>Lightning Fast</h3>
          <p>Optimized for speed and efficiency, ensuring your workflow remains uninterrupted.</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">
            <CheckCircle size={24} />
          </div>
          <h3>Clean Organization</h3>
          <p>A minimalist, distraction-free environment that helps you focus on what truly matters.</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">
            <Shield size={24} />
          </div>
          <h3>Reliable & Secure</h3>
          <p>Built on modern web technologies to provide a stable and consistent experience.</p>
        </div>
      </div>
    </section>
  );
}
