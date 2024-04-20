import React, { useState } from 'react';
import Layout from './Layout';

const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDetails, setProductDetails] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [productPhotos, setProductPhotos] = useState([]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Construct formData object with all input values
    const formData = {
      name: productName,
      price: productPrice,
      discountPrice: discountPrice,
      category: productCategory,
      details: productDetails,
      brand: productBrand,
      photos: productPhotos
    };

    console.log('Form Data:', formData);

    // Reset form fields after submission (if needed)
    setProductName('');
    setProductPrice('');
    setDiscountPrice('');
    setProductCategory('');
    setProductDetails('');
    setProductBrand('');
    setProductPhotos([]);
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);

    // Prepare array of photo URLs for preview or later submission
    const photoUrls = files.map((file) => URL.createObjectURL(file));

    setProductPhotos((prevPhotos) => [...prevPhotos, ...photoUrls]);
  };

  return (
    <Layout>
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleFormSubmit}>
      <h2 className="text-lg font-bold mb-4">Add New Product</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
          Product Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="productName"
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productBrand">
          Brand Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="productBrand"
          type="text"
          placeholder="Product Brand"
          value={productBrand}
          onChange={(e) => setProductBrand(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productPrice">
          Price
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="productPrice"
          type="text"
          placeholder="Product Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discountPrice">
          Discount Price
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="discountPrice"
          type="text"
          placeholder="Discount Price"
          value={discountPrice}
          onChange={(e) => setDiscountPrice(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productCategory">
          Category
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="productCategory"
          type="text"
          placeholder="Product Category"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productDetails">
          Product Details
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="productDetails"
          placeholder="Product Details"
          value={productDetails}
          onChange={(e) => setProductDetails(e.target.value)}
        ></textarea>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productPhotos">
          Product Photos
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="productPhotos"
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoUpload}
        />
        {productPhotos.length > 0 && (
          <div className="mt-2">
            {productPhotos.map((photoUrl, index) => (
              <img key={index} src={photoUrl} alt={`Product Photo ${index}`} className="h-40 w-40 object-contain inline-block mr-2 mb-2" />
            ))}
          </div>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Product
      </button>
    </form>
    </Layout>
  );
};

export default AddProductForm;


