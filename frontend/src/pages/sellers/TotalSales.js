import React, { useState, useEffect } from 'react';
import Layout from './Layout';

const TotalSales = () => {
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    // Fetch total sales data from your backend API
    fetchTotalSales();
  }, []);

  const fetchTotalSales = async () => {
    try {
      // Make API call to fetch total sales data
      const response = await fetch('/api/total-sales'); // Update API endpoint
      const data = await response.json();

      // Set total sales data
      setTotalSales(data.totalSales);
    } catch (error) {
      console.error('Error fetching total sales:', error);
    }
  };

  return (
    <Layout>
        
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-lg font-bold mb-4">Total Sales</h2>
        <div className="mb-4">
          <p className="text-xl font-bold">Total Revenue: ${totalSales.toFixed(2)}</p>
        </div>
        </div>
    </Layout>
  );
};

export default TotalSales;
