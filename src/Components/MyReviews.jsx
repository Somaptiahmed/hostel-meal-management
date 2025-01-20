

// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../Provider/AuthProvider";

// const MyReviews = () => {
//   const { userDetails } = useContext(AuthContext); // Get logged-in user details
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const navigate = useNavigate();
//   const [editingReview, setEditingReview] = useState(null);
//   const [newReviewText, setNewReviewText] = useState("");

//   useEffect(() => {
//     const fetchUserReviews = async () => {
//       if (!userDetails) {
//         console.log("User not logged in");
//         return;
//       }

//       try {
//         const response = await fetch(
//           `https://hotel-management-server-dun.vercel.app/meal-requests?userEmail=${encodeURIComponent(
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

//   const handleViewMeal = (mealId) => {
//     navigate(`/meal-details/${mealId}`);
//   };

//   const handleDelete = async (mealRequestId) => {
//     try {
//       const response = await fetch(
//         `https://hotel-management-server-dun.vercel.app/meal-requests/${mealRequestId}`,
//         {
//           method: "DELETE",
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       if (response.ok) {
//         setReviews((prev) =>
//           prev.filter((mealRequest) => mealRequest._id !== mealRequestId)
//         );
//       } else {
//         console.error("Failed to delete meal request");
//       }
//     } catch (error) {
//       console.error("Error deleting meal request:", error);
//     }
//   };

//   const handleEdit = (mealRequest) => {
//     setEditingReview(mealRequest);
//     setNewReviewText(mealRequest.review?.text || "");
//   };

//   const saveEdit = async () => {
//     if (!editingReview) return;

//     setSaving(true);
//     try {
//       const response = await fetch(
//         `https://hotel-management-server-dun.vercel.app/meal-requests/${editingReview._id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ reviewText: newReviewText }),
//         }
//       );

//       if (response.ok) {
//         const updatedReviews = await fetch(
//           `https://hotel-management-server-dun.vercel.app/meal-requests?userEmail=${encodeURIComponent(
//             userDetails.email
//           )}`
//         ).then((res) => res.json());

//         setReviews(updatedReviews || []);
//         setEditingReview(null);
//         setNewReviewText("");
//       } else {
//         console.error("Failed to update review");
//       }
//     } catch (error) {
//       console.error("Error updating review:", error);
//     } finally {
//       setSaving(false);
//     }
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
//               <th className="border px-4 py-2">Review</th>
//               <th className="border px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reviews.map((review) => (
//               <tr key={review._id} className="border-b">
//                 <td className="border px-4 py-2">{review.mealTitle || "N/A"}</td>
//                 <td className="border px-4 py-2">
//                   {(review.review && review.review.text) || "No review text"}
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
//               disabled={saving}
//             >
//               {saving ? "Saving..." : "Save"}
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
  const { userDetails } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const [editState, setEditState] = useState({ review: null, text: "" });

  useEffect(() => {
    const fetchUserReviews = async () => {
      if (!userDetails) return;

      try {
        const response = await fetch(
          `https://hotel-management-server-dun.vercel.app/meal-requests?userEmail=${encodeURIComponent(
            userDetails.email
          )}`
        );
        if (!response.ok) throw new Error("Failed to fetch reviews");

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

  const handleViewMeal = (mealId) => navigate(`/meal-details/${mealId}`);

  const handleDelete = async (mealRequestId) => {
    try {
      const response = await fetch(
        `https://hotel-management-server-dun.vercel.app/meal-requests/${mealRequestId}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setReviews((prev) => prev.filter((r) => r._id !== mealRequestId));
      } else {
        console.error("Failed to delete meal request");
      }
    } catch (error) {
      console.error("Error deleting meal request:", error);
    }
  };

  const handleEdit = (mealRequest) => {
    setEditState({ review: mealRequest, text: mealRequest.review?.text || "" });
  };

  const saveEdit = async () => {
    if (!editState.review) return;

    const updatedText = editState.text.trim();
    if (!updatedText) {
      alert("Review cannot be empty.");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(
        `https://hotel-management-server-dun.vercel.app/meal-requests/${editState.review._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reviewText: updatedText }),
        }
      );

      if (response.ok) {
        setReviews((prev) =>
          prev.map((r) =>
            r._id === editState.review._id
              ? { ...r, review: { ...r.review, text: updatedText } }
              : r
          )
        );
        setEditState({ review: null, text: "" });
      } else {
        console.error("Failed to update review");
      }
    } catch (error) {
      console.error("Error updating review:", error);
    } finally {
      setSaving(false);
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
            {reviews.map((review) => (
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
      {editState.review && (
        <div className="edit-modal bg-white p-4 rounded-lg shadow-md mt-4">
          <h2 className="text-2xl font-bold mb-2">Edit Review</h2>
          <textarea
            value={editState.text}
            onChange={(e) =>
              setEditState((prev) => ({ ...prev, text: e.target.value }))
            }
            className="w-full border p-2 rounded-md"
          />
          <div className="mt-2 flex gap-2">
            <button
              onClick={saveEdit}
              className={`${
                saving ? "bg-gray-400" : "bg-green-500"
              } text-white px-4 py-2 rounded-md`}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setEditState({ review: null, text: "" })}
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
