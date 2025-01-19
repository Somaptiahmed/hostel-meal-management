// import React, { useState, useEffect, useContext } from "react";
// import { useParams } from "react-router-dom";
// import { AuthContext } from "../Provider/AuthProvider";
// const MealDetails = () => {
//   const { id } = useParams(); // Get the meal ID from the URL
//   const { userDetails } = useContext(AuthContext); // Access user details from context
//   const [meal, setMeal] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [likeCount, setLikeCount] = useState(0);
//   const [requestCount, setRequestCount] = useState(0);
//   const [reviews, setReviews] = useState([]);
//   const [reviewText, setReviewText] = useState("");
//   const [hasLiked, setHasLiked] = useState(false);
//   // Fetch meal details on component mount
//   useEffect(() => {
//     const fetchMeal = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/menu/${id}`);
//         const data = await response.json();
//         setMeal(data);
//         setLikeCount(data.likes || 0); // Initialize like count
//         setRequestCount(data.mealRequestCount || 0); // Initialize request count
//         setReviews(data.reviews || []); // Initialize reviews
//         // Check if the user has already liked the meal
//         setHasLiked(Array.isArray(data.userLikes) && data.userLikes.includes(userDetails.uid));
//       }catch (error) {
//         console.error("Error fetching meal details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMeal();
//   }, [id, userDetails]);
// //   // Handle like action
//   // const handleLike = async () => {
//   //   if (hasLiked) return; // Prevent multiple likes
//   //   try {
//   //     const response = await fetch("http://localhost:5000/meal-request", {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify({
//   //         userId: userDetails.uid, // Pass the user ID to track which user liked
//   //       }),
//   //     });
//   //     if (response.ok) {
//   //       setLikeCount((prev) => prev + 1); // Update like count
//   //       setHasLiked(true); // Mark as liked (disables the button)
//   //     } else {
//   //       console.error("Failed to like meal");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error liking the meal:", error);
//   //   }
//   // };
//   const handleLike = async () => {
//     if (hasLiked) return; // Prevent multiple likes
//     try {
//       const response = await fetch("http://localhost:5000/meal-request", { // Corrected endpoint URL
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           mealId: id, // ID of the meal being liked
//           userId: userDetails.uid, // Pass the user ID to track likes
//         }),
//       });
  
//       if (response.ok) {
//         setLikeCount((prev) => prev + 1); // Update like count
//         setHasLiked(true); // Mark as liked
//       } else {
//         console.error("Failed to like meal");
//       }
//     } catch (error) {
//       console.error("Error liking the meal:", error);
//     }
//   };
  
  
//   // Handle meal request
//   const handleMealRequest = async () => {
//     if (!userDetails) {
//       console.error("User not logged in");
//       return;
//     }
//     try {
//       const response = await fetch("http://localhost:5000/meal-request", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           mealId: id,
//           status: "pending",
//           userName: userDetails.displayName || "Anonymous",
//           userEmail: userDetails.email || "anonymous@example.com",
//         }),
//       });
//       if (response.ok) {
//         setRequestCount((prev) => prev + 1); // Increment request count locally
//       } else {
//         console.error("Failed to request meal");
//       }
//     } catch (error) {
//       console.error("Error requesting the meal:", error);
//     }
//   };
//   // Handle review submission
//   const handleReviewSubmit = async () => {
//     if (!reviewText.trim()) return; // Prevent empty reviews
//     if (!userDetails) {
//       console.error("User not logged in");
//       return;
//     }
//     const newReview = {
//       text: reviewText,
//       user: userDetails.displayName || "Anonymous",
//     };
//     try {
//       const response = await fetch("http://localhost:5000/meal-request", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//          body: JSON.stringify({
//           mealId: id,
//           status: "pending",
//           userName: userDetails.displayName || "Anonymous",
//           userEmail: userDetails.email || "anonymous@example.com",
//           reviewText: reviewText.trim() || null,
//         }),
//       });
//       if (response.ok) {
//         setReviews((prev) => [...prev, newReview]); // Add new review locally
//         setReviewText(""); // Clear the review text
//       } else {
//         console.error("Failed to submit review");
//       }
//     } catch (error) {
//       console.error("Error posting review:", error);
//     }
//   };
//   if (loading) return <div>Loading...</div>;
//   if (!meal) return <div>Meal not found!</div>;
//   return (
//     <div className="meal-details p-5 bg-gray-100 rounded-lg w-9/12 mx-auto">
//       <img
//         src={meal.image}
//         alt={meal.title}
//         className="w-full h-[500px] object-cover rounded-md"
//       />
//       <h1 className="text-3xl font-bold mt-4">{meal.title}</h1>
//       <p className="text-gray-700 mt-2">
//         Distributor: {meal.distributor || "Unknown"}
//       </p>
//       <p className="text-gray-700 font-semibold mt-2">
//         {meal.description || "No description available"}
//       </p>
//       <p className="text-gray-700 font-semibold mt-2">
//         Ingredients: {meal.ingredients ? meal.ingredients.join(", ") : "N/A"}
//       </p>
//       <p className="text-gray-700 mt-2">Posted: {meal.postTime || "N/A"}</p>
//       <p className="text-gray-700 mt-2">Rating: {meal.rating}</p>
//       <p className="text-gray-700 mt-2">Price: {meal.price}</p>
//       <div className="flex items-center gap-4 mt-5">
//         <button
//           onClick={handleLike}
//           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
//           disabled={hasLiked}
//         >
//           {hasLiked ? `Liked (${likeCount})` : `Like (${likeCount})`}
//         </button>
//         <button
//           onClick={handleMealRequest}
//           className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
//         >
//           Request Meal ({requestCount})
//         </button>
//       </div>
//       <div className="reviews mt-8">
//         <h2 className="text-2xl font-bold mb-4">Reviews ({reviews.length})</h2>
//         <ul>
//           {reviews.map((review, index) => (
//             <li
//               key={index}
//               className="p-3 bg-white rounded-md mb-2 shadow-sm"
//             >
//               <p className="text-gray-800">{review.text}</p>
//               <p className="text-gray-500 text-sm">- {review.user}</p>
//             </li>
//           ))}
//         </ul>
//         <textarea
//           value={reviewText}
//           onChange={(e) => setReviewText(e.target.value)}
//           placeholder="Write a review..."
//           className="w-full mt-4 p-2 border rounded-md"
//         />
//         <button
//           onClick={handleReviewSubmit}
//           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-2"
//         >
//           Submit Review
//         </button>
//       </div>
//     </div>
//   );
// };
// export default MealDetails;


