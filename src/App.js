import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';
import Cursor from './components/Cursor';
import Loader, { LOADER_DURATION_MS } from './components/Loader';
import CommandPalette from './components/CommandPalette';
import './App.css';

// Homepage component (all sections on one page)
function HomePage() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Cursor />
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

// Layout wrapper for pages that need the header/footer structure
function PageLayout({ children }) {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Cursor />
      <Navbar />
      <main id="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
}

// Main App component with routing
function App() {
  const [loading, setLoading] = useState(true);
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), LOADER_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <BrowserRouter>
      <div className="App">
        <CommandPalette open={cmdOpen} setOpen={setCmdOpen} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/project/:slug" 
            element={
              <PageLayout>
                <ProjectDetail />
              </PageLayout>
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
