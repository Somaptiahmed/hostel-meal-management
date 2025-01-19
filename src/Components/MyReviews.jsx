
// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../Provider/AuthProvider";

// const MyReviews = () => {
//   const { userDetails } = useContext(AuthContext); // Get logged-in user details
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate(); // For navigation

//   // Fetch reviews on component mount
//   useEffect(() => {
//     const fetchUserReviews = async () => {
//       if (!userDetails) {
//         console.log("User not logged in");
//         return;
//       }

//       try {
//         const response = await fetch(
//           `http://localhost:5000/meal-requests?userEmail=${encodeURIComponent(
//             userDetails.email
//           )}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch reviews");
//         }

//         const data = await response.json();
//         setReviews(data || []);
//       } catch (error) {
//         console.error("Error fetching user reviews:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserReviews();
//   }, [userDetails]);

//   // Handle delete review
//   const handleDelete = async (reviewId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/meal-review/${reviewId}`,
//         {
//           method: "DELETE",
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       if (response.ok) {
//         setReviews((prev) => prev.filter((review) => review._id !== reviewId));
//       } else {
//         console.error("Failed to delete review");
//       }
//     } catch (error) {
//       console.error("Error deleting review:", error);
//     }
//   };

//   // Handle viewing the meal associated with the review
//   const handleViewMeal = (mealId) => {
//     navigate(`/meal-details/${mealId}`);
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="my-reviews p-5 bg-gray-100 rounded-lg w-9/12 mx-auto">
//       <h1 className="text-3xl font-bold mb-4">My Reviews</h1>

//       {reviews.length === 0 ? (
//         <p>No reviews found.</p>
//       ) : (
//         <table className="min-w-full table-auto border-collapse">
//           <thead>
//             <tr>
//               <th className="border px-4 py-2">Meal Title</th>
//               <th className="border px-4 py-2">Likes</th>
//               <th className="border px-4 py-2">Review</th>
//               <th className="border px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reviews.map((review) => (
//               <tr key={review._id} className="border-b">
//                 <td className="border px-4 py-2">{review.mealTitle || "N/A"}</td>
//                 <td className="border px-4 py-2">{review.likeCount || 0}</td>
//                 <td className="border px-4 py-2">{review.review?.text || "No review text"}</td>
//                 <td className="border px-4 py-2 flex gap-2">
//                   <button
//                     onClick={() => handleViewMeal(review.mealId)}
//                     className="bg-blue-500 text-white px-4 py-2 rounded-md"
//                   >
//                     View Meal
//                   </button>
//                   <button
//                     onClick={() => handleDelete(review._id)}
//                     className="bg-red-500 text-white px-4 py-2 rounded-md"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default MyReviews;


// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../Provider/AuthProvider";

// const MyReviews = () => {
//   const { userDetails } = useContext(AuthContext); // Get logged-in user details
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate(); // For navigation
//   const [editingReview, setEditingReview] = useState(null); // Track the review being edited
//   const [newReviewText, setNewReviewText] = useState(""); // Store new review text

//   // Fetch reviews on component mount
//   useEffect(() => {
//     const fetchUserReviews = async () => {
//       if (!userDetails) {
//         console.log("User not logged in");
//         return;
//       }

//       try {
//         const response = await fetch(
//           `http://localhost:5000/meal-requests?userEmail=${encodeURIComponent(
//             userDetails.email
//           )}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch reviews");
//         }

//         const data = await response.json();
//         setReviews(data || []);
//       } catch (error) {
//         console.error("Error fetching user reviews:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserReviews();
//   }, [userDetails]);

 

//   // Handle viewing the meal associated with the review
//   const handleViewMeal = (mealId) => {
//     navigate(`/meal-details/${mealId}`);
//   };

//    // Handle delete review
// const handleDelete = async (mealRequestId) => {
//   try {
//     const response = await fetch(
//       `http://localhost:5000/meal-requests/${mealRequestId}`, // Correct URL for delete
//       {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//       }
//     );

//     if (response.ok) {
//       // Update the UI to remove the deleted meal request from the state
//       setReviews((prev) => prev.filter((mealRequest) => mealRequest._id !== mealRequestId));
//     } else {
//       console.error("Failed to delete meal request");
//     }
//   } catch (error) {
//     console.error("Error deleting meal request:", error);
//   }
// };

// // Handle edit review
// const handleEdit = (mealRequest) => {
//   setEditingReview(mealRequest);
//   setNewReviewText(mealRequest.review?.text || ""); // Use an empty string if review or text is undefined
// };


// // Save the edit
// const saveEdit = async () => {
//   if (!editingReview) return;

//   try {
//     const response = await fetch(
//       `http://localhost:5000/meal-requests/${editingReview._id}`, // Correct URL for update
//       {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ reviewText: newReviewText }), // Send reviewText in the request body
//       }
//     );

//     if (response.ok) {
//       // Handle the successful response and update the UI
//       const updatedMealRequest = await response.json();

//       // Update the state with the new review text
//       setReviews((prev) =>
//         prev.map((mealRequest) =>
//           mealRequest._id === editingReview._id
//             ? { ...mealRequest, review: { ...mealRequest.review, text: updatedMealRequest.review.text } }
//             : mealRequest
//         )
//       );

//       // Close editing mode and clear the input
//       setEditingReview(null);
//       setNewReviewText("");
//     } else {
//       console.error("Failed to update review");
//     }
//   } catch (error) {
//     console.error("Error updating review:", error);
//   }
// };


  
  
  
//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="my-reviews p-5 bg-gray-100 rounded-lg w-9/12 mx-auto">
//       <h1 className="text-3xl font-bold mb-4">My Reviews</h1>

//       {reviews.length === 0 ? (
//         <p>No reviews found.</p>
//       ) : (
//         <table className="min-w-full table-auto border-collapse">
//           <thead>
//             <tr>
//               <th className="border px-4 py-2">Meal Title</th>
//               {/* <th className="border px-4 py-2">Likes</th> */}
//               <th className="border px-4 py-2">Review</th>
//               <th className="border px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reviews.map((review) => (
//               <tr key={review._id} className="border-b">
//                 <td className="border px-4 py-2">{review.mealTitle || "N/A"}</td>
//                 {/* <td className="border px-4 py-2">{review.likeCount || 0}</td> */}
//                 <td className="border px-4 py-2">
//                   {review.review?.text || "No review text"}
//                 </td>
//                 <td className="border px-4 py-2 flex gap-2">
//                   <button
//                     onClick={() => handleViewMeal(review.mealId)}
//                     className="bg-blue-500 text-white px-4 py-2 rounded-md"
//                   >
//                     View Meal
//                   </button>
//                   <button
//                     onClick={() => handleDelete(review._id)}
//                     className="bg-red-500 text-white px-4 py-2 rounded-md"
//                   >
//                     Delete
//                   </button>
//                   <button
//                     onClick={() => handleEdit(review)}
//                     className="bg-yellow-500 text-white px-4 py-2 rounded-md"
//                   >
//                     Edit
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {editingReview && (
//         <div className="edit-modal bg-white p-4 rounded-lg shadow-md mt-4">
//           <h2 className="text-2xl font-bold mb-2">Edit Review</h2>
//           <textarea
//             value={newReviewText}
//             onChange={(e) => setNewReviewText(e.target.value)}
//             className="w-full border p-2 rounded-md"
//           />
//           <div className="mt-2 flex gap-2">
//             <button
//               onClick={saveEdit}
//               className="bg-green-500 text-white px-4 py-2 rounded-md"
//             >
//               Save
//             </button>
//             <button
//               onClick={() => setEditingReview(null)}
//               className="bg-gray-500 text-white px-4 py-2 rounded-md"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyReviews;


import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const MyReviews = () => {
  const { userDetails } = useContext(AuthContext); // Get logged-in user details
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); // Track saving state
  const navigate = useNavigate(); // For navigation
  const [editingReview, setEditingReview] = useState(null); // Track the review being edited
  const [newReviewText, setNewReviewText] = useState(""); // Store new review text

  // Fetch reviews on component mount
  useEffect(() => {
    const fetchUserReviews = async () => {
      if (!userDetails) {
        console.log("User not logged in");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/meal-requests?userEmail=${encodeURIComponent(
            userDetails.email
          )}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const data = await response.json();
        setReviews(data || []);
      } catch (error) {
        console.error("Error fetching user reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserReviews();
  }, [userDetails]);

  // Handle viewing the meal associated with the review
  const handleViewMeal = (mealId) => {
    navigate(`/meal-details/${mealId}`);
  };

  // Handle delete review
  const handleDelete = async (mealRequestId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/meal-requests/${mealRequestId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        // Update the UI to remove the deleted meal request from the state
        setReviews((prev) =>
          prev.filter((mealRequest) => mealRequest._id !== mealRequestId)
        );
      } else {
        console.error("Failed to delete meal request");
      }
    } catch (error) {
      console.error("Error deleting meal request:", error);
    }
  };

  // Handle edit review
  const handleEdit = (mealRequest) => {
    setEditingReview(mealRequest);
    setNewReviewText(mealRequest.review?.text || ""); // Use an empty string if review or text is undefined
  };

  // Save the edit
  const saveEdit = async () => {
    if (!editingReview) return;

    setSaving(true); // Set saving state
    try {
      const response = await fetch(
        `http://localhost:5000/meal-requests/${editingReview._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reviewText: newReviewText }),
        }
      );

      if (response.ok) {
        // Refetch reviews to ensure the latest data is displayed
        const updatedReviewsResponse = await fetch(
          `http://localhost:5000/meal-requests?userEmail=${encodeURIComponent(
            userDetails.email
          )}`
        );
        if (updatedReviewsResponse.ok) {
          const updatedReviews = await updatedReviewsResponse.json();
          setReviews(updatedReviews || []);
        }

        // Close editing mode and clear the input
        setEditingReview(null);
        setNewReviewText("");
      } else {
        console.error("Failed to update review");
      }
    } catch (error) {
      console.error("Error updating review:", error);
    } finally {
      setSaving(false); // Reset saving state
    }
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
              <th className="border px-4 py-2">Review</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(reviews) &&
              reviews.map((review) => (
                <tr key={review._id} className="border-b">
                  <td className="border px-4 py-2">{review.mealTitle || "N/A"}</td>
                  <td className="border px-4 py-2">
                    {(review.review && review.review.text) || "No review text"}
                  </td>
                  <td className="border px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleViewMeal(review.mealId)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      View Meal
                    </button>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(review)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      {editingReview && (
        <div className="edit-modal bg-white p-4 rounded-lg shadow-md mt-4">
          <h2 className="text-2xl font-bold mb-2">Edit Review</h2>
          <textarea
            value={newReviewText}
            onChange={(e) => setNewReviewText(e.target.value)}
            className="w-full border p-2 rounded-md"
          />
          <div className="mt-2 flex gap-2">
            <button
              onClick={saveEdit}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setEditingReview(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
