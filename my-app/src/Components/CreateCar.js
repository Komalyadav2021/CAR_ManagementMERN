// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const ProductForm = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [tags, setTags] = useState('');
//   const [images, setImages] = useState([]);
//   const navigate = useNavigate();

//   // Handle the form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Create a new FormData object
//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('tags', tags);

//     // Append each selected image to the FormData object
//     images.forEach((image) => {
//       formData.append('images', image);  // 'images' should match the key in multer upload.array('images', 5)
//     });

//     try {
//       // Send the form data to the backend using axios
//       const response = await axios.post('http://localhost:8000/api/products', formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`, // If needed for authentication
//           'Content-Type': 'multipart/form-data',  // Ensure the request is sent as multipart
//         },
//       });

//       // Handle successful response
//       console.log(response.data);  // Optionally log the server response
//       navigate('/products');  // Redirect to the products page after successful submission
//     } catch (error) {
//       console.error("Error uploading product:", error.response || error);
//       alert('Error uploading product');  // Display error message if upload fails
//     }
//   };

//   // Handle file input changes (for multiple files)
//   const handleImageChange = (e) => {
//     setImages([...e.target.files]);
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="mb-4">Add New Car</h1>
//       <form onSubmit={handleSubmit} className="shadow-lg p-4 bg-light rounded">
//         <div className="mb-3">
//           <label htmlFor="title" className="form-label">Title</label>
//           <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="description" className="form-label">Description</label>
//           <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="tags" className="form-label">Tags</label>
//           <input type="text" className="form-control" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} required />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="images" className="form-label">Images</label>
//           <input type="file" className="form-control" id="images" multiple onChange={handleImageChange} />
//         </div>
//         <button type="submit" className="btn btn-success">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default ProductForm;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags);

    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await axios.post('http://localhost:8000/api/products', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);  // Log the response
      navigate('/navbar');  // Redirect to the products page after successful submission
    } catch (error) {
      console.error("Error uploading product:", error.response || error);
      alert('Error uploading product');
    }
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Add New Car</h1>
      <form onSubmit={handleSubmit} className="shadow-lg p-4 bg-light rounded">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">Tags</label>
          <input type="text" className="form-control" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="images" className="form-label">Images</label>
          <input type="file" className="form-control" id="images" multiple onChange={handleImageChange} />
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  );
};

export default ProductForm;

