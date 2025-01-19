import React, { useEffect, useState } from 'react';

const Upcoming = () => {
  const [items, setItems] = useState([]);

  // Fetch the data from the API when the component mounts
  useEffect(() => {
    fetch('http://localhost:5000/upcoming')
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6 bg-gray-100 my-20">
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
  );
};

export default Upcoming;