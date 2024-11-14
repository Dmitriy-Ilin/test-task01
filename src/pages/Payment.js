import React from "react";

const Payment = ({ onBack }) => {
  return (
    <div className="payment">
      <h1>Оплата...</h1>
      <button className="back-button" onClick={onBack}>
        Назад
      </button>
    </div>
  );
};

export default Payment;
