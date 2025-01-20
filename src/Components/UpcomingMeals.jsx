
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


const UpcomingMeals = () => {
  const [upcomingMeals, setUpcomingMeals] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Fetch upcoming meals
  const fetchUpcomingMeals = async () => {
    try {
      const response = await fetch("https://hotel-management-server-dun.vercel.app/upcoming");
      const data = await response.json();
      setUpcomingMeals(data); // Directly set without sorting by likes
    } catch (error) {
      console.error("Error fetching upcoming meals:", error);
    }
  };

  useEffect(() => {
    fetchUpcomingMeals();
  }, []);

  // Handle publish (move to "meals" collection)
  const handlePublish = async (meal) => {
    try {
      // Send the meal to "menu" collection
      const response = await fetch("https://hotel-management-server-dun.vercel.app/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(meal),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      // Remove the meal from the "upcoming" collection
      const deleteResponse = await fetch(
        `https://hotel-management-server-dun.vercel.app/upcoming/${meal._id}`,
        { method: "DELETE" }
      );

      if (!deleteResponse.ok) {
        throw new Error(`Failed to delete meal: ${deleteResponse.statusText}`);
      }

      alert("Meal published successfully!");
      setNotifications((prev) => prev + 1); // Increment notification count
      fetchUpcomingMeals(); // Refresh the table
    } catch (error) {
      console.error("Error publishing meal:", error);
      alert(`Failed to publish meal: ${error.message}`);
    }
  };

  // Handle adding new upcoming meal
  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://hotel-management-server-dun.vercel.app/upcoming", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Upcoming meal added successfully!");
        fetchUpcomingMeals(); // Refresh the table
        setModalOpen(false);
        reset(); // Reset the form
      } else {
        console.error("Error adding upcoming meal.");
      }
    } catch (error) {
      console.error("Error adding upcoming meal:", error);
    }
  };

  return (
    <div className="container mx-auto my-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-blue-600">Upcoming Meals</h1>

        
      </div>

      <div className="flex justify-end mb-4">
        <button
          className="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
          onClick={() => setModalOpen(true)}
        >
          Add Upcoming Meal
        </button>
      </div>

      {/* Upcoming Meals Table */}
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {upcomingMeals.map((meal) => (
            <tr key={meal._id}>
              <td className="border px-4 py-2">{meal.title}</td>
              <td className="border px-4 py-2">{meal.category}</td>
              <td className="border px-4 py-2">{meal.description}</td>
              <td className="border px-4 py-2">{meal.date}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handlePublish(meal)}
                  className="py-1 px-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                >
                  Publish
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Upcoming Meal Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Add Upcoming Meal
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block font-semibold">Title</label>
                <input
                  type="text"
                  {...register("title", { required: "Title is required" })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold">Description</label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-semibold">Category</label>
                <input
                  type="text"
                  {...register("category", { required: "Category is required" })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                {errors.category && (
                  <p className="text-red-500 text-sm">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-semibold">Date</label>
                <input
                  type="date"
                  {...register("date", { required: "Date is required" })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                {errors.date && (
                  <p className="text-red-500 text-sm">{errors.date.message}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold">Image URL</label>
                <input
                  type="text"
                  {...register("image", { required: "Image URL is required" })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image.message}</p>
                )}
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="py-2 px-4 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                >
                  Add Meal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingMeals;


