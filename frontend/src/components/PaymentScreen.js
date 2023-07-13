import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { fetchPaymentMethods, setActivePaymentMethod, addPaymentMethod } from '../actions/PaymentActions';
import AddPaymentMethod from './AddPaymentMethod';

const PaymentMethods = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const paymentMethods = useSelector((state) => state.payment.paymentMethods);
  const activePayment = useSelector((state.payment.activePayment))

  useEffect(() => {
    dispatch(fetchPaymentMethods()); // Fetch payment methods from API on component mount
  }, [dispatch]);

  const handlePaymentMethodChange = (event) => {
    dispatch(setActivePaymentMethod(event.target.value));
  };

  const handlePaymentMethodAdded = (paymentMethod) => {
    dispatch(addPaymentMethod(paymentMethod));
  };

  return (
    <div>
      <h2>Select Payment Method</h2>
        {paymentMethods.map((paymentMethod) => (
          <div key={paymentMethod.id}>
            <input
              type="radio"
              id={paymentMethod.id}
              name="paymentMethod"
              value={paymentMethod.id}
              checked={activePayment === paymentMethod.id}
              onChange={handlePaymentMethodChange}
            />
            <label htmlFor={paymentMethod.id}>
              {paymentMethod.last4} - {paymentMethod.brand}
            </label>
          </div>
        ))}

        <AddPaymentMethod onPaymentMethodAdded={handlePaymentMethodAdded} />
    </div>
  );
};

export default PaymentMethods;
