
import React, { useRef } from 'react';
import { DownloadIcon } from '@heroicons/react/outline';
import {DocumentDownloadIcon} from '@heroicons/react/outline';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const InvoicePage = ({ invoiceData, companyLogo }) => {
  const invoiceNo=Math.floor(Math.random() * 100000);
  var companyName = 'CycleVale';
  const customerInfo = {
    name: 'John Doe',
    address: '123 Main St, City, State, Zip',
    email: 'johndoe@example.com',
    phone: '123-456-7890'
  };

  // Example product details
  const products = [
    { name: 'Product A', brand: 'Brand X', price: 50, count: 2 },
    { name: 'Product B', brand: 'Brand Y', price: 30, count: 1 },
    { name: 'Product C', brand: 'Brand Z', price: 25, count: 3 }
  ];

  const calculateTotalAmount = () => {
    const totalPrice = products.reduce((total, product) => {
      return total + product.price * product.count;
    }, 0);
    return totalPrice;
  };

  const calculateDiscountedAmount = (totalPrice) => {
    // Assuming a discount of 10% for demonstration purposes
    const discount = 0.1 * totalPrice;
    return totalPrice - discount;
  };

  // const { customerInfo, orderItems, totalAmount, discountAmount, amountToPay } = invoiceData;
  const invoiceRef = useRef(null);

  const handlePrint = async () => {
    const invoiceNode = invoiceRef.current;

    if (!invoiceNode) return;

    // Use html2canvas to capture the invoice component as an image
    const canvas = await html2canvas(invoiceNode);

    console.log(canvas)

    // Use jsPDF to create a PDF document
    const pdf = new jsPDF('p', 'px', [canvas.width, canvas.height]);
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, canvas.width, canvas.height);

    // Save or open the PDF
    pdf.save('invoice.pdf');
  };

  return (
    <div className="mt-[60px] max-w-4xl mx-auto">
      <div className="flex justify-end pt-4">
        <button
          className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handlePrint}
        ><DocumentDownloadIcon className="h-8 mr-1"/>Download Invoice
        </button>
      </div>
      <div  ref={invoiceRef}>
        <div className=" p-4 ">

          <div className="bg-white shadow-md rounded-md p-6">
            {/* Invoice Header */}
            <div className="flex justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">Invoice</h1>
                {/* <p>Invoice #: {invoiceNo}</p> */}
                {/* <p className="text-gray-600">Date: {new Date().toLocaleDateString()}</p> */}
              </div>
              <div className='text-right'>

                {/* <p className="text-gray-600">OrderId: {Math.floor(Math.random() * 100000000000)}</p> */}
                <p className="text-gray-600">GSTIN: 09AALCR5032R1ZN</p>
                <p className="text-gray-600">PAN: AALCR5032R</p>
              </div>
            </div>
            <div className='flex justify-between'>
              {/* Customer Information */}
              <div className="mb-4 ">
                <h2 className="text-lg font-bold">Sold by</h2>
                <p className='text-xl font-extrabold'>CycleVale</p>
                <p>WAREHOUSE U-5, INFRONT OF UNIT - V, UPSIDC</p>
                <p>INDUSTRIAL AREA, SITE - II BY PASS, UNNAO - 209801</p>
                <p>GST: 09AALCR5032R1ZN</p>
              </div>
              {/* Customer Information */}
              <div className="mb-4 text-right">
                <h2 className="text-lg font-bold ">Shipping Details</h2>
                <p>{customerInfo.name}</p>
                <p>{customerInfo.address}</p>
                <p>Email: {customerInfo.email}</p>
                <p>Phone: {customerInfo.phone}</p>
              </div>
            </div>
            <div className='text-right'>


            </div>
            {/* Product Details */}
            <div>
              <h2 className="text-lg font-bold mb-2">Product Details</h2>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">Product</th>
                    <th className="border border-gray-300 p-2">Price</th>
                    <th className="border border-gray-300 p-2">Quantity</th>
                    <th className="border border-gray-300 p-2">Discount</th>
                    <th className="border border-gray-300 p-2">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (

                    <tr key={index}>
                      <td className="border border-gray-300 p-2">{product.name}
                        {/* <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.brand}</p>
                    <p className="text-sm text-gray-500">{product.description}</p> */}
                      </td>
                      <td className="border border-gray-300 p-2">{product.price}</td>
                      <td className="border border-gray-300 p-2">{product.count}</td>
                      <td className="border border-gray-300 p-2">- ${product.price * 0.1}</td>
                      <td className="border border-gray-300 p-2">${(product.price - (product.price * 0.1)) * product.count}</td>
                    </tr>
                  ))}
                  {/* Total Amount Row */}
                  <tr>
                    <td colSpan="3" className="border text-left border-gray-300 p-2 font-bold ">
                      Total Amount:
                    </td>
                    <td colSpan="2" className="border text-right border-gray-300 p-2 font-bold">${calculateTotalAmount()}</td>
                  </tr>
                  {/* Discount Row */}
                  <tr>
                    <td colSpan="3" className="border text-left border-gray-300 p-2 font-bold ">
                      Total Discount :
                    </td>
                    <td colSpan="2" className="border text-right border-gray-300 p-2 font-bold">
                      -${(0.1 * calculateTotalAmount()).toFixed(2)}
                    </td>
                  </tr>
                  {/* Amount to be Paid Row */}
                  <tr>
                    <td colSpan="3" className="border text-left border-gray-300 p-2 font-bold">
                      Amount to be Paid:
                    </td>
                    <td colSpan="2" className="border text-right border-gray-300 p-2 font-bold">
                      ${calculateDiscountedAmount(calculateTotalAmount()).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <h2 className='font-bold text-sm'>
                Seller registered address: cyleVale
              </h2>
              <p className='text-xs '>
                GROUND FLOOR, PLOT NO-08, SECTOR-90, JANPATH ROAD, Noida, Gautam Buddha Nagar, GAUTAM BUDDHA NAGAR - 201301.
              </p>
              <h2 className='font-bold text-sm'>Declaration</h2>
              <p className='text-xs'>The goods sold are intended for end user consumption and not for resale</p>
            </div>


          </div>
        </div>




        {/* Print Button */}

      </div>
      <div className="flex justify-center mb-7">
        <button
          className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handlePrint}
        >
          <DocumentDownloadIcon className="h-8 mr-1"/>Download Invoice
        </button>
      </div>
    </div>

  )
};

