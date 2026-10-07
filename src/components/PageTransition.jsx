import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  return (
    <>
      {/* Page Content with Slide Up / Fade Out */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>

      {/* Curtain Overlay for Transitions */}
      <motion.div
        className="fixed inset-0 bg-brand-surface z-[9999] pointer-events-none origin-bottom"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />
    </>
  );
};

export default PageTransition;
