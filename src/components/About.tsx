import { motion } from 'motion/react';

export function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col mb-16">
        <span className="label-micro mb-4 block text-brand-primary">Hikayem</span>
        <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight">Kısaca Hakkımda</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-2 glass-card flex flex-col md:flex-row gap-8 items-center">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden shrink-0 border border-white/10">
            <img 
              src="https://media.discordapp.net/attachments/1496117674554425434/1496874543279771688/image1_1.jpeg?ex=69eb788d&is=69ea270d&hm=df2f58d2b0f4606b7b8c878970c8429170bf0b4fa9ce5ff54fac78a9d5ba7bae&=&format=webp&width=616&height=821" 
              alt="Profil"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Merhaba, Ben Arda Nişancı</h3>
            <p className="text-slate-400 leading-relaxed">
              Yaratıcı bir arka yüz (backend) geliştirici olarak, uygulamaların görünmeyen ancak en kritik parçalarını inşa ediyorum. 
              Veri akışını yöneten, güvenliği sağlayan ve sistemlerin pürüzsüz çalışmasını garanti eden yapılar kuruyorum.
            </p>
          </div>
        </div>

        {/* Experience Card */}
        <div className="glass-card flex flex-col justify-center items-center text-center">
          <span className="text-6xl font-display font-bold text-brand-primary mb-2">2+</span>
          <span className="label-micro">Yıllık Deneyim</span>
        </div>

        {/* Philosophy Card */}
        <div className="glass-card md:col-span-1">
          <h4 className="text-lg font-bold mb-4">Felsefem</h4>
          <p className="text-sm text-slate-400 leading-relaxed">
            "Az ama öz." Gereksiz karmaşıklıktan kaçınarak, kullanıcıya en doğrudan ve etkileyici yolu sunmaya çalışıyorum.
          </p>
        </div>

        {/* Stats Card */}
        <div className="glass-card md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">100+</div>
            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Proje</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">40+</div>
            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Müşteri</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">15+</div>
            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Ödül</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">∞</div>
            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Tutku</div>
          </div>
        </div>
      </div>
    </section>
  );
}
