import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { fetchPaymentMethods, selectPaymentMethod } from './actions';

const PaymentMethods = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const paymentMethods = useSelector((state) => state.paymentMethods);
  const selectedPaymentMethod = useSelector((state) => state.selectedPaymentMethod);

  useEffect(() => {
    dispatch(fetchPaymentMethods()); // Fetch payment methods from API on component mount
  }, [dispatch]);

  const handlePaymentMethodChange = (event) => {
    dispatch(selectPaymentMethod(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !selectedPaymentMethod) {
      return;
    }

    // Use selectedPaymentMethod.id for payment/transaction creation
    // ...

    // Example: Confirm the payment intent
    // const paymentIntent = await stripe.confirmCardPayment(paymentIntentId, {
    //   payment_method: selectedPaymentMethod.id,
    // });

    // Handle the payment confirmation response
    // ...

    // Reset selected payment method after successful payment
    dispatch(selectPaymentMethod(null));
  };

  return (
    <div>
      <h2>Select Payment Method</h2>
      <form onSubmit={handleSubmit}>
        <select onChange={handlePaymentMethodChange} value={selectedPaymentMethod}>
          <option value="">-- Select Payment Method --</option>
          {paymentMethods.map((paymentMethod) => (
            <option key={paymentMethod.id} value={paymentMethod.id}>
              {paymentMethod.last4} - {paymentMethod.brand}
            </option>
          ))}
        </select>

        {selectedPaymentMethod && (
          <div>
            <label>Card Details</label>
            <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
          </div>
        )}

        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default PaymentMethods;
