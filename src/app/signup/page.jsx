'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-black">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="max-w-md mx-auto bg-card p-8 rounded-lg shadow-lg border border-white border-opacity-10 dark:bg-black"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            href="/"
            className="text-muted-foreground hover:text-foreground transition-colors mb-6 inline-block"
          >
            ← Home
          </Link>
          
          <div className="flex items-center gap-3 mb-8">
            <h1 className="text-3xl font-bold text-foreground">Join Our Kitchen</h1>
            <span className="text-3xl">🧑‍🍳</span>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-foreground mb-1.5">
                Chef Name/Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground  focus:ring-primary focus:border-transparent transition-colors dark:bg-black"
                placeholder="What should we call you?"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-primary focus:border-transparent transition-colors dark:bg-black"
                placeholder="chef@dishly.kitchen"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
                Secret Ingredient/Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground  focus:ring-primary focus:border-transparent transition-colors dark:bg-black"
                placeholder="Create your secret recipe"
                required
                minLength={8}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-1.5">
                Confirm Secret Ingredient/Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-primary focus:border-transparent transition-colors dark:bg-black"
                placeholder="Confirm your secret recipe"
                required
                minLength={8}
              />
            </div>

            <motion.button
              type="submit"
              className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              Start Cooking
            </motion.button>

            <p className="text-center text-sm text-muted-foreground">
              Already a chef?{' '}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Return to Kitchen
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
} 