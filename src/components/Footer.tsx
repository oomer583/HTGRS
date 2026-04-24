import React, { useState } from 'react';
import { AdminModal } from './AdminModal';
import { Shield } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export function Footer({ onOpenAdmin }: FooterProps) {
  return (
    <footer className="relative mt-24 pt-24 pb-12 px-6 overflow-hidden bg-black/40 backdrop-blur-sm">
      {/* Subtle Glow Effect at the top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-linear-to-r from-transparent via-brand-primary/50 to-transparent" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10" />
      
      {/* Background radial gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.05)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-8">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 shrink-0 transition-transform group-hover:scale-105">
                <img 
                  src="https://media.discordapp.net/attachments/1496117674554425434/1496874543279771688/image1_1.jpeg?ex=69eb788d&is=69ea270d&hm=df2f58d2b0f4606b7b8c878970c8429170bf0b4fa9ce5ff54fac78a9d5ba7bae&=&format=webp&width=616&height=821" 
                  alt="Arda Nişancı" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-2xl font-display font-bold tracking-tight text-white group-hover:text-brand-primary transition-colors italic">ARDA NİŞANCI</span>
            </a>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              Ölçeklenebilir mimariler ve yüksek performanslı backend çözümleri üreten yazılım mühendisi. 
              Karmaşıklığı koda dökerek sadeleştiriyoruz.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/ardaanisancii" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/5 bg-white/5 flex items-center justify-center text-slate-400 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all shadow-lg">
                <Shield className="w-4 h-4" />
              </a>
              {/* Other icons could go here */}
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12 lg:pl-12">
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-black">Navigasyon</span>
              <ul className="space-y-4">
                <li><a href="#work" className="text-sm text-slate-300 hover:text-white transition-colors relative group w-fit block">Çalışmalar <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-primary transition-all group-hover:w-full"></span></a></li>
                <li><a href="#about" className="text-sm text-slate-300 hover:text-white transition-colors relative group w-fit block">Hakkımda <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-primary transition-all group-hover:w-full"></span></a></li>
                <li><a href="#contact" className="text-sm text-slate-300 hover:text-white transition-colors relative group w-fit block">İletişim <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-primary transition-all group-hover:w-full"></span></a></li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-black">Platformlar</span>
              <ul className="space-y-4">
                <li><a href="https://github.com/ardaanisancii" target="_blank" rel="noreferrer" className="text-sm text-slate-300 hover:text-white transition-colors flex items-center gap-2 group">GitHub <span className="w-1 h-1 rounded-full bg-brand-primary opacity-0 group-hover:opacity-100 transition-opacity"></span></a></li>
                <li><a href="https://www.linkedin.com/in/arda-ni%C5%9Fanc%C4%B1-bbb505366/" target="_blank" rel="noreferrer" className="text-sm text-slate-300 hover:text-white transition-colors flex items-center gap-2 group">LinkedIn <span className="w-1 h-1 rounded-full bg-brand-primary opacity-0 group-hover:opacity-100 transition-opacity"></span></a></li>
                <li><a href="https://wa.me/905522231141" target="_blank" rel="noreferrer" className="text-sm text-slate-300 hover:text-white transition-colors flex items-center gap-2 group">WhatsApp <span className="w-1 h-1 rounded-full bg-brand-primary opacity-0 group-hover:opacity-100 transition-opacity"></span></a></li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-black">Durum</span>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider">İş Birliğine Açık</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Yeni backend projeleri için müsaitlik durumum aktif.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <span className="text-[9px] text-slate-600 font-mono tracking-widest">EST. 2026</span>
            <div className="w-1 h-1 rounded-full bg-white/10" />
            <span className="text-[9px] text-slate-600 font-mono tracking-widest uppercase">KOD İLE İNŞA EDİLDİ</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex gap-6">
              <a href="#" className="text-[10px] text-slate-500 hover:text-white transition-colors font-bold uppercase tracking-wider">Gizlilik</a>
              <a href="#" className="text-[10px] text-slate-500 hover:text-white transition-colors font-bold uppercase tracking-wider">Şartlar</a>
            </div>
            
            <button 
              onClick={onOpenAdmin}
              className="text-white/10 hover:text-white/40 transition-colors p-2 cursor-pointer"
              title="Yönetici Paneli"
            >
              <Shield className="w-3 h-3" />
            </button>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <span className="text-[10px] text-slate-700 font-mono italic">
            © {new Date().getFullYear()} ARDA NİŞANCI — Tüm Hakları Saklıdır.
          </span>
        </div>
      </div>
    </footer>
  );
}
