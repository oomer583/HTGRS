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
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from './lib/firebase';

import { AdminModal } from './components/AdminModal';

export default function App() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    console.log('Firestore listener başlatılıyor...');
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log('Firestore snapshot alındı, doküman sayısı:', snapshot.docs.length);
      const projectsData = snapshot.docs.map(doc => {
        const data = doc.data();
        if (!doc.id) console.error("HATA: doc.id bulunamadı!", doc);
        return {
          id: doc.id,
          ...data
        };
      });
      console.log("Mevcut Proje ID'leri:", projectsData.map(p => p.id));
      setProjects(projectsData);
      setLoading(false);
    }, (error) => {
      console.error('Firestore listener hatası:', error);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg selection:bg-brand-primary selection:text-white overflow-x-hidden">
      <AnimatedBackground />
      
      <Navbar />
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
    </div>
  );
}
