import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const MyReviews = () => {
  const { userDetails } = useContext(AuthContext); // Get logged-in user details
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // For navigation

  // Fetch reviews on component mount
  useEffect(() => {
    const fetchUserReviews = async () => {
      if (!userDetails) {
        console.log("User not logged in");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/meal-request");
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const data = await response.json();

        // Filter reviews for the logged-in user
        const userReviews = data.filter(
          (review) => review.userEmail === userDetails.email
        );

        setReviews(userReviews || []);
      } catch (error) {
        console.error("Error fetching user reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserReviews();
  }, [userDetails]);

  // Handle delete review
  const handleDelete = async (reviewId, mealId) => {
    try {
      const response = await fetch(`http://localhost:5000/meal-review/${reviewId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        // Remove the deleted review from the state
        setReviews((prev) => prev.filter((review) => review._id !== reviewId));
      } else {
        console.error("Failed to delete review");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };
  const handleSubmitEdit = async () => {
    if (!reviewText.trim()) {
      console.error('Review text cannot be empty');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/meal-review/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewText }),
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log('Review updated successfully');
        // Redirect or update state
      } else {
        console.error('Failed to update review:', data.error);
      }
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };
  

  // Handle viewing the meal associated with the review
  const handleViewMeal = (mealId) => {
    navigate(`/meal-details/${mealId}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="my-reviews p-5 bg-gray-100 rounded-lg w-9/12 mx-auto">
      <h1 className="text-3xl font-bold mb-4">My Reviews</h1>

      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Meal Title</th>
              <th className="border px-4 py-2">Likes</th>
              <th className="border px-4 py-2">Review</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id} className="border-b">
                <td className="border px-4 py-2">{review.mealTitle || "N/A"}</td>
                <td className="border px-4 py-2">{review.likeCount || 0}</td>
                <td className="border px-4 py-2">{review.review?.text || "No review text"}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleViewMeal(review.mealId)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    View Meal
                  </button>
                  <button
                    onClick={() => handleSubmitEdit(review._id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review._id, review.mealId)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyReviews;



