import React from "react";
import "../styles/payment-card.css"; 

const PaymentCard = ({ payment, onEdit, onDelete, onTogglePaid }) => {
    const { _id, title, desc, total, due_date, paid } = payment;
    const isOverDue = new Date(due_date) < new Date().toISOString().split("T")[0];
    const overDueLabel = isOverDue ? (
      <span className="overdue-label">OVERDUE</span>
    ) : null;
  
    const isPaid = paid ? "Paid" : "Not Paid";
    const paidClass = paid ? "paid-button-paid" : "paid-button-unpaid";
  
    return (
        <div className="payment-card" id={`payment-${_id}`}>
            <h4 className="fw-bold">{title}</h4>
            <p className="text-secondary">{desc}</p>
    
            <div className="amount-due">
                <p><strong>Amount:</strong> ${total}</p>
                <p><strong>Due Date:</strong> {due_date} {overDueLabel}</p>
            </div>
    
            <div className="payment-actions">
                <i className="fas fa-edit" onClick={() => onEdit(payment)}></i>
                <i className="fas fa-trash" onClick={() => onDelete(_id)}></i>
                <button
                    className={`paid-button ${paidClass}`}
                    onClick={() => onTogglePaid(payment)}
                >
                    {isPaid}
                </button>
            </div>
        </div>
    );
};
  
export default PaymentCard;
