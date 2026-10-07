import { motion, useTransform } from 'framer-motion';

const AnimatedHeroIllustration = ({ writingProgress, isWritingComplete, mouseX, mouseY }) => {
  // Sync the pen with writing progress
  const handX = useTransform(writingProgress, [0, 1], [0, 150]);
  const handY = useTransform(writingProgress, (p) => Math.sin(p * 40) * 5);

  // Subtly tilt head toward cursor
  // mouseX/mouseY are from -10 to 10
  const headRotateX = useTransform(mouseY || { get: () => 0 }, [-10, 10], [-5, 5]);
  const headRotateY = useTransform(mouseX || { get: () => 0 }, [-10, 10], [-5, 5]);

  return (
    <svg viewBox="0 0 800 600" className="w-full h-full overflow-visible drop-shadow-2xl">
      <defs>
        <filter id="shadow">
          <feDropShadow dx="0" dy="15" stdDeviation="15" floodOpacity="0.1" />
        </filter>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Floating Isometric Mascot Group */}
      <motion.g 
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        transform="translate(400, 300)"
      >
        <g style={{ transform: "rotateX(60deg) rotateZ(45deg)", transformStyle: "preserve-3d" }}>
          
          {/* Desk / Base platform */}
          <path d="M-100,-100 L100,-100 L100,100 L-100,100 Z" fill="#E9E4DB" stroke="#2B4C9B" strokeWidth="2" filter="url(#shadow)" />
          
          {/* Shadow of the mascot */}
          <path d="M-40,-30 L40,-30 L40,30 L-40,30 Z" fill="rgba(43, 76, 155, 0.1)" filter="blur(8px)" />

          {/* Isometric Body (Blue Shirt) */}
          <g transform="translate(0, 0)">
            {/* Top */}
            <path d="M-30,-20 L30,-20 L30,20 L-30,20 Z" fill="#2B4C9B" transform="translate(0,0) translateZ(60px)" />
            {/* Left side */}
            <path d="M-30,-20 L-30,20 L-30,20 L-30,-20 Z" fill="#1D3F84" /> {/* Not strictly true isometric, simulating with flat paths */}
          </g>
        </g>
        
        {/* Fake 2.5D structure because pure SVG 3D is hard without a canvas */}
        {/* We'll just draw the isometric shapes directly */}
        
        <g id="mascot-body" transform="translate(0, 50)">
          {/* Torso Top */}
          <path d="M 0 -70 L 60 -40 L 0 -10 L -60 -40 Z" fill="#2B4C9B" />
          {/* Torso Left */}
          <path d="M -60 -40 L 0 -10 L 0 50 L -60 20 Z" fill="#1D3F84" />
          {/* Torso Right */}
          <path d="M 0 -10 L 60 -40 L 60 20 L 0 50 Z" fill="#244186" />
        </g>

        {/* Head tracking cursor */}
        <motion.g 
          id="mascot-head" 
          style={{ rotateX: headRotateX, rotateY: headRotateY, transformOrigin: '0px -60px' }}
        >
          {/* Neck */}
          <path d="M -10 -50 L 10 -40 L 10 -20 L -10 -30 Z" fill="#fcdbb5" />
          
          {/* Head Top */}
          <path d="M 0 -140 L 40 -120 L 0 -100 L -40 -120 Z" fill="#fcdbb5" />
          {/* Head Left */}
          <path d="M -40 -120 L 0 -100 L 0 -50 L -40 -70 Z" fill="#e8c29c" />
          {/* Head Right */}
          <path d="M 0 -100 L 40 -120 L 40 -70 L 0 -50 Z" fill="#d9b188" />
          
          {/* Glasses / Visor (Architect style) */}
          <path d="M -35 -100 L -5 -85 L -5 -75 L -35 -90 Z" fill="#2B2B2B" />
          <path d="M 5 -85 L 35 -100 L 35 -90 L 5 -75 Z" fill="#2B2B2B" />
        </motion.g>

        {/* Writing Hand */}
        <motion.g 
          id="mascot-hand" 
          style={{ x: handX, y: handY }}
          transform="translate(-20, 20)"
        >
          {/* Hand Box */}
          <path d="M 0 0 L 20 10 L 0 20 L -20 10 Z" fill="#fcdbb5" />
          <path d="M -20 10 L 0 20 L 0 30 L -20 20 Z" fill="#e8c29c" />
          <path d="M 0 20 L 20 10 L 20 20 L 0 30 Z" fill="#d9b188" />
          
          {/* Pen */}
          <path d="M 5 5 L 25 -30 L 30 -25 L 10 10 Z" fill="#2B2B2B" />
          <path d="M 5 5 L 10 10 L 0 15 Z" fill="#D4AF37" />
        </motion.g>
      </motion.g>

      {/* Floating Pencil at the Right */}
      <motion.g
        animate={{ 
          y: [-10, 10, -10],
          rotate: [-5, 5, -5]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        transform="translate(700, 250)"
      >
        <g transform="scale(1.5)">
          {/* Pencil Body */}
          <path d="M -10 -40 L 0 -45 L 10 -40 L 10 40 L 0 45 L -10 40 Z" fill="#D4AF37" />
          {/* Metal ring */}
          <rect x="-10" y="-55" width="20" height="15" fill="#9ca3af" />
          {/* Eraser */}
          <path d="M -10 -55 L 10 -55 L 10 -65 L -10 -65 Z" fill="#f87171" />
          {/* Wood Tip */}
          <path d="M -10 40 L 0 45 L 10 40 L 0 65 Z" fill="#e8c29c" />
          {/* Lead */}
          <path d="M -3 55 L 0 65 L 3 55 Z" fill="#2B2B2B" />
        </g>
      </motion.g>

    </svg>
  );
};

export default AnimatedHeroIllustration;
