'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { login } from '@/services/auth.service';
import Loading from '@/components/ui/Loading';

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Show success message if user just registered
    if (searchParams.get('registered') === 'true') {
      setSuccess('Registration successful! Please login with your credentials.');
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const credentials = {
        email: formData.email,
        password: formData.password
      };

      const result = await login(credentials);
      
      if (result.message === "Login Successful") {
        router.push('/feed');
      }
    } catch (err) {
      setError(err.message || 'Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if(isLoading){
    return(
      <Loading />
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Suspense fallback={<Loading />}>
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
            <h1 className="text-3xl font-bold text-foreground">Welcome Back, Chef</h1>
            <span className="text-3xl">👋</span>
          </div>
          
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-destructive/15 text-destructive p-3 rounded-lg mb-6 text-sm"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-500/15 text-green-600 p-3 rounded-lg mb-6 text-sm"
            >
              {success}
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
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
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-3 focus:ring-primary focus:border-transparent transition-colors dark:bg-black"
                placeholder="chef@dishly.kitchen"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
                Secret Ingredient
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:border-transparent transition-colors dark:bg-black"
                placeholder="Your secret recipe"
                required
                minLength={8}
                disabled={isLoading}
              />
            </div>

            <motion.button
              type="submit"
              className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: isLoading ? 1 : 1.01 }}
              whileTap={{ scale: isLoading ? 1 : 0.99 }}
              disabled={isLoading}
            >
              {isLoading ? 'Entering Kitchen...' : 'Enter Kitchen'}
            </motion.button>

            <div className="text-center space-y-4">
              <Link 
                href="/reset" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Forgot your secret ingredient?
              </Link>
              
              <p className="text-sm text-muted-foreground">
                New to the kitchen?{' '}
                <Link href="/signup" className="text-primary hover:underline font-medium">
                  Join Dishly
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
    </Suspense>
  );
} 