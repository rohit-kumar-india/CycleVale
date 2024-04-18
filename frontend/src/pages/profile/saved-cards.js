import React, { useState } from 'react';
import ProfileLayout from '.';

const SavedCards = () => {
  // State to store the list of saved card details
  const [cards, setCards] = useState([]);
  // States to store the values of the input fields for adding new card details
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newExpirationDate, setNewExpirationDate] = useState('');
  const [newCVV, setNewCVV] = useState('');
  // State to store validation errors
  const [errors, setErrors] = useState({});

  // Function to handle card deletion
  const handleDeleteCard = async (id) => {
    try {
      // Simulating deletion by filtering out the selected card
      setCards(cards.filter(card => card.id !== id));
    } catch (error) {
      console.error('Failed to delete card', error);
    }
  };

  // Function to handle input field change for adding new card number
  const handleCardNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, ''); // Allow only digits
    setNewCardNumber(value);
  };

  // Function to handle input field change for adding new expiration date
  const handleExpirationDateChange = (event) => {
    setNewExpirationDate(event.target.value);
  };

  // Function to handle input field change for adding new CVV
  const handleCVVChange = (event) => {
    setNewCVV(event.target.value);
  };

  // Function to validate card details
  const validateCardDetails = () => {
    const errors = {};

    // Card number validation
    if (newCardNumber.trim().length !== 16) {
      errors.cardNumber = 'Card number must be 16 digits.';
    }

    // Expiration date validation
    const expirationDatePattern = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
    if (!expirationDatePattern.test(newExpirationDate)) {
      errors.expirationDate = 'Expiration date must be in MM/YY format.';
    }

    // CVV validation
    if (newCVV.trim().length !== 3) {
      errors.cvv = 'CVV must be 3 digits.';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  // Function to handle adding new card details
  const handleAddCard = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      const isValid = validateCardDetails();

      if (!isValid) {
        return;
      }

      // Simulating addition by adding the new card details to the state
      const newId = cards.length > 0 ? Math.max(...cards.map(item => item.id)) + 1 : 1;
      setCards([...cards, { id: newId, number: newCardNumber, expirationDate: newExpirationDate, cvv: newCVV }]);
      // Reset input fields
      setNewCardNumber('');
      setNewExpirationDate('');
      setNewCVV('');
      setErrors({});
    } catch (error) {
      console.error('Failed to add card', error);
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
        <div className="saved-cards-container" style={{ maxWidth: '800px', width: '100%', padding: '20px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Enter Card Details</h2>
          <form className="add-card-form" style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleAddCard}>
            <input type="text" id="card-number" name="cardNumber" placeholder="Card Number" value={newCardNumber} onChange={handleCardNumberChange} style={{ padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', borderColor: errors.cardNumber && 'red' }} required pattern="[0-9]*" />
            {errors.cardNumber && <span style={{ color: 'red' }}>{errors.cardNumber}</span>}
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <input type="text" id="expiration-date" name="expirationDate" placeholder="Expiration Date (MM/YY)" value={newExpirationDate} onChange={handleExpirationDateChange} style={{ padding: '8px', flex: 1, marginRight: '10px', border: '1px solid #ccc', borderRadius: '4px', borderColor: errors.expirationDate && 'red' }} required />
              <input type="text" id="cvv" name="cvv" placeholder="CVV" value={newCVV} onChange={handleCVVChange} style={{ padding: '8px', flex: 1, border: '1px solid #ccc', borderRadius: '4px', borderColor: errors.cvv && 'red' }} required />
            </div>
            {errors.expirationDate && <span style={{ color: 'red' }}>{errors.expirationDate}</span>}
            {errors.cvv && <span style={{ color: 'red' }}>{errors.cvv}</span>}
            <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>Save Card</button>
          </form>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', marginTop: '40px' }}>Saved Cards</h2>
            {cards.map((card) => (
              <div className="card" key={card.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9', marginBottom: '10px' }}>
                <div>
                  <p style={{ margin: '0' }}>Card Number: {card.number}</p>
                  <p style={{ margin: '0' }}>Expiration Date: {card.expirationDate}</p>
                  <p style={{ margin: '0' }}>CVV: {card.cvv}</p>
                </div>
                <button onClick={() => handleDeleteCard(card.id)} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}><span role="img" aria-label="Delete">🗑️</span></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default SavedCards;
