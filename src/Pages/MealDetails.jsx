
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MealDetails = () => {
  const { id } = useParams(); // Get the meal ID from the URL
  const [mealDetails, setMealDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/menu/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch meal details');
        }
        const data = await response.json();
        setMealDetails(data); // Set meal details in state
      } catch (err) {
        console.error(err);
        setError(err.message); // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchMealDetails();
  }, [id]); // Dependency on `id`, so it refetches when `id` changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="meal-details p-5 bg-gray-100 rounded-lg w-9/12 mx-auto">
      <h1 className="text-3xl font-bold mb-4">{mealDetails?.name}</h1>
      <div className="meal-info">
        <p><strong>Description:</strong> {mealDetails?.description || 'No description available'}</p>
        <p><strong>Price:</strong> ${mealDetails?.price || 'N/A'}</p>
        <p><strong>Requests Count:</strong> {mealDetails?.mealRequestCount || 0}</p>
      </div>

      <div className="meal-actions mt-4">
        {/* If you have actions like Edit or Like, you can add buttons here */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Like Meal
        </button>
        {/* Other action buttons */}
      </div>
    </div>
  );
};

export default MealDetails;


