import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  if (!product) {
    return (
      <div>
        <p>No product selected for payment.</p>
        <button onClick={() => navigate('/')}>Back to Products</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Payment Page</h1>
      <h2>Product: {product.name}</h2>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: '200px', borderRadius: '8px' }}
      />
      <p>Price: ₹{product.price.toFixed(2)}</p>

      {/* Your payment logic/form goes here */}
      <button
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '6px',
          cursor: 'pointer',
          marginTop: '20px',
        }}
        onClick={() => alert(`Paying ₹${product.price.toFixed(2)} for ${product.name}`)}
      >
        Confirm Payment
      </button>
    </div>
  );
};

export default PaymentPage;
