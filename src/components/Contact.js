import React, { useRef, useState, useEffect } from 'react';
import './Contact.css';

const socials = [
  { label: 'GitHub', href: 'https://github.com/Digvijay-Bhota', icon: '⭐' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/digvijay-bhota/', icon: '💼' },
  { label: 'Instagram', href: 'https://www.instagram.com/__digvijay__007/', icon: '📸' },
  { label: 'X', href: 'https://x.com/BhotaDigvijay', icon: '🐦' }
];

export default function Contact() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el, i) => {
              setTimeout(() => el.classList.add('revealed'), i * 100);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulated send (replace with EmailJS or your API)
    await new Promise(r => setTimeout(r, 1600));
    setStatus('sent');
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <section className="section contact-section" id="contact" ref={sectionRef}>
      <div className="container">
        <div className="contact-header reveal">
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">
            Let's <span className="gradient-text">Work Together</span>
          </h2>
          <p className="contact-subtitle">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left: Info */}
          <div className="contact-info reveal-left">
            <div className="info-card">
              <div className="info-icon">📧</div>
              <div>
                <h4>Email</h4>
                <a href="mailto:digvijaybhota777@gmail.com">digvijaybhota777@gmail.com</a>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">📍</div>
              <div>
                <h4>Location</h4>
                <p>Mohali, Punjab, India</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">⏰</div>
              <div>
                <h4>Availability</h4>
                <p>Open to full-time & freelance opportunities</p>
              </div>
            </div>

            <div className="socials-row">
              <h4 className="socials-label">Find me on</h4>
              <div className="socials">
                {socials.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="social-btn"
                    title={s.label}
                  >
                    <span className="social-icon">{s.icon}</span>
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-form-wrap reveal-right">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className={`btn-primary form-submit ${status}`}
                disabled={status === 'sending'}
              >
                <span>
                  {status === 'idle' && '✉ Send Message'}
                  {status === 'sending' && '⟳ Sending...'}
                  {status === 'sent' && '✓ Message Sent!'}
                  {status === 'error' && '✕ Try Again'}
                </span>
              </button>

              {status === 'sent' && (
                <p className="form-success">
                  🎉 Thanks! I'll get back to you within 24 hours.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
