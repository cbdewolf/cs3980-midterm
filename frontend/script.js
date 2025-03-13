let titleInput = document.getElementById('title');
let descInput = document.getElementById('desc');
let dueDateInput = document.getElementById('due-date');
let totalInput = document.getElementById('total');

let titleEditInput = document.getElementById('title-edit');
let descEditInput = document.getElementById('desc-edit');
let dueDateEditInput = document.getElementById('due-date-edit');
let totalEditInput = document.getElementById('total-edit')

let data = [];
let selectedPayment = {};
const url = 'http://127.0.0.1:8000/payments'


function tryAdd() {
    let msg = document.getElementById('msg')
    msg.innerHTML = ''
}

document.getElementById('form-add').addEventListener('submit', (e) => {
    e.preventDefault()
    if (!titleInput.value) {
        document.getElementById('msg').innerHTML = 'Payment Title Cannot Be Blank'
    } else {
        addPayment({
            title: titleInput.value,
            total: parseFloat(totalInput.value),
            desc: descInput.value,
            due_date: dueDateInput.value,
            paid: false
        })
    }
})

function addPayment(payment) {
    console.log("Sending request:", JSON.stringify(payment))
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 201) {
            console.log("Response received:", xhr.status, xhr.responseText); // Debug response
            const newPayment = JSON.parse(xhr.responseText)
            console.log("Payment added successfully:", newPayment);
            data.push(newPayment)
            getPayments()
            // close modal 
            const closeBtn = document.getElementById('add-close')
            closeBtn.click()
        }
    }
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr.send(JSON.stringify(payment))
}

function refreshPayments() {
    const payments = document.getElementById('payments')
    payments.innerHTML = ''
    const today = new Date().toISOString().split('T')[0];
    let totalDue = 0
    data
        .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
        .forEach((x) => {

            if (!x.paid) {
                totalDue += x.total
            }
            let isOverDue = new Date(x.due_date) < new Date(today)
            let overDueLabel = isOverDue ? `<span class="overdue-label">OVERDUE</span>` : ''

            let isPaid = x.paid ? "Paid" : "Not Paid"
            let paidClass = x.paid ? "paid-button-paid" : "paid-button-unpaid"
            return (payments.innerHTML += `
                <div class="payment-card" id="payment-${x.payment_id}">
                    <h4 class="fw-bold">${x.title}</h4>
                    <p class="text-secondary">${x.desc}</p>
                    <div class="amount-due">
                        <p><strong>Amount:</strong> $${x.total}</p>
                        <p><strong>Due Date:</strong> ${x.due_date} ${overDueLabel}</p>
                    </div>
                    <span class="options">
                        <i onClick="tryEditPayment(${x.payment_id})" data-bs-toggle="modal" data-bs-target="#modal-edit" class="fas fa-edit"></i>
                        <i onClick="deletePayment(${x.payment_id})" class="fas fa-trash-alt"></i>
                        <button class="${paidClass}" onClick="togglePaid(${x.payment_id}, ${x.paid})">${isPaid}</button>
                    </span>
                </div>                    
            `)
        })
    document.getElementById("total-due").innerText = `Total Due: $${totalDue.toFixed(2)}`
    resetForm()
}

function resetForm() {
    titleInput.value = ''
    descInput.value = ''
    dueDateInput.value = ''
    totalInput.value = ''
}

function tryEditPayment(payment_id) {
    const payment = data.find((x) => x.payment_id === payment_id)
    selectedPayment = payment
    const paymentID = document.getElementById("payment-id")
    paymentID.innerText = payment.payment_id
    titleEditInput.value = payment.title
    descEditInput.value = payment.desc
    totalEditInput.value = payment.total
    dueDateEditInput.value = payment.due_date
    document.getElementById('msg-edit').innerHTML = ''
}

document.getElementById('form-edit').addEventListener('submit', (e) => {
    e.preventDefault()
    if (!titleEditInput.value) {
        document.getElementById('msg-edit').innerHTML = 'Payment Title cannot be blank!'
        return
    } else {
        selectedPayment.title = titleEditInput.value
        selectedPayment.desc = descEditInput.value.trim() || ""
        selectedPayment.total = parseFloat(totalEditInput.value)
        selectedPayment.due_date = dueDateEditInput.value
        editPayment(selectedPayment)
    }
})

function editPayment(payment) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        getPayments();
        // close modal
        const closeBtn = document.getElementById('edit-close');
        closeBtn.click();
      }
    };
    xhr.open('PUT', `${url}/${payment.payment_id}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    console.log(payment)
    xhr.send(JSON.stringify(payment));
  };

function deletePayment(payment_id) {
    if (!confirm("Are you sure you want to delete this payment?")) {
        return
    }
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        data = data.filter((x) => x.payment_id !== payment_id);
        getPayments();
      }
    };
    xhr.open('DELETE', `${url}/${payment_id}`, true);
    xhr.send();
} 

function clearAll() {
    if (!confirm("Are you sure you want to delete all payments?")) {
        return
        }
    data.forEach(payment => {
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
              console.log("cleared all payments")
                getPayments()
            } else if (xhr.readyState == 4) {
            console.error("failed to clear all payments", xhr.responseText)
            }    
        }
        xhr.open('DELETE', `${url}/${payment.payment_id}`, true)
        xhr.send()
    })
}

function togglePaid(payment_id, status) {
    const updatedPayment = data.find((x) => x.payment_id === payment_id)
    if (!updatedPayment) {
        return
    }
    updatedPayment.paid = !status

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            getPayments();
        }
    };
    xhr.open('PUT', `${url}/${payment_id}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify(updatedPayment));
}


function getPayments() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        data = JSON.parse(xhr.responseText) || [];
        refreshPayments();
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

(() => {
    getPayments()
})()