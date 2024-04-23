import React, { useState, useEffect } from 'react';
import { DocumentRemoveIcon, FolderRemoveIcon, UserRemoveIcon, } from '@heroicons/react/outline';
import Layout from './Layout';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddProductForm = () => {
  const [user, setUser] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDetails, setProductDetails] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [productPhotos, setProductPhotos] = useState([]);
  const [processing, setProcessing] = useState(false); // State to manage processing status
  const [dynamicText, setDynamicText] = useState('');

  const toastOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  }

  useEffect(() => {
    let id = localStorage.getItem('userId');
    setUser(id);
  }, []);

  const handleUpload = async () => {
    setDynamicText('Uploading Images...');

    const formData = new FormData();
    productPhotos.forEach((image) => {
      formData.append('photo', image);
    });

    try {
      const response = await axios.post('http://localhost:5000/api/images/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });


      return response.data;
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setProcessing(true);
    const uploadedImages = await handleUpload();
    console.log(uploadedImages);

    // Construct formData object with all input values
    const formData = {
      user,
      name: productName,
      price: productPrice,
      discountPercentage: discountPrice,
      countInStock,
      category: productCategory,
      description: productDetails,
      brand: productBrand,
      imageURLs: uploadedImages
    };

    console.log('Form Data:', formData);



    // const imgs = await Promise.all(imageURLs.map(async (imag) => {
    //   return handleImageUpdate(imag);
    // }));

    // const updatedData = {
    //   ...formData,
    //   images: imgs
    // }

    try {
      setDynamicText('Adding Product...');

      //if (address) {
      const response = await axios.post("http://localhost:5000/api/products", formData);
      if (response.status === 201) {
        toast.success(response.data.message, toastOptions)
      } else {
        toast.error(response.data.message, toastOptions)
      }
      // } else {
      //     const response = await axios.post('http://localhost:5000/api/users/address',{userId,newAddress: formData});
      //     if(response.status===200){
      //         toast.success(response.data.message, toastOptions)
      //     }else{
      //         toast.error(response.data.message, toastOptions)
      //     }
      // }
    } catch (error) {
      toast.error(error.message, toastOptions)
      console.error('Failed to save address:', error);
    } finally {
      // Hide the processing popup and set processing status to false
      setProcessing(false);
    }

    // Reset form fields after submission (if needed)
    setProductName('');
    setProductPrice('');
    setDiscountPrice('');
    setCountInStock('');
    setProductCategory('');
    setProductDetails('');
    setProductBrand('');
    setProductPhotos([]);
  };

  const handlePhotoUpload = (e) => {
    //const files = Array.from(e.target.files);
    const files = e.target.files;
    //setProductPhotos(files);
    setProductPhotos((prevPhotos) => [...prevPhotos, ...files]);
    console.log(productPhotos);
    // Prepare array of photo URLs for preview or later submission
    // const photoUrls = files.map((file) => URL.createObjectURL(file));

    // setProductPhotos((prevPhotos) => [...prevPhotos, ...photoUrls]);
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
            MRP (in ₹)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="productPrice"
            type="number"
            placeholder="Product Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discountPrice">
            Discount Percentage (in %)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="discountPrice"
            type="number"
            min={0} max={100}
            placeholder="Discount Price"
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="countInStock">
            Quantity
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="countInStock"
            type="number"
            placeholder="Enter no of Stock"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
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
                <div key={index} className="inline-block relative m-2">
                  <img src={photoUrl} alt={`Product Photo ${index}`} className="h-40 w-40 object-contain" />
                  <button className="absolute top-0 right-0 text-red-500 hover:text-red-700" onClick={() => handleRemovePhoto(index)}><UserRemoveIcon className='w-5 h-5' />X</button>
                </div>
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


