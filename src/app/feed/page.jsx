'use client';
import { useState, useEffect } from 'react';
import { getAllRecipes } from '@/services/recipe.service';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

export default function FeedPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getAllRecipes();
        setRecipes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="space-y-8">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Recipe Header */}
            <div className="p-4 flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                {recipe.author?.profileImage && (
                  <Image
                    src={recipe.author.profileImage}
                    alt={recipe.author.name}
                    width={32}
                    height={32}
                    className="mx-auto"
                  />
                )}
              </div>
              <Link href={`/profile/${recipe.author?._id}`} className="font-medium hover:underline">
                {recipe.author?.name || 'Anonymous'}
              </Link>
            </div>

            {/* Recipe Image */}
            <div className="relative aspect-square">
              {recipe.images?.[0] ? (
                <Image
                  src={recipe.images[0]}
                  alt={recipe.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>

            {/* Recipe Actions */}
            <div className="p-4">
              <div className="flex space-x-4 mb-4">
                <button className="hover:text-red-500">
                  <Heart className="h-6 w-6" />
                </button>
                <button className="hover:text-blue-500">
                  <MessageCircle className="h-6 w-6" />
                </button>
                <button className="hover:text-green-500">
                  <Share2 className="h-6 w-6" />
                </button>
              </div>

              {/* Recipe Content */}
              <Link href={`/recipe/${recipe._id}`}>
                <h2 className="font-bold text-xl mb-2 hover:text-blue-600">{recipe.title}</h2>
              </Link>
              <p className="text-gray-600 mb-2 line-clamp-2">{recipe.description}</p>
              
              {/* Recipe Details */}
              <div className="text-sm text-gray-500">
                <span>{recipe.cookingTime} mins • </span>
                <span>{recipe.difficulty} • </span>
                <span>{recipe.servings} servings</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}