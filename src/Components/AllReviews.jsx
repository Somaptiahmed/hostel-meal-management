import React, { useState, useEffect } from 'react';

const AllReviews = () => {
  const [menu, setMenu] = useState([]); // Initialize menu as an empty array
  const [loading, setLoading] = useState(true);

  // Fetch menu data from the backend
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('https://hotel-management-server-dun.vercel.app/menu');
        if (!response.ok) {
          throw new Error('Failed to fetch menu data');
        }
        const data = await response.json();
        setMenu(data || []); // Ensure menu is set to an array
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  // Delete Review Handler
// Edit Review Handler
const handleEdit = async (mealId, reviewIndex) => {
    const newReviewText = prompt('Edit your review:');
    if (!newReviewText) return;
  
    try {
      const response = await fetch(`https://hotel-management-server-dun.vercel.app/menu/${mealId}/reviews/${reviewIndex}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newReviewText }),
      });
      if (response.ok) {
        const updatedMeal = await response.json();
        setMenu((prevMenu) =>
          prevMenu.map((meal) =>
            meal._id === mealId ? { ...meal, reviews: updatedMeal.meal.reviews } : meal
          )
        );
      } else {
        console.error('Failed to update review');
      }
    } catch (error) {
      console.error('Error editing review:', error);
    }
  };
  
  // Delete Review Handler
  const handleDelete = async (mealId, reviewIndex) => {
    try {
      const response = await fetch(`https://hotel-management-server-dun.vercel.app/menu/${mealId}/reviews/${reviewIndex}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedMeal = await response.json();
        setMenu((prevMenu) =>
          prevMenu.map((meal) =>
            meal._id === mealId ? { ...meal, reviews: updatedMeal.meal.reviews } : meal
          )
        );
      } else {
        console.error('Failed to delete review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };
  

  // View Meal Handler
  const handleViewMeal = (mealId) => {
    console.log(`View meal with ID: ${mealId}`);
    // Implement navigation to the meal details page
  };

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-3xl font-bold mb-6">All Reviews</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border">Meal Title</th>
                <th className="px-4 py-2 border">Likes</th>
                <th className="px-4 py-2 border">Review</th>
                <th className="px-4 py-2 border">User</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menu.length > 0 ? (
                menu.map((meal) =>
                  meal?.reviews?.map((review, index) => (
                    <tr key={`${meal._id}-${index}`} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border">{meal.title}</td>
                      <td className="px-4 py-2 border">{meal.likes}</td>
                      <td className="px-4 py-2 border">{review.text}</td>
                      <td className="px-4 py-2 border">{review.user || 'Anonymous'}</td>
                      <td className="px-4 py-2 border">
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                          onClick={() => handleEdit(meal._id, index)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                          onClick={() => handleDelete(meal._id, index)}
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
                )
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No reviews available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllReviews;


