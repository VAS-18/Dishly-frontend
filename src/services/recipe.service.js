import axiosInstance from '@/lib/axios';

export const getAllRecipes = async () => {
  try {
    const response = await axiosInstance.get('/recipe');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getRecipeById = async (id) => {
  try {
    const response = await axiosInstance.get(`/recipe/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createRecipe = async (recipeData) => {
  try {
    const formData = new FormData();

    if (recipeData.images) {
      formData.append('images', recipeData.images);
    }
    const recipeDetails = { ...recipeData };
    delete recipeDetails.images;
    formData.append('recipe', JSON.stringify(recipeDetails));

    const response = await axiosInstance.post('/recipe', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateRecipe = async (id, recipeData) => {
  try {
    const response = await axiosInstance.put(`/recipe/${id}`, recipeData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteRecipe = async (id) => {
  try {
    const response = await axiosInstance.delete(`/recipe/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}; 

export const getFeed = async () => {
    try {
      const response = await axiosInstance.get('/feed');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
}