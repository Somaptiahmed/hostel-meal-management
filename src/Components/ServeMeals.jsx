// import React, { useState, useEffect } from 'react';

// const ServeMeals = () => {
//   const [mealRequests, setMealRequests] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Fetch meal requests
//   const fetchMealRequests = async (query = '') => {
//     setLoading(true);
//     try {
//       const response = await fetch(`https://hotel-management-server-dun.vercel.app/meal-requests?search=${query}`);
//       const data = await response.json();
//       setMealRequests(data);
//     } catch (error) {
//       console.error('Error fetching meal requests:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Change status to "delivered"
//   const handleServe = async (id) => {
//     try {
//       const response = await fetch(`https://hotel-management-server-dun.vercel.app/meal-requests/${id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ status: 'delivered' }),
//       });
//       if (response.ok) {
//         alert('Meal served successfully!');
//         fetchMealRequests(searchQuery); // Refresh the list
//       } else {
//         console.error('Failed to update meal status');
//       }
//     } catch (error) {
//       console.error('Error updating meal status:', error);
//     }
//   };

//   // Search meals
//   const handleSearch = (event) => {
//     event.preventDefault();
//     fetchMealRequests(searchQuery);
//   };

//   // Fetch initial data
//   useEffect(() => {
//     fetchMealRequests();
//   }, []);

//   return (
//     <div className="container mx-auto my-10 px-4">
//       <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-8">Requested Meals</h1>

//       {/* Search Form */}
//       <form onSubmit={handleSearch} className="mb-6 flex items-center justify-center">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder="Search by username or email"
//           className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <button
//           type="submit"
//           className="ml-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         >
//           Search
//         </button>
//       </form>

//       {/* Meal Requests Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white shadow-md rounded-lg">
//           <thead>
//             <tr className="bg-blue-100 text-gray-700">
//               <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
//               <th className="px-6 py-3 text-left text-sm font-semibold">User Email</th>
//               <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
//               <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
//               <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="5" className="px-6 py-4 text-center text-gray-500">Loading...</td>
//               </tr>
//             ) : mealRequests.length > 0 ? (
//               mealRequests.map((request) => (
//                 <tr key={request._id} className="border-b">
//                   <td className="px-6 py-4">{request.mealTitle}</td>
//                   <td className="px-6 py-4">{request.userEmail}</td>
//                   <td className="px-6 py-4">{request.userName}</td>
//                   <td className="px-6 py-4">
//                     <span
//                       className={`px-2 py-1 rounded text-white ${
//                         request.status === 'delivered' ? 'bg-green-500' : 'bg-yellow-500'
//                       }`}
//                     >
//                       {request.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     {request.status === 'pending' && (
//                       <button
//                         onClick={() => handleServe(request._id)}
//                         className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none"
//                       >
//                         Serve
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No meal requests found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ServeMeals;


import React, { useState, useEffect } from 'react';

const ServeMeals = () => {
  const [mealRequests, setMealRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch meal requests
  const fetchMealRequests = async (query = '') => {
    setLoading(true);
    try {
      const response = await fetch(`https://hotel-management-server-dun.vercel.app/meal-requests?search=${query}`);
      const data = await response.json();
      setMealRequests(data);
    } catch (error) {
      console.error('Error fetching meal requests:', error);
    } finally {
      setLoading(false);
    }
  };

  // Change status to "delivered"
  const handleServe = async (id) => {
    try {
      const response = await fetch(`https://hotel-management-server-dun.vercel.app/meal-requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'delivered' }),
      });
      if (response.ok) {
        // Update the local state to reflect the changes
        setMealRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === id ? { ...request, status: 'delivered' } : request
          )
        );
      } else {
        console.error('Failed to update meal status');
      }
    } catch (error) {
      console.error('Error updating meal status:', error);
    }
  };

  // Search meals
  const handleSearch = (event) => {
    event.preventDefault();
    fetchMealRequests(searchQuery);
  };

  // Fetch initial data
  useEffect(() => {
    fetchMealRequests();
  }, []);

  return (
    <div className="container mx-auto my-10 px-4">
      <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-8">Requested Meals</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6 flex items-center justify-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by username or email"
          className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="ml-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Search
        </button>
      </form>

      {/* Meal Requests Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-100 text-gray-700">
              <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">User Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">Loading...</td>
              </tr>
            ) : mealRequests.length > 0 ? (
              mealRequests.map((request) => (
                <tr key={request._id} className="border-b">
                  <td className="px-6 py-4">{request.mealTitle}</td>
                  <td className="px-6 py-4">{request.userEmail}</td>
                  <td className="px-6 py-4">{request.userName}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        request.status === 'delivered' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {request.status === 'pending' ? (
                      <button
                        onClick={() => handleServe(request._id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none"
                      >
                        Serve
                      </button>
                    ) : (
                      <span className="text-green-600 font-semibold">Done</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No meal requests found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServeMeals;
