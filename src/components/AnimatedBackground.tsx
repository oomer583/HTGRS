import { motion } from 'motion/react';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Primary Blob */}
      <motion.div
        animate={{
          x: [0, 100, -100, 0],
          y: [0, -100, 100, 0],
          scale: [1, 1.2, 1],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-[800px] h-[800px] bg-brand-primary/10 rounded-full blur-[120px] -top-96 -left-96"
      />

      {/* Accent Blob */}
      <motion.div
        animate={{
          x: [0, -150, 150, 0],
          y: [0, 150, -150, 0],
          scale: [1, 1.3, 0.8, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[100px] bottom-0 right-0"
      />

      {/* Flickering Ambient Lights */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`flicker-${i}`}
            initial={{ 
              opacity: 0,
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%"
            }}
            animate={{ 
              opacity: [0, 0.2, 0.1, 0.3, 0],
              scale: [1, 1.2, 1, 1.1, 1]
            }}
            transition={{ 
              duration: 4 + Math.random() * 6, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
            className="absolute w-64 h-64 bg-brand-primary/10 rounded-full blur-[80px]"
          />
        ))}
      </div>

      {/* Floating Particles/Shapes for extra depth */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: 0,
              scale: 0.5
            }}
            animate={{ 
              y: ["-10%", "110%"],
              opacity: [0, 0.5, 0],
              scale: [0.5, 1, 0.5],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 15 + Math.random() * 20, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 10
            }}
            className="absolute w-1 h-1 bg-white rounded-full blur-xs"
          />
        ))}
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,12,0.8)_100%)]"></div>
    </div>
  );
}
