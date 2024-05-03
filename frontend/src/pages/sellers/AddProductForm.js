import React, { useState, useEffect } from 'react';
import { DocumentRemoveIcon, FolderRemoveIcon, UserRemoveIcon, } from '@heroicons/react/outline';
import Layout from './Layout';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddProductForm = () => {
  const [user, setUser] = useState('');
  const emptyProductForm = {
    name: '',
    brand: '',
    price: '',
    discountPercentage: '',
    discountStart: '',
    discountEnd: '',
    countInStock: '',
    category: '',
    description: '',
    imageURLs: [],
  };
  // const [productName, setProductName] = useState('');
  // const [productPrice, setProductPrice] = useState('');
  // const [discountPrice, setDiscountPrice] = useState('');
  // const [countInStock, setCountInStock] = useState('');
  // const [productCategory, setProductCategory] = useState('');
  // const [productDetails, setProductDetails] = useState('');
  // const [productBrand, setProductBrand] = useState('');
  const [processing, setProcessing] = useState(false); // State to manage processing status
  const [dynamicText, setDynamicText] = useState('');
  const [productPhotos, setProductPhotos] = useState([]);
  const [productData, setProductData] = useState(emptyProductForm);

  
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
    setProductData((prevProductData) => ({
      ...prevProductData,
      user: id,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevProductData) => ({
      ...prevProductData,
      [name]: value,
    }));
  };

  const handlePhotoUpload = async () => {
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
    
    const uploadedImages = await handlePhotoUpload();
    console.log(uploadedImages);

    // Construct formData object with all input values
    // setProductData((prevProductData) => ({
    //   ...prevProductData,
    //   imageURLs: uploadedImages,
    // }));
    // const formData = {
    //   user,
    //   name: productName,
    //   price: productPrice,
    //   discountPercentage: discountPrice,
    //   countInStock,
    //   category: productCategory,
    //   description: productDetails,
    //   brand: productBrand,
    //   //imageURLs: uploadedImages
    // };

    //console.log('Form Data:', productData);



    // const imgs = await Promise.all(imageURLs.map(async (imag) => {
    //   return handleImageUpdate(imag);
    // }));

    // const updatedData = {
    //   ...formData,
    //   images: imgs
    // }
    // setProductData((prevProductData) => ({
    //   ...prevProductData,
    //   user: user,
    //   //imageURLs: uploadedImages,
    // }));
    //console.log(productData)

    try {
      setDynamicText('Adding Product...');

      //if (address) {
      const response = await axios.post("http://localhost:5000/api/products", {...productData, imageURLs: uploadedImages });
      if (response.status === 201) {
        toast.success(response.data.message, toastOptions);
        resetProductForm();
        setProductPhotos([]);
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
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setProductPhotos((prevPhotos) => [...prevPhotos, ...files]);

    const photoUrls = files.map((file) => URL.createObjectURL(file));
    setProductData((prevProductData) => ({
      ...prevProductData,
      imageURLs: [...prevProductData.imageURLs, ...photoUrls],
    }));
  };

  const handleRemovePhoto = (indexToRemove) => {
    setProductPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );

    setProductData((prevProductData) => ({
      ...prevProductData,
      imageURLs: prevProductData.imageURLs.filter((_, i) => i !== indexToRemove),
    }));
    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   productPhotos: prevFormData.productPhotos.filter((_, i) => i !== index),
    // }));
    console.log(productData,productPhotos)
  };

  const resetProductForm = async() => {
    setProductData({...productData,...emptyProductForm});
  }

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
            name="name"
            placeholder="Product Name"
            value={productData.name}
            onChange={handleChange}
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
            name="brand"
            placeholder="Product Brand"
            value={productData.brand}
            onChange={handleChange}
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
            name='price'
            placeholder="Product Price"
            value={productData.price}
            onChange={handleChange}
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
            name='discountPercentage'
            placeholder="Discount Price"
            value={productData.discountPercentage}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4 flex items-center">
          <div className='w-[50%]'>
            <label className="block text-gray-700 text-sm font-bold mr-2" htmlFor="discountStartDate">
              Discount Start Date
            </label>
            <input
              className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
              id="discountStartDate"
              type="date"
              name='discountStart'
              placeholder="Discount Start Date"
              value={productData.discountStart}
              onChange={handleChange}
            />
          </div>
          <div className='w-[50%]'>
            <label className="block text-gray-700 text-sm font-bold mr-2" htmlFor="discountEndDate">
              Discount End Date
            </label>
            <input
              className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="discountEndDate"
              type="date"
              name='discountEnd'
              placeholder="Discount End Date"
              value={productData.discountEnd}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="countInStock">
            Quantity
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="countInStock"
            type="number"
            name='countInStock'
            placeholder="Enter no of Stock"
            value={productData.countInStock}
            onChange={handleChange}
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
            name='category'
            placeholder="Product Category"
            value={productData.category}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productDetails">
            Product Details
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="productDetails"
            name='description'
            placeholder="Product Details"
            value={productData.description}
            onChange={handleChange}
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
            onChange={handlePhotoChange}
          />
          {productData.imageURLs.length > 0 && (
            <div className="mt-2">
              {productData.imageURLs.map((photoUrl, index) => (
                <div key={index} className="inline-block relative m-2">
                  <img src={photoUrl} alt={`Product Photo ${index}`} className="h-40 w-40 object-contain" />
                  <button className="absolute top-0 right-0 text-red-500 hover:text-red-700" onClick={() => handleRemovePhoto(index)}>X</button>
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
        {/* Processing popup */}
      {processing && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
          <div className="text-white text-lg ml-4">{dynamicText}</div>
        </div>
      )}
      </form>
    </Layout>
  );
};

export default AddProductForm;


