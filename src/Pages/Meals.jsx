import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';


const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchMeals = async (pageNumber = 1) => {
    setLoading(true);

    const queryParams = new URLSearchParams({
      page: pageNumber,
      search: searchQuery,
      category: categoryFilter,
      priceMin: priceRange[0],
      priceMax: priceRange[1],
    });

    try {
      const response = await fetch(`https://hotel-management-server-dun.vercel.app/menu?${queryParams.toString()}`);
      const data = await response.json();

      if (data.length === 0) {
        setHasMore(false);
      }

      if (pageNumber === 1) {
        setMeals(data); // Replace meals if it's a fresh search
      } else {
        setMeals((prevMeals) => [...prevMeals, ...data]);
      }
      setPage(pageNumber + 1);
    } catch (error) {
      console.error('Error fetching meals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMeals([]);
    setHasMore(true);
    fetchMeals(1);
  }, [searchQuery, categoryFilter, priceRange]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handlePriceRangeChange = (min, max) => {
    setPriceRange([min, max]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Search Bar */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="search" style={{ display: 'block', marginBottom: '5px' }}>
          Search Meals
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search meals..."
          value={searchQuery}
          onChange={handleSearchChange}
         className="mt-10"
         style={{
            padding: '10px',
            width: '100%',
            maxWidth: '300px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        />
      </div>

      {/* Category Filter */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="category" style={{ display: 'block', marginBottom: '5px' }}>
          Filter by Category
        </label>
        <select
          id="category"
          onChange={handleCategoryChange}
          value={categoryFilter}
          style={{
            padding: '10px',
            width: '100%',
            maxWidth: '300px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        >
          <option value="">Select Category</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
      </div>

      {/* Price Range Filter */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="price-range" style={{ display: 'block', marginBottom: '5px' }}>
          Price Range
        </label>
        <div style={{ display: 'flex', gap: '10px', maxWidth: '300px' }}>
          <input
            type="number"
            placeholder="Min Price"
            value={priceRange[0]}
            onChange={(e) => handlePriceRangeChange(Number(e.target.value), priceRange[1])}
            style={{
              padding: '10px',
              flex: 1,
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
          <input
            type="number"
            placeholder="Max Price"
            value={priceRange[1]}
            onChange={(e) => handlePriceRangeChange(priceRange[0], Number(e.target.value))}
            style={{
              padding: '10px',
              flex: 1,
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
        </div>
      </div>

      {/* Infinite Scroll */}
      <InfiniteScroll
        pageStart={0}
        loadMore={() => fetchMeals(page)}
        hasMore={hasMore && !loading}
        loader={<div key="loader">Loading...</div>}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {meals.map((meal) => (
            <div
              key={meal._id}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                width: '200px',
                borderRadius: '5px',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
              }}
            >
              <img
                src={meal.image}
                alt={meal.title}
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '5px',
                }}
              />
              <h3>{meal.title}</h3>
              <p>Price: ${meal.price}</p>
              <p>Category: {meal.category}</p>
              <p>Rating: {meal.rating}</p>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Meals;

