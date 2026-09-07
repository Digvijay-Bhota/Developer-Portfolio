import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiHome, FiUser, FiCode, FiBriefcase, FiMail, FiGithub, FiFileText } from 'react-icons/fi';
import { projectsData } from '../data/projects';
import './CommandPalette.css';

const ACTIONS = [
  { id: 'home', label: 'Go to Home', icon: <FiHome />, type: 'nav', path: '/' },
  { id: 'about', label: 'Go to About', icon: <FiUser />, type: 'scroll', target: 'about' },
  { id: 'skills', label: 'Go to Skills', icon: <FiCode />, type: 'scroll', target: 'skills' },
  { id: 'projects', label: 'Go to Projects', icon: <FiBriefcase />, type: 'scroll', target: 'projects' },
  { id: 'contact', label: 'Go to Contact', icon: <FiMail />, type: 'scroll', target: 'contact' },
  { id: 'github', label: 'Open GitHub', icon: <FiGithub />, type: 'link', href: 'https://github.com/Digvijay-Bhota' },
  { id: 'resume', label: 'Download Resume', icon: <FiFileText />, type: 'link', href: '/Digvijay_Bhota_Resume.pdf' },
  ...projectsData.map(p => ({
    id: `project-${p.slug}`,
    label: `View Project: ${p.title}`,
    icon: <FiBriefcase />,
    type: 'nav',
    path: `/project/${p.slug}`
  }))
];

export default function CommandPalette({ open, setOpen }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const filteredActions = ACTIONS.filter(a => a.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === 'Escape' && open) {
        e.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    const handleCustom = () => setOpen(true);
    window.addEventListener('openCmd', handleCustom);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('openCmd', handleCustom);
    };
  }, [open, setOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleAction = (action) => {
    setOpen(false);
    if (action.type === 'nav') {
      navigate(action.path);
      // Wait for navigation then scroll to top
      setTimeout(() => window.scrollTo(0, 0), 100);
    } else if (action.type === 'scroll') {
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => document.getElementById(action.target)?.scrollIntoView({ behavior: 'smooth' }), 300);
      } else {
        document.getElementById(action.target)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (action.type === 'link') {
      window.open(action.href, '_blank');
    }
  };

  const onKeyDown = (e) => {
    if (!open) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredActions.length);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % filteredActions.length);
    }
    if (e.key === 'Enter' && filteredActions[selectedIndex]) {
      e.preventDefault();
      handleAction(filteredActions[selectedIndex]);
    }
  };

  if (!open && !query) return null;

  return (
    <div className={`cmd-backdrop ${open ? 'open' : ''}`} onClick={() => setOpen(false)}>
      <div className="cmd-palette" onClick={e => e.stopPropagation()} onKeyDown={onKeyDown}>
        <div className="cmd-input-wrap">
          <FiSearch className="cmd-icon" />
          <input
            ref={inputRef}
            className="cmd-input"
            placeholder="Search commands... (Cmd + K)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="cmd-results">
          {filteredActions.length === 0 ? (
            <div className="cmd-item" style={{justifyContent: 'center', color: 'var(--text-muted)'}}>No results found.</div>
          ) : (
            filteredActions.map((action, idx) => (
              <div
                key={action.id}
                className={`cmd-item ${idx === selectedIndex ? 'selected' : ''}`}
                onClick={() => handleAction(action)}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <span className="cmd-item-icon">{action.icon}</span>
                <span>{action.label}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
