'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { register } from '@/services/auth.service';
import Image from 'next/image';

export default function SignUp() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    profileImage: null,
    bio: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!formData.profileImage) {
      setError('Please select a profile image');
      return false;
    }
    if (formData.username.length < 4) {
      setError('Username must be at least 4 characters long');
      return false;
    }
    if (formData.username.length > 20) {
      setError('Username cannot be more than 20 characters long');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    if (formData.password.length > 50) {
      setError('Password cannot be more than 50 characters long');
      return false;
    }
    if (formData.bio && formData.bio.length > 500) {
      setError('Bio cannot be more than 500 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.username.trim());
      formDataToSend.append('email', formData.email.trim());
      formDataToSend.append('password', formData.password);
      formDataToSend.append('profileImage', formData.profileImage);
      if (formData.bio) {
        formDataToSend.append('bio', formData.bio.trim());
      }

      await register(formDataToSend);
      router.push('/login?registered=true');
    } catch (err) {
      setError(err.message || 'Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Image size should be less than 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }

      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex dark:bg-black">
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className='h-screen w-1/2 relative hidden lg:block overflow-hidden'
      >
      <video
          src="/SignUp.mp4"
          autoPlay
          loop
          muted
          playsInline
          className='absolute inset-0 w-full h-full object-cover p-4 border border-black border-opacity-10 dark:border-opacity-20 dark:border-white rounded-2xl opacity-90 dark:opacity-70' 
          />
      </motion.div>
      <div className="container mx-auto px-4 lg:my-auto">
        <motion.div 
          className="max-w-xl mx-auto bg-card p-8 rounded-lg shadow-lg border border-white border-opacity-10 dark:bg-black"
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

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-destructive/15 text-destructive p-3 rounded-lg mb-6 text-sm"
            >
              {error}
            </motion.div>
          )}
          
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
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-primary focus:border-transparent transition-colors dark:bg-black"
                placeholder="What should we call you?"
                required
                disabled={isLoading}
                minLength={4}
                maxLength={20}
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
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-foreground mb-1.5">
                Bio (Optional)
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-primary focus:border-transparent transition-colors dark:bg-black"
                placeholder="Tell us about yourself..."
                disabled={isLoading}
                maxLength={500}
                rows={3}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {formData.bio.length}/500 characters
              </p>
            </div>

            <div>
              <label htmlFor="profileImage" className="block text-sm font-medium text-foreground mb-1.5">
                Profile Picture
              </label>
              <div className="space-y-2">
                {previewImage && (
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <Image
                      src={previewImage}
                      alt="Profile preview"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                )}
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-primary focus:border-transparent transition-colors dark:bg-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  accept="image/*"
                  required
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground">
                  Maximum file size: 5MB. Supported formats: JPG, PNG, GIF
                </p>
              </div>
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
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-primary focus:border-transparent transition-colors dark:bg-black"
                placeholder="Create your secret recipe"
                required
                minLength={8}
                maxLength={50}
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-1.5">
                Confirm Secret Ingredient
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
                maxLength={50}
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
              {isLoading ? 'Creating Account...' : 'Start Cooking'}
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