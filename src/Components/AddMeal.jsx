// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';

// const AddMealForm = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [imageURL, setImageURL] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Admin data (hardcoded as per your request)
//   const adminName = 'Faiza';
//   const adminEmail = 'faiza@gmail.com';

//   // Image upload handler (using ImageBB API)
//   const handleImageUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('image', file);

//     setLoading(true);
//     try {
//       const response = await fetch('https://api.imgbb.com/1/upload?key=2d18adbd80fc9c8f6b4d5b9cd1024442', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await response.json();
//       if (data.success) {
//         setImageURL(data.data.url);
//       } else {
//         console.error('Image upload failed');
//       }
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Form submission handler
//   const onSubmit = async (data) => {
//     const mealData = {
//       ...data,
//       image: imageURL,
//       distributor: adminName,
//       email: adminEmail,
//       rating: 0,
//       likes: 0,
//       reviews_count: 0,
//       post_time: new Date().toISOString(),
//     };

//     try {
//       const response = await fetch('http://localhost:5000/menu', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(mealData),
//       });
//       if (response.ok) {
//         alert('Meal added successfully!');
//       } else {
//         console.error('Failed to add meal');
//       }
//     } catch (error) {
//       console.error('Error adding meal:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto my-10 px-4">
//       <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-8">Add New Meal</h1>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
//         {/* Title */}
//         <div>
//           <label htmlFor="title" className="block text-lg font-semibold text-gray-700">Meal Title</label>
//           <input
//             type="text"
//             id="title"
//             {...register('title', { required: 'Title is required' })}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
//         </div>

//         {/* Category */}
//         <div>
//           <label htmlFor="category" className="block text-lg font-semibold text-gray-700">Category</label>
//           <input
//             type="text"
//             id="category"
//             {...register('category', { required: 'Category is required' })}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           {errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}
//         </div>

//         {/* Ingredients */}
//         <div>
//           <label htmlFor="ingredients" className="block text-lg font-semibold text-gray-700">Ingredients</label>
//           <textarea
//             id="ingredients"
//             {...register('ingredients', { required: 'Ingredients are required' })}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           {errors.ingredients && <span className="text-red-500 text-sm">{errors.ingredients.message}</span>}
//         </div>

//         {/* Description */}
//         <div>
//           <label htmlFor="description" className="block text-lg font-semibold text-gray-700">Description</label>
//           <textarea
//             id="description"
//             {...register('description', { required: 'Description is required' })}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
//         </div>

//         {/* Price */}
//         <div>
//           <label htmlFor="price" className="block text-lg font-semibold text-gray-700">Price</label>
//           <input
//             type="number"
//             id="price"
//             {...register('price', { required: 'Price is required' })}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
//         </div>

//         {/* Post Time */}
//         <div>
//           <label htmlFor="post_time" className="block text-lg font-semibold text-gray-700">Post Time</label>
//           <input
//             type="datetime-local"
//             id="post_time"
//             {...register('post_time', { required: 'Post time is required' })}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           {errors.post_time && <span className="text-red-500 text-sm">{errors.post_time.message}</span>}
//         </div>

//         {/* Image Upload */}
//         <div>
//           <label htmlFor="image" className="block text-lg font-semibold text-gray-700">Upload Image</label>
//           <input
//             type="file"
//             id="image"
//             onChange={handleImageUpload}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           {loading && <p className="text-blue-500 text-sm">Uploading...</p>}
//           {imageURL && <img src={imageURL} alt="Uploaded" className="w-32 h-32 object-cover mt-4 rounded-lg" />}
//         </div>

//         {/* Admin Details (Readonly) */}
//         <div>
//           <label htmlFor="distributor" className="block text-lg font-semibold text-gray-700">Distributor</label>
//           <input
//             type="text"
//             id="distributor"
//             value={adminName}
//             readOnly
//             className="w-full px-4 py-3 border bg-gray-100 rounded-lg"
//           />
//         </div>

//         <div>
//           <label htmlFor="email" className="block text-lg font-semibold text-gray-700">Email</label>
//           <input
//             type="email"
//             id="email"
//             value={adminEmail}
//             readOnly
//             className="w-full px-4 py-3 border bg-gray-100 rounded-lg"
//           />
//         </div>

//         <button type="submit" className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-6">
//           Add Meal
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddMealForm;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const AddMealForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(false);

  const adminName = 'Faiza';
  const adminEmail = 'faiza@gmail.com';

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setLoading(true);
    try {
      const response = await fetch('https://api.imgbb.com/1/upload?key=2d18adbd80fc9c8f6b4d5b9cd1024442', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setImageURL(data.data.url);
      } else {
        console.error('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    const mealData = {
      ...data,
      image: imageURL,
      distributor: adminName,
      email: adminEmail,
      rating: 0,
      likes: 0,
      reviews_count: 0,
      post_time: new Date().toISOString(),
    };

    try {
      const response = await fetch('http://localhost:5000/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mealData),
      });
      if (response.ok) {
        alert('Meal added successfully!');
        reset(); // Reset the form fields
        setImageURL(null); // Clear the uploaded image preview
      } else {
        console.error('Failed to add meal');
      }
    } catch (error) {
      console.error('Error adding meal:', error);
    }
  };

  return (
    <div className="container mx-auto my-10 px-4">
      <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-8">Add New Meal</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-lg font-semibold text-gray-700">Meal Title</label>
          <input
            type="text"
            id="title"
            {...register('title', { required: 'Title is required' })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-lg font-semibold text-gray-700">Category</label>
          <input
            type="text"
            id="category"
            {...register('category', { required: 'Category is required' })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}
        </div>

        {/* Ingredients */}
        <div>
          <label htmlFor="ingredients" className="block text-lg font-semibold text-gray-700">Ingredients</label>
          <textarea
            id="ingredients"
            {...register('ingredients', { required: 'Ingredients are required' })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.ingredients && <span className="text-red-500 text-sm">{errors.ingredients.message}</span>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-lg font-semibold text-gray-700">Description</label>
          <textarea
            id="description"
            {...register('description', { required: 'Description is required' })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-lg font-semibold text-gray-700">Price</label>
          <input
            type="number"
            id="price"
            {...register('price', { required: 'Price is required' })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-lg font-semibold text-gray-700">Upload Image</label>
          <input
            type="file"
            id="image"
            onChange={handleImageUpload}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {loading && <p className="text-blue-500 text-sm">Uploading...</p>}
          {imageURL && <img src={imageURL} alt="Uploaded" className="w-32 h-32 object-cover mt-4 rounded-lg" />}
        </div>

        <button type="submit" className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-6">
          Add Meal
        </button>
      </form>
    </div>
  );
};

export default AddMealForm;
