import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MealDetails = () => {
  const { id } = useParams(); // Get the meal ID from the URL
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likeCount, setLikeCount] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [user, setUser] = useState(null); // Mock user for login state

  useEffect(() => {
    // Fetch meal details
    const fetchMeal = async () => {
      try {
        const response = await fetch(`http://localhost:5000/menu/${id}`);
        const data = await response.json();
        setMeal(data);
        setLikeCount(data.likes || 0); // Initialize like count
        setReviews(data.reviews || []); // Initialize reviews
      } catch (error) {
        console.error('Error fetching meal details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id]);

  const handleLike = async () => {
    if (!user) {
      alert('You need to log in to like this meal.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/menu/${id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setLikeCount((prev) => prev + 1); // Update like count on client
      }
    } catch (error) {
      console.error('Error liking the meal:', error);
    }
  };

  const handleMealRequest = async () => {
    if (!user) {
      alert('You need to log in to request this meal.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/meal-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mealId: id,
          userId: user.id,
          status: 'pending',
        }),
      });

      if (response.ok) {
        alert('Meal request submitted successfully!');
      }
    } catch (error) {
      console.error('Error requesting meal:', error);
    }
  };

  const handleReviewSubmit = async () => {
    if (!user) {
      alert('You need to log in to post a review.');
      return;
    }

    const newReview = { text: reviewText, user: user.name };

    try {
      const response = await fetch(`http://localhost:5000/menu/${id}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
      });

      if (response.ok) {
        setReviews((prev) => [...prev, newReview]); // Update reviews on client
        setReviewText(''); // Clear the review input
      }
    } catch (error) {
      console.error('Error posting review:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!meal) return <div>Meal not found!</div>;

  return (
    <div className="meal-details p-5 bg-gray-100 rounded-lg w-9/12 mx-auto">
      <img src={meal.image} alt={meal.title} className="w-full h-[500px] object-cover rounded-md" />
      <h1 className="text-3xl font-bold mt-4">{meal.title}</h1>
      <p className="text-gray-700 mt-2">Distributor: {meal.distributor || 'Unknown'}</p>
      <p className="text-gray-700 font-semibold mt-2">{meal.description}</p>
      <p className="text-gray-700 font-semibold mt-2">
        Ingredients: {meal.ingredients ? meal.ingredients.join(', ') : 'N/A'}
      </p>
      <p className="text-gray-700 mt-2">Posted: {meal.postTime || 'N/A'}</p>
      <p className="text-gray-700 mt-2">Rating: {meal.rating}</p>

      <div className="flex items-center gap-4 mt-5">
        <button
          onClick={handleLike}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Like ({likeCount})
        </button>
        <button
          onClick={handleMealRequest}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Request Meal
        </button>
      </div>

      <div className="reviews mt-8">
        <h2 className="text-2xl font-bold mb-4">Reviews ({reviews.length})</h2>
        <ul>
          {reviews.map((review, index) => (
            <li key={index} className="p-3 bg-white rounded-md mb-2 shadow-sm">
              <p className="text-gray-800">{review.text}</p>
              <p className="text-gray-500 text-sm">- {review.user}</p>
            </li>
          ))}
        </ul>

        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write a review..."
          className="w-full mt-4 p-2 border rounded-md"
        />
        <button
          onClick={handleReviewSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-2"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default MealDetails;

