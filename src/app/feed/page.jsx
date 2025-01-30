'use client';
import { useEffect, useState } from 'react';
import { getFeed } from '@/services/recipe.service';

export default function FeedPage() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadFeed = async () => {
            try {
                const { recipes } = await getFeed();
                setRecipes(recipes);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadFeed();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Recipe Feed</h1>
            
            {loading && <p className="text-center">Loading recipes...</p>}
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recipes.map(recipe => (
                    <div key={recipe._id} className="border rounded-lg p-4 shadow-sm">
                        <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
                        <p className="text-gray-600 mb-3">{recipe.description}</p>
                        <div className="text-sm text-gray-500">
                            By {recipe.user?.username || 'Unknown'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}