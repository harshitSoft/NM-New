import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

const CountUp = ({ to, suffix = '', duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = (time - startTime) / (duration * 1000);
      
      if (progress < 1) {
        setCount(Math.floor(to * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(to);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [to, duration, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export default CountUp;
