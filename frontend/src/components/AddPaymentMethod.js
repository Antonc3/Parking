import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const AddPaymentMethod = ({ onPaymentMethodAdded }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        throw error;
      }

      // Pass the paymentMethod object to the parent component
      onPaymentMethodAdded(paymentMethod);
    } catch (error) {
      console.log('Error:', error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Add New Payment Method</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Card Details</label>
          <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
        </div>
        {error && <div>{error}</div>}
        <button type="submit">Add Payment Method</button>
      </form>
    </div>
  );
};

export default AddPaymentMethod;