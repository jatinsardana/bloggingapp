import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// import { Signin } from '../pages/Signin';

const FrontPage = () => {
  const [theme, setTheme] = useState('light');
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const pageVariants = {
    initial: { opacity: 0, y: -50 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: 50 }
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div 
      className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'} justify-center items-center p-6 transition-colors duration-500`}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      <button 
        onClick={toggleTheme} 
        className="absolute top-4 right-4 p-2 rounded-full bg-opacity-20 hover:bg-opacity-30 transition-colors duration-300"
      >
        {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
      </button>
      
      <div className="text-center max-w-2xl">
        <motion.h1 
          className="text-5xl font-bold mb-3"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Blog Heaven
        </motion.h1>
        <motion.p 
          className="text-xl mb-8 italic"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          "Express your thoughts. Share your voice."
        </motion.p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
          <motion.button 
            onClick={() => navigate('/signup')}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition duration-300 text-lg font-semibold"
          >
            Get Started
          </motion.button>
          <motion.button 
            onClick={() => navigate('/signin')}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className={`w-full sm:w-auto ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} border border-gray-300 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition duration-300 text-lg font-semibold`}
          >
            Sign In
          </motion.button>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <button 
            onClick={() => setShowMore(!showMore)} 
            className="flex items-center text-lg hover:underline focus:outline-none"
          >
            Learn More
            <ChevronDown className={`ml-1 transform transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`} size={20} />
          </button>
        </motion.div>
        {showMore && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 text-left"
          >
            <h2 className="text-2xl font-semibold mb-2">Why Choose Blog Heaven?</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Intuitive and user-friendly interface</li>
              <li>Robust content management system</li>
              <li>SEO optimization tools</li>
              <li>Active community of writers and readers</li>
            </ul>
          </motion.div>
        )}
      </div>
      <footer className="absolute bottom-4 text-sm">
        Crafted with ❤️ by Jatin Sardana
      </footer>
    </motion.div>
  );
};

export default FrontPage;