import { motion } from 'motion/react';
import { Send, Mail, MapPin, Phone, Github } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="glass-card grid grid-cols-1 lg:grid-cols-2 gap-16 p-12 md:p-20 overflow-hidden relative">
        <div className="z-10">
          <span className="label-micro mb-4 block text-brand-primary">İletişim</span>
          <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight mb-8">Hadi Bir Şeyler İnşa Edelim</h2>
          <p className="text-slate-400 mb-12 max-w-sm leading-relaxed">
            Yeni bir proje, iş birliği veya sadece merhaba demek için bana ulaşabilirsiniz. 
            Mesajlarınıza en kısa sürede dönüş sağlayacağım.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {[
              { icon: Mail, label: "E-Posta", value: "ardaanisancii@gmail.com", href: "mailto:ardaanisancii@gmail.com" },
              { icon: Phone, label: "WhatsApp", value: "+90 552 223 11 41", href: "https://wa.me/905522231141" },
              { icon: Github, label: "GitHub", value: "@ardaanisancii", href: "https://github.com/ardaanisancii" },
            ].map((item, index) => (
              <a key={index} href={item.href} target="_blank" rel="noreferrer" className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all shadow-lg group-hover:shadow-brand-primary/20">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold block">{item.label}</span>
                  <span className="text-base font-semibold group-hover:text-white transition-colors">{item.value}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="z-10 flex items-center justify-center">
          <div className="w-full max-w-xs space-y-8">
            <div className="flex justify-center gap-6">
              {/* Future placeholders for Instagram/GitHub if needed in this section */}
            </div>
          </div>
        </div>

        {/* Decorative blob in contact card */}
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-primary/10 blur-3xl rounded-full" />
      </div>
    </section>
  );
}
