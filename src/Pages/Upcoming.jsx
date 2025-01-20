// import React, { useEffect, useState } from 'react';

// const Upcoming = () => {
//   const [items, setItems] = useState([]);

//   // Fetch the data from the API when the component mounts
//   useEffect(() => {
//     fetch('https://hotel-management-server-dun.vercel.app/upcoming')
//       .then((response) => response.json())
//       .then((data) => {
//         setItems(data);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   return (
//     <div className="flex flex-wrap justify-center gap-6 p-6 bg-gray-100 my-20">
//       {items.map((item) => (
//         <div
//           key={item._id}
//           className="max-w-xs w-full bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out"
//         >
//           <img
//             src={item.image}
//             alt={item.title}
//             className="w-full h-56 object-cover"
//           />
//           <div className="p-4">
//             <h2 className="text-2xl font-semibold text-gray-800">{item.title}</h2>
            
//             <p className="text-gray-700 mt-2">{item.description}</p>
//             <p className="text-gray-400 text-xs mt-2">{item.date}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Upcoming;


import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Upcoming = () => {
  const [items, setItems] = useState([]);

  // Fetch the data from the API when the component mounts
  useEffect(() => {
    fetch("https://hotel-management-server-dun.vercel.app/upcoming")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="bg-gray-100 py-10">
      {/* Hero Section */}
      <div className="text-center bg-gradient-to-r from-purple-500 to-blue-500 text-white py-14 rounded-lg shadow-lg mb-10">
        <motion.h1
          className="text-4xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
        >
          Discover What's Coming Next!
        </motion.h1>
        <motion.p
          className="mt-4 text-lg font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 2 }}
        >
          Stay updated with the latest and greatest events and releases.
        </motion.p>
      </div>

      {/* Upcoming Items */}
      <div className="container mx-auto flex flex-wrap justify-center gap-6 p-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="max-w-xs w-full bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-gray-800">{item.title}</h2>
              <p className="text-gray-700 mt-2">{item.description}</p>
              <p className="text-gray-400 text-xs mt-2">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upcoming;

