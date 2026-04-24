import { motion } from 'motion/react';
import { Layout, Shield, Zap, Globe, Cpu, Smartphone } from 'lucide-react';

const coreSkills = [
  { icon: Globe, title: "Arka Yüz (Backend)", desc: "Node.js, Go ve Python ile ölçeklenebilir sunucu tarafı mantığı." },
  { icon: Shield, title: "Güvenlik & Yetkilendirme", desc: "JWT, OAuth ve veri şifreleme ile siber güvenlik standartları." },
  { icon: Cpu, title: "Veritabanı Mimarisi", desc: "PostgreSQL, MongoDB ve Redis ile optimize edilmiş veri yapıları." },
  { icon: Zap, title: "Sistem Performansı", desc: "Mikrohizmetler ve yük dengeleme ile yüksek erişilebilirlik." },
  { icon: Layout, title: "API Tasarımı", desc: "RESTful ve GraphQL standartlarında modern API geliştirme." },
  { icon: Smartphone, title: "Hata Yönetimi", desc: "Kritik sistemlerde izleme ve anlık hata çözümleme." }
];

const technologies = [
  "Golang", "C#", "C++", "Python", "Node.js", "SQL"
];

export function Skills() {
  return (
    <section id="skills" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col mb-16">
        <span className="label-micro mb-4 block text-brand-primary">Yetenekler</span>
        <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight">Teknik Uzmanlık</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coreSkills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="glass-card bg-brand-surface/40"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary mb-6">
              <skill.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-3">{skill.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{skill.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 glass rounded-3xl p-8 overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8 max-w-2xl mx-auto">
          {technologies.map((tech, index) => (
            <div key={index} className="flex justify-center">
              <span className="w-full text-center px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold text-slate-300 uppercase tracking-widest hover:border-brand-primary hover:text-brand-primary transition-all cursor-default">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
