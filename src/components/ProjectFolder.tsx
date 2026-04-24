import React from 'react';
import { X, Folder, Image as ImageIcon, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../data/projects';

interface ProjectFolderProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
}

export function ProjectFolder({ isOpen, onClose, projects }: ProjectFolderProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        />
        
        {/* Window */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-4xl max-h-[80vh] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-slate-800/50 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                <Folder size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">Proje Arşivi</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
            {projects.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <Folder size={48} className="mx-auto mb-4 opacity-20" />
                <p>Arşivde henüz proje bulunmuyor.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => (
                  <motion.div 
                    key={project.id}
                    layoutId={`folder-${project.id}`}
                    className="p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl flex gap-4 hover:border-brand-primary/30 transition-colors"
                  >
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-slate-800">
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600">
                          <ImageIcon size={32} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h3 className="text-white font-semibold truncate mb-1">{project.title}</h3>
                        <div className="flex gap-2 text-slate-400 text-[10px] mb-2">
                          <FileText size={12} />
                          <span className="truncate">Açıklama:</span>
                        </div>
                        <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed italic border-l-2 border-slate-700 pl-2">
                          {project.description}
                        </p>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-[8px] bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded border border-slate-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer status */}
          <div className="p-3 bg-slate-800/20 border-t border-slate-800 text-xs text-slate-500 flex justify-between items-center px-6">
            <span>{projects.length} Öğe</span>
            <span>Yerel Bellek</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
