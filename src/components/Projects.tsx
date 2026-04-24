import { motion } from 'motion/react';
import { ExternalLink, Github, Database } from 'lucide-react';
import { InteractiveImage } from './InteractiveImage';

interface ProjectsProps {
  projects: any[];
  loading: boolean;
}

export function Projects({ projects, loading }: ProjectsProps) {
  return (
    <section id="work" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <span className="label-micro mb-4 block text-brand-primary">Portfolyo</span>
          <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight">Seçilmiş Çalışmalar</h2>
        </div>
        <p className="text-slate-400 max-w-md text-sm leading-relaxed">
          Dijital dünyada fark yaratan, kullanıcı deneyimi odaklı ve teknik derinliği olan projelerden bir seçki. Projeler canlı olarak veritabanından çekilmektedir.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <div className="w-12 h-12 rounded-full border-2 border-brand-primary/20 border-t-brand-primary animate-spin" />
          <p className="text-sm font-mono text-slate-500 animate-pulse">Veritabanına bağlanılıyor...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const formatLink = (url: string) => {
              if (!url || url === '#') return '#';
              return url.startsWith('http') ? url : `https://${url}`;
            };

            const link1 = formatLink(project.link);
            const link2 = formatLink(project.github);
            const isClickableCard = project.isExternal && link1 !== '#';

            const handleCardClick = () => {
              if (isClickableCard) {
                window.open(link1, '_blank', 'noreferrer');
              }
            };

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={handleCardClick}
                className={`group glass-card h-full overflow-hidden flex flex-col ${isClickableCard ? 'cursor-pointer' : ''}`}
              >
                <div className="relative aspect-video overflow-hidden rounded-2xl">
                  <InteractiveImage 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-brand-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                    <div className="flex gap-4">
                      {link1 !== '#' && (
                        <a 
                          href={link1} 
                          target="_blank" 
                          rel="noreferrer" 
                          onClick={(e) => e.stopPropagation()}
                          className="w-12 h-12 rounded-full bg-white text-brand-bg flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 shadow-xl"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                      {link2 !== '#' && (
                        <a 
                          href={link2} 
                          target="_blank" 
                          rel="noreferrer" 
                          onClick={(e) => e.stopPropagation()}
                          className="w-12 h-12 rounded-full bg-white text-brand-bg flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 shadow-xl delay-75"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 p-8 pt-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {project.tags && project.tags.map((tag: string, tagIndex: number) => (
                        <span key={tagIndex} className="text-[9px] font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 uppercase tracking-widest whitespace-nowrap">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-slate-500 font-mono">0{index + 1}</span>
                  </div>
                  <h3 className="text-2xl font-bold group-hover:text-brand-primary transition-colors">{project.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">{project.description}</p>
                </div>
              </motion.div>
            );
          })}
          {projects.length === 0 && (
            <div className="md:col-span-2 py-32 rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center group hover:border-brand-primary/50 transition-colors">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:text-brand-primary transition-colors">
                <Database className="w-8 h-8" />
              </div>
              <p className="text-slate-500 font-medium">Henüz yayınlanmış bir çalışma bulunmuyor.</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
