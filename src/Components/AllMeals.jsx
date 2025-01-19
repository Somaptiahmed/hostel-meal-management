import React, { useState, useEffect } from 'react';

const AllMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('likes'); // default sort by likes

  // Fetch meals from the backend
  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/menu');
        if (response.ok) {
          const data = await response.json();
          // Add reviews_count and mealRequestCount dynamically to the fetched meals
          const updatedMeals = data.map(meal => ({
            ...meal,
            reviews_count: meal.reviews ? meal.reviews.length : 0,
            mealRequestCount: meal.mealRequestCount || 0
          }));
          setMeals(updatedMeals);
        } else {
          console.error('Failed to fetch meals');
        }
      } catch (error) {
        console.error('Error fetching meals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  // Delete meal handler
  const handleDelete = async (mealId) => {
    try {
      const response = await fetch(`http://localhost:5000/menu/${mealId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMeals(meals.filter((meal) => meal._id !== mealId));
      } else {
        console.error('Failed to delete meal');
      }
    } catch (error) {
      console.error('Error deleting meal:', error);
    }
  };

  // View meal handler
  const handleViewMeal = (mealId) => {
    console.log(`Viewing meal with ID: ${mealId}`);
    // Implement the navigation to meal details here
  };

  // Update meal handler
  const handleUpdateMeal = (mealId) => {
    console.log(`Updating meal with ID: ${mealId}`);
    // Implement the update functionality (e.g., open a modal or redirect to an edit page)
  };

  // Sort meals by likes or reviews count
  const handleSortChange = (sortCriteria) => {
    setSortBy(sortCriteria);
    setMeals(prevMeals =>
      prevMeals.sort((a, b) => {
        if (sortCriteria === 'likes') {
          return b.likes - a.likes;
        } else if (sortCriteria === 'reviews_count') {
          return b.reviews_count - a.reviews_count;
        }
        return 0;
      })
    );
  };

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-3xl font-bold mb-6">All Meals</h1>
      <div className="mb-4">
        <button
          className={`mr-4 ${sortBy === 'likes' ? 'font-bold' : ''}`}
          onClick={() => handleSortChange('likes')}
        >
          Sort by Likes
        </button>
        <button
          className={`${sortBy === 'reviews_count' ? 'font-bold' : ''}`}
          onClick={() => handleSortChange('reviews_count')}
        >
          Sort by Reviews Count
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">Meal Title</th>
              <th className="px-4 py-2 border">Likes</th>
              <th className="px-4 py-2 border">Reviews Count</th>
              <th className="px-4 py-2 border">Rating</th>
              <th className="px-4 py-2 border">Distributor</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {meals.length > 0 ? (
              meals.map((meal) => (
                <tr key={meal._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{meal.title}</td>
                  <td className="px-4 py-2 border">{meal.likes}</td>
                  <td className="px-4 py-2 border">{meal.reviews_count}</td>
                  <td className="px-4 py-2 border">{meal.rating}</td>
                  <td className="px-4 py-2 border">{meal.distributor}</td>
                  <td className="px-4 py-2 border">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => handleUpdateMeal(meal._id)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => handleDelete(meal._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => handleViewMeal(meal._id)}
                    >
                      View Meal
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No meals available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllMeals;


