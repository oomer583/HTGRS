/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AnimatedBackground } from './components/AnimatedBackground';
import { useState, useEffect } from 'react';
import { initialProjects, Project } from './data/projects';

import { AdminModal } from './components/AdminModal';
import { ProjectFolder } from './components/ProjectFolder';

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isFolderOpen, setIsFolderOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        } else {
          // Fallback to localStorage if API fails partially
          const savedProjects = localStorage.getItem('my_portfolio_projects');
          if (savedProjects) setProjects(JSON.parse(savedProjects));
          else setProjects(initialProjects);
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        const savedProjects = localStorage.getItem('my_portfolio_projects');
        if (savedProjects) setProjects(JSON.parse(savedProjects));
        else setProjects(initialProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Sync projects with localStorage as secondary backup if needed
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('my_portfolio_projects', JSON.stringify(projects));
    }
  }, [projects]);

  return (
    <div className="min-h-screen bg-brand-bg selection:bg-brand-primary selection:text-white overflow-x-hidden">
      <AnimatedBackground />
      
      <Navbar onOpenFolder={() => setIsFolderOpen(true)} />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects projects={projects} loading={loading} />
        <Skills />
        <Contact />
      </main>
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
      
      <AdminModal 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        existingProjects={projects} 
        setExistingProjects={setProjects}
      />

      <ProjectFolder 
        isOpen={isFolderOpen}
        onClose={() => setIsFolderOpen(false)}
        projects={projects}
      />
    </div>
  );
}
