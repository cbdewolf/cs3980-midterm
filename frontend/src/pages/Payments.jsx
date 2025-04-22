import React, { useEffect, useState, useContext } from "react";
import PaymentCard from "../components/PaymentCard";
import AddPaymentModal from "../components/AddPaymentModal";
import EditPaymentModal from "../components/EditPaymentModal";
import NavBar from "../components/NavBar"
import "../styles/payments.css";
import { UserContext } from "../contexts/UserContext";

const Payments = () => {
    const { token } = useContext(UserContext);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalDue, setTotalDue] = useState(0);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);

    const getPayments = async () => {
        try {
        const res = await fetch("http://127.0.0.1:8000/api/payments", {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
    
        const data = await res.json();
    
        if (!res.ok || !Array.isArray(data)) {
            console.warn("Bad payments response:", data);
            setPayments([]); 
            return;
        }
    
        setPayments(data);
        } catch (err) {
        console.error("Error fetching payments:", err);
        setPayments([]); 
        } finally {
        setLoading(false);
        }
      };
      

    useEffect(() => {
        getPayments();
    }, []);

    useEffect(() => {
        const total = payments
        .filter((p) => !p.paid)
        .reduce((sum, p) => sum + p.total, 0);
        setTotalDue(total);
    }, [payments]);

    const handleAddPayment = async (payment) => {
        await fetch("http://127.0.0.1:8000/api/payments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payment),
            Authorization: `Bearer ${token}`,
        });
        getPayments();
    };

    const handleUpdatePayment = async (updatedPayment) => {
        await fetch(`http://127.0.0.1:8000/api/payments/${updatedPayment._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedPayment),
            Authorization: `Bearer ${token}`,
        });
        getPayments();
    };

    const handleClearAll = async () => {
        const confirm = window.confirm("Are you sure you want to delete all payments?");
        if (!confirm) return;

        try {
            await fetch("http://127.0.0.1:8000/api/payments", {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            });
            getPayments();
        } catch (err) {
            console.error("Failed to clear all payments:", err);
        }
    };

    const handleDeletePayment = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this payment?");
        if (!confirm) return;
        await fetch(`http://127.0.0.1:8000/api/payments/${id}`, {
            method: "DELETE",
            headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        getPayments();
    };
      
    const handleTogglePaid = async (payment) => {
        const updated = { ...payment, paid: !payment.paid };

        await fetch(`http://127.0.0.1:8000/api/payments/${payment._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updated),
        });

        getPayments();
    };
      

    return (
        <>
            <NavBar />
            <div className="app mx-auto">
                <div className="title-container">
                    <h1 className="mb-3">Payment Tracker</h1>
                    <span className="total-due">Total Due: ${totalDue.toFixed(2)}</span>
                </div>
                <div className="actions-bar">
                    <button className="btn-add" onClick={() => setShowAddModal(true)}>
                        Add New Payment 
                    </button>
                    <button className="btn-clear" onClick={handleClearAll}>
                        Clear All Payments
                    </button>
                </div>
                <h2 className="text-center my-3">Payments</h2>
                <div id="payments" className="container mt-3">
                    {loading ? (
                    <p>Loading...</p>
                    ) : Array.isArray(payments) && payments.length > 0 ? (
                        payments
                            .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
                            .map((payment) => (
                            <PaymentCard
                                key={payment._id}
                                payment={payment}
                                onEdit={(payment) => {
                                setSelectedPayment(payment);
                                setShowEditModal(true);
                                }}
                                onDelete={handleDeletePayment}
                                onTogglePaid={handleTogglePaid}
                            />
                        ))
                    ) : (
                        <p>No payments found or you are not authorized.</p>
                    )}
                </div>
                {showAddModal && (
                    <AddPaymentModal
                    onAdd={handleAddPayment}
                    onClose={() => setShowAddModal(false)}
                    />
                )}
                {showEditModal && (
                    <EditPaymentModal
                    payment={selectedPayment}
                    onUpdate={handleUpdatePayment}
                    onClose={() => {
                        setShowEditModal(false);
                        setSelectedPayment(null);
                    }}
                    />
                )}
            </div>
        </>
        );
    };

    export default Payments;

