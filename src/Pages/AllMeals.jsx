import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Main component
const AllMeals = () => {
  const [selectedCategory, setSelectedCategory] = useState('all'); // Default to "All Meals"
  const [mealsData, setMealsData] = useState([]); // Store fetched meals data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch meals data from API
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch('http://localhost:5000/menu'); // Backend URL
        const data = await response.json();
        setMealsData(data); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching meals data:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchMeals(); // Call the function on component mount
  }, []);

  // Handle category change (All, Breakfast, Lunch, Dinner)
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Filter meals based on selected category
  const filteredMeals = selectedCategory === 'all'
    ? mealsData
    : mealsData.filter(meal => meal.category === selectedCategory);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state until data is fetched
  }

  return (
    <div className="meal-tabs">
      {/* Category Tabs */}
      <div className="tabs flex justify-evenly my-10">
  <button
    onClick={() => handleCategoryChange('all')}
    className="bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded-lg transition-colors duration-300 font-semibold"
  >
    All Meals
  </button>
  <button
    onClick={() => handleCategoryChange('breakfast')}
    className="bg-yellow-200 hover:bg-yellow-300 text-black py-2 px-4 rounded-lg transition-colors duration-300 font-semibold"
  >
    Breakfast
  </button>
  <button
    onClick={() => handleCategoryChange('lunch')}
    className="bg-green-200 hover:bg-green-300 text-black py-2 px-4 rounded-lg transition-colors duration-300 font-semibold"
  >
    Lunch
  </button>
  <button
    onClick={() => handleCategoryChange('dinner')}
    className="bg-red-200 hover:bg-red-300 text-black py-2 px-4 rounded-lg transition-colors duration-300 font-semibold"
  >
    Dinner
  </button>
</div>


      {/* Meal Cards */}
      <div className="meal-cards grid md:grid-cols-3 sm:grid-cols-1 gap-6">
  {filteredMeals.map(meal => (
    <div key={meal._id} className="meal-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img src={meal.image} alt={meal.title} className="w-full h-48 object-cover rounded-md mb-4" />
      <h3 className="meal-title text-2xl font-semibold mb-2">{meal.title}</h3>
      <p className="meal-rating text-sm text-gray-500">Rating: {meal.rating}</p>
      <p className="meal-price text-xl font-bold text-green-600 mb-4">${meal.price}</p>
      <Link to={`/meal/${meal._id}`} className="details-button bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-300">
        Details
      </Link>
    </div>
  ))}
</div>

    </div>
  );
};

export default AllMeals;
