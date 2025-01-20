
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider"; // Access userDetails from AuthContext

const RequestedMeals = () => {
  const { userDetails, loading } = useContext(AuthContext);
  const [requestedMeals, setRequestedMeals] = useState([]);
  const [loadingMeals, setLoadingMeals] = useState(true);

  const userEmail = userDetails?.email;

  useEffect(() => {
    if (!userEmail) return;

    const fetchRequestedMeals = async () => {
      try {
        const response = await fetch(
          `https://hotel-management-server-dun.vercel.app/meal-requests?email=${userEmail}`
        );
        if (!response.ok) throw new Error("Failed to fetch meal requests");

        const data = await response.json();
        console.log("Fetched Data:", data);

        // Group by `mealTitle` and sum up `likeCount` and `requestCount`
        const groupedData = data.reduce((acc, curr) => {
          const existingMeal = acc[curr.mealTitle];
          if (existingMeal) {
            existingMeal.likeCount += curr.likeCount || 0;
            existingMeal.requestCount += curr.requestCount || 0;
          } else {
            acc[curr.mealTitle] = { ...curr };
          }
          return acc;
        }, {});

        setRequestedMeals(Object.values(groupedData));
      } catch (error) {
        console.error("Error fetching requested meals:", error);
      } finally {
        setLoadingMeals(false);
      }
    };

    fetchRequestedMeals();
  }, [userEmail]);

  const cancelRequest = async (mealRequestId) => {
    try {
      const response = await fetch(
        `https://hotel-management-server-dun.vercel.app/meal-requests/${mealRequestId}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setRequestedMeals((prev) =>
          prev.filter((meal) => meal._id !== mealRequestId)
        );
      } else {
        console.error("Failed to cancel the meal request");
      }
    } catch (error) {
      console.error("Error canceling meal request:", error);
    }
  };

  if (loading || loadingMeals) {
    return <div>Loading...</div>;
  }

  return (
    <div className="requested-meals-container">
      <h2>Your Requested Meals</h2>
      {requestedMeals.length === 0 ? (
        <p>You have not requested any meals.</p>
      ) : (
        <table className="meal-table">
          <thead>
            <tr>
              <th>Meal Title</th>
              <th>Likes</th>
              <th>Request Count</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requestedMeals.map((request) => (
              <tr key={request._id}>
                <td>{request.mealTitle}</td>
                <td className="dynamic">{request.likeCount}</td>
                <td className="dynamic">{request.requestCount}</td>
                <td>{request.status}</td>
                <td>
                  <button
                    className="cancel-btn"
                    onClick={() => cancelRequest(request._id)}
                  >
                    Cancel
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

export default RequestedMeals;
