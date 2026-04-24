import { motion } from 'motion/react';
import { Menu, X, Folder } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NavbarProps {
  onOpenFolder?: () => void;
}

export function Navbar({ onOpenFolder }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Çalışmalar', href: '#work' },
    { name: 'Hakkımda', href: '#about' },
    { name: 'Yetenekler', href: '#skills' },
    { name: 'İletişim', href: '#contact' }
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-2xl z-50">
      <div className={`glass rounded-full px-6 py-3 flex items-center justify-between transition-all duration-500 ${isScrolled ? 'shadow-2xl shadow-brand-primary/10 border-white/20' : ''}`}>
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 shrink-0">
            <img 
              src="https://media.discordapp.net/attachments/1496117674554425434/1496874543279771688/image1_1.jpeg?ex=69eb788d&is=69ea270d&hm=df2f58d2b0f4606b7b8c878970c8429170bf0b4fa9ce5ff54fac78a9d5ba7bae&=&format=webp&width=616&height=821" 
              alt="Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm font-bold tracking-tight hidden sm:block">ARDA NİŞANCI</span>
        </a>

        {/* Desktop Nav */}
        <div className="flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              {link.name}
            </a>
          ))}
          
          <button 
            onClick={onOpenFolder}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/40 border border-slate-700/50 text-slate-400 hover:text-brand-primary hover:border-brand-primary/30 transition-all cursor-pointer"
            title="Proje Arşivi"
          >
            <Folder size={14} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:block">Arşiv</span>
          </button>
        </div>

        <a href="#contact" className="hidden sm:block ml-2 px-4 py-1.5 rounded-full bg-white text-brand-bg text-[11px] font-bold hover:bg-brand-primary hover:text-white transition-all">
          İletişim
        </a>

        {/* Mobile Toggle - Not really needed for such a small nav, but for consistency if added back */}
      </div>
    </nav>
  );
}