export default InvoicePage;


// const InvoicePage = ({ }) => {

//   const customerInfo = {
//     name: 'John Doe',
//     address: '123 Main St, City, State, Zip',
//     email: 'johndoe@example.com',
//     phone: '123-456-7890'
//   };

//   // Example product details
//   const products = [
//     { name: 'Product A', brand: 'Brand X', price: 50, count: 2 },
//     { name: 'Product B', brand: 'Brand Y', price: 30, count: 1 },
//     { name: 'Product C', brand: 'Brand Z', price: 25, count: 3 }
//   ];

//   // Function to calculate total amount based on products' prices and counts
//   const calculateTotalAmount = () => {
//     const totalPrice = products.reduce((total, product) => {
//       return total + product.price * product.count;
//     }, 0);
//     return totalPrice;
//   };

//   const calculateDiscountedAmount = (totalPrice) => {
//     // Assuming a discount of 10% for demonstration purposes
//     const discount = 0.1 * totalPrice;
//     return totalPrice - discount;
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 my-10">
//       <div className="bg-white shadow-md rounded-md p-6">
//         {/* Invoice Header */}
//         <div className="flex justify-between mb-4">
//           <div>
//             <h1 className="text-2xl font-bold">Invoice</h1>
//             <p className="text-gray-600">Date: {new Date().toLocaleDateString()}</p>
//           </div>
//           <div>
//             <p>Invoice #: {Math.floor(Math.random() * 100000)}</p>
//           </div>
//         </div>
//         {/* Customer Information */}
//         <div className="mb-4">
//           <h2 className="text-lg font-bold">Customer Information</h2>
//           <p>{customerInfo.name}</p>
//           <p>{customerInfo.address}</p>
//           <p>Email: {customerInfo.email}</p>
//           <p>Phone: {customerInfo.phone}</p>
//         </div>
//         {/* Product Details */}
//         <div>
//           <h2 className="text-lg font-bold mb-2">Product Details</h2>
//           <table className="w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border border-gray-300 p-2">Product</th>
//                 <th className="border border-gray-300 p-2">Count</th>
//                 <th className="border border-gray-300 p-2">Total Price</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((product, index) => (
//                 <tr key={index}>
//                   <td className="border border-gray-300 p-2">
//                     <p className="font-semibold">{product.name}</p>
//                     <p className="text-sm text-gray-500">{product.brand}</p>
//                     <p className="text-sm text-gray-500">{product.description}</p>
//                   </td>
//                   <td className="border border-gray-300 p-2">{product.count}</td>
//                   <td className="border border-gray-300 p-2">${product.price * product.count}</td>
//                 </tr>
//               ))}
//               {/* Total Amount Row */}
//               <tr>
//                 <td colSpan="2" className="border border-gray-300 p-2 font-bold text-right">
//                   Total Amount:
//                 </td>
//                 <td className="border border-gray-300 p-2 font-bold">${calculateTotalAmount()}</td>
//               </tr>
//               {/* Discount Row */}
//               <tr>
//                 <td colSpan="2" className="border border-gray-300 p-2 font-bold text-right">
//                   Discount (10%):
//                 </td>
//                 <td className="border border-gray-300 p-2 font-bold">
//                   -${(0.1 * calculateTotalAmount()).toFixed(2)}
//                 </td>
//               </tr>
//               {/* Amount to be Paid Row */}
//               <tr>
//                 <td colSpan="2" className="border border-gray-300 p-2 font-bold text-right">
//                   Amount to be Paid:
//                 </td>
//                 <td className="border border-gray-300 p-2 font-bold">
//                   ${calculateDiscountedAmount(calculateTotalAmount()).toFixed(2)}
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         {/* Print Button */}
//        <div className="flex justify-end mt-4">
//          <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           onClick={handlePrint}
//         >
//           Print
//         </button>
//       </div>

//       </div>
//     </div>
//   );
// };

// export default InvoicePage;














{/*
 <div className="bg-white shadow-md rounded-md p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">{companyName}</h1>
          </div>
          {companyLogo && <img src={companyLogo} alt="Company Logo" className="w-20 h-20 object-contain" />}
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold">Customer Information</h2>
          <p className="text-sm">{customerInfo.name}</p>
          <p className="text-sm">{customerInfo.address}</p>
          <p className="text-sm">Email: {customerInfo.email}</p>
          <p className="text-sm">Phone: {customerInfo.phone}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold">Order Details</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              {products.map((item, index) => (
                <div key={index} className="border-b border-gray-200 pb-2 mb-2">
                  <p className="text-lg font-semibold">{item.productName}</p>
                  <p className="text-sm text-gray-600">{item.brand}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="col-span-1">
              <div className="text-right">
                <p className="text-lg font-semibold">Total Amount: ${calculateTotalAmount()}</p>
                <p className="text-sm text-gray-600">Discount: ${calculateDiscountedAmount(calculateTotalAmount()).toFixed(2)}</p>
                <p className="text-lg font-bold mt-2">Amount to Pay: ${(0.1 * calculateTotalAmount()).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
</div> */}






