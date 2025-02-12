"use client"

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react'
import { getAllRecipes } from '@/services/recipe.service';

const Post = () => {

const [recipes, setRecipes] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
    const fetchRecipes = async () =>{
        try {

            const getAllrecipes = await getAllRecipes();

            setRecipes(getAllRecipes);
            
        } catch (error) {

            setError(error.message);
        }
        finally{
            setLoading(false);
        }
    };

    fetchRecipes();
}, []);

  return (
    <div className=''>
        
    </div>
  )
}

export default Post