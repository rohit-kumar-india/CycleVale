import React, { useState } from 'react';
import ProfileLayout from '.';

const SavedUPI = () => {
  // State to store the list of saved UPI IDs
  const [upiIds, setUpiIds] = useState([]);
  // State to store the value of the input field for adding new UPI ID
  const [newUpiId, setNewUpiId] = useState('');

  // Function to handle UPI ID deletion
  const handleDeleteUPI = async (id) => {
    try {
      // Simulating deletion by filtering out the selected UPI ID
      setUpiIds(upiIds.filter(upiId => upiId.id !== id));
    } catch (error) {
      console.error('Failed to delete UPI ID', error);
    }
  };

  // Function to handle input field change for adding new UPI ID
  const handleInputChange = (event) => {
    setNewUpiId(event.target.value);
  };

  // Function to handle adding new UPI ID
  const handleAddUpiId = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      if (newUpiId.trim() === '') {
        return;
      }
      // Simulating addition by adding the new UPI ID to the state
      const newId = upiIds.length > 0 ? Math.max(...upiIds.map(item => item.id)) + 1 : 1;
      setUpiIds([...upiIds, { id: newId, upiId: newUpiId }]);
      setNewUpiId('');
    } catch (error) {
      console.error('Failed to add UPI ID', error);
    }
  };

  return (
    <ProfileLayout>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right, #FFA500, #FFD700)',
        paddingTop: '64px' // Adjust as needed to account for header height
      }}>
        <div className="saved-upi-container" style={{ maxWidth: '800px', width: '100%', padding: '20px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Enter UPI ID</h2>
          <form className="add-upi-form" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }} onSubmit={handleAddUpiId}>
            <input type="text" id="upi-id" name="upiId" style={{ flex: '1', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', marginRight: '10px' }} value={newUpiId} onChange={handleInputChange} required />
            <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add UPI ID</button>
          </form>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Saved UPI IDs</h2>
            {upiIds.map((upiId) => (
              <div className="upi" key={upiId.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9', marginBottom: '10px' }}>
                <p style={{ margin: '0' }}>UPI ID: {upiId.upiId}</p>
                <button onClick={() => handleDeleteUPI(upiId.id)} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}><span role="img" aria-label="Delete">🗑️</span></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default SavedUPI;
