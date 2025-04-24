import React, { useState } from 'react';
import '../styles/modals.css';

const AddPaymentModal = ({ onAdd, onClose }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [total, setTotal] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Payment Title cannot be blank!');
      return;
    }

    const newPayment = {
      title,
      desc,
      total: parseFloat(total),
      due_date: dueDate,
      paid: false,
    };

    await onAdd(newPayment);

    setTitle('');
    setDesc('');
    setTotal('');
    setDueDate('');
    setError('');
    onClose();
  };

  return (
    <div className="modal show fade d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Payment</h5>
            <button onClick={onClose} className="btn-close"></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <label>Payment Title</label>
              <input
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              {error && <div className="text-danger mt-1">{error}</div>}

              <label className="mt-3">Description</label>
              <textarea
                className="form-control"
                rows="4"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />

              <label className="mt-3">Total Amount ($)</label>
              <input
                type="number"
                className="form-control"
                min="0"
                step="0.01"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                required
              />

              <label className="mt-3">Due Date</label>
              <input
                type="date"
                className="form-control"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />

              <div className="mt-4 d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPaymentModal;
