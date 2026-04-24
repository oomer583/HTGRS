import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Twitter, ChevronDown } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 overflow-hidden">
      <motion.div 
        className="max-w-4xl w-full text-center z-10"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Şu An Müsait</span>
        </motion.div>

        <motion.h1 
          className="text-6xl md:text-8xl font-display font-medium leading-tight tracking-tight mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="text-white">Karmaşıklığı</span> <br />
          <span className="text-gradient font-bold">Mantıkla Yönetirim</span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Ölçeklenebilir sistemler, yüksek performanslı API'lar ve güvenli veritabanı mimarileri geliştiriyorum. 
          Arka yüz (Backend) teknolojilerinde uzmanlaşmış bir mühendisim.
        </motion.p>

        <motion.div 
          className="flex flex-wrap items-center justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <a href="#work" className="btn-primary">Projelerimi Gör</a>
          <a href="#contact" className="px-8 py-3 rounded-full border border-white/10 font-semibold hover:bg-white/5 transition-all">İletişim</a>
        </motion.div>
      </motion.div>
    </section>
  );
}
