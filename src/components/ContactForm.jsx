import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import MagneticButton from './MagneticButton';

const ContactForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const nextStep = () => {
    if (step === 1 && (!formData.name || !formData.email)) return;
    if (step === 2 && !formData.phone) return;
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      const text = `Hi, I would like to get in touch. Here are my details:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nProject: ${formData.project || 'General Inquiry'}\nMessage: ${formData.message || 'N/A'}`;
      window.open(`https://wa.me/919669600031?text=${encodeURIComponent(text)}`, '_blank');
      
      // Fire confetti
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#C6F432', '#ffffff', '#000000']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#C6F432', '#ffffff', '#000000']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());

    }, 800);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center h-full space-y-6 text-center py-12"
      >
        <div className="w-24 h-24 rounded-full bg-brand-accent flex items-center justify-center text-brand-text">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5"></path>
          </svg>
        </div>
        <h3 className="font-serif text-3xl md:text-5xl text-brand-text">Message Received</h3>
        <p className="text-brand-text opacity-60 font-light max-w-sm">Thank you for your interest. A member of our concierge team will contact you shortly.</p>
        <MagneticButton>
          <button 
            onClick={() => { setSuccess(false); setStep(1); setFormData({name: '', email: '', phone: '', project: '', message: ''}); }}
            className="uppercase tracking-widest text-[10px] font-bold text-brand-accent hover:text-brand-text transition-colors mt-8"
          >
            Send Another Message &rarr;
          </button>
        </MagneticButton>
      </motion.div>
    );
  }

  return (
    <div className="relative overflow-hidden min-h-[400px]">
      <div className="mb-8 flex space-x-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`h-1 w-12 transition-colors duration-500 ${step >= s ? 'bg-brand-accent' : 'bg-gray-300'}`} />
        ))}
      </div>

      <AnimatePresence mode="wait" custom={1}>
        {step === 1 && (
          <motion.form
            key="step1"
            custom={1}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="space-y-8"
            onSubmit={(e) => { e.preventDefault(); nextStep(); }}
          >
            <h3 className="font-serif text-3xl text-brand-text mb-6">Let's start with your details.</h3>
            <FloatingInput label="Full Name" name="name" type="text" value={formData.name} onChange={handleChange} required />
            <FloatingInput label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required />
            
            <div className="pt-4">
              <MagneticButton>
                <button type="submit" className="bg-brand-accent text-brand-surface uppercase tracking-widest text-[10px] font-bold px-10 py-4 hover:bg-brand-surface hover:text-white transition-colors">
                  Next Step &rarr;
                </button>
              </MagneticButton>
            </div>
          </motion.form>
        )}

        {step === 2 && (
          <motion.form
            key="step2"
            custom={1}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="space-y-8"
            onSubmit={(e) => { e.preventDefault(); nextStep(); }}
          >
            <h3 className="font-serif text-3xl text-brand-text mb-6">How can we reach you?</h3>
            <FloatingInput label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
            
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-brand-accent font-bold mb-4">Project of Interest</label>
              <select 
                name="project" 
                value={formData.project}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-gray-300 py-3 text-brand-text focus:outline-none focus:border-brand-accent transition-colors appearance-none"
              >
                <option value="" className="bg-brand-surface-alt">Select a Project</option>
                <option value="NM Heritage" className="bg-brand-surface-alt">NM Heritage</option>
                <option value="NM Grande" className="bg-brand-surface-alt">NM Grande</option>
                <option value="NM London Villas" className="bg-brand-surface-alt">NM London Villas</option>
                <option value="General Inquiry" className="bg-brand-surface-alt">General Inquiry</option>
              </select>
            </div>

            <div className="pt-4 flex items-center space-x-6">
              <button type="button" onClick={prevStep} className="text-brand-text opacity-60 hover:text-brand-text uppercase tracking-widest text-[10px] font-bold transition-colors">
                &larr; Back
              </button>
              <MagneticButton>
                <button type="submit" className="bg-brand-accent text-brand-surface uppercase tracking-widest text-[10px] font-bold px-10 py-4 hover:bg-brand-surface hover:text-white transition-colors">
                  Next Step &rarr;
                </button>
              </MagneticButton>
            </div>
          </motion.form>
        )}

        {step === 3 && (
          <motion.form
            key="step3"
            custom={1}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="space-y-8"
            onSubmit={handleSubmit}
          >
            <h3 className="font-serif text-3xl text-brand-text mb-6">Any specific requirements?</h3>
            
            <div className="relative pt-6">
              <textarea 
                name="message" 
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full bg-transparent border-b border-gray-300 py-3 text-brand-text focus:outline-none focus:border-brand-accent transition-colors peer resize-none"
                placeholder=" "
              />
              <label className={`absolute left-0 top-0 text-[10px] uppercase tracking-widest font-bold transition-all duration-300 peer-focus-within:text-brand-accent peer-focus-within:top-0 peer-placeholder-shown:top-6 peer-placeholder-shown:text-brand-text opacity-60 text-brand-accent`}>
                Message (Optional)
              </label>
            </div>

            <div className="pt-4 flex items-center space-x-6">
              <button type="button" onClick={prevStep} className="text-brand-text opacity-60 hover:text-brand-text uppercase tracking-widest text-[10px] font-bold transition-colors">
                &larr; Back
              </button>
              
              <MagneticButton>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-brand-accent text-brand-surface uppercase tracking-widest text-[10px] font-bold px-10 py-4 hover:bg-brand-surface hover:text-white transition-colors relative overflow-hidden flex justify-center w-40"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-4 h-4 border-2 border-brand-surface-alt border-t-transparent rounded-full"
                    />
                  ) : (
                    "Submit"
                  )}
                </button>
              </MagneticButton>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

const FloatingInput = ({ label, name, type, value, onChange, required }) => (
  <div className="relative pt-6">
    <input 
      type={type} 
      name={name} 
      value={value}
      onChange={onChange}
      required={required}
      className="w-full bg-transparent border-b border-gray-300 py-3 text-brand-text focus:outline-none focus:border-brand-accent transition-colors peer"
      placeholder=" "
    />
    <label className={`absolute left-0 pointer-events-none text-[10px] uppercase tracking-widest font-bold transition-all duration-300 ${value ? 'top-0 text-brand-accent' : 'top-9 text-brand-text opacity-60 peer-focus:top-0 peer-focus:text-brand-accent'}`}>
      {label} {required && '*'}
    </label>
  </div>
);

export default ContactForm;