import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const MealDetails = () => {
  const { id } = useParams(); // Get the meal ID from the URL
  const { userDetails } = useContext(AuthContext); // Access user details from context
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likeCount, setLikeCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [hasLiked, setHasLiked] = useState(false);

  const isAdmin = userDetails?.email === "faiza@gmail.com"; // Check if the user is the admin

  // Fetch meal details on component mount
  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await fetch(`http://localhost:5000/menu/${id}`);
        const data = await response.json();
        setMeal(data);
        setLikeCount(data.likes || 0); // Initialize like count
        setRequestCount(data.mealRequestCount || 0); // Initialize request count
        setReviews(data.reviews || []); // Initialize reviews
        setHasLiked(Array.isArray(data.userLikes) && data.userLikes.includes(userDetails.uid));
      } catch (error) {
        console.error("Error fetching meal details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMeal();
  }, [id, userDetails]);

  // Handle like action
  const handleLike = async () => {
    if (hasLiked || isAdmin) return; // Prevent multiple likes or admin from liking
    try {
      const response = await fetch("http://localhost:5000/meal-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mealId: id,
          userId: userDetails.uid,
        }),
      });

      if (response.ok) {
        setLikeCount((prev) => prev + 1); // Update like count
        setHasLiked(true); // Mark as liked
      } else {
        console.error("Failed to like meal");
      }
    } catch (error) {
      console.error("Error liking the meal:", error);
    }
  };

  // Handle meal request
  const handleMealRequest = async () => {
    if (isAdmin) return; // Prevent admin from requesting meals
    if (!userDetails) {
      console.error("User not logged in");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/meal-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mealId: id,
          status: "pending",
          userName: userDetails.displayName || "Anonymous",
          userEmail: userDetails.email || "anonymous@example.com",
        }),
      });
      if (response.ok) {
        setRequestCount((prev) => prev + 1); // Increment request count locally
      } else {
        console.error("Failed to request meal");
      }
    } catch (error) {
      console.error("Error requesting the meal:", error);
    }
  };

  // Handle review submission
  const handleReviewSubmit = async () => {
    if (!reviewText.trim() || isAdmin) return; // Prevent empty reviews or admin from submitting reviews
    if (!userDetails) {
      console.error("User not logged in");
      return;
    }
    const newReview = {
      text: reviewText,
      user: userDetails.displayName || "Anonymous",
    };
    try {
      const response = await fetch("http://localhost:5000/meal-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mealId: id,
          status: "pending",
          userName: userDetails.displayName || "Anonymous",
          userEmail: userDetails.email || "anonymous@example.com",
          reviewText: reviewText.trim() || null,
        }),
      });
      if (response.ok) {
        setReviews((prev) => [...prev, newReview]); // Add new review locally
        setReviewText(""); // Clear the review text
      } else {
        console.error("Failed to submit review");
      }
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!meal) return <div>Meal not found!</div>;

  return (
    <div className="meal-details p-5 bg-gray-100 rounded-lg w-9/12 mx-auto">
      <img
        src={meal.image}
        alt={meal.title}
        className="w-full h-[500px] object-cover rounded-md"
      />
      <h1 className="text-3xl font-bold mt-4">{meal.title}</h1>
      <p className="text-gray-700 mt-2">
        Distributor: {meal.distributor || "Unknown"}
      </p>
      <p className="text-gray-700 font-semibold mt-2">
        {meal.description || "No description available"}
      </p>
      <p className="text-gray-700 font-semibold mt-2">
        Ingredients: {meal.ingredients ? meal.ingredients.join(", ") : "N/A"}
      </p>
      <p className="text-gray-700 mt-2">Posted: {meal.postTime || "N/A"}</p>
      <p className="text-gray-700 mt-2">Rating: {meal.rating}</p>
      <p className="text-gray-700 mt-2">Price: {meal.price}</p>
      <div className="flex items-center gap-4 mt-5">
        {!isAdmin && (
          <button
            onClick={handleLike}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            disabled={hasLiked}
          >
            {hasLiked ? `Liked (${likeCount})` : `Like (${likeCount})`}
          </button>
        )}
        {!isAdmin && (
          <button
            onClick={handleMealRequest}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Request Meal ({requestCount})
          </button>
        )}
      </div>
      <div className="reviews mt-8">
        <h2 className="text-2xl font-bold mb-4">Reviews ({reviews.length})</h2>
        <ul>
          {reviews.map((review, index) => (
            <li
              key={index}
              className="p-3 bg-white rounded-md mb-2 shadow-sm"
            >
              <p className="text-gray-800">{review.text}</p>
              <p className="text-gray-500 text-sm">- {review.user}</p>
            </li>
          ))}
        </ul>
        {!isAdmin && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default MealDetails;
