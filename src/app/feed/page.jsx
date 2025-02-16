"use client"

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { getAllRecipes } from '@/services/recipe.service';
import Loading from '@/components/ui/Loading';

const FeedPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getAllRecipes();
        setRecipes(data || []);
      } catch (error) {
        setError(error.message || 'Failed to fetch recipes');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-destructive/10 rounded-lg">
          <h2 className="text-2xl font-bold text-destructive mb-2">Oops!</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  const getImageUrl = (imageArray) => {
    if (!imageArray || !Array.isArray(imageArray)) return '/placeholder-recipe.jpg';
    if (typeof imageArray[0] === 'object') {
      return Object.values(imageArray[0]).join('') || '/placeholder-recipe.jpg';
    }
    return imageArray[0] || '/placeholder-recipe.jpg';
  };

  return (
    <div className="min-h-screen bg-background dark:bg-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Discover Recipes</h1>
          <Link
            href="/recipe/new"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Share Recipe
          </Link>
        </div>

        {recipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No recipes found. Be the first to share one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <motion.div
                key={recipe._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-white/10"
              >
                <Link href={`/recipe/${recipe._id}`}>
                  <div className="relative h-48 w-full">
                    <Image
                      src={getImageUrl(recipe.images)}
                      alt={recipe.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        {recipe.difficulty}
                      </span>
                      <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        {recipe.cuisine}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-foreground mb-2">{recipe.title}</h2>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                      {recipe.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">
                          By {recipe.author?.username || 'Anonymous Chef'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <span className="text-sm">{recipe.cookingTime} mins</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedPage;